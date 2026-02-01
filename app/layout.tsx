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
  metadataBase: new URL('https://my-portfolio-wheat-six-13.vercel.app/'),

  title: {
    default: 'Ebrar Hosgul | Frontend Developer & UI Architect',
    template: '%s | Ebrar Hosgul',
  },
  description:
    'Frontend Developer & UI Architect specializing in Next.js, React, and high-performance web applications. Building scalable, pixel-perfect digital experiences.',
  applicationName: 'Ebrar Hosgul Portfolio',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'UI/UX Design',
    'Web Performance',
    'Ebrar Hosgul',
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
    title: 'Ebrar Hosgul | Frontend Developer & UI Architect',
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
    title: 'Ebrar Hosgul | Frontend Developer',
    description:
      'Frontend Developer & UI Architect specializing in Next.js and modern web technologies.',
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
      </head>

      <body className={`${dmSans.variable} ${fugazOne.variable} antialiased`}>
        <main>{children}</main>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
    </html>
  );
}
