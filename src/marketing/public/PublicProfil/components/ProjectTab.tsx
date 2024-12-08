import React from 'react';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { Project } from '../types/profile';

interface ProjectsTabProps {
  projects: Project[];
}

export default function ProjectsTab({ projects }: ProjectsTabProps) {
  return (
    <Box sx={{ p: 3 }}>
      {projects.map((project) => (
        <Card key={project.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{project.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {project.description}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {project.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, display: 'block' }}
            >
              {project.startDate.toLocaleDateString()}
              {project.endDate && ` - ${project.endDate.toLocaleDateString()}`}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
