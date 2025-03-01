'use client';

import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';
import { SearchBar } from './SearchBar';

export function HeroSection() {
  return (
    <div className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h1 
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-5xl font-[700] text-foreground mb-6"
        >
          Book Expert Consultations in Minutes
        </motion.h1>
        <motion.p 
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-xl text-foreground/80 font-secondary mb-12"
        >
          Connect with professionals across various fields for personalized guidance
        </motion.p>
        
        {/* Search Bar */}
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <SearchBar />
        </motion.div>
      </div>
    </div>
  );
} 