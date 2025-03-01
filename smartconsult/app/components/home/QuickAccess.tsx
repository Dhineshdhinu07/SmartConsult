'use client';

import { CalendarPlus, Calendar, History } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';

const quickActions = [
  {
    title: 'Book New Consultation',
    description: 'Schedule a consultation with an expert',
    icon: CalendarPlus,
    href: '/bookings/new',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Upcoming Appointments',
    description: 'View your scheduled consultations',
    icon: Calendar,
    href: '/bookings',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Consultation History',
    description: 'Access past consultation records',
    icon: History,
    href: '/history',
    color: 'bg-accent/10 text-accent',
  },
];

export function QuickAccess() {
  return (
    <div className="py-12">
      <motion.h2 
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        className="text-3xl font-[700] mb-8 text-glow"
      >
        Quick Access
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6">
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
              className="group h-full bg-card rounded-xl p-8 border hover:border-primary/20 hover:shadow-lg transition-all block flex flex-col animated-card"
            >
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-4 category-icon`}>
                <action.icon className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-[600] text-xl mb-2 text-glow">{action.title}</h3>
              <p className="font-secondary text-foreground/70">{action.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 