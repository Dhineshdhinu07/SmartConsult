'use client';

import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';
import { SearchBar } from './SearchBar';
import { AnimatedButton } from '../ui/AnimatedButton';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-[700] mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Expert Consultations,{' '}
            </span>
            <span className="text-foreground">Made Smart</span>
          </h1>
          <p className="text-xl text-foreground/70 font-secondary max-w-2xl mx-auto mb-8">
            Connect with top professionals across various fields for personalized guidance and expert advice
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <AnimatedButton variant="default" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
            <AnimatedButton variant="outline" size="lg">
              Browse Experts
            </AnimatedButton>
          </div>
        </motion.div>

        <SearchBar />

        {/* Stats */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Active Experts', value: '10,000+' },
            { label: 'Consultations', value: '50,000+' },
            { label: 'Success Rate', value: '98%' },
            { label: 'Countries', value: '50+' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.p
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-2xl font-[700] text-primary mb-2"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-foreground/60 font-secondary">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 