'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(4),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${
    process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'
  }/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(6),
    height: 500
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${
      process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'
    }/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700]
  })
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)'
        })
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 }
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{
            alignItems: 'center',
            width: { xs: '100%', sm: '70%' },
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: 'bold',
              lineHeight: 1.2,
              textAlign: 'center'
            }}
          >
            <span>Share Values</span>
            <span>Find Customers</span>
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light'
                })
              })}
            >
              Get Income
            </Typography>
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
              fontSize: 'clamp(1rem, 4vw, 1.25rem)'
            }}
          >
            Explore our cutting-edge dashboard delivering high-quality solutions
            tailored to your needs. Elevate your experience with top-tier
            features and services.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            Start Now
          </Button>
        </Stack>

        <StyledBox id="image" />
      </Container>
    </Box>
  );
}
