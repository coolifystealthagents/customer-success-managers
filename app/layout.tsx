import type { Metadata } from 'next';
import Script from 'next/script';
import { Footer, Header } from '@/components/SiteChrome';
import { site } from '@/lib/site';
import './globals.css';
import './v3.css';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: { default: `${site.name} | Remote customer success support`, template: `%s | ${site.name}` },
  description: site.heroBody,
  icons: { icon: '/logo.svg', shortcut: '/logo.svg', apple: '/logo.svg' },
  openGraph: { type: 'website', siteName: site.name, title: site.name, description: site.heroBody, images: [{ url: '/hero.png', width: 1200, height: 630, alt: site.heroAlt }] },
  twitter: { card: 'summary_large_image', title: site.name, description: site.heroBody, images: ['/hero.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-design={site.design}><body style={{ '--primary': site.primary, '--secondary': site.secondary, '--accent': site.accent, '--canvas': site.canvas, '--ink': site.ink, '--display': site.displayFont, '--body': site.bodyFont } as React.CSSProperties}>
    <Header />{children}<Footer />
    <Script src="/acr-config.js" strategy="beforeInteractive" />
    <Script src="https://acrtracking.stealthagents.us/v1/tracker.js" strategy="afterInteractive" integrity="sha384-xngnWvZA3ij7/lg0Hj+D3XolZQoG8dmy71mCBPy4o/cN7GsuYiWDGOUul+ocJ0/+" crossOrigin="anonymous" />
  </body></html>;
}
