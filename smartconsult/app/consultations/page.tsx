'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { 
  Calendar,
  Clock,
  Video,
  Search,
  Star,
  Download,
  MessageSquare,
  FileText,
  Filter
} from 'lucide-react';

// Mock data for consultations
const consultations = [
  {
    id: '1',
    expert: {
      name: 'Dr. Sarah Johnson',
      specialization: 'Tax Consultant',
      rating: 4.9
    },
    service: 'Tax Planning Consultation',
    date: '2024-03-20',
    time: '10:00 AM',
    duration: '45 minutes',
    status: 'upcoming',
    notes: 'Prepare previous tax returns and financial statements',
    documents: ['Tax_Return_2023.pdf', 'Financial_Statement.pdf']
  },
  {
    id: '2',
    expert: {
      name: 'Michael Chen',
      specialization: 'Business Strategist',
      rating: 4.8
    },
    service: 'Business Growth Strategy',
    date: '2024-03-18',
    time: '02:30 PM',
    duration: '60 minutes',
    status: 'upcoming',
    notes: 'Review business plan and discuss expansion strategies',
    documents: ['Business_Plan.pdf', 'Market_Analysis.pdf']
  },
  {
    id: '3',
    expert: {
      name: 'Emily Brown',
      specialization: 'Legal Advisor',
      rating: 4.7
    },
    service: 'Legal Consultation',
    date: '2024-03-10',
    time: '11:00 AM',
    duration: '45 minutes',
    status: 'completed',
    recording: 'consultation_recording_3.mp4',
    summary: 'Discussed contract terms and legal implications',
    documents: ['Contract_Draft.pdf']
  },
  {
    id: '4',
    expert: {
      name: 'Dr. James Wilson',
      specialization: 'Financial Advisor',
      rating: 4.9
    },
    service: 'Investment Planning',
    date: '2024-03-05',
    time: '03:00 PM',
    duration: '60 minutes',
    status: 'completed',
    recording: 'consultation_recording_4.mp4',
    summary: 'Created personalized investment strategy',
    documents: ['Investment_Plan.pdf', 'Risk_Assessment.pdf']
  }
];

export default function ConsultationsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConsultations = consultations.filter(consultation => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'upcoming' && consultation.status === 'upcoming') ||
      (filter === 'completed' && consultation.status === 'completed');

    const matchesSearch = 
      consultation.expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.expert.specialization.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Title and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.h1 
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="text-3xl font-[700] text-glow"
          >
            My Consultations
          </motion.h1>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <Input
                placeholder="Search consultations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[250px]"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Consultations List */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {filteredConsultations.map((consultation) => (
            <Card key={consultation.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Expert Info */}
                <div className="flex items-start gap-4 lg:w-1/3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {consultation.expert.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-glow">{consultation.expert.name}</h3>
                    <p className="text-sm text-foreground/60">{consultation.expert.specialization}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{consultation.expert.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Consultation Details */}
                <div className="lg:flex-1">
                  <h4 className="font-medium mb-2">{consultation.service}</h4>
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{consultation.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{consultation.time} ({consultation.duration})</span>
                    </div>
                    <Badge 
                      variant={consultation.status === 'upcoming' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {consultation.status}
                    </Badge>
                  </div>
                  {consultation.status === 'completed' && (
                    <p className="mt-2 text-sm text-foreground/70">{consultation.summary}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-[140px]">
                  {consultation.status === 'upcoming' ? (
                    <>
                      <Button className="w-full gap-2">
                        <Video className="w-4 h-4" />
                        Join Meeting
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Chat
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full gap-2">
                        <Download className="w-4 h-4" />
                        Recording
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <FileText className="w-4 h-4" />
                        Summary
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Documents Section */}
              {consultation.documents && consultation.documents.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Documents</p>
                  <div className="flex flex-wrap gap-2">
                    {consultation.documents.map((doc, index) => (
                      <Button key={index} variant="outline" size="sm" className="gap-2">
                        <FileText className="w-4 h-4" />
                        {doc}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 