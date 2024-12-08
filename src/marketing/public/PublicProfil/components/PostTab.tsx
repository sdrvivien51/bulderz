import React from 'react';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { Post } from '../types/profile';

interface PostsTabProps {
  posts: Post[];
}

export default function PostsTab({ posts }: PostsTabProps) {
  return (
    <Box sx={{ p: 3 }}>
      {posts.map((post) => (
        <Card key={post.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {post.content.slice(0, 200)}...
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, display: 'block' }}
            >
              {post.createdAt.toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
