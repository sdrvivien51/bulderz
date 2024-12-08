'use client';

import { KBar } from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import {
  SidebarInset,
  SidebarProvider,
  Sidebar
} from '@/components/ui/sidebar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <KBar>
      <SidebarProvider>
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
