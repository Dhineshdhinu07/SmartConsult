'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, Clock, Calendar } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { fadeUpVariant } from '@/app/components/animations/shared';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: 'expert' | 'time' | 'service';
  confidence: number;
  icon: React.ReactNode;
  action: () => void;
}

export function SmartSuggestions() {
  const [suggestions] = useState<Suggestion[]>([
    {
      id: '1',
      title: 'Dr. Sarah Reynolds',
      description: 'Based on your symptoms, we recommend this cardiologist',
      type: 'expert',
      confidence: 0.92,
      icon: <Brain className="w-4 h-4" />,
      action: () => console.log('Booking with Dr. Reynolds...'),
    },
    {
      id: '2',
      title: 'Tomorrow at 10:00 AM',
      description: 'Optimal time slot based on your schedule',
      type: 'time',
      confidence: 0.85,
      icon: <Clock className="w-4 h-4" />,
      action: () => console.log('Scheduling for tomorrow...'),
    },
    {
      id: '3',
      title: 'Video Consultation',
      description: 'Recommended based on your location and urgency',
      type: 'service',
      confidence: 0.78,
      icon: <Calendar className="w-4 h-4" />,
      action: () => console.log('Setting up video consultation...'),
    },
  ]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-success text-success-foreground';
    if (confidence >= 0.7) return 'bg-warning text-warning-foreground';
    return 'bg-secondary text-secondary-foreground';
  };

  const formatConfidence = (confidence: number) => {
    return `${Math.round(confidence * 100)}%`;
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
            <Sparkles className="w-5 h-5" />
            Smart Suggestions
          </CardTitle>
          <CardDescription>
            AI-powered recommendations based on your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {suggestions.map(suggestion => (
              <motion.div
                key={suggestion.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                      {suggestion.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className="text-xs capitalize"
                        >
                          {suggestion.type}
                        </Badge>
                        <Badge
                          className={`text-xs ${getConfidenceColor(
                            suggestion.confidence
                          )}`}
                        >
                          {formatConfidence(suggestion.confidence)} match
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={suggestion.action}
                    className="shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4" />
              How It Works
            </h4>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes your medical history, preferences, and schedule to
              provide personalized suggestions. The confidence score indicates how
              well each suggestion matches your needs.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 