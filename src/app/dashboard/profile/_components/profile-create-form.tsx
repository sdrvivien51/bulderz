'use client';

import { useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CommandSelect } from '@/components/ui/command-select';
import { MultiSelect } from '@/components/ui/multi-select';

// Données simplifiées pour les outils
const toolOptions = [
  { value: 'React', description: 'React Framework' },
  { value: 'Vue', description: 'Progressive Framework' },
  { value: 'Angular', description: 'TypeScript Platform' },
  { value: 'Node.js', description: 'JavaScript Runtime' },
  { value: 'Python', description: 'Versatile Language' },
  { value: 'Java', description: 'Enterprise Solution' },
  { value: 'MongoDB', description: 'NoSQL Database' },
  { value: 'PostgreSQL', description: 'Relational Database' },
  { value: 'MySQL', description: 'Open-source RDBMS' }
];

const softSkillOptions = [
  { value: 'Leadership', description: 'Guide and inspire teams' },
  { value: 'Communication', description: 'Effective interaction' },
  { value: "Travail d'équipe", description: 'Collaborate effectively' },
  { value: 'Résolution de problèmes', description: 'Analytical thinking' },
  {
    value: 'Adaptabilité',
    description: 'Flexibility in changing environments'
  },
  { value: 'Créativité', description: 'Innovative problem-solving' }
];

export function ProfileCreateForm() {
  const [profileData, setProfileData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      age: '',
      tagline: '',
      description: ''
    },
    skills: {
      tools: [] as string[],
      softSkills: [] as string[]
    },
    profileImage: null as string | null
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    age: '',
    tagline: ''
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: profileData.personalInfo.firstName
        ? ''
        : 'First name is required',
      lastName: profileData.personalInfo.lastName
        ? ''
        : 'Last name is required',
      age:
        profileData.personalInfo.age &&
        !isNaN(Number(profileData.personalInfo.age))
          ? ''
          : 'Valid age is required',
      tagline: profileData.personalInfo.tagline ? '' : 'Tagline is required'
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      console.log('Profile Data:', profileData);
      // Implement save logic
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const toggleTool = (tool: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        tools: prev.skills.tools.includes(tool)
          ? prev.skills.tools.filter((t) => t !== tool)
          : [...prev.skills.tools, tool]
      }
    }));
  };

  const toggleSoftSkill = (skill: string) => {
    setProfileData((prev) => {
      const currentSkills = prev.skills.softSkills;
      const newSkills = currentSkills.includes(skill)
        ? currentSkills.filter((s) => s !== skill)
        : currentSkills.length < 3
        ? [...currentSkills, skill]
        : currentSkills;

      return {
        ...prev,
        skills: {
          ...prev.skills,
          softSkills: newSkills
        }
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Profile Picture Section */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="relative">
                <div
                  className="flex h-64 w-64 items-center justify-center overflow-hidden bg-gray-100"
                  style={{ borderRadius: '6px' }}
                >
                  {profileData.profileImage ? (
                    <img
                      src={profileData.profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profile-image-upload"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="profile-image-upload"
                  className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
                >
                  <Camera className="h-5 w-5" />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Info Section */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Input
                    placeholder="Your first name"
                    value={profileData.personalInfo.firstName}
                    onChange={(e) =>
                      updatePersonalInfo('firstName', e.target.value)
                    }
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Input
                    placeholder="Your last name"
                    value={profileData.personalInfo.lastName}
                    onChange={(e) =>
                      updatePersonalInfo('lastName', e.target.value)
                    }
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <Input
                    type="number"
                    placeholder="Your age"
                    value={profileData.personalInfo.age}
                    onChange={(e) => updatePersonalInfo('age', e.target.value)}
                  />
                  {errors.age && (
                    <p className="mt-1 text-xs text-red-500">{errors.age}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tagline
                  </label>
                  <Input
                    placeholder="Short description"
                    value={profileData.personalInfo.tagline}
                    onChange={(e) =>
                      updatePersonalInfo('tagline', e.target.value)
                    }
                  />
                  {errors.tagline && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.tagline}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe yourself"
                    className="h-32"
                    value={profileData.personalInfo.description}
                    onChange={(e) =>
                      updatePersonalInfo('description', e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tools Selection with Block UI */}
      <Card>
        <CardHeader>
          <CardTitle>Tools and Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {toolOptions.map((tool) => (
              <label
                key={tool.value}
                className={`
                  flex cursor-pointer items-center justify-between rounded-md border p-3
                  transition-colors hover:bg-blue-50
                  ${
                    profileData.skills.tools.includes(tool.value)
                      ? 'border-blue-300 bg-blue-100'
                      : 'border-gray-200 bg-white'
                  }
                `}
                onClick={() => toggleTool(tool.value)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{tool.value}</span>
                  <span className="text-xs text-gray-500">
                    {tool.description}
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={profileData.skills.tools.includes(tool.value)}
                  readOnly
                />
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Soft Skills Selection with Block UI */}
      <Card>
        <CardHeader>
          <CardTitle>Soft Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {softSkillOptions.map((skill) => (
              <label
                key={skill.value}
                className={`
                  flex cursor-pointer items-center justify-between rounded-md border p-3
                  transition-colors hover:bg-blue-50
                  ${
                    profileData.skills.softSkills.includes(skill.value)
                      ? 'border-blue-300 bg-blue-100'
                      : 'border-gray-200 bg-white'
                  }
                `}
                onClick={() => toggleSoftSkill(skill.value)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{skill.value}</span>
                  <span className="text-xs text-gray-500">
                    {skill.description}
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={profileData.skills.softSkills.includes(skill.value)}
                  readOnly
                />
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Save Profile
        </Button>
      </div>
    </form>
  );
}
