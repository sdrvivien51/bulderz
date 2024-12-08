'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

// Chargement dynamique des composants pour optimiser les performances
const AppAppBar = dynamic(() => import('./components/AppAppBar'));
const Hero = dynamic(() => import('./components/Hero'));
const LogoCollection = dynamic(() => import('./components/LogoCollection'));
const Features = dynamic(() => import('./components/Features'));
const Testimonials = dynamic(() => import('./components/Testimonials'));
const Highlights = dynamic(() => import('./components/Highlights'));
const Pricing = dynamic(() => import('./components/Pricing'));
const FAQ = dynamic(() => import('./components/FAQ'));
const Footer = dynamic(() => import('./components/Footer'));

export default function MarketingPage() {
  const router = useRouter();

  const handleNavigateToMarketplace = () => {
    router.push('/marketplace/profiles');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <AppAppBar />
      <Hero
        additionalAction={
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToMarketplace}
            sx={{ mt: 2 }}
          >
            Découvrir les Profils
          </Button>
        }
      />
      <main className="space-y-16 md:space-y-24">
        <LogoCollection />
        <Features />
        <Testimonials />
        <Highlights />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </motion.div>
  );
}
