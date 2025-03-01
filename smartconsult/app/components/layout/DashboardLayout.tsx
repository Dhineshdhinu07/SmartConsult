'use client'

import { TopNav } from '../navigation/TopNav';
import { Sidebar } from '../navigation/Sidebar';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import type { User } from '@/app/types/api';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles?: Array<User['role']>;
  requireAuth?: boolean;
}

export function DashboardLayout({ 
  children,
  allowedRoles = ['user', 'admin'],
  requireAuth = true
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <ProtectedRoute allowedRoles={allowedRoles} requireAuth={requireAuth}>
      <div className="min-h-screen bg-background">
        <TopNav />
        {!isHomePage && <Sidebar />}
        <main className={!isHomePage ? "pl-64 pt-16" : "pt-16"}>
          <div className="max-w-7xl mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 