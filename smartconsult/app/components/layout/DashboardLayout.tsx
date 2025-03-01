import { TopNav } from '../navigation/TopNav';
import { Sidebar } from '../navigation/Sidebar';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import type { User } from '../../context/auth-context';

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles?: Array<User['role']>;
  requireAuth?: boolean;
}

export function DashboardLayout({ 
  children,
  allowedRoles = ['user', 'admin', 'expert'],
  requireAuth = true
}: DashboardLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={allowedRoles} requireAuth={requireAuth}>
      <div className="min-h-screen bg-background">
        <TopNav />
        <Sidebar />
        <main className="pl-64 pt-16">
          <div className="max-w-7xl mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 