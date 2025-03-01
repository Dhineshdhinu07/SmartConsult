'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { CheckCircle2, Clock, Video, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// This would come from your API in a real application
const serviceDetails = {
  id: 'income-tax',
  title: 'Income Tax Consultation',
  description: 'Get expert guidance on income tax filing, planning, and compliance from our certified tax consultants.',
  longDescription: `Our income tax consultation service provides comprehensive support for all your tax-related needs. 
    Whether you're an individual looking for tax planning advice or a business owner needing help with complex tax matters, 
    our experts are here to help.`,
  benefits: [
    'Personalized tax planning strategies',
    'Expert guidance on deductions and exemptions',
    'Assistance with tax notice resolution',
    'Year-round tax advisory support',
    'Digital documentation management',
    'Compliance monitoring and updates'
  ],
  pricing: [
    {
      title: 'Basic Consultation',
      price: 99,
      duration: '45 minutes',
      features: [
        'Initial tax assessment',
        'Basic tax planning advice',
        'Document review',
        'Simple query resolution'
      ]
    },
    {
      title: 'Comprehensive Review',
      price: 199,
      duration: '90 minutes',
      features: [
        'Detailed tax analysis',
        'Advanced tax planning',
        'Complete documentation review',
        'Investment tax implications',
        'Year-round support'
      ]
    }
  ],
  experts: [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'Senior Tax Consultant',
      experience: '15+ years',
      rating: 4.9,
      availability: 'Available Today'
    },
    {
      id: '2',
      name: 'CA Michael Chen',
      role: 'Tax Planning Specialist',
      experience: '12+ years',
      rating: 4.8,
      availability: 'Next Available: Tomorrow'
    }
  ]
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <h1 className="text-3xl font-[700] mb-3 text-glow">{serviceDetails.title}</h1>
          <p className="text-foreground/70 font-secondary text-lg">{serviceDetails.description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-[600] mb-4 text-glow">About This Service</h2>
                <p className="text-foreground/70 font-secondary">{serviceDetails.longDescription}</p>
                
                <div className="mt-6 space-y-3">
                  {serviceDetails.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-foreground/70 font-secondary">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-[600] mb-4 text-glow">Available Experts</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {serviceDetails.experts.map((expert) => (
                  <Card key={expert.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{expert.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-[600] text-glow">{expert.name}</h3>
                        <p className="text-sm text-foreground/70 font-secondary">{expert.role}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {expert.experience}
                          </Badge>
                          <span className="text-sm text-foreground/60">• {expert.availability}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {serviceDetails.pricing.map((plan, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-[600] mb-2 text-glow">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-primary">${plan.price}</span>
                  <span className="text-foreground/60">/ session</span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-sm text-foreground/70">
                  <Clock className="w-4 h-4" />
                  <span>{plan.duration}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/70 font-secondary">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <Button className="w-full gap-2">
                    <Video className="w-4 h-4" />
                    Book Video Call
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule for Later
                  </Button>
                </div>
              </Card>
            ))}

            <Link href="/experts" className="block">
              <Button variant="outline" className="w-full gap-2">
                View All Experts
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 