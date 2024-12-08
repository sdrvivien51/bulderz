import { Providers } from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.scss';
import Script from 'next/script';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={lato.className} suppressHydrationWarning>
      <body>
        <NextTopLoader showSpinner={false} />
        <Providers>
          {children}
          <Toaster />
          <Script
            src="https://platform.twitter.com/widgets.js"
            strategy="lazyOnload"
          />
        </Providers>
      </body>
    </html>
  );
}
