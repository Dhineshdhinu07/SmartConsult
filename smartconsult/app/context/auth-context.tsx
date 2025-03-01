'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/api-client';
import type { User } from '@/app/types/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Check authentication status
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const response = await api.auth.me(token);
      setState(prev => ({
        ...prev,
        user: response.data || null,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setState(prev => ({
        ...prev,
        user: null,
        isLoading: false,
        error: 'Authentication failed',
      }));
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      const response = await api.auth.login({ email, password });
      const token = response.data?.token;
      
      if (!token) {
        throw new Error('No token received');
      }

      localStorage.setItem('token', token);
      const userResponse = await api.auth.me(token);
      
      setState(prev => ({
        ...prev,
        user: userResponse.data || null,
        error: null,
      }));
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.removeItem('token');
      setState(prev => ({
        ...prev,
        user: null,
        error: error instanceof Error ? error.message : 'Login failed. Please try again.',
      }));
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await api.auth.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setState(prev => ({
        ...prev,
        user: null,
        error: null,
      }));
      router.push('/auth/login');
    }
  };

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Refresh user data periodically
  useEffect(() => {
    if (!state.user) return;

    const interval = setInterval(() => {
      checkAuth();
    }, 15 * 60 * 1000); // Every 15 minutes

    return () => clearInterval(interval);
  }, [state.user]);

  const value = {
    ...state,
    isAuthenticated: !!state.user,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 