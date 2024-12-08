'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { MultiValue, StylesConfig } from 'react-select';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Camera,
  Search,
  CalendarIcon,
  Plus,
  Trash2,
  Check,
  ChevronsUpDown
} from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import ProjectEditor from './components/ProjectEditor';

interface ToolOption {
  value: string;
  label: string;
  description: string;
}

const toolOptions: ToolOption[] = [
  { value: 'React', label: 'React', description: 'React Framework' },
  { value: 'Vue', label: 'Vue', description: 'Progressive Framework' },
  { value: 'Angular', label: 'Angular', description: 'TypeScript Platform' },
  { value: 'Node.js', label: 'Node.js', description: 'JavaScript Runtime' },
  { value: 'Python', label: 'Python', description: 'Versatile Language' },
  { value: 'Java', label: 'Java', description: 'Enterprise Solution' },
  { value: 'MongoDB', label: 'MongoDB', description: 'NoSQL Database' },
  {
    value: 'PostgreSQL',
    label: 'PostgreSQL',
    description: 'Relational Database'
  },
  { value: 'MySQL', label: 'MySQL', description: 'Open-source RDBMS' }
];

const softSkillOptions: ToolOption[] = [
  {
    value: 'Leadership',
    label: 'Leadership',
    description: 'Guide and inspire teams'
  },
  {
    value: 'Communication',
    label: 'Communication',
    description: 'Effective interaction'
  },
  {
    value: "Travail d'équipe",
    label: "Travail d'équipe",
    description: 'Collaborate effectively'
  },
  {
    value: 'Résolution de problèmes',
    label: 'Résolution de problèmes',
    description: 'Analytical thinking'
  },
  {
    value: 'Adaptabilité',
    label: 'Adaptabilité',
    description: 'Flexibility in changing environments'
  },
  {
    value: 'Créativité',
    label: 'Créativité',
    description: 'Innovative problem-solving'
  }
];

interface Location {
  place_id: number;
  display_name: string;
  city?: string;
  country?: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date | null;
  location: string;
  tagline: string;
  description: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
  current: boolean;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date | null;
  expiryDate: Date | null;
  credentialId: string;
}

