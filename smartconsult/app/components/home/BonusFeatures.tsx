'use client';

import { Bot, MessageSquare, Bell, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../animations/shared';

const features = [
  {
    title: 'AI-based Recommendations',
    description: 'Get personalized consultant suggestions powered by AI',
    icon: Bot,
    color: 'bg-primary/10 text-primary',
    emoji: '🤖'
  },
  {
    title: 'Smart Chatbot',
    description: 'Get instant answers to your queries 24/7',
    icon: MessageSquare,
    color: 'bg-secondary/10 text-secondary',
    emoji: '💬'
  },
  {
    title: 'Smart Notifications',
    description: 'Never miss an appointment with timely reminders',
    icon: Bell,
    color: 'bg-accent/10 text-accent',
    emoji: '📩'
  },
  {
    title: 'Voice Search',
    description: 'Search for consultants using voice commands',
    icon: Mic,
    color: 'bg-destructive/10 text-destructive',
    emoji: '🎙️'
  }
];

export function BonusFeatures() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-[700] mb-3 text-glow">Smart Features</h2>
          <p className="text-foreground/70 font-secondary">Powered by cutting-edge technology</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <div className="group h-full bg-card rounded-xl p-6 border hover:border-primary/20 transition-all animated-card">
                <div className={`w-14 h-14 rounded-full ${feature.color} flex items-center justify-center mb-4 category-icon`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-sans font-[600] text-xl mb-2 flex items-center gap-2 text-glow">
                  {feature.title}
                  <span className="text-2xl">{feature.emoji}</span>
                </h3>
                <p className="text-foreground/70 font-secondary">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 