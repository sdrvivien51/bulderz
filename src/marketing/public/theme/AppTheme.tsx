'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from './themePrimitives';

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
}

export default function AppTheme({
  children,
  disableCustomTheme = false
}: AppThemeProps) {
  const { theme: nextTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || disableCustomTheme) {
    return children;
  }

  const theme = nextTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
