import React from 'react';
import { Box, CircularProgress, Typography, Container } from '@mui/material';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({
  message = 'Chargement en cours...'
}: LoadingOverlayProps) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Container>
  );
}
