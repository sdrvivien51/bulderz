'use client';

import { BlogBoard } from './_components/blog-board';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';

export default function BlogPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Heading title="Articles" description="Gérez vos articles de blog" />
        <BlogBoard />
      </div>
    </PageContainer>
  );
}
