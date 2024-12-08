import { createTheme, PaletteMode } from '@mui/material/styles';

// Définition explicite de COLORS
const COLORS = {
  light: {
    primary: {
      main: 'hsl(253, 87%, 62%)', // Bleu vibrant principal
      light: 'hsl(253, 87%, 72%)', // Variation plus claire
      dark: 'hsl(253, 87%, 52%)', // Variation plus sombre
      contrastText: 'hsl(0, 0%, 100%)' // Texte sur fond principal
    },
    background: {
      default: 'hsl(240, 33%, 99%)', // Fond très clair
      paper: 'hsl(240, 33%, 97%)' // Légèrement différent du défaut
    },
    text: {
      primary: 'hsl(240, 10%, 16%)', // Texte principal sombre
      secondary: 'hsl(240, 5%, 45%)' // Texte secondaire gris
    }
  },
  dark: {
    primary: {
      main: 'hsl(253, 87%, 58%)', // Bleu vibrant principal
      light: 'hsl(253, 87%, 68%)', // Variation plus claire
      dark: 'hsl(253, 87%, 48%)', // Variation plus sombre
      contrastText: 'hsl(0, 0%, 100%)' // Texte sur fond principal
    },
    background: {
      default: 'hsl(253, 43%, 4%)', // Fond très sombre
      paper: 'hsl(253, 43%, 6%)' // Légèrement différent du défaut
    },
    text: {
      primary: 'hsl(0, 0%, 100%)', // Texte blanc
      secondary: 'hsl(253, 13%, 63%)' // Texte secondaire gris
    }
  }
};

export const getDesignTokens = (mode: PaletteMode) => {
  const colors = mode === 'light' ? COLORS.light : COLORS.dark;

  return {
    palette: {
      mode,
      primary: colors.primary,
      background: colors.background,
      text: colors.text
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        color: colors.text.primary
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        color: colors.text.primary
      },
      body1: {
        color: colors.text.secondary
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '10px 20px'
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === 'light'
                ? '0 4px 6px rgba(0,0,0,0.05)'
                : '0 4px 6px rgba(0,0,0,0.2)'
          }
        }
      }
    }
  };
};

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
