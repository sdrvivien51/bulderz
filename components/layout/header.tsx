import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import ThemeToggle from './ThemeToggle/theme-toggle';

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <UserNav />
        <ThemeToggle />
      </div>
    </header>
  );
}
