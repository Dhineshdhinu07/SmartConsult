'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { Card } from '@/app/components/ui/card';
import { Calculator, FileText, Briefcase, PieChart, Building2, Scale, Landmark, HelpCircle } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import Link from 'next/link';

const services = [
  {
    id: 'income-tax',
    title: 'Income Tax',
    description: 'Expert guidance on income tax filing and planning',
    icon: Calculator,
    color: 'bg-primary/10 text-primary',
    features: [
      'Tax Return Filing',
      'Tax Planning',
      'Deductions & Exemptions',
      'Notice Resolution'
    ],
    price: 'From $99',
    experts: '25+ Experts'
  },
  {
    id: 'gst',
    title: 'GST Services',
    description: 'Comprehensive GST consultation and compliance',
    icon: FileText,
    color: 'bg-secondary/10 text-secondary',
    features: [
      'GST Registration',
      'Return Filing',
      'Compliance',
      'Advisory'
    ],
    price: 'From $149',
    experts: '20+ Experts'
  },
  {
    id: 'business',
    title: 'Business Advisory',
    description: 'Strategic business consulting and planning',
    icon: Briefcase,
    color: 'bg-accent/10 text-accent',
    features: [
      'Business Planning',
      'Financial Analysis',
      'Growth Strategy',
      'Risk Assessment'
    ],
    price: 'From $199',
    experts: '15+ Experts'
  },
  {
    id: 'investment',
    title: 'Investment Planning',
    description: 'Professional investment and portfolio management',
    icon: PieChart,
    color: 'bg-destructive/10 text-destructive',
    features: [
      'Portfolio Review',
      'Investment Strategy',
      'Risk Management',
      'Wealth Planning'
    ],
    price: 'From $179',
    experts: '18+ Experts'
  },
  {
    id: 'corporate',
    title: 'Corporate Services',
    description: 'Comprehensive corporate compliance solutions',
    icon: Building2,
    color: 'bg-primary/10 text-primary',
    features: [
      'Company Formation',
      'Compliance',
      'Legal Advisory',
      'Corporate Tax'
    ],
    price: 'From $299',
    experts: '22+ Experts'
  },
  {
    id: 'legal',
    title: 'Legal Services',
    description: 'Expert legal consultation and documentation',
    icon: Scale,
    color: 'bg-secondary/10 text-secondary',
    features: [
      'Legal Advisory',
      'Documentation',
      'Contract Review',
      'Dispute Resolution'
    ],
    price: 'From $249',
    experts: '20+ Experts'
  },
  {
    id: 'banking',
    title: 'Banking & Finance',
    description: 'Professional banking and finance consultation',
    icon: Landmark,
    color: 'bg-accent/10 text-accent',
    features: [
      'Loan Advisory',
      'Financial Planning',
      'Banking Solutions',
      'Credit Analysis'
    ],
    price: 'From $149',
    experts: '15+ Experts'
  },
  {
    id: 'general',
    title: 'General Consultation',
    description: 'General financial and business advice',
    icon: HelpCircle,
    color: 'bg-destructive/10 text-destructive',
    features: [
      'Financial Advice',
      'Business Guidance',
      'Planning Support',
      'General Advisory'
    ],
    price: 'From $99',
    experts: '30+ Experts'
  }
];

export default function ServicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <h1 className="text-3xl font-[700] mb-3 text-glow">Our Services</h1>
          <p className="text-foreground/70 font-secondary max-w-2xl mx-auto">
            Explore our comprehensive range of professional consultation services tailored to meet your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/services/${service.id}`}>
                <Card className="group bg-card hover:border-primary/20 transition-all animated-card h-full">
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center category-icon`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className={service.color}>
                        {service.experts}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-sans font-[600] text-lg mb-2 text-glow">{service.title}</h3>
                      <p className="text-sm text-foreground/70 font-secondary">{service.description}</p>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm text-foreground/70 font-secondary flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary/50" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-foreground/10">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-primary">{service.price}</span>
                        <span className="text-sm text-foreground/60">Per Consultation</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 