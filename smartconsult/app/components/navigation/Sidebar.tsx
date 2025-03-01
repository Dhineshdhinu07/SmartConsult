import Link from 'next/link';
import { 
  HomeIcon, 
  CalendarIcon, 
  VideoIcon, 
  UserIcon, 
  SettingsIcon 
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: HomeIcon },
  { href: '/bookings', label: 'Bookings', icon: CalendarIcon },
  { href: '/consultations', label: 'Consultations', icon: VideoIcon },
  { href: '/profile', label: 'Profile', icon: UserIcon },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r">
      <div className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-3 rounded-md text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-secondary">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
} 