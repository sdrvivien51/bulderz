import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditorPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading
            title="Éditeur"
            description="Créez ou modifiez votre article"
          />
          <Link href="/dashboard/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
        </div>
        <div className="h-[calc(100vh-200px)] w-full">
          {/* Editor.js sera intégré ici */}
        </div>
      </div>
    </PageContainer>
  );
}
