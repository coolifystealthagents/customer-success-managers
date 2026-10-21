# V3 acceptance ledger

| Contract | Source implementation | Verification |
|---|---|---|
| Exact primary nav: Home, Services, Contact Us | `lib/content.ts`, `components/SiteChrome.tsx` | source contract plus browser accessible-name check |
| Sticky, keyboard-accessible desktop and mobile shell | `components/SiteChrome.tsx`, `app/globals.css` | skip-link, focus, Escape, focus return, overflow checks |
| Powered by StealthAgents in header and footer | `components/SiteChrome.tsx` | source count and rendered visibility |
| No timed or unsolicited lead modal | root layout and shell | source ban plus ten-second browser wait |
| Contact first fold contains reviews and complete form | `app/contact-us/page.tsx` | 1366x768 and 1440x800 screenshots; 390px usability |
| Ten sourced parent-company reviews | `app/data/review-provenance.json` | provenance contract and rendered review lane |
| Official team credibility section follows first fold | contact page and official assets | DOM order and visual review |
| Form, then OnceHub, then next-step sequence | contact, thank-you, thanks-whats-next | OnceHub route-location contract and browser journey |
| Lead acknowledgement is truthful and fail-closed | `LeadForm`, lead API, ACR proxy | API guards, tracker stub, no free-text analytics |
| Six substantive service routes | `lib/site.ts`, service templates | content and route crawl |
| Blog and research use topic media, TOC, sources, related reading | `EditorialArticle` and dynamic routes | heading/anchor/sidebar crawl |
| Self-referencing canonical metadata | every indexable route | rendered crawl and duplicate report |
| HTTPS and apex canonical host | `proxy.ts` | forwarded-host/scheme tests |
| Security headers and least-privilege CSP | `next.config.mjs` | response-header crawl |
| No visible long dashes or decorative number labels | source/content and rendered output | dash scanner and browser text scan |
| Exact candidate tree reviewed before release | release workflow | tree SHA, independent review receipts, final approval |
