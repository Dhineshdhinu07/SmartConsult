'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Bell,
  Shield,
  Video,
  Mic,
  Globe,
  Moon,
  Sun,
  Palette,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';

interface SettingsState {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    reminderFrequency: string;
  };
  security: {
    twoFactorAuth: boolean;
    biometricLogin: boolean;
    sessionTimeout: string;
  };
  consultation: {
    defaultVideoQuality: 'HD' | 'SD';
    autoMuteOnJoin: boolean;
    showPreviewBeforeJoin: boolean;
  };
  accessibility: {
    fontSize: string;
    contrast: string;
    reduceMotion: boolean;
  };
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      push: true,
      sms: false,
      reminderFrequency: '24h',
    },
    security: {
      twoFactorAuth: true,
      biometricLogin: false,
      sessionTimeout: '30m',
    },
    consultation: {
      defaultVideoQuality: 'HD',
      autoMuteOnJoin: true,
      showPreviewBeforeJoin: true,
    },
    accessibility: {
      fontSize: 'medium',
      contrast: 'normal',
      reduceMotion: false,
    },
    language: 'english',
    theme: 'system',
  });

  const handleNotificationChange = (
    key: keyof typeof settings.notifications,
    value: boolean | string
  ) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handleSecurityChange = (
    key: keyof typeof settings.security,
    value: boolean | string
  ) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value,
      },
    }));
  };

  const handleConsultationChange = (
    key: keyof typeof settings.consultation,
    value: boolean | string
  ) => {
    setSettings(prev => ({
      ...prev,
      consultation: {
        ...prev.consultation,
        [key]: value,
      },
    }));
  };

  const handleAccessibilityChange = (
    key: keyof typeof settings.accessibility,
    value: boolean | string
  ) => {
    setSettings(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [key]: value,
      },
    }));
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your platform preferences and configurations
              </p>
            </div>
            <Button>Save Changes</Button>
          </div>

          <Tabs defaultValue="notifications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="consultation">Consultation</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Manage how you receive notifications and reminders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates via email
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={value =>
                          handleNotificationChange('email', value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive browser notifications
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={value =>
                          handleNotificationChange('push', value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive text message alerts
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.sms}
                        onCheckedChange={value =>
                          handleNotificationChange('sms', value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-medium">Reminder Frequency</label>
                      <Select
                        value={settings.notifications.reminderFrequency}
                        onValueChange={value =>
                          handleNotificationChange('reminderFrequency', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1 hour before</SelectItem>
                          <SelectItem value="3h">3 hours before</SelectItem>
                          <SelectItem value="12h">12 hours before</SelectItem>
                          <SelectItem value="24h">24 hours before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={value =>
                          handleSecurityChange('twoFactorAuth', value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Biometric Login</p>
                        <p className="text-sm text-muted-foreground">
                          Use fingerprint or face recognition
                        </p>
                      </div>
                      <Switch
                        checked={settings.security.biometricLogin}
                        onCheckedChange={value =>
                          handleSecurityChange('biometricLogin', value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-medium">Session Timeout</label>
                      <Select
                        value={settings.security.sessionTimeout}
                        onValueChange={value =>
                          handleSecurityChange('sessionTimeout', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15m">15 minutes</SelectItem>
                          <SelectItem value="30m">30 minutes</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="4h">4 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="consultation">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Consultation Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your video consultation preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="font-medium">Default Video Quality</label>
                      <Select
                        value={settings.consultation.defaultVideoQuality}
                        onValueChange={value =>
                          handleConsultationChange('defaultVideoQuality', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HD">HD Quality</SelectItem>
                          <SelectItem value="SD">SD Quality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-mute on Join</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically mute microphone when joining
                        </p>
                      </div>
                      <Switch
                        checked={settings.consultation.autoMuteOnJoin}
                        onCheckedChange={value =>
                          handleConsultationChange('autoMuteOnJoin', value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Preview</p>
                        <p className="text-sm text-muted-foreground">
                          Preview video before joining
                        </p>
                      </div>
                      <Switch
                        checked={settings.consultation.showPreviewBeforeJoin}
                        onCheckedChange={value =>
                          handleConsultationChange('showPreviewBeforeJoin', value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accessibility">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Accessibility Settings
                  </CardTitle>
                  <CardDescription>
                    Customize your viewing experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="font-medium">Font Size</label>
                      <Select
                        value={settings.accessibility.fontSize}
                        onValueChange={value =>
                          handleAccessibilityChange('fontSize', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-medium">Contrast</label>
                      <Select
                        value={settings.accessibility.contrast}
                        onValueChange={value =>
                          handleAccessibilityChange('contrast', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select contrast" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High Contrast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Reduce Motion</p>
                        <p className="text-sm text-muted-foreground">
                          Minimize animations
                        </p>
                      </div>
                      <Switch
                        checked={settings.accessibility.reduceMotion}
                        onCheckedChange={value =>
                          handleAccessibilityChange('reduceMotion', value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={settings.language}
                  onValueChange={value =>
                    setSettings(prev => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={settings.theme}
                  onValueChange={value =>
                    setSettings(prev => ({
                      ...prev,
                      theme: value as 'light' | 'dark' | 'system',
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 