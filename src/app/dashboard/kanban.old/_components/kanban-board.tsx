'use client';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useState } from 'react';
import { BlogColumn, BlogContainer } from './blog-column';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

const defaultColumns = [
  {
    id: 'DRAFT',
    title: 'Brouillons'
  },
  {
    id: 'PUBLISHED',
    title: 'Publiés'
  },
  {
    id: 'ARCHIVED',
    title: 'Archives'
  }
] as const;

export function BlogBoard() {
  const router = useRouter();
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <div className="h-full">
      <div className="mb-4 flex justify-end">
        <Button onClick={() => router.push('/dashboard/blog/editor')}>
          <PenSquare className="mr-2 h-4 w-4" />
          Nouvel Article
        </Button>
      </div>

      <DndContext sensors={sensors}>
        <BlogContainer>
          <SortableContext items={defaultColumns.map((col) => col.id)}>
            {defaultColumns.map((column) => (
              <BlogColumn key={column.id} column={column} />
            ))}
          </SortableContext>
        </BlogContainer>
      </DndContext>
    </div>
  );
}
