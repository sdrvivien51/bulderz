import { Job } from '../types/job';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: {
      name: 'TechCorp',
      logo: '/images/companies/techcorp.png'
    },
    location: 'Paris, France',
    salary: {
      min: 45000,
      max: 75000,
      currency: 'EUR'
    },
    contractType: 'CDI',
    experienceLevel: 'Senior',
    description:
      'We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications using React and TypeScript.',
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
    postedDate: '2024-03-15T10:00:00Z',
    remote: true
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: {
      name: 'StartupXYZ',
      logo: '/images/companies/startup.png'
    },
    location: 'Lyon, France',
    salary: {
      min: 40000,
      max: 65000,
      currency: 'EUR'
    },
    contractType: 'CDD',
    experienceLevel: 'Intermediaire',
    description:
      'Join our growing startup as a Full Stack Developer. You will work on both frontend and backend development using modern technologies.',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    postedDate: '2024-03-14T15:30:00Z',
    remote: false
  }
  // Add more mock jobs as needed
];
