'use client';

import { Job } from '../types/job';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Building2, Clock, Users, Briefcase, Euro } from 'lucide-react';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = () => {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: job.salary.currency,
      maximumFractionDigits: 0
    });

    return `${formatter.format(job.salary.min)} - ${formatter.format(
      job.salary.max
    )}/${job.salary.period}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={job.company.logo} alt={job.company.name} />
          <AvatarFallback>{job.company.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Link
            href={`/dashboard/JobMarketplace/${job.id}`}
            className="hover:underline"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
          </Link>
          <div className="flex items-center text-sm text-muted-foreground">
            <Building2 className="mr-1 h-4 w-4" />
            {job.company.name}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            <Briefcase className="mr-1 h-4 w-4" />
            {job.contractType}
          </Badge>
          <Badge variant="secondary">
            <MapPin className="mr-1 h-4 w-4" />
            {job.location.city}, {job.location.country}
          </Badge>
          {job.location.remote && (
            <Badge
              variant="outline"
              className="border-green-300 bg-green-500/10 text-green-700"
            >
              Remote possible
            </Badge>
          )}
          <Badge variant="outline" className="ml-auto">
            {job.experienceLevel}
          </Badge>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {job.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Euro className="mr-1 h-4 w-4" />
            <span>{formatSalary()}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            <span>
              {job.applicantsCount} candidat{job.applicantsCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="bg-primary/5">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline">+{job.skills.length - 4}</Badge>
          )}
        </div>

        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          <span>Posté le {formatDate(job.postedAt)}</span>
          {job.deadline && (
            <>
              <span className="mx-2">•</span>
              <span>Date limite : {formatDate(job.deadline)}</span>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/JobMarketplace/${job.id}`}>Voir plus</Link>
        </Button>
        <Button>Postuler</Button>
      </CardFooter>
    </Card>
  );
}
