'use client';

import React from 'react';
import PageContainer from '@/components/layout/page-container';
import AppSidebar from '@/components/layout/app-sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  );
}
