'use client';

import { Bot, MessageSquare, Bell, Mic, Sparkles, Calendar, VideoIcon, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';

const features = [
  {
    title: 'AI Matching',
    description: 'Get matched with the perfect expert using our AI algorithm',
    icon: Bot,
    color: 'bg-primary/10 text-primary',
    badge: 'Smart'
  },
  {
    title: 'Instant Chat',
    description: '24/7 chat support with quick responses',
    icon: MessageSquare,
    color: 'bg-secondary/10 text-secondary',
    badge: 'Fast'
  },
  {
    title: 'Smart Reminders',
    description: 'Never miss a consultation with intelligent notifications',
    icon: Bell,
    color: 'bg-accent/10 text-accent',
    badge: 'Auto'
  },
  {
    title: 'Voice Commands',
    description: 'Book and manage consultations using voice',
    icon: Mic,
    color: 'bg-destructive/10 text-destructive',
    badge: 'New'
  },
  {
    title: 'Smart Suggestions',
    description: 'Personalized recommendations based on your needs',
    icon: Sparkles,
    color: 'bg-primary/10 text-primary',
    badge: 'AI'
  },
  {
    title: 'Auto Scheduling',
    description: 'Find the perfect time slot automatically',
    icon: Calendar,
    color: 'bg-secondary/10 text-secondary',
    badge: 'Auto'
  },
  {
    title: 'HD Video Calls',
    description: 'Crystal clear video consultations',
    icon: VideoIcon,
    color: 'bg-accent/10 text-accent',
    badge: 'HD'
  },
  {
    title: 'Secure Platform',
    description: 'End-to-end encryption for your privacy',
    icon: Shield,
    color: 'bg-destructive/10 text-destructive',
    badge: 'Safe'
  }
];

export function BonusFeatures() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-[700] mb-3 text-glow">Smart Features</h2>
          <p className="text-foreground/70 font-secondary">Experience the future of consultations</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="group bg-card rounded-xl p-6 border hover:border-primary/20 transition-all animated-card">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center category-icon`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${feature.color}`}>
                    {feature.badge}
                  </span>
                </div>
                <h3 className="font-sans font-[600] text-lg mb-2 text-glow">{feature.title}</h3>
                <p className="text-sm text-foreground/70 font-secondary">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 