function SkillSelector({
  title,
  skills,
  selectedSkills,
  onSkillsChange
}: {
  title: string;
  skills: typeof toolOptions;
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (skillName: string) => {
    const newSelection = selectedSkills.includes(skillName)
      ? selectedSkills.filter((s) => s !== skillName)
      : [...selectedSkills, skillName];

    onSkillsChange(newSelection);
  };

  const itemsPerColumn = Math.ceil(skills.length / 3);
  const columns = [
    skills.slice(0, itemsPerColumn),
    skills.slice(itemsPerColumn, itemsPerColumn * 2),
    skills.slice(itemsPerColumn * 2)
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <Badge variant="secondary">
          {selectedSkills.length} sélectionné
          {selectedSkills.length > 1 ? 's' : ''}
        </Badge>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="truncate">
              {selectedSkills.length > 0
                ? `${selectedSkills.length} élément${
                    selectedSkills.length > 1 ? 's' : ''
                  }`
                : `Sélectionner des ${title.toLowerCase()}`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0">
          <Command>
            <CommandInput
              placeholder={`Rechercher des ${title.toLowerCase()}...`}
            />
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <div className="grid grid-cols-3 gap-4 p-4">
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="space-y-1">
                  {column.map((skill) => (
                    <CommandItem
                      key={skill.value}
                      value={skill.label}
                      onSelect={() => handleSelect(skill.label)}
                      className={cn(
                        'flex cursor-pointer flex-col rounded-lg p-2 transition-all duration-150',
                        'hover:bg-accent hover:text-accent-foreground',
                        selectedSkills.includes(skill.label) &&
                          'scale-[0.98] bg-primary/10 font-medium text-primary'
                      )}
                    >
                      <span>{skill.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {skill.description}
                      </span>
                    </CommandItem>
                  ))}
                </div>
              ))}
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function ProfilePage() {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: null,
    location: '',
    tagline: '',
    description: ''
  });
  const [locationSearch, setLocationSearch] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const customStyles: StylesConfig<ToolOption, true> = {
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      backgroundColor: state.isSelected
        ? '#e0e7ff'
        : state.isFocused
        ? '#f3f4f6'
        : 'white',
      ':hover': {
        backgroundColor: '#f3f4f6'
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e0e7ff'
    })
  };

  const debouncedSearch = useDebouncedCallback(async (search: string) => {
    if (search.length < 2) {
      setLocations([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}&limit=5`
      );
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Erreur lors de la recherche de localisation:', error);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  useEffect(() => {
    if (locationSearch) {
      debouncedSearch(locationSearch);
    } else {
      setLocations([]);
    }
  }, [locationSearch]);

  const handleLocationSearch = (value: string) => {
    setLocationSearch(value);
    if (value.length >= 2) {
      debouncedSearch(value);
    } else {
      setLocations([]);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setLocationSearch(location.display_name);
    setPersonalInfo((prev) => ({
      ...prev,
      location: location.display_name
    }));
    setLocations([]);
    setIsLocationDropdownOpen(false);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      title: '',
      company: '',
      location: '',
      startDate: null,
      endDate: null,
      description: '',
      current: false
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      issueDate: null,
      expiryDate: null,
      credentialId: ''
    };
    setCertifications([...certifications, newCertification]);
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <Heading
          title="Profil"
          description="Gérez vos informations personnelles"
        />

        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="flex flex-col items-center space-y-4 md:col-span-4">
                <div className="relative aspect-square w-48 overflow-hidden rounded-xl border-2 border-border bg-muted">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Camera className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <input
                    type="file"
                    id="profileImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-3 right-3 cursor-pointer rounded-lg bg-primary p-2 transition-colors hover:bg-primary/90"
                  >
                    <Camera className="h-4 w-4 text-primary-foreground" />
                  </label>
                </div>
                <span className="text-sm text-muted-foreground">
                  (300x300px recommandé)
                </span>
              </div>

              <div className="space-y-6 md:col-span-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prénom</label>
                    <Input
                      placeholder="Votre prénom"
                      value={personalInfo.firstName}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          firstName: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom</label>
                    <Input
                      placeholder="Votre nom"
                      value={personalInfo.lastName}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          lastName: e.target.value
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Date de naissance
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !personalInfo.birthDate && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {personalInfo.birthDate ? (
                            format(personalInfo.birthDate, 'd MMMM yyyy', {
                              locale: fr
                            })
                          ) : (
                            <span>Sélectionnez une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={personalInfo.birthDate}
                          onSelect={(date) =>
                            setPersonalInfo({
                              ...personalInfo,
                              birthDate: date
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Localisation</label>
                    <div className="relative">
                      <Input
                        ref={locationInputRef}
                        placeholder="Rechercher une ville..."
                        value={locationSearch}
                        onChange={(e) => handleLocationSearch(e.target.value)}
                        onFocus={() => setIsLocationDropdownOpen(true)}
                      />
                      <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      {isLocationDropdownOpen && locations.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
                          <div className="max-h-[200px] overflow-y-auto">
                            {locations.map((location) => (
                              <div
                                key={location.place_id}
                                className="cursor-pointer px-4 py-2 transition-colors hover:bg-accent"
                                onClick={() => handleLocationSelect(location)}
                              >
                                <div className="font-medium">
                                  {location.display_name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {isSearching && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Décrivez-vous"
                    value={personalInfo.description}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        description: e.target.value
                      })
                    }
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Outils et Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillSelector
                title="Outils"
                skills={toolOptions}
                selectedSkills={selectedTools}
                onSkillsChange={setSelectedTools}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Soft Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillSelector
                title="Soft Skills"
                skills={softSkillOptions}
                selectedSkills={selectedSoftSkills}
                onSkillsChange={setSelectedSoftSkills}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Expériences professionnelles</CardTitle>
              <Button onClick={addExperience} size="sm" variant="outline">
                <Plus className="mr-1 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent className="max-h-[500px] space-y-4 overflow-y-auto">
              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="relative rounded-lg border p-4"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => removeExperience(experience.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Poste
                      </label>
                      <Input
                        value={experience.title}
                        onChange={(e) => {
                          setExperiences(
                            experiences.map((exp) =>
                              exp.id === experience.id
                                ? { ...exp, title: e.target.value }
                                : exp
                            )
                          );
                        }}
                        placeholder="Ex: Développeur Full Stack"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Entreprise
                      </label>
                      <Input
                        value={experience.company}
                        onChange={(e) => {
                          setExperiences(
                            experiences.map((exp) =>
                              exp.id === experience.id
                                ? { ...exp, company: e.target.value }
                                : exp
                            )
                          );
                        }}
                        placeholder="Ex: Google"
                      />
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Date de début
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !experience.startDate && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {experience.startDate ? (
                              format(experience.startDate, 'd MMMM yyyy', {
                                locale: fr
                              })
                            ) : (
                              <span>Sélectionnez une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={experience.startDate}
                            onSelect={(date) => {
                              setExperiences(
                                experiences.map((exp) =>
                                  exp.id === experience.id
                                    ? { ...exp, startDate: date }
                                    : exp
                                )
                              );
                            }}
                            initialFocus
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Date de fin
                      </label>
                      <div className="space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !experience.endDate && 'text-muted-foreground'
                              )}
                              disabled={experience.current}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {experience.endDate ? (
                                format(experience.endDate, 'd MMMM yyyy', {
                                  locale: fr
                                })
                              ) : (
                                <span>Sélectionnez une date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={experience.endDate}
                              onSelect={(date) => {
                                setExperiences(
                                  experiences.map((exp) =>
                                    exp.id === experience.id
                                      ? { ...exp, endDate: date }
                                      : exp
                                  )
                                );
                              }}
                              initialFocus
                              disabled={(date) =>
                                date > new Date() ||
                                date <
                                  (experience.startDate ||
                                    new Date('1900-01-01'))
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`current-${experience.id}`}
                            checked={experience.current}
                            onChange={(e) => {
                              setExperiences(
                                experiences.map((exp) =>
                                  exp.id === experience.id
                                    ? {
                                        ...exp,
                                        current: e.target.checked,
                                        endDate: null
                                      }
                                    : exp
                                )
                              );
                            }}
                            className="mr-2"
                          />
                          <label
                            htmlFor={`current-${experience.id}`}
                            className="text-sm"
                          >
                            Poste actuel
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Description
                    </label>
                    <Textarea
                      placeholder="Décrivez l'expérience"
                      className="h-32"
                      value={experience.description}
                      onChange={(e) => {
                        setExperiences(
                          experiences.map((exp) =>
                            exp.id === experience.id
                              ? { ...exp, description: e.target.value }
                              : exp
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications</CardTitle>
              <Button onClick={addCertification} size="sm" variant="outline">
                <Plus className="mr-1 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent className="max-h-[500px] space-y-4 overflow-y-auto">
              {certifications.map((certification) => (
                <div
                  key={certification.id}
                  className="relative rounded-lg border p-4"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => removeCertification(certification.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>

                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Nom
                      </label>
                      <Input
                        value={certification.name}
                        onChange={(e) => {
                          setCertifications(
                            certifications.map((cert) =>
                              cert.id === certification.id
                                ? { ...cert, name: e.target.value }
                                : cert
                            )
                          );
                        }}
                        placeholder="Ex: AWS Solutions Architect"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Organisme
                      </label>
                      <Input
                        value={certification.issuer}
                        onChange={(e) => {
                          setCertifications(
                            certifications.map((cert) =>
                              cert.id === certification.id
                                ? { ...cert, issuer: e.target.value }
                                : cert
                            )
                          );
                        }}
                        placeholder="Ex: Amazon Web Services"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Date d'obtention
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !certification.issueDate &&
                                'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {certification.issueDate ? (
                              format(certification.issueDate, 'd MMMM yyyy', {
                                locale: fr
                              })
                            ) : (
                              <span>Sélectionnez une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={certification.issueDate}
                            onSelect={(date) => {
                              setCertifications(
                                certifications.map((cert) =>
                                  cert.id === certification.id
                                    ? { ...cert, issueDate: date }
                                    : cert
                                )
                              );
                            }}
                            initialFocus
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        ID Certification
                      </label>
                      <Input
                        value={certification.credentialId}
                        onChange={(e) => {
                          setCertifications(
                            certifications.map((cert) =>
                              cert.id === certification.id
                                ? { ...cert, credentialId: e.target.value }
                                : cert
                            )
                          );
                        }}
                        placeholder="Ex: AWS-ASA-123456"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">
          <ProjectEditor />
        </div>
      </div>
    </PageContainer>
  );
}
