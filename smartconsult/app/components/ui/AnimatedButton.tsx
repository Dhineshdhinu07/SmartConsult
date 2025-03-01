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
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'hover:bg-primary/10 text-foreground',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      className={cn(
        'rounded-md font-[500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        baseStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
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