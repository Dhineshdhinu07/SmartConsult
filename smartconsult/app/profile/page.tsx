'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { fadeUpVariant } from '@/app/components/animations/shared';
import { format } from 'date-fns';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user, checkAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      setError(null);
      setSuccess(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      // TODO: Implement API endpoint for updating user profile
      // const response = await api.users.updateProfile(token, data);
      
      // For now, just show a success message
      setSuccess('Profile updated successfully');
      await checkAuth(); // Refresh user data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-3xl font-[700] mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              View and update your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Account Details */}
            <div className="grid gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Role</Label>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Member Since</Label>
                <p className="font-medium">
                  {format(new Date(user.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>

            {/* Update Profile Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>
              Overview of your account activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-2xl font-[700] text-primary">0</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-2xl font-[700] text-primary">0</p>
                <p className="text-sm text-muted-foreground">Completed Sessions</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-2xl font-[700] text-primary">0</p>
                <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 