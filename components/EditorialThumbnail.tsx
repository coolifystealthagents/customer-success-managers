import type { CSSProperties } from 'react';
import Image from 'next/image';

type EditorialThumbnailProps = {
  image?: string;
  title: string;
  topic: string;
};

type ThumbnailStyle = CSSProperties & {
  '--fallback-x': string;
  '--fallback-y': string;
  '--fallback-turn': string;
};

function stableSeed(value: string) {
  return [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 17);
}

function topicTone(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes('onboard') || normalized.includes('handoff')) return 'onboarding';
  if (normalized.includes('health') || normalized.includes('risk') || normalized.includes('renewal')) return 'health';
  if (normalized.includes('review') || normalized.includes('qbr') || normalized.includes('evidence')) return 'review';
  if (normalized.includes('adoption') || normalized.includes('usage')) return 'adoption';
  if (normalized.includes('knowledge') || normalized.includes('document') || normalized.includes('source')) return 'knowledge';
  if (normalized.includes('escalation') || normalized.includes('exception')) return 'escalation';
  return 'operations';
}

export function EditorialThumbnail({ image, title, topic }: EditorialThumbnailProps) {
  const seed = stableSeed(`${topic}:${title}`);
  const tone = topicTone(`${topic} ${title}`);
  const style: ThumbnailStyle = {
    '--fallback-x': `${20 + (seed % 58)}%`,
    '--fallback-y': `${18 + ((seed >>> 5) % 58)}%`,
    '--fallback-turn': `${-18 + ((seed >>> 9) % 37)}deg`,
  };

  return <span className={`editorial-thumbnail tone-${tone}`} style={style}>
    {image
      ? <Image
          src={image}
          alt={`Editorial image for “${title}”`}
          width={1200}
          height={630}
          sizes="(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 29vw"
        />
      : <span className="editorial-fallback" role="img" aria-label={`Topic illustration for “${title}”`}>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </span>}
  </span>;
}

export function estimateResearchReadTime(parts: Array<string | string[] | undefined>) {
  const words = parts.flatMap((part) => Array.isArray(part) ? part : [part ?? ''])
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
  return `${Math.max(3, Math.ceil(words / 220))} min read`;
}
