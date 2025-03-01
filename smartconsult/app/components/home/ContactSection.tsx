'use client';

import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { fadeUpVariant } from '../animations/shared';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@smartconsult.com',
    link: 'mailto:contact@smartconsult.com',
    color: 'bg-primary/10 text-primary'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (234) 567-890',
    link: 'tel:+12345678901',
    color: 'bg-secondary/10 text-secondary'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: '123 Consulting Street, NY, USA',
    link: 'https://maps.google.com',
    color: 'bg-accent/10 text-accent'
  }
];

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
  };

  return (
    <section className="py-16 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-[700] mb-3 text-glow">Get in Touch</h2>
          <p className="text-foreground/70 font-secondary">Have questions? We'd love to hear from you!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-xl p-6 border hover:border-primary/20 transition-all block animated-card"
              >
                <div className="flex items-center gap-6">
                  <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center category-icon`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sans font-[600] text-lg mb-1 text-glow">{item.title}</h3>
                    <p className="text-sm text-foreground/70 font-secondary">{item.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 border hover:border-primary/20 transition-all animated-card">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/70">First Name</label>
                  <Input 
                    placeholder="John" 
                    className="bg-foreground/5 border-foreground/10 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/70">Last Name</label>
                  <Input 
                    placeholder="Doe" 
                    className="bg-foreground/5 border-foreground/10 focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-foreground/70">Email</label>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="bg-foreground/5 border-foreground/10 focus:border-primary"
                />
              </div>
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-foreground/70">Message</label>
                <Textarea 
                  placeholder="How can we help you?" 
                  className="bg-foreground/5 border-foreground/10 focus:border-primary min-h-[120px]"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex items-center justify-center gap-2 animated-card"
              >
                Send Message
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 