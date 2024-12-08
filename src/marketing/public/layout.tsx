import { ThemeProvider } from '@components/ui/theme-provider';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import './globals.css';

// Importez vos customizations
import { dataDisplayCustomizations } from './theme/customizations/dataDisplay';
import { navigationCustomizations } from './theme/customizations/navigation';
import { inputsCustomizations } from './theme/customizations/input';
import { feedbackCustomizations } from './theme/customizations/feedback';
import { surfacesCustomizations } from './theme/customizations/surfaces';

export const metadata = {
  title: 'Bulder',
  description: 'Bulder - Your Digital Solution'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    components: {
      ...dataDisplayCustomizations,
      ...navigationCustomizations,
      ...inputsCustomizations,
      ...feedbackCustomizations,
      ...surfacesCustomizations
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto'
      ].join(',')
    }
  });

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="dark:bg-black">
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              <CssBaseline />
              {children}
            </ThemeProvider>
          </MuiThemeProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
