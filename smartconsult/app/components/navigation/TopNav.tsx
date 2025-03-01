'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { User } from 'lucide-react';
import { ThemeToggle } from '../theme/theme-toggle';

export function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-sans font-[700] text-xl">SmartConsult</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-foreground/80 hover:text-primary font-secondary">
              Dashboard
            </Link>
            <Link href="/booking" className="text-foreground/80 hover:text-primary font-secondary">
              Bookings
            </Link>
            <Link href="/consultations" className="text-foreground/80 hover:text-primary font-secondary">
              Consultations
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="relative">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 