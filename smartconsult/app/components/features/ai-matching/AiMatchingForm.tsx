'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Bot, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { fadeUpVariant } from '@/app/components/animations/shared';

const matchingSchema = z.object({
  specialization: z.string().min(1, 'Please select a specialization'),
  urgency: z.string().min(1, 'Please select urgency level'),
  description: z.string().min(10, 'Please provide more details about your needs'),
  preferredLanguage: z.string().min(1, 'Please select preferred language'),
  experienceLevel: z.string().min(1, 'Please select preferred experience level'),
});

type MatchingForm = z.infer<typeof matchingSchema>;

export function AiMatchingForm() {
  const [isMatching, setIsMatching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MatchingForm>({
    resolver: zodResolver(matchingSchema),
  });

  const onSubmit = async (data: MatchingForm) => {
    setIsMatching(true);
    // TODO: Implement AI matching logic
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
    setIsMatching(false);
  };

  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Expert Matching
          </CardTitle>
          <CardDescription>
            Let our AI find the perfect expert for your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Specialization</label>
              <Select {...register('specialization')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Consultation</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                </SelectContent>
              </Select>
              {errors.specialization && (
                <p className="text-sm text-destructive">{errors.specialization.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Urgency Level</label>
              <Select {...register('urgency')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Within a week</SelectItem>
                  <SelectItem value="medium">Medium - Within 48 hours</SelectItem>
                  <SelectItem value="high">High - Within 24 hours</SelectItem>
                  <SelectItem value="emergency">Emergency - ASAP</SelectItem>
                </SelectContent>
              </Select>
              {errors.urgency && (
                <p className="text-sm text-destructive">{errors.urgency.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                {...register('description')}
                placeholder="Please describe your medical concerns or requirements..."
                className="min-h-[100px]"
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Language</label>
              <Select {...register('preferredLanguage')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                </SelectContent>
              </Select>
              {errors.preferredLanguage && (
                <p className="text-sm text-destructive">{errors.preferredLanguage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Experience Level</label>
              <Select {...register('experienceLevel')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Experience Level</SelectItem>
                  <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                  <SelectItem value="mid">Mid-Level (4-7 years)</SelectItem>
                  <SelectItem value="senior">Senior (8+ years)</SelectItem>
                  <SelectItem value="expert">Expert/Specialist</SelectItem>
                </SelectContent>
              </Select>
              {errors.experienceLevel && (
                <p className="text-sm text-destructive">{errors.experienceLevel.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isMatching}
            >
              {isMatching ? (
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 animate-spin" />
                  Finding your perfect match...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Find Expert Match
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
} 