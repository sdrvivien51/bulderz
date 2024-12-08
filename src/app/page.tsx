'use client';

import { ThemeProvider } from '@/components/ui/theme-provider';
import MarketingPage from '@/src/marketing/public/page';

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MarketingPage />
    </ThemeProvider>
  );
}
