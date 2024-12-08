export const SKILLS = [
  'Frontend',
  'Backend',
  'DevOps',
  'Mobile',
  'Data',
  'Security',
  'UI/UX',
  'Product Management'
] as const;

export const tools: Tool[] = [
  {
    id: '1',
    name: 'Figma',
    category: 'UI/UX',
    logo: '/tools/figma.svg'
  }
  // Add more tools...
];

export const skills: Skill[] = [
  {
    id: '1',
    name: 'React',
    category: 'Frontend'
  },
  {
    id: '2',
    name: 'Node.js',
    category: 'Backend'
  },
  {
    id: '3',
    name: 'AWS',
    category: 'DevOps'
  }
  // Add more skills...
];

export const mockProfiles: MarketplaceProfile[] = [
  {
    id: 'p1',
    username: 'johndoe',
    name: 'John Doe',
    tagline: 'Développeur Full Stack JavaScript',
    profileImage: '/images/avatars/avatar1.jpg',
    skills: ['Frontend', 'Backend'],
    tools: [tools[0], tools[2], tools[3]],
    availableForHire: true,
    hourlyRate: 75,
    location: 'Paris, France'
  },
  {
    id: 'p2',
    username: 'janedoe',
    name: 'Jane Doe',
    tagline: 'UI/UX Designer & Frontend Developer',
    profileImage: '/images/avatars/avatar2.jpg',
    skills: ['UI/UX', 'Frontend'],
    tools: [tools[2], tools[6]],
    availableForHire: true,
    hourlyRate: 65,
    location: 'Lyon, France'
  },
  {
    id: 'p3',
    username: 'bobsmith',
    name: 'Bob Smith',
    tagline: 'DevOps Engineer & Cloud Architect',
    profileImage: '/images/avatars/avatar3.jpg',
    skills: ['DevOps', 'Backend'],
    tools: [tools[5], tools[4]],
    availableForHire: false,
    hourlyRate: 90,
    location: 'Bordeaux, France'
  }
];
