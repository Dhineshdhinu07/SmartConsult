'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Bell,
  Shield,
  Clock,
  Settings,
  Video
} from 'lucide-react';
import Link from 'next/link';

// Mock user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  joinDate: 'March 2024',
  role: 'user',
  bio: 'Software developer passionate about creating innovative solutions.',
  notifications: true,
  twoFactorAuth: false
};

const recentActivity = [
  {
    type: 'consultation',
    title: 'Tax Planning Session',
    date: '2024-03-15',
    time: '10:00 AM',
    status: 'completed'
  },
  {
    type: 'booking',
    title: 'Business Strategy Meeting',
    date: '2024-03-20',
    time: '02:30 PM',
    status: 'upcoming'
  },
  {
    type: 'consultation',
    title: 'Legal Consultation',
    date: '2024-03-10',
    time: '11:00 AM',
    status: 'completed'
  }
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the user data
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Profile Header */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-[700] text-glow">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Settings className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Profile Info */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="md:col-span-2 space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="min-h-[100px]"
                    />
                  </div>
                  {isEditing && (
                    <Button type="submit" className="w-full">
                      Save Changes
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          {activity.type === 'consultation' ? (
                            <Video className="w-5 h-5 text-primary" />
                          ) : (
                            <Calendar className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {activity.date} at {activity.time}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={activity.status === 'completed' ? 'secondary' : 'default'}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <span className="text-sm font-medium">{userData.joinDate}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">Account Type</span>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {userData.role}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">Notifications</span>
                  </div>
                  <Badge variant={userData.notifications ? 'default' : 'outline'}>
                    {userData.notifications ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">Two-Factor Auth</span>
                  </div>
                  <Badge variant={userData.twoFactorAuth ? 'default' : 'outline'}>
                    {userData.twoFactorAuth ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 