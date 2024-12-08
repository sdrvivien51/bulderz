'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Search,
  Package,
  FileText,
  User,
  Briefcase,
  Building2,
  MessageSquare
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const sidebarItems = [
  {
    title: 'Overview',
    href: '/dashboard/overview',
    icon: LayoutDashboard,
    variant: 'default'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    variant: 'ghost'
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
    variant: 'ghost'
  },
  {
    title: 'Job Marketplace',
    href: '/dashboard/JobMarketplace',
    icon: Briefcase,
    variant: 'ghost'
  },
  {
    title: 'Profile Marketplace',
    href: '/dashboard/ProfileMarketplace',
    icon: Users,
    variant: 'ghost'
  },
  {
    title: 'Blog',
    href: '/dashboard/blog',
    icon: FileText,
    variant: 'ghost'
  },
  {
    title: 'Companies',
    href: '/dashboard/companies',
    icon: Building2,
    variant: 'ghost'
  },
  {
    title: 'Product',
    href: '/dashboard/product',
    icon: Package,
    variant: 'ghost'
  }
];

export default function AppSidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'min-h-screen border-r bg-background pb-12',
          isCollapsed ? 'w-20' : 'w-64',
          'transition-all duration-300 ease-in-out'
        )}
      >
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1">
              {sidebarItems.map((item) => (
                <Link key={item.title} href={item.href}>
                  <Button
                    variant={pathname === item.href ? 'default' : 'ghost'}
                    className={cn(
                      'w-full justify-start',
                      isCollapsed ? 'px-3' : 'px-6'
                    )}
                  >
                    <item.icon
                      className={cn('h-5 w-5', !isCollapsed && 'mr-3')}
                    />
                    {!isCollapsed && item.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className={cn(
            'absolute -right-3 top-7 h-6 w-6 rotate-0 p-0',
            isCollapsed && 'rotate-180'
          )}
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
