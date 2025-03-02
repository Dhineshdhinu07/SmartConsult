'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  MessageSquare,
  Share2,
  Settings,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { fadeUpVariant } from '@/app/components/animations/shared';

interface VideoControls {
  video: boolean;
  audio: boolean;
  chat: boolean;
  screen: boolean;
}

export function VideoConsultation() {
  const [isConnected, setIsConnected] = useState(false);
  const [controls, setControls] = useState<VideoControls>({
    video: true,
    audio: true,
    chat: false,
    screen: false,
  });
  const [quality, setQuality] = useState<'HD' | 'SD'>('HD');
  const [duration, setDuration] = useState(0);

  const toggleControl = (control: keyof VideoControls) => {
    setControls(prev => ({
      ...prev,
      [control]: !prev[control],
    }));
  };

  const handleConnect = async () => {
    setIsConnected(true);
    // Start duration timer
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto space-y-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Video Consultation
          </CardTitle>
          <CardDescription>
            HD video consultation with your healthcare expert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {/* Main video feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isConnected ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <div className="text-center">
                  <Video className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Waiting to start consultation...
                  </p>
                </div>
              )}
            </div>

            {/* Self view */}
            {isConnected && (
              <div className="absolute bottom-4 right-4 w-48 aspect-video bg-background rounded-lg overflow-hidden border shadow-lg">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
              </div>
            )}

            {/* Call duration */}
            {isConnected && (
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="font-mono">
                  {formatDuration(duration)}
                </Badge>
              </div>
            )}

            {/* Quality indicator */}
            <div className="absolute top-4 right-4">
              <Badge
                variant={quality === 'HD' ? 'default' : 'secondary'}
                className="font-mono"
              >
                {quality}
              </Badge>
            </div>
          </div>

          {/* Expert info */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/expert-avatar.jpg" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Dr. Sarah Reynolds</h3>
                <p className="text-sm text-muted-foreground">Cardiologist</p>
              </div>
            </div>
            <Badge
              variant={isConnected ? 'default' : 'secondary'}
              className="capitalize"
            >
              {isConnected ? 'Connected' : 'Ready to Connect'}
            </Badge>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={controls.audio ? 'default' : 'destructive'}
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={() => toggleControl('audio')}
            >
              {controls.audio ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>

            {isConnected ? (
              <Button
                variant="destructive"
                size="lg"
                className="rounded-full w-16 h-16 p-0"
                onClick={handleDisconnect}
              >
                <Phone className="h-6 w-6 rotate-135" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                className="rounded-full w-16 h-16 p-0 bg-green-500 hover:bg-green-600"
                onClick={handleConnect}
              >
                <Phone className="h-6 w-6" />
              </Button>
            )}

            <Button
              variant={controls.video ? 'default' : 'destructive'}
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={() => toggleControl('video')}
            >
              {controls.video ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Additional controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleControl('chat')}
              className={controls.chat ? 'bg-primary/10' : ''}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleControl('screen')}
              className={controls.screen ? 'bg-primary/10' : ''}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 