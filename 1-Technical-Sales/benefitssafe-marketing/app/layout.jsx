'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import JOS from 'jos-animation';
import { Analytics } from '@vercel/analytics/next';
import ScrollToTop from '@/components/shared/ScrollToTop';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/globals.css';
import '@/styles/vendors/menu.css';

const DMSans = localFont({
  src: '../fonts/DMSans-Bold.woff2',
  variable: '--font-DMSans',
});

const ClashDisplay = localFont({
  src: '../fonts/ClashDisplay-Medium.woff2',
  variable: '--font-clash-display',
});

const Raleway = localFont({
  src: '../fonts/Raleway-Bold.woff2',
  variable: '--font-raleway',
});

const SpaceGrotesk = localFont({
  src: '../fonts/SpaceGrotesk-Bold.woff2',
  variable: '--font-space-grotesk',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const jos_options = {
    passive: false,
    once: true,
    animation: 'fade-up',
    timingFunction: 'ease',
    threshold: 0,
    delay: 0.5,
    duration: 0.7,
    scrollDirection: 'down',
    rootMargin: '0% 0% 15% 0%',
  };
  useEffect(() => {
    JOS.init(jos_options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    JOS.refresh();
  }, [pathname]);

  return (
    <html lang='en'>
      <head>
        <title>BenefitsSafe - Grant Disbursement Platform</title>
        <meta name='description' content='BenefitsSafe helps nonprofits manage restricted grant funds and issue virtual debit cards — without beneficiaries losing their SSI, Medi-Cal, or CalFresh benefits.' />
        <link rel='icon' href='/icon.png' type='image/png' />
        <meta property='og:title' content='BenefitsSafe - Protect Benefits. Disburse Grants. Monitor Compliance.' />
        <meta property='og:description' content='BenefitsSafe helps nonprofits manage restricted grant funds and issue virtual debit cards — without beneficiaries losing their SSI, Medi-Cal, or CalFresh benefits.' />
        <meta property='og:image' content='https://benefitssafe.com/opengraph-image.png' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://benefitssafe.com' />
        <meta property='og:site_name' content='BenefitsSafe' />
        <meta property='og:locale' content='en_US' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='BenefitsSafe' />
        <meta name='twitter:description' content='Protect Benefits. Disburse Grants. Monitor Compliance.' />
        <meta name='twitter:image' content='https://benefitssafe.com/opengraph-image.png' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'BenefitsSafe',
              alternateName: ['Benefits Safe', 'Benefits-Safe'],
              url: 'https://benefitssafe.com',
              logo: 'https://benefitssafe.com/icon.png',
              description:
                'BenefitsSafe is a fintech compliance platform helping nonprofits disburse restricted grant funds via virtual debit cards without jeopardizing beneficiaries\' SSI, Medi-Cal, or CalFresh benefits.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Oakland',
                addressRegion: 'CA',
                addressCountry: 'US',
              },
              areaServed: 'US',
            }),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'BenefitsSafe',
              alternateName: 'Benefits Safe',
              url: 'https://benefitssafe.com',
            }),
          }}
        />
      </head>
      <body
        className={`${DMSans.variable} ${ClashDisplay.variable} ${Raleway.variable} ${SpaceGrotesk.variable} ${inter.variable}`}
      >
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
