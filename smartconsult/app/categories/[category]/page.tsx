'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Star, Search, Filter, ArrowRight, Calendar as CalendarIcon, Clock, Video } from 'lucide-react';
import Link from 'next/link';
import { Calendar } from '@/app/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { addDays, format } from 'date-fns';

// Category data mapping
const categoryData = {
  medical: {
    title: 'Medical',
    description: 'Healthcare consultations',
    expertCount: '2,500+ Experts',
    color: 'bg-primary/10 text-primary',
    experts: [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialization: 'General Medicine',
        rating: 4.9,
        consultations: 500,
        price: 150,
        availability: 'Available Today',
        image: '/experts/medical-1.jpg',
        expertise: ['Primary Care', 'Preventive Medicine', 'Chronic Disease Management'],
        experience: '15+ years',
        languages: ['English', 'Spanish'],
        education: 'MD from Stanford University'
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        specialization: 'Cardiology',
        rating: 4.8,
        consultations: 450,
        price: 200,
        availability: 'Available Tomorrow',
        image: '/experts/medical-2.jpg',
        expertise: ['Heart Disease', 'Hypertension', 'Cardiac Rehabilitation'],
        experience: '12+ years',
        languages: ['English', 'Mandarin'],
        education: 'MD from Harvard Medical School'
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        specialization: 'Pediatrics',
        rating: 4.9,
        consultations: 600,
        price: 180,
        availability: 'Available Today',
        image: '/experts/medical-3.jpg',
        expertise: ['Child Development', 'Pediatric Care', 'Vaccination'],
        experience: '10+ years',
        languages: ['English', 'Spanish'],
        education: 'MD from Johns Hopkins University'
      }
    ]
  },
  legal: {
    title: 'Legal',
    description: 'Legal advice & services',
    expertCount: '1,800+ Experts',
    color: 'bg-secondary/10 text-secondary',
    experts: [
      {
        id: '1',
        name: 'Adv. Emily Brown',
        specialization: 'Corporate Law',
        rating: 4.9,
        consultations: 300,
        price: 180,
        availability: 'Available Today',
        image: '/experts/legal-1.jpg',
        expertise: ['Mergers & Acquisitions', 'Business Law', 'Contract Law'],
        experience: '12+ years',
        languages: ['English'],
        education: 'JD from Yale Law School'
      },
      {
        id: '2',
        name: 'Adv. James Wilson',
        specialization: 'Family Law',
        rating: 4.8,
        consultations: 400,
        price: 160,
        availability: 'Available Today',
        image: '/experts/legal-2.jpg',
        expertise: ['Divorce Law', 'Child Custody', 'Family Mediation'],
        experience: '15+ years',
        languages: ['English'],
        education: 'JD from Columbia Law School'
      }
    ]
  },
  business: {
    title: 'Business',
    description: 'Business consulting',
    expertCount: '2,000+ Experts',
    color: 'bg-accent/10 text-accent',
    experts: [
      {
        id: '1',
        name: 'Robert Wilson',
        specialization: 'Strategic Planning',
        rating: 4.9,
        consultations: 400,
        price: 250,
        availability: 'Available Today',
        image: '/experts/business-1.jpg',
        expertise: ['Business Strategy', 'Market Analysis', 'Growth Planning'],
        experience: '18+ years',
        languages: ['English'],
        education: 'MBA from Wharton School'
      },
      {
        id: '2',
        name: 'Sarah Thompson',
        specialization: 'Financial Advisory',
        rating: 4.8,
        consultations: 350,
        price: 220,
        availability: 'Available Today',
        image: '/experts/business-2.jpg',
        expertise: ['Financial Planning', 'Investment Strategy', 'Risk Management'],
        experience: '15+ years',
        languages: ['English', 'French'],
        education: 'MBA from INSEAD'
      }
    ]
  },
  technology: {
    title: 'Technology',
    description: 'Tech support & consulting',
    expertCount: '1,500+ Experts',
    color: 'bg-destructive/10 text-destructive',
    experts: [
      {
        id: '1',
        name: 'Alex Turner',
        specialization: 'Software Development',
        rating: 4.8,
        consultations: 350,
        price: 160,
        availability: 'Available Today',
        image: '/experts/tech-1.jpg',
        expertise: ['Full Stack Development', 'Cloud Architecture', 'DevOps'],
        experience: '10+ years',
        languages: ['English'],
        education: 'MS in Computer Science from MIT'
      },
      {
        id: '2',
        name: 'Lisa Chen',
        specialization: 'Data Science',
        rating: 4.9,
        consultations: 280,
        price: 180,
        availability: 'Available Tomorrow',
        image: '/experts/tech-2.jpg',
        expertise: ['Machine Learning', 'Data Analytics', 'AI Implementation'],
        experience: '8+ years',
        languages: ['English', 'Mandarin'],
        education: 'PhD in Data Science from Stanford'
      }
    ]
  },
  'mental-health': {
    title: 'Mental Health',
    description: 'Psychological support',
    expertCount: '1,200+ Experts',
    color: 'bg-primary/10 text-primary',
    experts: [
      {
        id: '1',
        name: 'Dr. Lisa Parker',
        specialization: 'Clinical Psychology',
        rating: 4.9,
        consultations: 600,
        price: 140,
        availability: 'Available Today',
        image: '/experts/mental-1.jpg',
        expertise: ['Anxiety', 'Depression', 'Cognitive Behavioral Therapy'],
        experience: '12+ years',
        languages: ['English'],
        education: 'PhD in Psychology from Columbia University'
      },
      {
        id: '2',
        name: 'Dr. Marcus Johnson',
        specialization: 'Psychiatry',
        rating: 4.8,
        consultations: 450,
        price: 160,
        availability: 'Available Today',
        image: '/experts/mental-2.jpg',
        expertise: ['Mood Disorders', 'ADHD', 'Stress Management'],
        experience: '15+ years',
        languages: ['English', 'Spanish'],
        education: 'MD from UCLA Medical School'
      }
    ]
  },
  wellness: {
    title: 'Wellness',
    description: 'Health & lifestyle',
    expertCount: '1,600+ Experts',
    color: 'bg-secondary/10 text-secondary',
    experts: [
      {
        id: '1',
        name: 'Emma White',
        specialization: 'Nutrition',
        rating: 4.8,
        consultations: 280,
        price: 120,
        availability: 'Available Today',
        image: '/experts/wellness-1.jpg',
        expertise: ['Diet Planning', 'Weight Management', 'Sports Nutrition'],
        experience: '8+ years',
        languages: ['English'],
        education: 'MS in Nutrition from NYU'
      },
      {
        id: '2',
        name: 'David Miller',
        specialization: 'Fitness Training',
        rating: 4.9,
        consultations: 320,
        price: 100,
        availability: 'Available Tomorrow',
        image: '/experts/wellness-2.jpg',
        expertise: ['Personal Training', 'Strength Training', 'Yoga'],
        experience: '10+ years',
        languages: ['English'],
        education: 'BS in Exercise Science'
      }
    ]
  },
  career: {
    title: 'Career',
    description: 'Career guidance',
    expertCount: '1,400+ Experts',
    color: 'bg-accent/10 text-accent',
    experts: [
      {
        id: '1',
        name: 'James Miller',
        specialization: 'Career Coaching',
        rating: 4.9,
        consultations: 320,
        price: 130,
        availability: 'Available Today',
        image: '/experts/career-1.jpg',
        expertise: ['Career Planning', 'Resume Building', 'Interview Preparation'],
        experience: '12+ years',
        languages: ['English'],
        education: 'MBA from London Business School'
      },
      {
        id: '2',
        name: 'Rachel Thompson',
        specialization: 'Executive Coaching',
        rating: 4.8,
        consultations: 250,
        price: 150,
        availability: 'Available Today',
        image: '/experts/career-2.jpg',
        expertise: ['Leadership Development', 'Executive Presence', 'Team Management'],
        experience: '15+ years',
        languages: ['English', 'French'],
        education: 'MS in Organizational Psychology'
      }
    ]
  },
  education: {
    title: 'Education',
    description: 'Academic consulting',
    expertCount: '1,300+ Experts',
    color: 'bg-destructive/10 text-destructive',
    experts: [
      {
        id: '1',
        name: 'Prof. David Clark',
        specialization: 'Academic Counseling',
        rating: 4.8,
        consultations: 250,
        price: 110,
        availability: 'Available Today',
        image: '/experts/education-1.jpg',
        expertise: ['College Admissions', 'Academic Planning', 'Study Skills'],
        experience: '20+ years',
        languages: ['English'],
        education: 'PhD in Education from Harvard'
      },
      {
        id: '2',
        name: 'Dr. Sarah Martinez',
        specialization: 'Test Preparation',
        rating: 4.9,
        consultations: 300,
        price: 120,
        availability: 'Available Tomorrow',
        image: '/experts/education-2.jpg',
        expertise: ['SAT/ACT Prep', 'GRE/GMAT Prep', 'Academic Tutoring'],
        experience: '10+ years',
        languages: ['English', 'Spanish'],
        education: 'PhD in Mathematics from Berkeley'
      }
    ]
  }
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const category = categoryData[params.category as keyof typeof categoryData];

  // Generate available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  if (!category) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <h1 className="text-2xl font-bold">Category not found</h1>
          <p className="mt-2 text-muted-foreground">The requested category does not exist.</p>
          <Button asChild className="mt-4">
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const filteredExperts = category.experts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-[700] text-glow">{category.title}</h1>
              <p className="text-muted-foreground mt-1">{category.description}</p>
            </div>
            <Badge variant="outline" className="text-sm">
              {category.expertCount}
            </Badge>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search experts by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </motion.div>

        {/* Experts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredExperts.map((expert, index) => (
            <motion.div
              key={expert.id}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all animated-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-glow">{expert.name}</h3>
                      <p className="text-sm text-muted-foreground">{expert.specialization}</p>
                      <p className="text-xs text-muted-foreground mt-1">{expert.education}</p>
                    </div>
                    <Badge variant="outline" className={category.color}>
                      {expert.availability}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{expert.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({expert.consultations}+ consultations)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {expert.expertise?.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Experience:</span> {expert.experience}
                    </div>
                    <div>
                      <span className="font-medium">Languages:</span> {expert.languages?.join(', ')}
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Consultation Fee</p>
                        <p className="text-lg font-semibold">${expert.price}</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            Book Consultation
                            <CalendarIcon className="ml-2 h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Schedule Consultation</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Select Date</h4>
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                                disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                              />
                            </div>
                            
                            {selectedDate && (
                              <div className="space-y-2">
                                <h4 className="font-medium">Available Time Slots</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {timeSlots.map((time) => (
                                    <Button
                                      key={time}
                                      variant="outline"
                                      className="w-full justify-start"
                                    >
                                      <Clock className="mr-2 h-4 w-4" />
                                      {time}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="space-y-2">
                              <h4 className="font-medium">Consultation Details</h4>
                              <div className="rounded-lg bg-secondary/10 p-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Duration</span>
                                  <span>45 minutes</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span>Type</span>
                                  <div className="flex items-center gap-1">
                                    <Video className="h-4 w-4" />
                                    <span>Video Call</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span>Fee</span>
                                  <span>${expert.price}</span>
                                </div>
                              </div>
                            </div>

                            <Button className="w-full">
                              Confirm Booking
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 