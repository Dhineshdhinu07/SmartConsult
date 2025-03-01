'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/auth-context';
import { api } from '@/app/lib/api-client';
import type { Expert } from '@/app/types/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Calendar } from '@/app/components/ui/calendar';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { format } from 'date-fns';

const bookingSchema = z.object({
  expertId: z.string().min(1, 'Please select an expert'),
  date: z.date({
    required_error: 'Please select a date',
  }),
  time: z.string().min(1, 'Please select a time slot'),
  duration: z.number().min(30, 'Minimum duration is 30 minutes').max(120, 'Maximum duration is 120 minutes'),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function NewBookingPage() {
  const [error, setError] = useState<string | null>(null);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      duration: 30,
    },
  });

  // Fetch experts on mount
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await api.experts.getAll();
        if (response.success && response.data) {
          setExperts(response.data);
        }
      } catch (err) {
        setError('Failed to load experts');
      }
    };
    fetchExperts();
  }, []);

  // Update available slots when expert or date changes
  const selectedDate = watch('date');
  const selectedExpertId = watch('expertId');

  useEffect(() => {
    if (selectedExpertId && selectedDate) {
      const expert = experts.find(e => e.id === selectedExpertId);
      if (expert) {
        setSelectedExpert(expert);
        const dayOfWeek = format(selectedDate, 'EEEE').toLowerCase();
        const slots = expert.availability.find(a => a.day === dayOfWeek)?.slots || [];
        setAvailableSlots(slots);
      }
    }
  }, [selectedDate, selectedExpertId, experts]);

  const onSubmit = async (data: BookingForm) => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await api.bookings.create(token, {
        expertId: data.expertId,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        duration: data.duration,
      });

      if (!response.success) {
        throw new Error(response.error || 'Booking failed');
      }

      router.push('/bookings');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl"
      >
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Book a Consultation</CardTitle>
            <CardDescription>
              Schedule a consultation with one of our experts
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Expert Selection */}
              <div className="space-y-2">
                <Label htmlFor="expertId">Select Expert</Label>
                <Select
                  onValueChange={(value: string) => setValue('expertId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an expert" />
                  </SelectTrigger>
                  <SelectContent>
                    {experts.map((expert) => (
                      <SelectItem key={expert.id} value={expert.id}>
                        {expert.name} - {expert.specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expertId && (
                  <p className="text-sm text-destructive">{errors.expertId.message}</p>
                )}
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={watch('date')}
                  onSelect={(date: Date | undefined) => date && setValue('date', date)}
                  disabled={(date: Date) => {
                    // Disable past dates and dates where expert is not available
                    return date < new Date() || (
                      selectedExpert?.availability.every(
                        a => a.day !== format(date, 'EEEE').toLowerCase()
                      ) ?? true
                    );
                  }}
                  className="rounded-md border"
                />
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date.message}</p>
                )}
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2">
                <Label htmlFor="time">Select Time Slot</Label>
                <Select
                  onValueChange={(value: string) => setValue('time', value)}
                  disabled={availableSlots.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={availableSlots.length === 0 ? 'Select date first' : 'Choose a time'} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && (
                  <p className="text-sm text-destructive">{errors.time.message}</p>
                )}
              </div>

              {/* Duration Selection */}
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select
                  onValueChange={(value: string) => setValue('duration', parseInt(value))}
                  defaultValue="30"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
                {errors.duration && (
                  <p className="text-sm text-destructive">{errors.duration.message}</p>
                )}
              </div>

              {selectedExpert && (
                <div className="rounded-lg bg-muted p-4">
                  <p className="font-medium">Expert Details</p>
                  <p className="text-sm text-muted-foreground">Experience: {selectedExpert.experience} years</p>
                  <p className="text-sm text-muted-foreground">Rating: {selectedExpert.rating}/5</p>
                  <p className="text-sm font-medium text-primary">Price: ${selectedExpert.price}/hour</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Booking...' : 'Book Consultation'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
} 