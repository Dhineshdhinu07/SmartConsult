'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Check, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { fadeUpVariant } from '@/app/components/animations/shared';

interface TimeSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  expertAvailability: number;
  userPreference: number;
  isSelected: boolean;
}

export function AutoScheduler() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
      expertAvailability: 0.9,
      userPreference: 0.85,
      isSelected: false,
    },
    {
      id: '2',
      startTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 49 * 60 * 60 * 1000),
      expertAvailability: 1,
      userPreference: 0.7,
      isSelected: false,
    },
    {
      id: '3',
      startTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 73 * 60 * 60 * 1000),
      expertAvailability: 0.8,
      userPreference: 0.95,
      isSelected: false,
    },
  ]);

  const [isScheduling, setIsScheduling] = useState(false);

  const handleSelectSlot = (id: string) => {
    setTimeSlots(prev =>
      prev.map(slot => ({
        ...slot,
        isSelected: slot.id === id,
      }))
    );
  };

  const handleSchedule = async () => {
    const selectedSlot = timeSlots.find(slot => slot.isSelected);
    if (!selectedSlot) return;

    setIsScheduling(true);
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsScheduling(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getMatchScore = (slot: TimeSlot) => {
    return Math.round(((slot.expertAvailability + slot.userPreference) / 2) * 100);
  };

  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto space-y-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Auto Scheduler
          </CardTitle>
          <CardDescription>
            Smart time slots based on availability and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {timeSlots.map(slot => (
              <motion.div
                key={slot.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border rounded-lg transition-all ${
                  slot.isSelected
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{formatDate(slot.startTime)}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </div>
                  </div>
                  <Button
                    variant={slot.isSelected ? 'default' : 'outline'}
                    onClick={() => handleSelectSlot(slot.id)}
                  >
                    {slot.isSelected ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : null}
                    {slot.isSelected ? 'Selected' : 'Select'}
                  </Button>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Expert Availability
                    </span>
                    <Badge variant="secondary">
                      {Math.round(slot.expertAvailability * 100)}%
                    </Badge>
                  </div>
                  <Progress value={slot.expertAvailability * 100} />

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Preference Match
                    </span>
                    <Badge variant="secondary">
                      {Math.round(slot.userPreference * 100)}%
                    </Badge>
                  </div>
                  <Progress value={slot.userPreference * 100} />

                  <div className="flex items-center justify-between text-sm font-medium mt-3">
                    <span>Overall Match Score</span>
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground"
                    >
                      {getMatchScore(slot)}%
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button
            className="w-full"
            disabled={!timeSlots.some(slot => slot.isSelected) || isScheduling}
            onClick={handleSchedule}
          >
            {isScheduling ? (
              <>
                <Calendar className="w-4 h-4 mr-2 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
} 