'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PostHeader } from '../_components/post-header';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { createPost } from '@/src/app/lib/posts';
import edjsHTML from 'editorjs-html';
import { OutputData } from '@editorjs/editorjs';

const Editor = dynamic(() => import('./editor'), { ssr: false });

interface PostData {
  title: string;
  description: string;
  content: OutputData | null;
}

export default function EditorPage() {
  const [postData, setPostData] = useState<PostData>({
    title: '',
    description: '',
    content: null
  });

  const handleMetadataChange = useCallback(
    ({ title, description }: { title: string; description: string }) => {
      setPostData((prev) => ({ ...prev, title, description }));
    },
    []
  );

  const handleContentChange = useCallback((content: OutputData) => {
    setPostData((prev) => ({ ...prev, content }));
  }, []);

  return (
    <PageContainer>
      <div>
        <Editor
          onChange={handleContentChange}
          onMetadataChange={handleMetadataChange}
        />
      </div>
    </PageContainer>
  );
}
