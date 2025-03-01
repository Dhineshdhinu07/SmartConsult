'use client';

import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';
import { SearchBar } from './SearchBar';
import { AnimatedButton } from '../ui/AnimatedButton';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-[700] mb-6 tracking-tight">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block"
            >
              Expert Consultations,{' '}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-foreground inline-block"
            >
              Made Smart
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-foreground/70 font-secondary max-w-2xl mx-auto mb-10"
          >
            Connect with top professionals across various fields for personalized guidance and expert advice
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <Link href="/auth/register">
              <AnimatedButton 
                variant="default" 
                size="lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </AnimatedButton>
            </Link>
            <Link href="/experts">
              <AnimatedButton 
                variant="outline" 
                size="lg"
              >
                Browse Experts
              </AnimatedButton>
            </Link>
          </motion.div>
        </motion.div>

        <SearchBar />

        {/* Stats */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {[
            { label: 'Active Experts', value: '10,000+' },
            { label: 'Consultations', value: '50,000+' },
            { label: 'Success Rate', value: '98%' },
            { label: 'Countries', value: '50+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="text-center group cursor-default"
            >
              <motion.p
                className="text-3xl font-[700] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 transform transition-transform group-hover:scale-110"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm font-medium text-foreground/60 font-secondary group-hover:text-foreground/80 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 