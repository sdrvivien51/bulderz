import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '../types/profile';

interface SkillsSectionProps {
  profile: UserProfile;
}

export default function SkillsSection({ profile }: SkillsSectionProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Compétences Techniques</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="my-4 border-t" />

        <div>
          <h3 className="mb-2 text-lg font-semibold">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.softSkills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
