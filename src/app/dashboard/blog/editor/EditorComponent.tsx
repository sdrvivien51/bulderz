'use client';

import { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_TOOLS } from './editorTools';

interface EditorComponentProps {
  onChange: (content: OutputData) => void;
}

export default function EditorComponent({ onChange }: EditorComponentProps) {
  const editorRef = useRef<EditorJS>();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      initEditor();
      isInitialized.current = true;
    }

    return () => {
      destroyEditor();
    };
  }, []);

  const initEditor = async () => {
    try {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: EDITOR_TOOLS,
        data: {
          blocks: []
        },
        placeholder: 'Commencez à écrire votre article...',
        onChange: async (api) => {
          const data = await api.saver.save();
          onChange(data);
        }
      });

      await editor.isReady;
      editorRef.current = editor;
    } catch (error) {
      console.error("Erreur lors de l'initialisation de l'éditeur:", error);
    }
  };

  const destroyEditor = async () => {
    if (editorRef.current) {
      try {
        await editorRef.current.isReady;
        await editorRef.current.destroy();
        editorRef.current = undefined;
        isInitialized.current = false;
      } catch (error) {
        console.error("Erreur lors de la destruction de l'éditeur:", error);
      }
    }
  };

  return <div id="editorjs" className="prose min-h-[500px] max-w-none" />;
}
