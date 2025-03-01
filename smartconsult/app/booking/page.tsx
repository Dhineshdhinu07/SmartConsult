'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Calendar, Clock, Video, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Calendar as CalendarComponent } from '@/app/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { Badge } from '@/app/components/ui/badge';

const timeSlots = [
  { id: 1, time: '09:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: true },
  { id: 3, time: '11:00 AM', available: false },
  { id: 4, time: '02:00 PM', available: true },
  { id: 5, time: '03:00 PM', available: true },
  { id: 6, time: '04:00 PM', available: false },
];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: 'Select Date & Time', icon: Calendar },
    { number: 2, title: 'Consultation Details', icon: Video },
    { number: 3, title: 'Review & Confirm', icon: CheckCircle2 },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <h1 className="text-3xl font-[700] mb-3 text-glow">Book Your Consultation</h1>
          <p className="text-foreground/70 font-secondary text-lg">
            Schedule a consultation with our experts at your convenience
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    currentStep >= step.number
                      ? 'bg-primary text-background'
                      : 'bg-foreground/10 text-foreground/50'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`ml-2 font-medium ${
                    currentStep >= step.number
                      ? 'text-foreground'
                      : 'text-foreground/50'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="mx-4 w-20 h-[2px] bg-foreground/20 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <motion.div
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-[600] mb-6 text-glow">Select Date & Time</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Date</label>
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => setSelectedDate(date)}
                        className="rounded-md border"
                        disabled={(date) => 
                          date < new Date() || 
                          date > addDays(new Date(), 30)
                        }
                      />
                    </div>
                    {selectedDate && (
                      <div className="animate-in fade-in slide-in-from-top-4">
                        <label className="block text-sm font-medium mb-4">
                          Available Time Slots for {format(selectedDate, 'MMMM d, yyyy')}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              className={`p-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors ${
                                slot.available
                                  ? selectedTime === slot.time
                                    ? 'bg-primary text-background shadow-lg'
                                    : 'bg-primary/10 hover:bg-primary/20'
                                  : 'bg-foreground/5 text-foreground/40 cursor-not-allowed'
                              }`}
                              onClick={() => slot.available && setSelectedTime(slot.time)}
                              disabled={!slot.available}
                            >
                              <Clock className="w-4 h-4" />
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-[600] mb-6 text-glow">Consultation Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Topic</label>
                      <Input 
                        placeholder="What would you like to discuss?"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        placeholder="Please provide more details about your consultation needs..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Communication</label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          className={`gap-2 h-12 ${
                            selectedTime ? 'bg-primary/10 border-primary' : ''
                          }`}
                        >
                          <Video className="w-4 h-4" />
                          Video Call
                          {selectedTime && (
                            <Badge variant="secondary" className="ml-auto">
                              Recommended
                            </Badge>
                          )}
                        </Button>
                        <Button variant="outline" className="gap-2 h-12">
                          <Calendar className="w-4 h-4" />
                          In-Person
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-[600] mb-6 text-glow">Review Your Booking</h2>
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6 p-4 rounded-lg bg-primary/5">
                      <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <p className="text-lg">
                          {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Time</label>
                        <p className="text-lg flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {selectedTime}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Expert</label>
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/10">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-lg">SJ</span>
                        </div>
                        <div>
                          <p className="font-medium text-lg">Dr. Sarah Johnson</p>
                          <p className="text-sm text-foreground/70">Senior Tax Consultant</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">4.9 ★</Badge>
                            <span className="text-sm text-foreground/70">500+ consultations</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Service</label>
                        <p className="text-lg">Income Tax Consultation - Basic Plan</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Duration</label>
                        <p className="text-lg">45 minutes</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Communication</label>
                        <p className="text-lg flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Video Call
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <div className="mt-6 flex justify-between">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                className="ml-auto"
                onClick={() =>
                  currentStep < 3
                    ? setCurrentStep(currentStep + 1)
                    : console.log('Submit booking')
                }
              >
                {currentStep === 3 ? 'Confirm Booking' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-[600] mb-4 text-glow">Booking Summary</h3>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-primary/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Consultation Fee</span>
                    <span className="text-xl font-semibold">$150</span>
                  </div>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <div className="flex items-center justify-between">
                      <span>Base Fee</span>
                      <span>$150</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Platform Fee</span>
                      <span>Included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tax</span>
                      <span>Included</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>45-minute video consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>24-hour cancellation policy</span>
                  </div>
                </div>

                {currentStep === 3 && (
                  <div className="pt-4 border-t">
                    <Button className="w-full" size="lg">
                      Confirm and Pay
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-xs text-center text-foreground/70 mt-3">
                      By confirming, you agree to our Terms of Service and Cancellation Policy
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 