export interface UserProfile {
  id: string;
  username: string;
  name: string;
  tagline: string;
  profileImage: string;
  description: string;
  skills: string[];
  softSkills: string[];
  tools: string[];
  projects: Project[];
  posts: Post[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  tags: string[];
}
