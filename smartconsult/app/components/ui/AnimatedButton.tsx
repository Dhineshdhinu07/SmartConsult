'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '../animations/shared';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function AnimatedButton({
  children,
  className,
  variant = 'default',
  size = 'md',
  isLoading,
  ...props
}: AnimatedButtonProps) {
  const baseStyles = {
    default: 'bg-[#3b82f6] text-white hover:bg-[#2563eb] hover:translate-y-[-2px]',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border-2 border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6]/5',
    ghost: 'hover:bg-primary/10 text-foreground',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-all duration-200',
        baseStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <motion.div
            className="w-4 h-4 border-2 border-current rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
} 