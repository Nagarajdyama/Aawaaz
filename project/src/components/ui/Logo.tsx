import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <motion.div
      className={cn("flex items-center", className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-center bg-primary-600 text-white p-2 rounded-lg mr-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={20} />
      </motion.div>
      {showText && (
        <motion.h1 
          className="text-2xl font-brand text-primary-700 dark:text-primary-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Aavaaz
        </motion.h1>
      )}
    </motion.div>
  );
};

export default Logo;