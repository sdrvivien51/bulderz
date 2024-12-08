'use client';

import dynamic from 'next/dynamic';
import { OutputData } from '@editorjs/editorjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import edjsHTML from 'editorjs-html';
import { toast } from 'sonner';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon, Upload, ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EditorProps {
  onChange: (content: OutputData) => void;
  onMetadataChange: (metadata: { title: string; description: string }) => void;
}

const EditorComponent = dynamic(() => import('./EditorComponent'), {
  ssr: false,
  loading: () => <div>Chargement de l'éditeur...</div>
});

const MAX_TITLE_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 160;

export default function Editor({ onChange, onMetadataChange }: EditorProps) {
  const ejInstance = useRef<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageFile(file);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleImageFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Le fichier doit être une image');
    }
  };

  const handleSave = async () => {
    try {
      const supabase = createClientComponentClient();
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!session?.user) {
        toast.error('Vous devez être connecté pour sauvegarder');
        return;
      }

      if (!title.trim()) {
        toast.error('Le titre est requis');
        return;
      }

      const content = await ejInstance.current?.save();

      if (!content) {
        toast.error('Aucun contenu à sauvegarder');
        return;
      }

      const loadingToast = toast.loading('Sauvegarde en cours...');

      // Upload image if exists
      let imagePath = null;
      if (image) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from('post-images')
          .upload(`${session.user.id}/${Date.now()}-${image.name}`, image);

        if (imageError) throw imageError;
        imagePath = imageData.path;
      }

      const parser = edjsHTML({
        chart: (data: any) => {
          return `<div class="chart-container" data-chart='${JSON.stringify(
            data
          )}'></div>`;
        },
        tradingview: (data: any) => {
          return `<div class="tradingview-widget" data-widget='${JSON.stringify(
            data
          )}'></div>`;
        },
        attaches: (data: { file: any }) => {
          const { file } = data;
          return `<div class="attachment" data-file='${JSON.stringify(
            file
          )}'></div>`;
        },
        table: (data: { content: any; withHeadings?: boolean }) => {
          try {
            if (!data.content) return '';

            const tableHeader = data.withHeadings
              ? `<thead><tr>${data.content[0]
                  .map((th: string) => `<th>${th}</th>`)
                  .join('')}</tr></thead>`
              : '';

            const tableBody = `<tbody>${data.content
              .slice(data.withHeadings ? 1 : 0)
              .map(
                (row: string[]) =>
                  `<tr>${row
                    .map((cell: string) => `<td>${cell}</td>`)
                    .join('')}</tr>`
              )
              .join('')}</tbody>`;

            return `<table class="editor-table">${tableHeader}${tableBody}</table>`;
          } catch (error) {
            console.error('Erreur lors du parsing de la table:', error);
            return '<p>Erreur lors du rendu de la table</p>';
          }
        },
        code: (data: { language?: string; code: string }) => {
          return `<pre><code class="language-${data.language || 'plaintext'}">${
            data.code
          }</code></pre>`;
        },
        list: (data: { style: string; items: string[] }) => {
          const tag = data.style === 'ordered' ? 'ol' : 'ul';
          const items = data.items
            .map((item: string) => `<li>${item}</li>`)
            .join('');
          return `<${tag}>${items}</${tag}>`;
        },
        header: (data: { level: number; text: string }) => {
          return `<h${data.level}>${data.text}</h${data.level}>`;
        },
        paragraph: (data: { text: string }) => {
          return `<p>${data.text}</p>`;
        },
        delimiter: () => {
          return '<hr />';
        }
      });

      const htmlContent = parser.parse(content).join('');

      const postData = {
        title,
        description,
        featured_image: imagePath,
        html_content: htmlContent,
        json_content: content,
        published: false,
        author_id: session.user.id
      };

      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;

      toast.dismiss(loadingToast);
      toast.success('Article sauvegardé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error(
        error instanceof Error ? error.message : 'Erreur lors de la sauvegarde'
      );
    }
  };

  // Utiliser useCallback pour mémoriser les handlers
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value.slice(0, MAX_TITLE_LENGTH);
      setTitle(newTitle);
      onMetadataChange({ title: newTitle, description });
    },
    [description, onMetadataChange]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newDescription = e.target.value.slice(0, MAX_DESCRIPTION_LENGTH);
      setDescription(newDescription);
      onMetadataChange({ title, description: newDescription });
    },
    [title, onMetadataChange]
  );

  return (
    <div className="h-full">
      {/* En-tête avec navigation et sauvegarde */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/blog">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Éditeur</h1>
        </div>
        <Button onClick={handleSave} className="px-4 py-2" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </>
          )}
        </Button>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        {/* Section des métadonnées avec bordure */}
        <div className="mb-8 rounded-lg border bg-card p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Colonne de gauche: Titre et Description */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Input
                  placeholder="Titre de l'article"
                  value={title}
                  onChange={handleTitleChange}
                  className="border-0 border-b bg-transparent px-0 py-2 text-2xl font-bold focus-visible:border-primary focus-visible:ring-0"
                  maxLength={MAX_TITLE_LENGTH}
                />
                <p className="text-right text-sm text-muted-foreground">
                  {title.length}/{MAX_TITLE_LENGTH}
                </p>
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Description de l'article"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="min-h-[100px] resize-none border-0 border-b bg-transparent px-0 py-2 focus-visible:border-primary focus-visible:ring-0"
                  maxLength={MAX_DESCRIPTION_LENGTH}
                />
                <p className="text-right text-sm text-muted-foreground">
                  {description.length}/{MAX_DESCRIPTION_LENGTH}
                </p>
              </div>
            </div>

            {/* Colonne de droite: Image */}
            <div>
              <div
                className="relative aspect-[3/2] rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-muted-foreground/50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleImageDrop}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                    <p className="text-sm">
                      Glissez une image ou cliquez pour sélectionner
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Éditeur de contenu sans bordures */}
        <div className="prose max-w-none">
          <EditorComponent onChange={onChange} editorRef={ejInstance} />
        </div>
      </div>
    </div>
  );
}
