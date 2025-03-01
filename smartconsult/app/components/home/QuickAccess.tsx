'use client';

import { CalendarPlus, Calendar, History, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';

const quickActions = [
  {
    title: 'Book Consultation',
    description: 'Schedule a new consultation',
    icon: CalendarPlus,
    href: '/bookings/new',
    color: 'bg-primary/10 text-primary',
    badge: 'Quick Book'
  },
  {
    title: 'Upcoming Sessions',
    description: 'View scheduled consultations',
    icon: Calendar,
    href: '/bookings',
    color: 'bg-secondary/10 text-secondary',
    badge: 'Today: 2'
  },
  {
    title: 'Recent Activity',
    description: 'Access consultation history',
    icon: History,
    href: '/history',
    color: 'bg-accent/10 text-accent',
    badge: 'New'
  },
  {
    title: 'Saved Experts',
    description: 'View your favorite experts',
    icon: Star,
    href: '/saved',
    color: 'bg-destructive/10 text-destructive',
    badge: '5 saved'
  }
];

export function QuickAccess() {
  return (
    <section className="py-16 bg-muted/30 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-3xl font-[700] mb-3 text-glow">Quick Access</h2>
            <p className="text-foreground/70 font-secondary">Everything you need, one click away</p>
          </div>
          <Link
            href="/dashboard"
            className="text-primary hover:text-primary/80 font-secondary transition-colors"
          >
            View All
            <span className="ml-2">→</span>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={action.href}
                className="group bg-card rounded-xl p-6 border hover:border-primary/20 transition-all block animated-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center category-icon`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${action.color}`}>
                    {action.badge}
                  </span>
                </div>
                <h3 className="font-sans font-[600] text-lg mb-2 text-glow">{action.title}</h3>
                <p className="text-sm text-foreground/70 font-secondary">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 