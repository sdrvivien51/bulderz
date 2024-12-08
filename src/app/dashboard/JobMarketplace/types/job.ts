export interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  contractType: string;
  experienceLevel: string;
  description: string;
  requiredSkills: string[];
  postedDate: string;
  remote: boolean;
}
