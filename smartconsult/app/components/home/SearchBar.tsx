'use client';

import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';

const suggestions = [
  'Medical consultation',
  'Legal advice',
  'Business strategy',
  'Mental health',
  'Career guidance',
];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', query);
  };

  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for experts, topics, or specialties..."
            className="w-full pl-12 pr-32 py-4 rounded-full bg-background border shadow-sm 
                     focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all 
                     duration-200 outline-none text-foreground placeholder:text-foreground/50"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
              title="AI Search"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm 
                       font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search suggestions */}
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-2 bg-card rounded-lg border shadow-lg 
                     py-2 z-10"
          >
            <div className="px-2 py-1.5 text-xs text-foreground/50 font-secondary">
              Popular searches
            </div>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-primary/5 text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
} 