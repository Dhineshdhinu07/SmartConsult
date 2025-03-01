'use client';

import { motion } from 'framer-motion';
import { pageVariants, staggerContainer } from '../animations/shared';

interface AnimatedContainerProps {
  children: React.ReactNode;
}

export function AnimatedContainer({ children }: AnimatedContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
      <motion.div variants={staggerContainer}>
        {children}
      </motion.div>
    </motion.div>
  );
} 