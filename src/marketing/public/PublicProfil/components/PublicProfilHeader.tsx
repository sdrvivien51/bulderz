import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { UserProfile } from '../types/profile';

interface PublicProfileHeaderProps {
  profile: UserProfile;
}

export default function PublicProfileHeader({
  profile
}: PublicProfileHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 4
      }}
    >
      <Avatar
        src={profile.profileImage}
        sx={{ width: 150, height: 150, mb: 2 }}
      />
      <Typography variant="h4">{profile.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {profile.tagline}
      </Typography>
    </Box>
  );
}
