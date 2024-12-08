'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { JobFilters } from './components/JobFilters';
import { JobCard } from './components/JobCard';
import { mockJobs } from './data/mockJobs';

export default function JobMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 300000]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  return (
    <div className="container mx-auto py-8">
      {/* Search Bar */}
      <div className="mb-8 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>Search</Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Filters */}
        <div className="col-span-1">
          <JobFilters
            onExperienceChange={setSelectedExperience}
            onContractChange={setSelectedContracts}
            onSalaryChange={setSalaryRange}
            onLocationChange={setSelectedLocations}
            onSkillsChange={setSelectedSkills}
            onToolsChange={setSelectedTools}
          />
        </div>

        {/* Job Cards */}
        <div className="col-span-3 space-y-6">
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
