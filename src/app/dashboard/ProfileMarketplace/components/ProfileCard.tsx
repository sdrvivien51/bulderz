'use client';

import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Briefcase,
  MapPin,
  Star,
  Code,
  Tool,
  CheckCircle2
} from 'lucide-react';

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    tagline: string;
    profileImage: string;
    skills: string[];
    tools: string[];
    availableForHire: boolean;
    hourlyRate?: number;
    location?: string;
    experience?: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Disponibilité */}
      {profile.availableForHire && (
        <div className="absolute right-2 top-2 z-10">
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            Disponible
          </Badge>
        </div>
      )}

      <CardHeader className="p-4 pb-0">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage
              src={profile.profileImage}
              alt={profile.name}
              className="object-cover"
            />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.tagline}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        {/* Localisation et Expérience */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{profile.location || 'Non spécifié'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>{profile.experience || 'N/A'}</span>
          </div>
        </div>

        {/* Compétences */}
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Code className="h-4 w-4" /> Compétences
          </h4>
          <div className="flex flex-wrap gap-2">
            {profile.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
            {profile.skills.length > 4 && (
              <Badge variant="outline">+{profile.skills.length - 4}</Badge>
            )}
          </div>
        </div>

        {/* Outils */}
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Tool className="h-4 w-4" /> Outils
          </h4>
          <div className="flex flex-wrap gap-2">
            {profile.tools.slice(0, 4).map((tool) => (
              <Badge key={tool} variant="outline">
                {tool}
              </Badge>
            ))}
            {profile.tools.length > 4 && (
              <Badge variant="outline">+{profile.tools.length - 4}</Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        {profile.hourlyRate && (
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{profile.hourlyRate}€/h</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Voir Profil
          </Button>
          <Button size="sm">Contacter</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
