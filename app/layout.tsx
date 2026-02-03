import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { DM_Sans, Fugaz_One } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const fugazOne = Fugaz_One({
  variable: '--font-fugaz-one',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ebrarhosgul.com/'),

  title: {
    default: 'Ebrar Hosgul | Frontend Engineer & UI Architect',
    template: '%s | Ebrar Hosgul',
  },
  description:
    'Frontend Engineer & UI Architect specializing in Next.js, React, and high-performance web applications. Building scalable, pixel-perfect digital experiences.',
  applicationName: 'Ebrar Hosgul Portfolio',
  keywords: [
    'Ebrar Hosgul',
    'Ebrar Hoşgül',
    'Ebrar Muhammed Hosgul',
    'Ebrar Muhammed Hoşgül',
    'Frontend Developer',
    'Frontend Engineer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'UI/UX Design',
    'Web Performance',
    'Portfolio',
  ],
  authors: [{ name: 'Ebrar Hosgul', url: 'https://github.com/ebrarhosgul' }],
  creator: 'Ebrar Hosgul',
  publisher: 'Ebrar Hosgul',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Ebrar Hosgul | Frontend Engineer & UI Architect',
    description:
      'Building scalable, high-performance web applications with Next.js. Explore the portfolio of Ebrar Hosgul.',
    url: '/',
    siteName: 'Ebrar Hosgul Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ebrar Hosgul Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ebrar Hosgul | Frontend Engineer',
    description:
      'Frontend Engineer & UI Architect specializing in Next.js and modern web technologies.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/icon-512.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname);
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
        <meta
          name="google-site-verification"
          content="-w63sB81slRzeAH6ZC9WHe4U4EcUF7mcbL_2_Y7Vt8E"
        />
      </head>

      <body className={`${dmSans.variable} ${fugazOne.variable} antialiased`}>
        <main>{children}</main>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
    </html>
  );
}
