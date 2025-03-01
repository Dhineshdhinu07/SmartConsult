'use client';

import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

// Import your Lottie JSON files
import successAnimation from '@/public/animations/success.json';
import errorAnimation from '@/public/animations/error.json';
import loadingAnimation from '@/public/animations/loading.json';

type AnimationType = 'success' | 'error' | 'loading';

interface LottieWrapperProps {
  type: AnimationType;
  size?: number;
  loop?: boolean;
  className?: string;
}

const animations = {
  success: successAnimation,
  error: errorAnimation,
  loading: loadingAnimation,
};

export function LottieWrapper({
  type,
  size = 120,
  loop = false,
  className,
}: LottieWrapperProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={className}
      style={{ width: size, height: size }}
    >
      <Lottie
        animationData={animations[type]}
        loop={loop}
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
} 