'use client';

import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from 'next-themes';

export default function ColorModeIconDropdown(props: {
  size?: 'small' | 'medium' | 'large';
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
      <IconButton
        {...props}
        aria-label="Mode d'affichage"
        onClick={handleClick}
      >
        {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            setTheme('light');
            handleClose();
          }}
        >
          <LightModeIcon sx={{ mr: 1 }} /> Clair
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTheme('dark');
            handleClose();
          }}
        >
          <DarkModeIcon sx={{ mr: 1 }} /> Sombre
        </MenuItem>
      </Menu>
    </Box>
  );
}
