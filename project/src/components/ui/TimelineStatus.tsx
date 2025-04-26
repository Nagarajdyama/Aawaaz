import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { ComplaintStatus } from '../../utils/complaints';
import { Check, Clock, User, RotateCw, X } from 'lucide-react';

interface TimelineStatusProps {
  status: ComplaintStatus;
  className?: string;
}

const TimelineStatus: React.FC<TimelineStatusProps> = ({ status, className }) => {
  const steps: { key: ComplaintStatus; label: string; icon: React.ReactNode }[] = [
    { key: 'pending', label: 'Submitted', icon: <Clock size={16} /> },
    { key: 'assigned', label: 'Assigned', icon: <User size={16} /> },
    { key: 'in-progress', label: 'In Progress', icon: <RotateCw size={16} /> },
    { key: 'resolved', label: 'Resolved', icon: <Check size={16} /> },
  ];

  // Find the index of the current status
  let currentStepIndex = steps.findIndex(step => step.key === status);
  
  // Special case for rejected
  const isRejected = status === 'rejected';
  if (isRejected) {
    currentStepIndex = -1; // Will not highlight any regular steps
  }

  return (
    <div className={cn('w-full py-4', className)}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-4 h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isComplete = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.key} className="flex flex-col items-center">
                <motion.div 
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center z-10',
                    isComplete
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  )}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: isCurrent ? 1.1 : 1, 
                    opacity: 1,
                    backgroundColor: isComplete
                      ? 'var(--tw-colors-primary-600)'
                      : 'var(--tw-colors-gray-200)'
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: 'easeOut'
                  }}
                >
                  {step.icon}
                </motion.div>
                <motion.div
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isComplete
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-500 dark:text-gray-400'
                  )}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {step.label}
                </motion.div>
              </div>
            );
          })}
          
          {/* Rejected badge (conditionally rendered) */}
          {isRejected && (
            <motion.div 
              className="absolute top-0 right-0 -mt-2 -mr-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, type: 'spring' }}
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-error-600 text-white flex items-center justify-center z-10">
                  <X size={16} />
                </div>
                <div className="mt-2 text-xs font-medium text-error-600 dark:text-error-400">
                  Rejected
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineStatus;