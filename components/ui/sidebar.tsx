'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from './button';

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggle: () => {},
  setIsOpen: () => {}
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);

      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, setIsOpen }}>
      <div className="relative flex min-h-screen">{children}</div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(SidebarContext);

  return (
    <aside
      className={cn(
        'fixed z-40 bg-background transition-all duration-300',
        'md:left-0 md:top-0 md:h-screen md:w-64 md:border-r',
        'left-0 top-0 h-[80vh] w-full border-b',
        'md:translate-y-0',
        isOpen
          ? 'translate-y-0 md:translate-x-0'
          : '-translate-y-full md:-translate-x-full'
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarTrigger() {
  const { toggle, isOpen } = useContext(SidebarContext);

  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggle}>
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(SidebarContext);

  return (
    <div
      className={cn(
        'flex-1 transition-all duration-300',
        'md:ml-64',
        'mt-0',
        isOpen ? 'mt-[80vh] md:mt-0' : 'mt-0'
      )}
    >
      {children}
    </div>
  );
}

export const useSidebar = () => useContext(SidebarContext);
