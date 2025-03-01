'use client';

import { Stethoscope, Scale, Briefcase, Cpu, Brain, Heart, Users, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';

const categories = [
  {
    title: 'Medical',
    description: 'Healthcare consultations',
    icon: Stethoscope,
    href: '/categories/medical',
    color: 'bg-primary/10 text-primary',
    count: '2,500+ Experts'
  },
  {
    title: 'Legal',
    description: 'Legal advice & services',
    icon: Scale,
    href: '/categories/legal',
    color: 'bg-secondary/10 text-secondary',
    count: '1,800+ Experts'
  },
  {
    title: 'Business',
    description: 'Business consulting',
    icon: Briefcase,
    href: '/categories/business',
    color: 'bg-accent/10 text-accent',
    count: '2,000+ Experts'
  },
  {
    title: 'Technology',
    description: 'Tech support & consulting',
    icon: Cpu,
    href: '/categories/technology',
    color: 'bg-destructive/10 text-destructive',
    count: '1,500+ Experts'
  },
  {
    title: 'Mental Health',
    description: 'Psychological support',
    icon: Brain,
    href: '/categories/mental-health',
    color: 'bg-primary/10 text-primary',
    count: '1,200+ Experts'
  },
  {
    title: 'Wellness',
    description: 'Health & lifestyle',
    icon: Heart,
    href: '/categories/wellness',
    color: 'bg-secondary/10 text-secondary',
    count: '1,600+ Experts'
  },
  {
    title: 'Career',
    description: 'Career guidance',
    icon: Users,
    href: '/categories/career',
    color: 'bg-accent/10 text-accent',
    count: '1,400+ Experts'
  },
  {
    title: 'Education',
    description: 'Academic consulting',
    icon: Lightbulb,
    href: '/categories/education',
    color: 'bg-destructive/10 text-destructive',
    count: '1,300+ Experts'
  }
];

export function Categories() {
  return (
    <section className="py-16 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-[700] mb-3 text-glow">Explore Categories</h2>
          <p className="text-foreground/70 font-secondary">Find the perfect expert for your needs</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={category.href}
                className="group bg-card rounded-xl p-6 border hover:border-primary/20 transition-all block animated-card"
              >
                <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 category-icon`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-[600] text-lg mb-2 text-glow">{category.title}</h3>
                <p className="text-sm text-foreground/70 font-secondary mb-4">{category.description}</p>
                <span className="text-xs font-secondary text-foreground/60 block">{category.count}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 