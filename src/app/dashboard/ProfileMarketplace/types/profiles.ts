export type Skill =
  | 'Frontend'
  | 'Backend'
  | 'DevOps'
  | 'Mobile'
  | 'Data'
  | 'Security'
  | 'UI/UX'
  | 'Product Management';

export interface Tool {
  id: string;
  name: string;
  category:
    | 'language'
    | 'framework'
    | 'database'
    | 'cloud'
    | 'design'
    | 'project-management';
}

export interface MarketplaceProfile {
  id: string;
  username: string;
  name: string;
  tagline: string;
  profileImage: string;
  skills: Skill[];
  tools: Tool[];
  availableForHire: boolean;
  hourlyRate?: number;
  location?: string;
}
