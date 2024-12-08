'use client';

import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import { OutputData } from '@editorjs/editorjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Import dynamique de l'éditeur
const EditorComponent = dynamic(
  () => import('../../blog/editor/EditorComponent'),
  {
    ssr: false,
    loading: () => <div>Chargement de l'éditeur...</div>
  }
);

interface Project {
  id: string;
  title: string;
  content: OutputData | null;
}

export default function ProjectEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const handleAddProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: '',
      content: null
    };
    setProjects([...projects, newProject]);
    setActiveProject(newProject.id);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (activeProject === id) {
      setActiveProject(null);
    }
  };

  const handleSaveProject = async (project: Project) => {
    try {
      const supabase = createClientComponentClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Non authentifié');
      }

      const { error } = await supabase.from('projects').upsert({
        id: project.id,
        title: project.title,
        content: project.content,
        user_id: user.id,
        updated_at: new Date().toISOString()
      });

      if (error) throw error;
      toast.success('Projet sauvegardé !');
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projets</CardTitle>
        <Button onClick={handleAddProject} variant="outline" size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Ajouter un projet
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
              <Input
                placeholder="Titre du projet"
                value={project.title}
                onChange={(e) => {
                  setProjects(
                    projects.map((p) =>
                      p.id === project.id ? { ...p, title: e.target.value } : p
                    )
                  );
                }}
                className="max-w-md"
              />
              <div className="flex gap-2">
                <Button onClick={() => handleSaveProject(project)} size="sm">
                  <Save className="mr-1 h-4 w-4" />
                  Sauvegarder
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveProject(project.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            {activeProject === project.id && (
              <div className="prose max-w-none">
                <EditorComponent
                  onChange={(content) => {
                    setProjects(
                      projects.map((p) =>
                        p.id === project.id ? { ...p, content } : p
                      )
                    );
                  }}
                />
              </div>
            )}

            {activeProject !== project.id && (
              <Button
                variant="outline"
                onClick={() => setActiveProject(project.id)}
                className="w-full"
              >
                {project.content ? 'Modifier le contenu' : 'Ajouter du contenu'}
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
