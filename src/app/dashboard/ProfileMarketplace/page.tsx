'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileSearch } from './hooks/useProfileSearch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import SearchBar from './components/SearchBar';
import SkillsFilter from './components/SkillsFilter';
import ToolsFilter from './components/ToolsFilter';
import ProfileCard from './components/ProfileCard';

export default function MarketplacePage() {
  const {
    profiles,
    loading,
    error,
    hasMore,
    searchTerm,
    setSearchTerm,
    selectedSkills,
    setSelectedSkills,
    selectedTools,
    setSelectedTools,
    availableForHire,
    setAvailableForHire,
    fetchProfiles
  } = useProfileSearch();

  // Gestion du scroll infini
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (hasMore && !loading) {
        fetchProfiles();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Trouvez le talent parfait</h1>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-6">
        {/* Sidebar fixe */}
        <div className="w-80 shrink-0">
          <div className="sticky top-6 space-y-6 rounded-lg border bg-card p-4">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <SkillsFilter
                selectedSkills={selectedSkills}
                onSkillsChange={setSelectedSkills}
              />
              <div className="my-6 border-t" />
              <ToolsFilter
                selectedTools={selectedTools}
                onToolsChange={setSelectedTools}
              />
              <div className="my-6 border-t" />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={availableForHire}
                  onCheckedChange={(checked) =>
                    setAvailableForHire(checked as boolean)
                  }
                />
                <Label htmlFor="available">Disponible pour mission</Label>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Grille de profils */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {profiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProfileCard profile={profile} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {loading && (
            <div className="mt-8 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
            </div>
          )}

          {!hasMore && profiles.length > 0 && (
            <p className="mt-8 text-center text-muted-foreground">
              Pas plus de profils à charger
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
