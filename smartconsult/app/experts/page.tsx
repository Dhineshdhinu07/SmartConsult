'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Calendar, Clock, Star, Video } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import Link from 'next/link';

const experts = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Tax Consultant',
    experience: '15+ years',
    rating: 4.9,
    price: 150,
    availability: 'Available Today',
    image: '/experts/expert1.jpg',
    expertise: ['Income Tax', 'GST', 'Corporate Tax']
  },
  {
    id: '2',
    name: 'CA Michael Chen',
    specialization: 'Financial Advisor',
    experience: '12+ years',
    rating: 4.8,
    price: 120,
    availability: 'Next Available: Tomorrow',
    image: '/experts/expert2.jpg',
    expertise: ['Investment Planning', 'Tax Planning', 'Wealth Management']
  },
  // Add more experts as needed
];

export default function ExpertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-[700] mb-2 text-glow">Our Experts</h1>
            <p className="text-foreground/70 font-secondary">Connect with our experienced consultants</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Available Today
            </Button>
            <Button variant="outline" className="gap-2">
              <Clock className="w-4 h-4" />
              Next Available
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group bg-card hover:border-primary/20 transition-all animated-card">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        {/* Replace with actual image if available */}
                        <span className="text-2xl font-bold text-primary">
                          {expert.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-sans font-[600] text-lg text-glow">{expert.name}</h3>
                        <p className="text-sm text-foreground/70 font-secondary">{expert.specialization}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {expert.experience}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{expert.rating}</span>
                      <span className="text-sm text-foreground/60">• {expert.availability}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {expert.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-secondary/10">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                      <div className="text-sm">
                        <span className="text-foreground/60">Starting from</span>
                        <p className="font-medium text-lg">${expert.price}/hr</p>
                      </div>
                      <Link href={`/bookings/new?expert=${expert.id}`}>
                        <Button className="gap-2">
                          <Video className="w-4 h-4" />
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 