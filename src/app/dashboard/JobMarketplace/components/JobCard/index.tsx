'use client';

import { Job } from '../../types/job';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Building2, Clock, Briefcase, Euro } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  return (
    <Card className="transition-shadow duration-200 hover:shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={job.company.logo} alt={job.company.name} />
              <AvatarFallback>{job.company.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <div className="flex items-center text-muted-foreground">
                <Building2 className="mr-1 h-4 w-4" />
                <span>{job.company.name}</span>
              </div>
            </div>
          </div>
          <Badge variant={job.remote ? 'default' : 'secondary'}>
            {job.remote ? 'Remote' : 'On-site'}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {job.contractType}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Euro className="h-3 w-3" />
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {job.description}
        </p>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>
              {formatDistanceToNow(new Date(job.postedDate), {
                addSuffix: true,
                locale: fr
              })}
            </span>
          </div>
          <Button>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
