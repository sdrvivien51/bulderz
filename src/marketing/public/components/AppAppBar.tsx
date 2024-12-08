'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/mode-toggle';
import Sitemark from './SitemarkIcon';

const menuItems = [
  { label: 'Features', href: '#' },
  { label: 'Find Builders', href: '/Dashboard/ProfileMarketplace' },
  { label: 'Highlights', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'Blog', href: '#' }
];

export default function AppAppBar() {
  const router = useRouter();

  return (
    <div className="fixed left-0 right-0 top-0 z-50 mt-12">
      <div className="flex w-full justify-center">
        <header className="mx-auto w-full max-w-[1200px] px-4">
          <div className="rounded-full border bg-black/80 shadow-lg backdrop-blur-md dark:bg-black/95">
            <div className="flex h-14 items-center justify-between px-6">
              <div className="flex items-center gap-6">
                <Sitemark />

                <NavigationMenu className="hidden md:flex">
                  <NavigationMenuList>
                    {menuItems.map((item) => (
                      <NavigationMenuItem key={item.label}>
                        <NavigationMenuLink
                          className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                          onClick={() => router.push(item.href)}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-2 md:flex">
                  <Button
                    variant="ghost"
                    onClick={() => router.push('/auth/signin')}
                  >
                    Sign in
                  </Button>
                  <Button onClick={() => router.push('/auth/signup')}>
                    Sign up
                  </Button>
                </div>

                <ModeToggle />

                <Sheet>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="mt-4 flex flex-col gap-4">
                      {menuItems.map((item) => (
                        <Button
                          key={item.label}
                          variant="ghost"
                          className="justify-start"
                          onClick={() => router.push(item.href)}
                        >
                          {item.label}
                        </Button>
                      ))}
                      <Separator className="my-2" />
                      <Button
                        variant="outline"
                        onClick={() => router.push('/auth/signin')}
                        className="justify-start"
                      >
                        Sign in
                      </Button>
                      <Button
                        onClick={() => router.push('/auth/signup')}
                        className="justify-start"
                      >
                        Sign up
                      </Button>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
