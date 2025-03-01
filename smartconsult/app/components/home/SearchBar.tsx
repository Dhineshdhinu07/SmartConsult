'use client';

import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';

export function SearchBar() {
  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl mx-auto"
    >
      <div className="search-bar relative rounded-full border shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-foreground/50" />
        </div>
        <input
          type="text"
          placeholder="Search for experts, topics, or specialties..."
          className="block w-full pl-12 pr-4 py-4 bg-transparent rounded-full focus:outline-none focus:ring-0 text-foreground placeholder:text-foreground/50"
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
          <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
            Search
          </button>
        </div>
      </div>
    </motion.div>
  );
} 