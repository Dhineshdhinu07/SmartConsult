'use client';

import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Search, Sun, User } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const SmartConsult = () => {
  const { setTheme } = useTheme();

  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col items-center'>
      <header className='w-full flex justify-between items-center px-8 py-4 border-b'>
        <motion.h1 initial='hidden' animate='visible' variants={fadeIn} className='text-2xl font-bold'>
          SmartConsult
        </motion.h1>
        <nav className='space-x-6'>
          <Link href="/dashboard">
            <Button variant='ghost'>Dashboard</Button>
          </Link>
          <Link href="/bookings">
            <Button variant='ghost'>Bookings</Button>
          </Link>
          <Link href="/consultations">
            <Button variant='ghost'>Consultations</Button>
          </Link>
        </nav>
        <div className='flex space-x-4'>
          <Button 
            variant='outline' 
            size='icon' 
            onClick={() => setTheme('dark')}
          >
            <Sun className='w-5 h-5' />
          </Button>
          <Link href="/auth/login">
            <Button variant='outline' size='icon'>
              <User className='w-5 h-5' />
            </Button>
          </Link>
        </div>
      </header>

      <motion.section 
        initial='hidden' animate='visible' variants={fadeIn} 
        className='flex flex-col items-center mt-20 text-center px-6'>
        <h2 className='text-5xl font-bold tracking-tight'>
          <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
            Expert Consultations,
          </span>
          <span> Made Smart</span>
        </h2>
        <p className='text-lg text-muted-foreground mt-4'>
          Connect with top professionals across various fields for personalized guidance and expert advice.
        </p>
        <div className='mt-6 flex space-x-4'>
          <Link href="/auth/register">
            <Button size='lg'>Get Started →</Button>
          </Link>
          <Link href="/experts">
            <Button variant='outline' size='lg'>Browse Experts</Button>
          </Link>
        </div>
      </motion.section>

      <motion.div 
        initial='hidden' animate='visible' variants={fadeIn} 
        className='relative mt-10 w-full max-w-2xl px-6'>
        <Input 
          placeholder='Search for experts, topics, or specialties...' 
          className='rounded-full px-4 py-3 shadow-md'
        />
        <Button size='icon' className='absolute right-3 top-1/2 -translate-y-1/2'>
          <Search className='w-5 h-5' />
        </Button>
      </motion.div>
    </div>
  );
};

export default SmartConsult; 