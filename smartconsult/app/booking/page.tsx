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

const timeSlots = [
  { id: 1, time: '09:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: true },
  { id: 3, time: '11:00 AM', available: false },
  { id: 4, time: '02:00 PM', available: true },
  { id: 5, time: '03:00 PM', available: true },
  { id: 6, time: '04:00 PM', available: false },
];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: 'Select Date & Time' },
    { number: 2, title: 'Consultation Details' },
    { number: 3, title: 'Review & Confirm' },
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
          <div className="flex items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= step.number
                      ? 'bg-primary text-background'
                      : 'bg-foreground/10 text-foreground/50'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`ml-2 ${
                    currentStep >= step.number
                      ? 'text-foreground'
                      : 'text-foreground/50'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="mx-4 w-20 h-[1px] bg-foreground/20" />
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
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="w-full"
                          onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Available Time Slots</label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            className={`p-2 rounded-md text-sm flex items-center justify-center gap-2 ${
                              slot.available
                                ? selectedTime === slot.time
                                  ? 'bg-primary text-background'
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
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Topic</label>
                      <Input placeholder="What would you like to discuss?" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        placeholder="Please provide more details about your consultation needs..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Communication</label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2">
                          <Video className="w-4 h-4" />
                          Video Call
                        </Button>
                        <Button variant="outline" className="gap-2">
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
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <p className="text-foreground/70">
                          {selectedDate?.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Time</label>
                        <p className="text-foreground/70">{selectedTime}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Expert</label>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold">SJ</span>
                        </div>
                        <div>
                          <p className="font-medium">Dr. Sarah Johnson</p>
                          <p className="text-sm text-foreground/70">Senior Tax Consultant</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Service</label>
                      <p className="text-foreground/70">Income Tax Consultation - Basic Plan</p>
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
            <Card className="p-6">
              <h3 className="text-lg font-[600] mb-4 text-glow">Booking Summary</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Service</label>
                  <p className="text-foreground/70">Income Tax Consultation</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <p className="text-foreground/70">45 minutes</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <p className="text-2xl font-bold text-primary">$99</p>
                </div>
                <div className="pt-4 border-t border-foreground/10">
                  <h4 className="font-medium mb-2">What's Included:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Initial tax assessment
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Basic tax planning advice
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Document review
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Simple query resolution
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 