import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorDisplayProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h5" color="error" gutterBottom>
        Erreur de chargement
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {error.message}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </Container>
  );
}
