'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, List, Calendar } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { fadeUpVariant } from '@/app/components/animations/shared';

interface VoiceCommand {
  command: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export function VoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  const commands: VoiceCommand[] = [
    {
      command: 'Book appointment',
      description: 'Schedule a new consultation',
      icon: <Calendar className="w-4 h-4" />,
      action: () => console.log('Booking appointment...'),
    },
    {
      command: 'Show my schedule',
      description: 'View upcoming appointments',
      icon: <List className="w-4 h-4" />,
      action: () => console.log('Showing schedule...'),
    },
    {
      command: 'Start consultation',
      description: 'Begin video consultation',
      icon: <Volume2 className="w-4 h-4" />,
      action: () => console.log('Starting consultation...'),
    },
  ];

  useEffect(() => {
    let recognition: any;

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-ignore
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onerror = (event: any) => {
        setError('Error occurred in recognition: ' + event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase();
        setTranscript(transcript);

        // Check for matching commands
        commands.forEach(cmd => {
          if (transcript.includes(cmd.command.toLowerCase())) {
            setLastCommand(cmd.command);
            cmd.action();
          }
        });
      };
    } else {
      setError('Speech recognition is not supported in this browser.');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      if (isListening) {
        // @ts-ignore
        window.recognition?.stop();
      } else {
        // @ts-ignore
        window.recognition?.start();
      }
    }
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
            <Mic className="w-5 h-5" />
            Voice Commands
          </CardTitle>
          <CardDescription>
            Control the platform using voice commands
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Button
              size="lg"
              variant={isListening ? 'destructive' : 'default'}
              className="rounded-full w-16 h-16 p-0"
              onClick={toggleListening}
            >
              {isListening ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {transcript && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">Transcript:</p>
              <p className="text-sm text-muted-foreground">{transcript}</p>
            </div>
          )}

          {lastCommand && (
            <div className="p-4 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium">Last Command:</p>
              <p className="text-sm text-primary">{lastCommand}</p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-medium">Available Commands</h3>
            <div className="grid gap-4">
              {commands.map(cmd => (
                <div
                  key={cmd.command}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    {cmd.icon}
                  </div>
                  <div>
                    <p className="font-medium">{cmd.command}</p>
                    <p className="text-sm text-muted-foreground">
                      {cmd.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 