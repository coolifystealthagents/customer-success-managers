/**
 * ACR Tracker — Universal vanilla-JS bundle
 * @version 0.4.19
 *
 * Drop-in analytics tracker, framework-agnostic. Used by all ACR Next.js sites
 * via the centralized auto-update channel served at
 * `https://acrtracking.stealthagents.us/v1/tracker.js`. See TRACKER_AUTO_UPDATE.md
 * and SITE_TRACKING_HANDOVER.md for install instructions.
 *
 * Usage (Next.js App Router, app/layout.tsx):
 *   <Script id="acr-tracker-config" strategy="beforeInteractive">{`
 *     window.ACR_TRACKER_CONFIG = {
 *       siteId: 'your-site-id',
 *       endpoint: '/ingest/track',
 *       debug: false
 *     };
 *   `}</Script>
 *   <Script src="https://acrtracking.stealthagents.us/v1/tracker.js" strategy="afterInteractive" />
 */
(function () {
  'use strict';

  // ── Double-init guard (ACR-421) ────────────────────────────────────
  // If the script is loaded twice (duplicate <script> tags, SPA framework
  // re-insertion, etc.), skip re-initialization to prevent duplicate
  // observers, listeners, and events.
  if (window.acrTracker) return;

  // Sentinel for dual-tracker prevention (ACR-421 v0.4.9): set BEFORE any
  // observers so the React <AcrTracker> component can bail out if the vanilla
  // tracker is already active (prevents dupes when both are loaded).
  window.__ACR_TRACKER_ACTIVE = true;

  // Tracker semantic version. Stamped onto every event's meta so the dashboard
  // can show which tracker build each site is currently running. Bump in lock-step
  // with the @version header above and the public API `version` field below.
  var TRACKER_VERSION = '0.4.19';

  // ── Config ──────────────────────────────────────────────────────────
  var cfg = window.ACR_TRACKER_CONFIG || {};
  var SITE_ID = cfg.siteId || '';
  // Default endpoint: '/ingest/track' for Next.js (current canonical install).
  // Legacy WordPress installs override via cfg.endpoint = '/wp-json/acr-tracker/v1/ingest'.
  var ENDPOINT = cfg.endpoint || '/ingest/track';
  if (!cfg.endpoint) {
    try { console.warn('[acr-tracker] No endpoint configured. Defaulting to "/ingest/track" — your site MUST expose this proxy route (app/ingest/track/route.ts on Next.js). Set window.ACR_TRACKER_CONFIG.endpoint explicitly to silence this warning.'); } catch (e) {}
  }
  var BATCH_MS = cfg.batchInterval || 5000;
  var DEBUG = !!cfg.debug;

  // ── Test-traffic tagging (ACR-380) ──────────────────────────────────
  // Verification probes (CTO VerifyBot, double-submit guard tests, etc.) need
  // to be visibly tagged in the Mattermost lead feed and excluded from real
  // conversion counts. Three activation paths:
  //   1. window.ACR_TRACKER_CONFIG.test = true            (sticky install-wide)
  //   2. URL query param ?acr_test=1                       (sticky per-session via sessionStorage)
  //   3. sessionStorage _acr_test = '1' set manually        (same as #2)
  // When IS_TEST is true, every event built by this tracker gets
  // event_metadata.test = true. The server-side Mattermost formatter renders a
  // visible TEST badge and downstream counters know to skip these.
  var TEST_FLAG_KEY = '_acr_test';
  try {
    var qp = new URLSearchParams(location.search);
    if (qp.get('acr_test') === '1') sessionStorage.setItem(TEST_FLAG_KEY, '1');
  } catch (e) {}
  var IS_TEST = cfg.test === true;
  if (!IS_TEST) {
    try { if (sessionStorage.getItem(TEST_FLAG_KEY) === '1') IS_TEST = true; } catch (e) {}
  }
  var FUNNEL = cfg.funnelSteps || [
    { path: '/contact-us', step: 1, label: 'Form Page', event: 'funnel_form_page' },
    { path: '/thank-you', step: 2, label: 'Form Submitted', event: 'funnel_form_submitted' },
    { path: '/thanks-whats-next', step: 3, label: 'Booking Confirmed', event: 'funnel_booking_confirmed' }
  ];

  if (!SITE_ID) {
    console.warn('[acr-tracker] No siteId configured. Set window.ACR_TRACKER_CONFIG.siteId');
    return;
  }

  // ── Helpers ─────────────────────────────────────────────────────────
  function log() {
    if (DEBUG) console.log.apply(console, ['[acr-tracker]'].concat(Array.prototype.slice.call(arguments)));
  }

  function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  // ACR-1291: cookie origin classification for the current event's user_id.
  // 'server_set' — value came from the SA-side HttpOnly `_acr_uid` cookie via
  //                `<meta name="acr-uid">`. Survives Safari ITP / localStorage
  //                clears and is the identity spine used by the ACR-side
  //                identity_graph expansion.
  // 'client_local' — value came from a JS-set `_acr_uid` cookie or was minted
  //                locally. Does not survive cookie clears; used only when
  //                the site hasn't shipped the SA-side server cookie yet.
  var _lastCookieOrigin = 'client_local';

  function getUserId() {
    // Preferred path: the site's SSR forwarded the HttpOnly `_acr_uid`
    // value (ACR-1293 / SA-side) via either
    //   (a) `<meta name="acr-uid" content="…">`, or
    //   (b) `window.ACR_TRACKER_CONFIG.userUid` in the SSR config script.
    // Either survives Safari ITP / localStorage clears since the browser
    // cannot mint or regenerate the value.
    try {
      var cfgUid = (cfg && typeof cfg.userUid === 'string') ? cfg.userUid.trim() : '';
      if (cfgUid) {
        _lastCookieOrigin = 'server_set';
        return cfgUid;
      }
      var metaEl = document.querySelector('meta[name="acr-uid"]');
      if (metaEl) {
        var metaVal = (metaEl.getAttribute('content') || '').trim();
        if (metaVal) {
          _lastCookieOrigin = 'server_set';
          return metaVal;
        }
      }
    } catch (e) { /* fall through to client-local */ }

    // Fallback: legacy client-cookie. Kept for sites that haven't shipped the
    // SA-side server cookie yet — this value is cleared by cookie wipes so
    // it is NOT a real ITP spine, and the server-side identity_graph does
    // not treat it as one (see user_id_spine MV: cookie_origin is stamped
    // into extra_json.cookie_origin so downstream can distinguish).
    var name = '_acr_uid';
    try {
      var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)'));
      if (match) {
        _lastCookieOrigin = 'client_local';
        return decodeURIComponent(match[1]);
      }
      var id = generateId();
      var maxAge = 365 * 24 * 60 * 60; // 1 year
      document.cookie = name + '=' + encodeURIComponent(id)
        + '; path=/; max-age=' + maxAge
        + '; SameSite=Lax';
      _lastCookieOrigin = 'client_local';
      return id;
    } catch (e) {
      _lastCookieOrigin = 'client_local';
      return '';
    }
  }

  function getAnonymousId() {
    var key = '_acr_aid';
    try {
      var id = localStorage.getItem(key);
      if (id) return id;
      id = generateId();
      localStorage.setItem(key, id);
      return id;
    } catch (e) {
      return generateId();
    }
  }

  var SESSION_TIMEOUT = 30 * 60 * 1000;
  function getSessionId() {
    var sidKey = '_acr_sid', tsKey = '_acr_sid_ts';
    try {
      var now = Date.now();
      var sid = sessionStorage.getItem(sidKey);
      var ts = sessionStorage.getItem(tsKey);
      if (sid && ts && now - parseInt(ts, 10) < SESSION_TIMEOUT) {
        sessionStorage.setItem(tsKey, '' + now);
        return sid;
      }
      var id = generateId();
      sessionStorage.setItem(sidKey, id);
      sessionStorage.setItem(tsKey, '' + now);
      return id;
    } catch (e) {
      return generateId();
    }
  }

  function getUtmParams() {
    try {
      var p = new URLSearchParams(location.search);
      return {
        utm_source: p.get('utm_source') || '',
        utm_medium: p.get('utm_medium') || '',
        utm_campaign: p.get('utm_campaign') || '',
        utm_term: p.get('utm_term') || '',
        utm_content: p.get('utm_content') || ''
      };
    } catch (e) {
      return { utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '' };
    }
  }

  function getDeviceContext() {
    try {
      var nav = navigator;
      var conn = nav.connection || {};
      return {
        language: nav.language || '',
        languages: Array.from(nav.languages || []),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        pixel_ratio: window.devicePixelRatio || 1,
        color_depth: screen.colorDepth,
        touch_support: nav.maxTouchPoints > 0,
        connection_type: conn.effectiveType || '',
        connection_downlink: conn.downlink != null ? conn.downlink : null,
        connection_rtt: conn.rtt != null ? conn.rtt : null,
        pdf_viewer: nav.pdfViewerEnabled != null ? nav.pdfViewerEnabled : null,
        hardware_concurrency: nav.hardwareConcurrency || null,
        cookie_enabled: nav.cookieEnabled,
        do_not_track: nav.doNotTrack === '1',
        online: nav.onLine
      };
    } catch (e) {
      return {};
    }
  }

  // ── Bot Detection ───────────────────────────────────────────────────
  var isBot = false;
  if (navigator.webdriver) isBot = true;
  var pageLoadTime = typeof performance !== 'undefined' ? performance.now() : null;
  if (pageLoadTime !== null && pageLoadTime < 50) isBot = true;
  if (isBot) { log('Bot detected, skipping tracking'); return; }

  // ── Landing Page / Referrer ─────────────────────────────────────────
  try {
    if (!sessionStorage.getItem('_acr_lp')) {
      sessionStorage.setItem('_acr_lp', location.href);
      sessionStorage.setItem('_acr_lr', document.referrer || '(direct)');
      sessionStorage.setItem('_acr_lu', JSON.stringify(getUtmParams()));
    }
  } catch (e) {}

  // ACR-1807: seed _acr_aid immediately so OnceHub iframe builders
  // can read it before the first tracked event fires.
  getAnonymousId();

  function getLandingPage() { try { return sessionStorage.getItem('_acr_lp') || ''; } catch (e) { return ''; } }
  function getLandingReferrer() { try { return sessionStorage.getItem('_acr_lr') || ''; } catch (e) { return ''; } }
  function getLandingUtmParams() {
    try {
      var raw = sessionStorage.getItem('_acr_lu');
      if (!raw) return getUtmParams();
      var parsed = JSON.parse(raw) || {};
      return {
        utm_source: parsed.utm_source || '',
        utm_medium: parsed.utm_medium || '',
        utm_campaign: parsed.utm_campaign || '',
        utm_term: parsed.utm_term || '',
        utm_content: parsed.utm_content || ''
      };
    } catch (e) {
      return getUtmParams();
    }
  }

  // ── Engagement Time ─────────────────────────────────────────────────
  var engagementStart = Date.now();
  var engagementMs = 0;
  var isVisible = true;
  var deviceCtx = getDeviceContext();

  function getEngagementTime() {
    return isVisible ? engagementMs + (Date.now() - engagementStart) : engagementMs;
  }

  // ── Event Queue & Flush ─────────────────────────────────────────────
  var queue = [];

  // Durable backlog (localStorage) — survives the server being down, the
  // proxy returning 5xx, the user's network dropping, or the page closing
  // before a flush completes. Drained on next page load.
  var BACKLOG_KEY = '_acr_event_backlog';
  var BACKLOG_MAX = 200; // cap to avoid unbounded growth on prolonged outages

  function persistBacklog(events) {
    if (!events || !events.length) return;
    try {
      var raw = localStorage.getItem(BACKLOG_KEY);
      var existing = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(existing)) existing = [];
      existing = existing.concat(events);
      if (existing.length > BACKLOG_MAX) existing = existing.slice(-BACKLOG_MAX);
      localStorage.setItem(BACKLOG_KEY, JSON.stringify(existing));
      log('Persisted', events.length, 'events to backlog (total now ' + existing.length + ')');
    } catch (e) { log('persistBacklog failed:', e); }
  }

  function drainBacklog() {
    try {
      var raw = localStorage.getItem(BACKLOG_KEY);
      if (!raw) return;
      var events = JSON.parse(raw);
      if (!Array.isArray(events) || !events.length) {
        try { localStorage.removeItem(BACKLOG_KEY); } catch (e) {}
        return;
      }
      // Clear the backlog optimistically; if this flush also fails, persistBacklog re-saves it
      try { localStorage.removeItem(BACKLOG_KEY); } catch (e) {}
      log('Draining', events.length, 'events from previous-session backlog');
      // Prepend so older events go out first
      queue = events.concat(queue);
    } catch (e) { log('drainBacklog failed:', e); }
  }

  function buildEvent(eventType, extra) {
    var utm = getUtmParams();
    var landingUtm = getLandingUtmParams();
    // ACR-1291: resolve user_id first so _lastCookieOrigin is set for the
    // event we're about to build. Order matters — reading getUserId() later
    // (e.g. inline in the `ev` object) would produce a race where meta is
    // stamped before cookie_origin is known.
    var uid = getUserId();
    var meta = {
      tracker_version: TRACKER_VERSION,
      engagement_time_ms: getEngagementTime(),
      landing_page: getLandingPage(),
      landing_referrer: getLandingReferrer(),
      landing_utm_source: landingUtm.utm_source,
      landing_utm_medium: landingUtm.utm_medium,
      landing_utm_campaign: landingUtm.utm_campaign,
      landing_utm_term: landingUtm.utm_term,
      landing_utm_content: landingUtm.utm_content,
      cookie_origin: _lastCookieOrigin
    };
    if (IS_TEST) meta.test = true;
    // Merge device context
    for (var k in deviceCtx) meta[k] = deviceCtx[k];

    // Merge any extra metadata
    if (extra && extra.event_metadata) {
      try {
        var parsed = JSON.parse(extra.event_metadata);
        for (var k2 in parsed) meta[k2] = parsed[k2];
      } catch (e) { meta.raw_metadata = extra.event_metadata; }
    }

    var ev = {
      client_event_id: generateId(),
      event_type: eventType,
      timestamp: new Date().toISOString(),
      session_id: getSessionId(),
      user_id: uid,
      anonymous_id: getAnonymousId(),
      page_url: location.href,
      page_path: location.pathname,
      page_title: document.title,
      referrer: document.referrer,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_term: utm.utm_term,
      utm_content: utm.utm_content,
      screen_width: screen.width,
      screen_height: screen.height,
      scroll_depth: 0,
      time_on_page: pageLoadTime ? Math.round(performance.now() - pageLoadTime) : 0,
      event_value: '',
      event_metadata: JSON.stringify(meta)
    };

    if (extra) {
      for (var ek in extra) {
        if (ek !== 'event_metadata') ev[ek] = extra[ek];
      }
      ev.event_metadata = JSON.stringify(meta);
    }

    return ev;
  }

  function flush() {
    if (!queue.length) return;
    var batch = queue.slice();
    var payload = { site_id: SITE_ID, events: batch };
    queue = [];
    var body = JSON.stringify(payload);
    log('Flushing', batch.length, 'events');
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
        keepalive: true
      }).then(function (resp) {
        if (!resp || !resp.ok) {
          // 4xx/5xx — server rejected or unavailable; persist for next session
          log('Flush HTTP', resp && resp.status, '— persisting batch to backlog');
          persistBacklog(batch);
        }
      }).catch(function (err) {
        // Network error / offline / DNS — persist for next session
        log('Flush error, persisting batch to backlog:', err);
        persistBacklog(batch);
      });
    } catch (e) {
      log('Flush exception, persisting batch to backlog:', e);
      persistBacklog(batch);
    }
  }

  function flushBeacon() {
    if (!queue.length) return;
    var batch = queue.slice();
    var payload = { site_id: SITE_ID, events: batch };
    queue = [];
    var body = JSON.stringify(payload);
    log('Beacon flush', batch.length, 'events');
    var sent = false;
    if (navigator.sendBeacon) {
      try { sent = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (e) { sent = false; }
    }
    if (!sent) {
      // sendBeacon refused (queue full, payload too big, etc.). Try fetch with keepalive
      // and fall back to backlog if that also fails. We can't rely on .then() in unload,
      // so we persist eagerly and let a successful response trigger backlog cleanup
      // on the next page load (we already removed from queue; this is the safety net).
      try {
        persistBacklog(batch); // Persist eagerly — sendBeacon already failed, can't trust unload-time fetch
        fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true });
      } catch (e) {}
    }
  }

  function enqueue(ev) { queue.push(ev); log('Enqueued:', ev.event_type); }

  // ── Public API ──────────────────────────────────────────────────────
  function track(eventType, metadata) {
    if (isBot) return;
    enqueue(buildEvent(eventType, { event_metadata: metadata ? JSON.stringify(metadata) : '{}' }));
  }

  function trackPageView() {
    if (isBot) return;
    enqueue(buildEvent('pageview'));
    // Reset engagement timer for new page session — ACR-422
    engagementMs = 0;
    engagementStart = Date.now();
    isVisible = typeof document !== 'undefined' ? document.visibilityState !== 'hidden' : true;
  }

  function trackScrollDepth(depth) {
    if (isBot) return;
    enqueue(buildEvent('scroll_depth', { scroll_depth: depth, event_value: depth + '%' }));
  }

  function trackCWV(metric) {
    if (isBot) return;
    enqueue(buildEvent('cwv', {
      event_value: '' + metric.value,
      event_metadata: JSON.stringify({ metric_name: metric.name, metric_value: metric.value })
    }));
  }

  // Reserved keys that map to lead_* fields; any other own-property of `data`
  // is spread into event_metadata as-is so sites can pass arbitrary form fields
  // (company, team_size, service_interest, custom dropdowns, etc.) without
  // requiring a tracker version bump per field. Mirrors the npm package
  // (packages/acr-tracker/src/tracker.ts:284-309). ACR-293.
  var LEAD_RESERVED_KEYS = { name: 1, email: 1, phone: 1, message: 1, source: 1, formId: 1 };

  function trackLead(data) {
    if (isBot) return;
    try {
    data = data || {};

    var trimName  = (data.name  || '').replace(/^\s+|\s+$/g, '');
    var trimEmail = (data.email || '').replace(/^\s+|\s+$/g, '');
    var trimPhone = (data.phone || '').replace(/^\s+|\s+$/g, '');
    var trimMessage = (data.message || '').replace(/^\s+|\s+$/g, '');

    // ACR-499: If ALL PII fields are empty, emit empty_form_submit instead
    // of lead_submit. Preserves the bounce/abandon signal without polluting
    // leads.
    if (!trimName && !trimEmail && !trimPhone && !trimMessage) {
      enqueue(buildEvent('empty_form_submit', {
        event_value: data.source || '',
        event_metadata: JSON.stringify({
          lead_source: data.source || '',
          lead_form_id: data.formId || '',
          reason: 'all_pii_fields_empty'
        })
      }));
      log('Empty form submit — emitting empty_form_submit (ACR-499)');
      flush();
      return;
    }

    // ACR-289: SDK-side guard — block lead_submit when name or email is
    // empty/whitespace.  Defence-in-depth; the real fix is on the form.
    if (!trimName || !trimEmail) {
      enqueue(buildEvent('lead_submit_blocked_blank', {
        event_value: 'missing_' + (!trimName ? 'name' : '') + (!trimName && !trimEmail ? '_' : '') + (!trimEmail ? 'email' : ''),
        event_metadata: JSON.stringify({
          lead_name: data.name || '',
          lead_email: data.email || '',
          lead_source: data.source || '',
          lead_form_id: data.formId || '',
          reason: 'name_or_email_blank'
        })
      }));
      log('Lead blocked: name or email is blank (ACR-289)');
      return;
    }

    var meta = {
      lead_name: data.name || '',
      lead_email: data.email || '',
      lead_phone: data.phone || '',
      lead_message: data.message || '',
      lead_source: data.source || '',
      lead_form_id: data.formId || ''
    };
    // Spread any non-reserved own-properties into meta so arbitrary form
    // fields land in extra_json (queryable via JSONExtractString).
    for (var key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
      if (LEAD_RESERVED_KEYS[key]) continue;
      meta[key] = data[key];
    }
    // Attach attributed CTA so the lead row in lead_exploration shows
    // which CTA the visitor clicked before converting (ACR-279).
    try {
      var raw = sessionStorage.getItem('_acr_last_cta');
      if (raw) {
        var lastCta = JSON.parse(raw);
        if (lastCta && Date.now() - lastCta.timestamp <= 30 * 60 * 1000) {
          meta.attributed_cta_text = lastCta.text || '';
          meta.attributed_cta_href = lastCta.href || '';
          meta.attributed_cta_id = lastCta.id || '';
          if (lastCta.ab_variant_id) meta.attributed_ab_variant_id = lastCta.ab_variant_id;
          if (lastCta.cta_label) meta.attributed_cta_label = lastCta.cta_label;
        }
      }
    } catch (e) {}
    enqueue(buildEvent('lead_submit', { event_value: data.source || '', event_metadata: JSON.stringify(meta) }));
    flush();
    log('Lead tracked and flushed immediately', meta.attributed_cta_text ? '(CTA: ' + meta.attributed_cta_text + ')' : '(no CTA attribution)');
    } catch (err) {
      // ACR-618: Emit lead_submit_error so silent client failures surface
      // in ClickHouse instead of being swallowed by site try/catch blocks.
      var errPayload = {};
      try { errPayload = JSON.parse(JSON.stringify(data || {})); } catch (_) {}
      errPayload._error = (err && err.message) ? err.message : String(err);
      errPayload._stack = (err && err.stack) ? String(err.stack).substring(0, 500) : '';
      enqueue(buildEvent('lead_submit_error', {
        event_value: (data && data.source) || '',
        event_metadata: JSON.stringify(errPayload)
      }));
      flush();
      log('lead_submit_error emitted (ACR-618):', errPayload._error);
    }
  }

  // ── trackLeadFromForm ───────────────────────────────────────────────
  // Pre-submit FormData snapshots keyed by form element. React 19's
  // useActionState resets text inputs before useEffect fires, so the
  // live FormData at trackLeadFromForm() time can be empty. Sites that
  // capture a snapshot during the native 'submit' event get a fallback.
  // Mirrors npm package (packages/acr-tracker/src/tracker.ts:452-457).
  var _formSnapshots = (typeof WeakMap !== 'undefined') ? new WeakMap() : null;

  // ACR-499 scope-expansion: hint-based field scan for React 19 forms with
  // nameless controlled inputs. Uses name, id, placeholder, aria-label, and
  // input type as hints to classify fields into lead_name/email/phone/message.
  function _scanFormFields(form) {
    var fields = {};
    for (var i = 0; i < form.elements.length; i++) {
      var el = form.elements[i];
      var val = (el.value || '').replace(/^\s+|\s+$/g, '');
      if (!val) continue;
      var hints = [el.name, el.id, el.getAttribute('placeholder'), el.getAttribute('aria-label')]
        .filter(Boolean).map(function (s) { return s.toLowerCase(); }).join(' ');
      var isEmail = el.type === 'email';
      var isTel = el.type === 'tel';
      var isTextarea = el.tagName === 'TEXTAREA';
      if (isEmail || /email|e-mail|mail/.test(hints)) { fields.lead_email = fields.lead_email || val; }
      else if (isTel || /phone|tel|mobile/.test(hints)) { fields.lead_phone = fields.lead_phone || val; }
      else if (/name|firstname|lastname|first[-_ ]?name|last[-_ ]?name|full[-_ ]?name/.test(hints)) { fields.lead_name = fields.lead_name || val; }
      else if (isTextarea || /message|comment|inquiry|description|details/.test(hints)) { fields.lead_message = fields.lead_message || val; }
      // Also store by name key for FormData-compatible fallback
      if (el.name) fields['__named_' + el.name] = val;
    }
    return fields;
  }

  function _captureFormSnapshot(form) {
    if (!form || !_formSnapshots) return;
    try { _formSnapshots.set(form, _scanFormFields(form)); } catch (e) {}
  }

  // Common field-name aliases mapped to standard LeadData keys.
  // `_firstName`/`_lastName` are internal markers — they get merged into `name`.
  var FIELD_ALIASES = {
    firstname: '_firstName',
    first_name: '_firstName',
    lastname: '_lastName',
    last_name: '_lastName',
    name: 'name',
    fullname: 'name',
    full_name: 'name',
    email: 'email',
    emailaddress: 'email',
    email_address: 'email',
    phone: 'phone',
    phonenumber: 'phone',
    phone_number: 'phone',
    business: 'business',
    businessname: 'business',
    business_name: 'business',
    company: 'business',
    companyname: 'business',
    company_name: 'business',
    message: 'message',
    comments: 'message',
    inquiry: 'message'
  };

  function trackLeadFromForm(form, options) {
    if (isBot) return;
    if (!form || form.tagName !== 'FORM') {
      log('trackLeadFromForm: argument is not a form element');
      return;
    }
    options = options || {};
    var skipPrefix = options.skipPrefix != null ? options.skipPrefix : '_';

    // ACR-499: hint-based scan captures values from nameless inputs.
    // Merge live scan with the pre-submit snapshot (live wins when non-empty).
    var liveScan = _scanFormFields(form);
    var snapshot = _formSnapshots ? _formSnapshots.get(form) : null;
    if (_formSnapshots) { try { _formSnapshots['delete'](form); } catch (e) {} }

    // Merge: live scan wins; snapshot fills gaps
    var merged = {};
    if (snapshot) { for (var sk in snapshot) merged[sk] = snapshot[sk]; }
    for (var lk in liveScan) { if (liveScan[lk]) merged[lk] = liveScan[lk]; }

    // Also try FormData for any named fields the hint scan didn't classify
    try {
      var fd = new FormData(form);
      fd.forEach(function (v, k) {
        var sv = v == null ? '' : String(v).trim();
        if (!sv) return;
        if (skipPrefix && k.indexOf(skipPrefix) === 0) return;
        var alias = FIELD_ALIASES[k.toLowerCase()];
        if (alias === '_firstName') { if (!merged.lead_name) merged.__firstName = sv; }
        else if (alias === '_lastName') { if (!merged.lead_name) merged.__lastName = sv; }
        else if (alias === 'name') { merged.lead_name = merged.lead_name || sv; }
        else if (alias === 'email') { merged.lead_email = merged.lead_email || sv; }
        else if (alias === 'phone') { merged.lead_phone = merged.lead_phone || sv; }
        else if (alias === 'message') { merged.lead_message = merged.lead_message || sv; }
        else if (alias === 'business') { merged[k] = merged[k] || sv; }
        else if (!alias) { merged[k] = merged[k] || sv; }
      });
    } catch (e) {}

    // Combine first/last name if we got them from FormData but not hint scan
    if (!merged.lead_name && (merged.__firstName || merged.__lastName)) {
      merged.lead_name = [merged.__firstName, merged.__lastName].filter(Boolean).join(' ');
    }
    delete merged.__firstName;
    delete merged.__lastName;

    // Strip internal __named_ keys
    var data = {};
    for (var mk in merged) {
      if (mk.indexOf('__named_') === 0) continue;
      data[mk] = merged[mk];
    }

    var defaultId = form.id || form.getAttribute('name') || 'form';
    var leadData = {
      source: defaultId,
      formId: defaultId,
      name: data.lead_name || '',
      email: data.lead_email || '',
      phone: data.lead_phone || '',
      message: data.lead_message || ''
    };
    // Pass through any extra fields
    for (var dk in data) {
      if (dk === 'lead_name' || dk === 'lead_email' || dk === 'lead_phone' || dk === 'lead_message') continue;
      leadData[dk] = data[dk];
    }
    var overrides = options.overrides || {};
    for (var ok in overrides) leadData[ok] = overrides[ok];

    trackLead(leadData);
  }

  // Normalize path: strip trailing slash for consistent matching (WordPress uses trailing slashes)
  function normPath(p) { var lp = p.toLowerCase(); return lp.length > 1 && lp.charAt(lp.length - 1) === '/' ? lp.slice(0, -1) : lp; }

  function checkFunnelStep() {
    if (isBot) return;
    var path = normPath(location.pathname);
    for (var i = 0; i < FUNNEL.length; i++) {
      var s = FUNNEL[i];
      var sp = normPath(s.path);
      var matches = s.path.endsWith('*') ? path.indexOf(s.path.slice(0, -1)) === 0 : path === sp;
      if (matches) {
        enqueue(buildEvent(s.event, {
          event_value: 'step_' + s.step,
          event_metadata: JSON.stringify({ funnel_step: s.step, funnel_label: s.label, funnel_path: s.path })
        }));
        log('Funnel step ' + s.step + ': ' + s.label);
        if (s.step >= 3) flush();
        break;
      }
    }
  }

  // ── Auto-tracking Setup ─────────────────────────────────────────────

  // Batch timer
  var flushTimer = setInterval(flush, BATCH_MS);

  // Visibility change (engagement time + flush)
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      if (isVisible) { engagementMs += Date.now() - engagementStart; isVisible = false; }
      flushBeacon();
    } else {
      engagementStart = Date.now();
      isVisible = true;
    }
  });

  window.addEventListener('beforeunload', flushBeacon);

  // 0. Drain any events that failed to send in a previous session (server down,
  //    network blip, page closed mid-flush). Must run before trackPageView so the
  //    backlog goes out on the same flush cycle.
  drainBacklog();

  // 1. Page view + funnel check
  trackPageView();
  checkFunnelStep();

  // 2. Scroll depth tracking
  // ACR-421 v0.4.14: idempotent guard prevents duplicate scroll listeners.
  var scrollThresholds = [25, 50, 75, 100];
  var reachedThresholds = {};
  var scrollThrottle = false;

  if (!window.__acr_scroll_listener) {
  window.__acr_scroll_listener = true;
  window.addEventListener('scroll', function () {
    if (scrollThrottle) return;
    scrollThrottle = true;
    requestAnimationFrame(function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      var winHeight = window.innerHeight;
      var scrollable = docHeight - winHeight;
      var pct = scrollable > 0 ? Math.round((scrollTop / scrollable) * 100) : 100;
      for (var i = 0; i < scrollThresholds.length; i++) {
        var t = scrollThresholds[i];
        if (pct >= t && !reachedThresholds[t]) {
          reachedThresholds[t] = true;
          trackScrollDepth(t);
        }
      }
      scrollThrottle = false;
    });
  }, { passive: true });
  }

  // 3. Form view detection
  // ACR-421 v0.4.14: Stable fingerprint excludes DOM index (was `+ '|' + i`),
  // which shifts when forms are dynamically inserted/removed, creating false
  // "new form" events. Anonymous forms use class+field_count as disambiguator
  // (matches the React AcrTracker.tsx approach from ACR-440).
  var trackedForms = {};

  function getFormFingerprint(form) {
    var id = form.id || '';
    var name = form.getAttribute('name') || '';
    var action = form.action || '';
    if (id || name) return id + '|' + name + '|' + action;
    // Anonymous form — disambiguate by class signature + field count
    return '|' + (form.className || '') + '|' + action + '|' + form.elements.length;
  }

  function scanForms() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      var form = forms[i];
      // Primary guard: DOM-attached marker survives re-renders
      if (form.dataset && form.dataset.acrTracked === '1') continue;
      var fp = getFormFingerprint(form);
      // Secondary guard: stable fingerprint catches remounted nodes
      if (trackedForms[fp]) {
        if (form.dataset) form.dataset.acrTracked = '1';
        continue;
      }
      trackedForms[fp] = true;
      if (form.dataset) form.dataset.acrTracked = '1';
      var rect = form.getBoundingClientRect();
      track('form_view', {
        form_id: form.id || '',
        form_name: form.getAttribute('name') || '',
        form_action: form.action || '',
        form_classes: form.className || '',
        form_index: i,
        field_count: form.elements.length,
        form_visible: rect.width > 0 && rect.height > 0,
        form_position_y: Math.round(rect.top + window.scrollY),
        forms_on_page: forms.length
      });
    }
  }

  setTimeout(scanForms, 500);

  // Watch for dynamically inserted forms
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(function (mutations) {
      var hasNew = false;
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.tagName === 'FORM' || (node.querySelector && node.querySelector('form'))) {
            hasNew = true;
          }
        }
      }
      if (hasNew) scanForms();
    }).observe(document.body, { childList: true, subtree: true });
  }

  // 4. CTA click tracking

  // ACR-1081: Extract data-ab-variant and data-cta-label from the clicked
  // element or its nearest ancestor (capped at 5 levels). SA hero + blog-sidebar
  // CTA A/B tests render both attributes on wrapper elements; a click on a child
  // span still needs to attribute correctly.
  function getAbVariantInfo(el) {
    var abVariant = '';
    var ctaLabel = '';
    var current = el;
    var levels = 0;
    while (current && levels < 5) {
      if (!abVariant && current.getAttribute && current.getAttribute('data-ab-variant')) {
        abVariant = current.getAttribute('data-ab-variant');
      }
      if (!ctaLabel && current.getAttribute && current.getAttribute('data-cta-label')) {
        ctaLabel = current.getAttribute('data-cta-label');
      }
      if (abVariant && ctaLabel) break;
      current = current.parentElement;
      levels++;
    }
    return { ab_variant_id: abVariant, cta_label: ctaLabel };
  }

  var CTA_PATTERNS = /\b(get.started|book|schedule|sign.up|register|subscribe|contact|free.trial|request|demo|apply|join|start|try|learn.more|find.out|call|hire|pricing)\b/i;

  // Hard-exclude submit buttons and any button inside a form: those are NOT marketing CTAs,
  // and counting them would overwrite the real attributed CTA stored in _acr_last_cta
  // (root cause of the "submit button shows as the CTA" attribution bug, ACR-279).
  function isFormSubmitButton(el) {
    if (!el) return false;
    var tag = el.tagName;
    if (tag === 'BUTTON' || tag === 'INPUT') {
      var type = (el.getAttribute('type') || '').toLowerCase();
      if (type === 'submit' || type === 'image') return true;
      // Untyped <button> inside a form defaults to type="submit" per HTML spec
      if (tag === 'BUTTON' && !type && el.closest('form')) return true;
      // Any button inside a form is conversion-internal, not a CTA
      if (tag === 'BUTTON' && el.closest('form')) return true;
    }
    return false;
  }

  function isCTA(el) {
    // ACR-1930: escape hatch — explicit cta-* id always qualifies
    if (el.id && el.id.indexOf('cta-') === 0) return true;

    var text = (el.textContent || '').trim();

    // --- Exclusions (non-inventory elements only) ---
    if (el.tagName === 'BUTTON' && text.length === 0) return false;

    var ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
    if (/\b(close|dismiss|menu|toggle|collapse|expand|open|nav)\b/.test(ariaLabel)) return false;

    if (el.hasAttribute('aria-expanded') || el.hasAttribute('aria-controls')) return false;

    if (el.getAttribute('type') === 'button' && el.closest && el.closest('[role="dialog"]')) return false;

    // --- Positive signals ---
    var classes = el.className || '';
    if (/\b(cta|hero|action)\b/i.test(classes)) return true;

    if (text.length > 0 && text.length < 80 && CTA_PATTERNS.test(text)) {
      if (el.closest && el.closest('nav')) return false;
      return true;
    }

    return false;
  }

  document.addEventListener('click', function (e) {
    // ACR-493: Check for data-acr-track attribute first — explicit named tracking
    var acrTrackEl = e.target.closest ? e.target.closest('[data-acr-track]') : null;
    if (acrTrackEl) {
      var acrTrackValue = acrTrackEl.getAttribute('data-acr-track');
      if (acrTrackValue) {
        var abInfoNamed = getAbVariantInfo(acrTrackEl);
        var namedMeta = {
            cta_text: (acrTrackEl.textContent || '').slice(0, 200).trim(),
            cta_tag: acrTrackEl.tagName.toLowerCase(),
            cta_id: acrTrackEl.id || '',
            cta_classes: (acrTrackEl.className || '').slice(0, 200),
            cta_href: acrTrackEl.href || '',
            cta_position_y: Math.round(acrTrackEl.getBoundingClientRect().top + window.scrollY),
            acr_track: acrTrackValue
        };
        if (abInfoNamed.ab_variant_id) namedMeta.ab_variant_id = abInfoNamed.ab_variant_id;
        if (abInfoNamed.cta_label) namedMeta.cta_label = abInfoNamed.cta_label;
        enqueue(buildEvent('cta_click', {
          event_value: acrTrackValue,
          event_metadata: JSON.stringify(namedMeta)
        }));
        try {
          sessionStorage.setItem('_acr_last_cta', JSON.stringify({ text: acrTrackValue, href: acrTrackEl.href || '', id: acrTrackEl.id || '', ab_variant_id: abInfoNamed.ab_variant_id, cta_label: abInfoNamed.cta_label, timestamp: Date.now() }));
        } catch (e2) {}
        return; // Named tracking takes priority — don't double-fire as generic CTA
      }
    }

    var el = e.target.closest ? e.target.closest('a, button, [role="button"]') : null;
    if (!el || !isCTA(el)) return;
    var text = (el.textContent || '').slice(0, 200).trim();
    var href = el.href || '';
    var abInfo = getAbVariantInfo(el);
    var ctaMeta = {
      cta_text: text,
      cta_tag: el.tagName.toLowerCase(),
      cta_id: el.id || '',
      cta_classes: (el.className || '').slice(0, 200),
      cta_href: href,
      cta_position_y: Math.round(el.getBoundingClientRect().top + window.scrollY)
    };
    if (abInfo.ab_variant_id) ctaMeta.ab_variant_id = abInfo.ab_variant_id;
    if (abInfo.cta_label) ctaMeta.cta_label = abInfo.cta_label;
    track('cta_click', ctaMeta);
    // Store for form attribution
    try {
      sessionStorage.setItem('_acr_last_cta', JSON.stringify({ text: text, href: href, id: el.id || '', ab_variant_id: abInfo.ab_variant_id, cta_label: abInfo.cta_label, timestamp: Date.now() }));
    } catch (e2) {}
  }, true);

  // 5. Outbound / download / mailto / tel clicks
  document.addEventListener('click', function (e) {
    var anchor = e.target.closest ? e.target.closest('a') : null;
    if (!anchor || !anchor.href) return;
    try {
      var url = new URL(anchor.href, location.origin);
      var isOut = url.hostname !== location.hostname;
      var isDl = /\.(pdf|zip|doc|docx|xls|xlsx|csv|ppt|pptx)$/i.test(url.pathname);
      var isMail = anchor.href.indexOf('mailto:') === 0;
      var isTel = anchor.href.indexOf('tel:') === 0;
      if (isOut || isDl || isMail || isTel) {
        var type = isOut ? 'outbound_click' : isDl ? 'download_click' : isMail ? 'mailto_click' : 'tel_click';
        track(type, {
          link_url: anchor.href,
          link_text: (anchor.textContent || '').slice(0, 200).trim(),
          link_domain: isOut ? url.hostname : '',
          link_classes: anchor.className || '',
          link_id: anchor.id || ''
        });
      }
    } catch (e2) {}
  }, true);

  // 6. Form submission tracking (with CTA attribution)
  // Capture phase runs BEFORE React/library submit handlers — critical for
  // React 19's useActionState which resets controlled inputs before useEffect
  // fires. Snapshotting here guarantees trackLeadFromForm() can recover field
  // values even if the form is cleared by the time the site calls it. (ACR-309)
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || form.tagName !== 'FORM') return;
    _captureFormSnapshot(form);
    var lastCta = null;
    try {
      var raw = sessionStorage.getItem('_acr_last_cta');
      if (raw) {
        lastCta = JSON.parse(raw);
        if (Date.now() - lastCta.timestamp > 30 * 60 * 1000) lastCta = null;
      }
    } catch (e2) {}

    // ACR-499: hint-based field scan to capture PII from nameless inputs
    var scanned = _scanFormFields(form);
    var meta = {
      form_id: form.id || '',
      form_action: form.action || '',
      form_method: form.method || '',
      form_name: form.getAttribute('name') || '',
      form_classes: form.className || '',
      field_count: form.elements.length
    };
    // Include scanned lead fields in form_submit metadata
    if (scanned.lead_name) meta.lead_name = scanned.lead_name;
    if (scanned.lead_email) meta.lead_email = scanned.lead_email;
    if (scanned.lead_phone) meta.lead_phone = scanned.lead_phone;
    if (scanned.lead_message) meta.lead_message = scanned.lead_message;
    if (lastCta) {
      meta.attributed_cta_text = lastCta.text;
      meta.attributed_cta_href = lastCta.href;
      meta.attributed_cta_id = lastCta.id;
    }
    track('form_submit', meta);

    // Auto-fire trackLead if we captured any contact info from the form
    if (scanned.lead_email || scanned.lead_phone || scanned.lead_name) {
      var formId = form.id || form.getAttribute('name') || 'form';
      trackLead({
        name: scanned.lead_name || '',
        email: scanned.lead_email || '',
        phone: scanned.lead_phone || '',
        message: scanned.lead_message || '',
        source: formId,
        formId: formId
      });
    } else {
      flush(); // Forms are conversion-critical — flush immediately
    }
  }, true);

  // 6b. WPForms AJAX submission detection
  // WPForms uses AJAX and prevents native form submit. Detect via:
  // - jQuery event 'wpformsAjaxSubmitSuccess' (if jQuery available)
  // - MutationObserver watching for .wpforms-confirmation-container (fallback)
  (function () {
    var wpformsTracked = {};

    function trackWpformSubmit(formEl) {
      if (!formEl) return;
      var formId = formEl.id || formEl.getAttribute('data-formid') || '';
      // Deduplicate within same session
      var key = formId + '|' + getSessionId();
      if (wpformsTracked[key]) return;
      wpformsTracked[key] = true;

      var lastCta = null;
      try {
        var raw = sessionStorage.getItem('_acr_last_cta');
        if (raw) {
          lastCta = JSON.parse(raw);
          if (Date.now() - lastCta.timestamp > 30 * 60 * 1000) lastCta = null;
        }
      } catch (e) {}

      // Try to extract form field values (name, email, phone, message)
      var leadData = {};
      try {
        var inputs = formEl.querySelectorAll('input, textarea, select');
        for (var i = 0; i < inputs.length; i++) {
          var input = inputs[i];
          var name = (input.getAttribute('name') || '').toLowerCase();
          var val = input.value || '';
          if (!val) continue;
          if (name.indexOf('name') > -1 || name.indexOf('first') > -1) leadData.lead_name = (leadData.lead_name || '') + ' ' + val;
          else if (name.indexOf('email') > -1) leadData.lead_email = val;
          else if (name.indexOf('phone') > -1 || name.indexOf('tel') > -1) leadData.lead_phone = val;
          else if (name.indexOf('message') > -1 || name.indexOf('comment') > -1 || input.tagName === 'TEXTAREA') leadData.lead_message = val;
        }
        if (leadData.lead_name) leadData.lead_name = leadData.lead_name.trim();
      } catch (e) {}

      var meta = {
        form_id: formId,
        form_plugin: 'wpforms',
        form_name: formEl.getAttribute('data-name') || formEl.getAttribute('name') || '',
        form_classes: formEl.className || '',
        field_count: formEl.elements ? formEl.elements.length : 0
      };
      // Merge lead data
      for (var k in leadData) meta[k] = leadData[k];
      if (lastCta) {
        meta.attributed_cta_text = lastCta.text;
        meta.attributed_cta_href = lastCta.href;
        meta.attributed_cta_id = lastCta.id;
      }

      track('form_submit', meta);

      // Also fire as lead_submit if we captured contact info
      if (leadData.lead_email || leadData.lead_phone || leadData.lead_name) {
        trackLead({
          name: leadData.lead_name || '',
          email: leadData.lead_email || '',
          phone: leadData.lead_phone || '',
          message: leadData.lead_message || '',
          source: 'wpforms',
          formId: formId
        });
      } else {
        flush(); // Still flush immediately for form submissions
      }

      log('WPForms submission tracked:', formId);
    }

    // Method 1: jQuery event (preferred — WPForms fires this)
    if (typeof jQuery !== 'undefined') {
      jQuery(document).on('wpformsAjaxSubmitSuccess', function (e, response) {
        // Find the form that was submitted
        var formEl = null;
        try {
          if (response && response.data && response.data.form_id) {
            formEl = document.getElementById('wpforms-form-' + response.data.form_id)
                  || document.querySelector('[data-formid="' + response.data.form_id + '"]');
          }
        } catch (ex) {}
        if (!formEl) formEl = document.querySelector('.wpforms-form');
        trackWpformSubmit(formEl);
      });
    }

    // Method 2: MutationObserver for confirmation container (catches non-jQuery too)
    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var added = mutations[i].addedNodes;
          for (var j = 0; j < added.length; j++) {
            var node = added[j];
            if (node.nodeType !== 1) continue;
            var isConfirm = (node.classList && node.classList.contains('wpforms-confirmation-container'))
                         || (node.querySelector && node.querySelector('.wpforms-confirmation-container'));
            if (isConfirm) {
              // Find the parent form or sibling form
              var formEl = node.closest ? node.closest('.wpforms-container') : null;
              if (formEl) formEl = formEl.querySelector('.wpforms-form');
              if (!formEl) formEl = document.querySelector('.wpforms-form');
              trackWpformSubmit(formEl);
            }
          }
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
  })();

  // 6c. data-acr-track view tracking (ACR-493)
  // IntersectionObserver watches elements with data-acr-track for viewport entry
  // (e.g. iframe wrappers like contact_booking_iframe_view). Fires once per
  // session per element to avoid duplicate view events.
  (function () {
    if (typeof IntersectionObserver === 'undefined') return;
    var viewedAcrTrack = {};

    // ACR-421 v0.4.14: Added DOM marker `data-acr-track-observed` to prevent
    // MutationObserver re-scans from creating duplicate IntersectionObservers
    // on the same element before the first one fires.
    function observeAcrTrackElements() {
      var els = document.querySelectorAll('[data-acr-track]');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var val = el.getAttribute('data-acr-track');
        if (!val || viewedAcrTrack[val]) continue;
        // Skip elements already being observed (prevents multi-observer dupes)
        if (el.getAttribute('data-acr-track-observed') === '1') continue;
        el.setAttribute('data-acr-track-observed', '1');
        (function (element, trackValue) {
          var obs = new IntersectionObserver(function (entries) {
            for (var j = 0; j < entries.length; j++) {
              if (entries[j].isIntersecting && !viewedAcrTrack[trackValue]) {
                viewedAcrTrack[trackValue] = true;
                enqueue(buildEvent('cta_view', {
                  event_value: trackValue,
                  event_metadata: JSON.stringify({
                    acr_track: trackValue,
                    element_tag: element.tagName.toLowerCase(),
                    element_id: element.id || '',
                    element_classes: (element.className || '').slice(0, 200)
                  })
                }));
                log('data-acr-track view:', trackValue);
                obs.disconnect();
              }
            }
          }, { threshold: 0.5 });
          obs.observe(element);
        })(el, val);
      }
    }

    setTimeout(observeAcrTrackElements, 500);

    // Re-scan for dynamically added data-acr-track elements
    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(function (mutations) {
        var hasNew = false;
        for (var i = 0; i < mutations.length; i++) {
          var added = mutations[i].addedNodes;
          for (var j = 0; j < added.length; j++) {
            var node = added[j];
            if (node.nodeType !== 1) continue;
            if (node.getAttribute && node.getAttribute('data-acr-track')) hasNew = true;
            if (node.querySelector && node.querySelector('[data-acr-track]')) hasNew = true;
          }
        }
        if (hasNew) observeAcrTrackElements();
      }).observe(document.body, { childList: true, subtree: true });
    }
  })();

  // 6d. OnceHub iframe postMessage listener (ACR-493)
  // Captures booking funnel events from embedded ScheduleOnce/OnceHub iframes.
  // Event shapes: string 'sob_event:{json}' or object {type:'sob_event', name:...}
  // Validates origin against *.oncehub.com / *.scheduleonce.com before processing.
  (function () {
    var oncehubEventsTracked = {};

    window.addEventListener('message', function (e) {
      // Validate origin — only accept OnceHub / ScheduleOnce domains
      var origin = '';
      try { origin = e.origin || ''; } catch (ex) { return; }
      if (!/\.(oncehub|scheduleonce)\.com$/i.test(origin)) return;

      var data = e.data;
      var parsed = null;

      // Shape 1: string 'sob_event:{...json...}'
      if (typeof data === 'string' && data.indexOf('sob_event:') === 0) {
        try { parsed = JSON.parse(data.slice(10)); } catch (ex) { return; }
      }
      // Shape 2: object {type: 'sob_event', name: '...', ...}
      else if (data && typeof data === 'object' && data.type === 'sob_event') {
        parsed = data;
      }

      if (!parsed || !parsed.name) return;

      var eventName = parsed.name; // e.g. 'booking_form_open', 'booking_initiated', 'booking_confirmed'
      var trackerEventName = 'funnel_booking_' + eventName;

      // Dedupe: one event per name per session
      var dedupeKey = trackerEventName + '|' + getSessionId();
      if (oncehubEventsTracked[dedupeKey]) return;
      oncehubEventsTracked[dedupeKey] = true;

      enqueue(buildEvent(trackerEventName, {
        event_value: eventName,
        event_metadata: JSON.stringify({
          source: 'oncehub_iframe',
          client_source: 'oncehub_iframe',
          booking_page_id: parsed.page_id || parsed.bookingPageId || '',
          oncehub_event_name: eventName,
          oncehub_origin: origin
        })
      }));
      log('OnceHub postMessage:', trackerEventName);

      // Flush immediately for booking_confirmed — high-value conversion event
      if (eventName === 'booking_confirmed') flush();
    });
  })();

  // 7. JS error tracking
  // ACR-421 v0.4.14: idempotent guard prevents duplicate listeners if the
  // tracker init block is somehow re-entered (defence-in-depth).
  if (!window.__acr_error_listeners) {
    window.__acr_error_listeners = true;
    window.addEventListener('error', function (e) {
      track('js_error', {
        error_message: e.message || '',
        error_source: e.filename || '',
        error_line: e.lineno || 0,
        error_col: e.colno || 0
      });
    });

    window.addEventListener('unhandledrejection', function (e) {
      track('unhandled_rejection', {
        error_message: String((e.reason && e.reason.message) || e.reason || '')
      });
    });
  }

  // 8. Core Web Vitals (lightweight inline, no external dependency)
  // Uses PerformanceObserver API directly — same data as web-vitals library.
  // ACR-421 v0.4.9: ALL metrics report once-only.
  // ACR-421 v0.4.14: Merged visibilitychange handlers into a single listener
  // to prevent same-millisecond timestamp collisions that create false-positive
  // dup groups in the (site_id, session_id, event_name, timestamp, page_url) dedup query.
  if (typeof PerformanceObserver !== 'undefined') {
    var lcpValue = 0;
    var fcpReported = false;
    var clsValue = 0;
    var inpValue = 0;
    var cwvPageHideReported = false;

    // LCP — accumulate candidates
    try {
      new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        if (entries.length) lcpValue = entries[entries.length - 1].startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {}

    // FCP — report immediately on first paint (fires once by nature)
    try {
      new PerformanceObserver(function (list) {
        if (fcpReported) return;
        var entries = list.getEntries();
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].name === 'first-contentful-paint') {
            fcpReported = true;
            trackCWV({ name: 'FCP', value: entries[i].startTime });
            break;
          }
        }
      }).observe({ type: 'paint', buffered: true });
    } catch (e) {}

    // CLS — accumulate shifts
    try {
      new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].hadRecentInput) clsValue += entries[i].value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}

    // INP — accumulate max duration
    try {
      new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].duration > inpValue) inpValue = entries[i].duration;
        }
      }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
    } catch (e) {}

    // Single visibilitychange handler reports LCP, CLS, INP synchronously
    // (setTimeout is unsafe — page may unload before timers fire). Each metric
    // gets a +2ms timestamp offset so the dedup query (which keys on timestamp)
    // never groups distinct CWV metrics into the same dup bucket.
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState !== 'hidden' || cwvPageHideReported) return;
      cwvPageHideReported = true;
      var baseMs = Date.now();
      var offset = 0;
      function cwvTimestamp() {
        var ts = new Date(baseMs + offset).toISOString();
        offset += 2;
        return ts;
      }
      if (lcpValue > 0) {
        var ev = buildEvent('cwv', {
          event_value: '' + lcpValue,
          event_metadata: JSON.stringify({ metric_name: 'LCP', metric_value: lcpValue })
        });
        ev.timestamp = cwvTimestamp();
        enqueue(ev);
      }
      if (clsValue > 0) {
        var ev2 = buildEvent('cwv', {
          event_value: '' + clsValue,
          event_metadata: JSON.stringify({ metric_name: 'CLS', metric_value: clsValue })
        });
        ev2.timestamp = cwvTimestamp();
        enqueue(ev2);
      }
      if (inpValue > 0) {
        var ev3 = buildEvent('cwv', {
          event_value: '' + inpValue,
          event_metadata: JSON.stringify({ metric_name: 'INP', metric_value: inpValue })
        });
        ev3.timestamp = cwvTimestamp();
        enqueue(ev3);
      }
    });

    // TTFB — synchronous, fires exactly once
    try {
      var navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length) {
        trackCWV({ name: 'TTFB', value: navEntries[0].responseStart });
      }
    } catch (e) {}
  }

  // ── Expose Public API ───────────────────────────────────────────────
  window.acrTracker = {
    version: TRACKER_VERSION,
    isTest: IS_TEST,
    getUserId: getUserId,
    track: track,
    trackPageView: trackPageView,
    trackScrollDepth: trackScrollDepth,
    trackCWV: trackCWV,
    trackLead: trackLead,
    trackLeadFromForm: trackLeadFromForm,
    _captureFormSnapshot: _captureFormSnapshot,
    checkFunnelStep: checkFunnelStep,
    flush: flush,
    destroy: function () {
      clearInterval(flushTimer);
      flushBeacon();
    }
  };

  log('Initialized v' + TRACKER_VERSION + ' for site:', SITE_ID, '→', ENDPOINT, IS_TEST ? '[TEST MODE]' : '');
})();
