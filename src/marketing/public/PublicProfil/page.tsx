'use client';

import React from 'react';
import { Box, Grid, Tabs, Tab, Typography, Container } from '@mui/material';
import { useProfileData } from '@/profile/hooks/useProfileData';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import PublicProfileHeader from './components/PublicProfileHeader';
import SkillsSection from './components/SkillsSection';
import ProjectsTab from './components/ProjectsTab';
import PostsTab from './components/PostsTab';

export default function PublicProfilePage({
  params
}: {
  params: { username: string };
}) {
  const { data: userProfile, loading, error } = useProfileData(params.username);
  const [activeTab, setActiveTab] = React.useState(0);

  if (loading) return <LoadingOverlay />;
  if (error) return <ErrorDisplay error={error} />;
  if (!userProfile) return null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <PublicProfileHeader profile={userProfile} />

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <SkillsSection profile={userProfile} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
            >
              <Tab label="Description" />
              <Tab label="Projets" />
              <Tab label="Posts" />
            </Tabs>

            {activeTab === 0 && (
              <Typography sx={{ p: 3 }}>{userProfile.description}</Typography>
            )}
            {activeTab === 1 && <ProjectsTab projects={userProfile.projects} />}
            {activeTab === 2 && <PostsTab posts={userProfile.posts} />}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
