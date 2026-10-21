import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export type SubmissionState = 'in_flight' | 'lead_delivered' | 'delivered';
type RecordFile = { fingerprint: string; state: SubmissionState; updatedAt: string };
export type ClaimResult = { kind: 'claimed' | 'delivered' | 'in_flight' | 'conflict'; state?: SubmissionState };

function rootDirectory(): string {
  const testRoot = process.env.TEST_LEAD_IDEMPOTENCY_DIR;
  if (process.env.ALLOW_LOCAL_ORIGINS === '1' && testRoot?.startsWith('/tmp/')) return testRoot;
  return '/tmp/customer-success-managers-lead-idempotency-v1';
}

function submissionDirectory(submissionId: string): string {
  return join(rootDirectory(), submissionId);
}

function recordPath(submissionId: string): string {
  return join(submissionDirectory(submissionId), 'state.json');
}

async function readRecord(submissionId: string): Promise<RecordFile | undefined> {
  try {
    const value: unknown = JSON.parse(await readFile(recordPath(submissionId), 'utf8'));
    if (!value || typeof value !== 'object') return undefined;
    const candidate = value as Partial<RecordFile>;
    if (typeof candidate.fingerprint !== 'string' || !['in_flight', 'lead_delivered', 'delivered'].includes(candidate.state ?? '')) return undefined;
    return candidate as RecordFile;
  } catch { return undefined; }
}

async function writeRecord(submissionId: string, fingerprint: string, state: SubmissionState): Promise<void> {
  const directory = submissionDirectory(submissionId);
  const temporary = join(directory, `state-${process.pid}-${crypto.randomUUID()}.tmp`);
  await writeFile(temporary, JSON.stringify({ fingerprint, state, updatedAt: new Date().toISOString() }), { encoding: 'utf8', mode: 0o600, flag: 'wx' });
  await rename(temporary, recordPath(submissionId));
}

/**
 * Atomic directory creation coordinates Next.js workers in the same deployed
 * container. A non-final state is deliberately fail-closed: after an abrupt
 * crash we do not repeat an external transport whose acknowledgement may have
 * been lost. The state directory is container-local, so release documentation
 * must not claim cross-container or cross-deployment exactly-once delivery.
 */
export async function claimSubmission(submissionId: string, fingerprint: string): Promise<ClaimResult> {
  await mkdir(rootDirectory(), { recursive: true, mode: 0o700 });
  try {
    await mkdir(submissionDirectory(submissionId), { mode: 0o700 });
    await writeRecord(submissionId, fingerprint, 'in_flight');
    return { kind: 'claimed', state: 'in_flight' };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
    const existing = await readRecord(submissionId);
    if (!existing) return { kind: 'in_flight', state: 'in_flight' };
    if (existing.fingerprint !== fingerprint) return { kind: 'conflict', state: existing.state };
    return existing.state === 'delivered' ? { kind: 'delivered', state: existing.state } : { kind: 'in_flight', state: existing.state };
  }
}

export async function markSubmission(submissionId: string, fingerprint: string, state: SubmissionState): Promise<void> {
  const existing = await readRecord(submissionId);
  if (!existing || existing.fingerprint !== fingerprint) throw new Error('Submission state ownership changed.');
  await writeRecord(submissionId, fingerprint, state);
}

export async function releaseFailedSubmission(submissionId: string, fingerprint: string): Promise<void> {
  const existing = await readRecord(submissionId);
  if (existing?.fingerprint === fingerprint && existing.state === 'in_flight') {
    await rm(submissionDirectory(submissionId), { recursive: true, force: true });
  }
}
