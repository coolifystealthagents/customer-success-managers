import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import {SiteHeader as Header,SiteFooter as Footer} from './experience';
import { site } from '@/lib/site';
import './globals.css';
import './v3.css';

const geist = Geist({ subsets: ['latin'], display: 'swap' });
import './experience.css';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: { default: `${site.name} | Remote customer success support`, template: `%s | ${site.name}` },
  description: site.heroBody,
  icons: { icon: '/logo.svg', shortcut: '/logo.svg', apple: '/logo.svg' },
  openGraph: { type: 'website', siteName: site.name, title: site.name, description: site.heroBody, images: [{ url: site.heroImage, width: 1672, height: 941, alt: site.heroAlt }] },
  twitter: { card: 'summary_large_image', title: site.name, description: site.heroBody, images: [site.heroImage] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-design={site.design}><body className={geist.className} style={{ '--primary': site.primary, '--secondary': site.secondary, '--accent': site.accent, '--canvas': site.canvas, '--ink': site.ink, '--display': geist.style.fontFamily, '--body': geist.style.fontFamily } as React.CSSProperties}>
    <Header />{children}<Footer />
    <Script src="/acr-config.js" strategy="beforeInteractive" />
    <Script src="https://acrtracking.stealthagents.us/v1/tracker.js" strategy="afterInteractive" integrity="sha384-xngnWvZA3ij7/lg0Hj+D3XolZQoG8dmy71mCBPy4o/cN7GsuYiWDGOUul+ocJ0/+" crossOrigin="anonymous" />
    <Script
      id="databull-analytics"
      src="https://databull.stealthagents.us/js/script.js"
      data-website-id="dc_h5rvncg7e7igx9"
      data-domain="customersuccessmanagers.com"
      strategy="afterInteractive"
    />
  </body></html>;
}
