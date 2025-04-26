import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import { Complaint } from '../../utils/complaints';
import StatusBadge from './StatusBadge';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface ComplaintCardProps {
  complaint: Complaint;
  linkTo?: string;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, linkTo }) => {
  const Container = linkTo ? Link : motion.div;
  
  return (
    <Container
      to={linkTo || '#'}
      as={linkTo ? Link : undefined}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {complaint.imageUrl && (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={complaint.imageUrl} 
            alt={complaint.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{complaint.title}</h3>
          <StatusBadge status={complaint.status} />
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {complaint.description}
        </p>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{complaint.location}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar size={14} className="mr-1" />
          <span>Filed on {format(new Date(complaint.createdAt), 'MMM d, yyyy')}</span>
        </div>
        
        {linkTo && (
          <div className="mt-4 flex justify-end">
            <ChevronRight size={18} className="text-primary-500 dark:text-primary-400" />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ComplaintCard;