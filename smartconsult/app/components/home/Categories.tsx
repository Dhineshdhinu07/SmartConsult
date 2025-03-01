'use client';

import { Stethoscope, Scale, Briefcase, Cpu } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';

const categories = [
  {
    title: 'Doctors',
    description: 'Medical consultations & health advice',
    icon: Stethoscope,
    href: '/categories/doctors',
    count: '2,500+ Experts',
  },
  {
    title: 'Lawyers',
    description: 'Legal advice & consultation',
    icon: Scale,
    href: '/categories/lawyers',
    count: '1,800+ Experts',
  },
  {
    title: 'Financial Advisors',
    description: 'Investment & financial planning',
    icon: Briefcase,
    href: '/categories/financial',
    count: '1,200+ Experts',
  },
  {
    title: 'Tech Experts',
    description: 'Technical consultation & support',
    icon: Cpu,
    href: '/categories/tech',
    count: '2,000+ Experts',
  },
];

export function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-3xl font-[700] mb-3">Browse Categories</h2>
            <p className="text-foreground/70 font-secondary">Find the right expert for your needs</p>
          </div>
          <Link 
            href="/categories" 
            className="text-primary font-secondary hover:underline"
          >
            View All Categories
          </Link>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Link
                href={category.href}
                className="group h-full bg-card rounded-xl p-8 border hover:border-primary/20 hover:shadow-lg transition-all block flex flex-col animated-card"
              >
                <div className="bg-primary/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mb-6 category-icon">
                  <category.icon className="w-7 h-7" />
                </div>
                <h3 className="font-sans font-[600] text-xl mb-3 text-glow">{category.title}</h3>
                <p className="text-foreground/70 font-secondary mb-6 flex-grow">{category.description}</p>
                <span className="text-sm font-secondary text-foreground/60 block">{category.count}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 