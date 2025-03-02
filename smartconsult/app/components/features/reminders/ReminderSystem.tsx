'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Clock, Settings } from 'lucide-react';
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
import { fadeUpVariant } from '@/app/components/animations/shared';

interface Reminder {
  id: string;
  title: string;
  datetime: Date;
  type: 'appointment' | 'medication' | 'follow-up';
  status: 'pending' | 'sent' | 'acknowledged';
}

export function ReminderSystem() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Cardiology Appointment',
      datetime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      type: 'appointment',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Take Blood Pressure Medicine',
      datetime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      type: 'medication',
      status: 'pending',
    },
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    reminderFrequency: '24h',
  });

  const handleSettingChange = (
    setting: keyof typeof settings,
    value: boolean | string
  ) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  const getStatusColor = (status: Reminder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'sent':
        return 'bg-info text-info-foreground';
      case 'acknowledged':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getReminderIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4" />;
      case 'medication':
        return <Clock className="w-4 h-4" />;
      case 'follow-up':
        return <Bell className="w-4 h-4" />;
      default:
        return null;
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
            <Bell className="w-5 h-5" />
            Smart Reminders
          </CardTitle>
          <CardDescription>
            Never miss an important appointment or medication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Upcoming Reminders</h3>
              {reminders.map(reminder => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getReminderIcon(reminder.type)}
                    <div>
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {reminder.datetime.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(reminder.status)}>
                    {reminder.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={value =>
                      handleSettingChange('emailNotifications', value)
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
                    checked={settings.pushNotifications}
                    onCheckedChange={value =>
                      handleSettingChange('pushNotifications', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={value =>
                      handleSettingChange('smsNotifications', value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Reminder Frequency
                  </label>
                  <Select
                    value={settings.reminderFrequency}
                    onValueChange={value =>
                      handleSettingChange('reminderFrequency', value)
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
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 