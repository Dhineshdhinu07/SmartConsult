'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../context/auth-context';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { User } from '@/app/types/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<User['role']>;
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = ['user', 'admin'],
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, error } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && requireAuth) {
      if (!isAuthenticated) {
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // Check role-based access
      if (user && !allowedRoles.includes(user.role)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, router, pathname, requireAuth, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
} 