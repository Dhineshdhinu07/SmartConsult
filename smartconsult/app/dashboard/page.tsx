'use client';

import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/components/ui/table';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Calendar as CalendarInput } from '@/app/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Trash2, Calendar, Clock, ExternalLink, ArrowUpDown, Edit2, Video } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { Card } from '@/app/components/ui/card';
import Link from 'next/link';
import { 
  TrendingUp,
  Star,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock4
} from 'lucide-react';

// Mock data for testing
const stats = [
  {
    title: 'Total Consultations',
    value: '156',
    change: '+12.5%',
    trend: 'up',
    icon: Video,
    color: 'text-primary'
  },
  {
    title: 'Active Experts',
    value: '48',
    change: '+5.2%',
    trend: 'up',
    icon: Users,
    color: 'text-secondary'
  },
  {
    title: 'Avg. Rating',
    value: '4.8',
    change: '+0.3',
    trend: 'up',
    icon: Star,
    color: 'text-accent'
  },
  {
    title: 'Revenue',
    value: '$12.5k',
    change: '+18.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-destructive'
  }
];

const recentBookings = [
  {
    id: '1',
    expert: 'Dr. Sarah Johnson',
    service: 'Tax Consultation',
    date: '2024-03-15',
    time: '10:00 AM',
    status: 'confirmed',
    amount: '$150'
  },
  {
    id: '2',
    expert: 'Michael Chen',
    service: 'Business Strategy',
    date: '2024-03-14',
    time: '02:30 PM',
    status: 'completed',
    amount: '$200'
  },
  {
    id: '3',
    expert: 'Emily Brown',
    service: 'Legal Advice',
    date: '2024-03-14',
    time: '11:00 AM',
    status: 'cancelled',
    amount: '$180'
  }
];

const upcomingConsultations = [
  {
    id: '1',
    expert: {
      name: 'Dr. Sarah Johnson',
      specialization: 'Tax Consultant',
      image: '/experts/expert1.jpg'
    },
    date: '2024-03-15',
    time: '10:00 AM',
    duration: '45 minutes',
    type: 'video'
  },
  {
    id: '2',
    expert: {
      name: 'Michael Chen',
      specialization: 'Business Strategist',
      image: '/experts/expert2.jpg'
    },
    date: '2024-03-16',
    time: '02:30 PM',
    duration: '60 minutes',
    type: 'video'
  }
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <p className="text-sm text-emerald-500 mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-primary/10 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Bookings</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/bookings">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expert</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.expert}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      {booking.date} at {booking.time}
                    </TableCell>
                    <TableCell>{booking.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === 'confirmed'
                            ? 'default'
                            : booking.status === 'completed'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>

        {/* Upcoming Consultations */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Upcoming Consultations</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/consultations">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingConsultations.map((consultation) => (
              <Card key={consultation.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{consultation.expert.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {consultation.expert.specialization}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {consultation.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {consultation.time} ({consultation.duration})
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 