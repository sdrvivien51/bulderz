'use client';
import { useDndContext, type UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

interface BlogColumnProps {
  column: {
    id: string;
    title: string;
  };
  posts?: BlogPost[];
}

export function BlogColumn({ column, posts = [] }: BlogColumnProps) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: { type: 'Column', column }
    });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="flex h-[75vh] w-[350px] flex-col"
    >
      <CardHeader className="flex flex-row items-center border-b-2 p-4">
        <Button
          variant="ghost"
          {...attributes}
          {...listeners}
          className="p-1 text-primary/50"
        >
          <GripVertical />
        </Button>
        <span className="ml-2 font-semibold">{column.title}</span>
      </CardHeader>
      <CardContent className="flex-grow p-2">
        <ScrollArea className="h-full">
          {posts.map((post) => (
            <Card key={post.id} className="mb-2">
              <CardContent className="p-4">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {post.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function BlogContainer({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="w-full rounded-md">
      <div className="flex items-start gap-4 p-4">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
