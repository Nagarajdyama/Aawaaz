import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, MapPin, Calendar, ArrowLeft, 
  MessageSquare, Star as StarIcon
} from 'lucide-react';
import { getAllComplaints, Complaint, updateComplaint } from '../../utils/complaints';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../../components/ui/StatusBadge';
import TimelineStatus from '../../components/ui/TimelineStatus';
import toast from 'react-hot-toast';

const ComplaintDetailPage: React.FC = () => {
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const { complaintId } = useParams<{ complaintId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      if (!complaintId) return;
      
      try {
        const complaints = await getAllComplaints();
        const foundComplaint = complaints.find(c => c.id === complaintId);
        
        if (foundComplaint) {
          setComplaint(foundComplaint);
          setRating(foundComplaint.rating || 0);
        }
      } catch (error) {
        console.error('Error fetching complaint:', error);
        toast.error('Failed to load complaint details');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [complaintId]);

  const handleSubmitRating = async () => {
    if (!complaint || !user) return;
    
    if (complaint.status !== 'resolved') {
      toast.error('You can only rate resolved complaints');
      return;
    }
    
    try {
      const updatedComplaint = await updateComplaint(complaint.id, { 
        rating,
        resolutionNotes: complaint.resolutionNotes 
          ? `${complaint.resolutionNotes}\n\nCitizen feedback: ${feedback}`
          : `Citizen feedback: ${feedback}`,
      });
      
      setComplaint(updatedComplaint);
      toast.success('Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
    }
  };

  const Star = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <StarIcon
        size={24}
        className={filled 
          ? "text-amber-400 fill-amber-400" 
          : "text-gray-300 dark:text-gray-600"
        }
      />
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Complaint Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The complaint you're looking for doesn't exist or you may not have permission to view it.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to complaints
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {/* Complaint Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {complaint.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FileText size={16} className="mr-1" />
                    {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
                  </span>
                  <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="mr-1" />
                    {complaint.location}
                  </span>
                  <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-1" />
                    Filed on {formatDate(complaint.createdAt)}
                  </span>
                </div>
              </div>
              <StatusBadge 
                status={complaint.status} 
                className="mt-4 md:mt-0"
              />
            </div>
          </div>

          {/* Status Timeline */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <TimelineStatus status={complaint.status} />
          </div>

          {/* Complaint Body */}
          <div className="p-6">
            {complaint.imageUrl && (
              <div className="mb-6">
                <img 
                  src={complaint.imageUrl}
                  alt={complaint.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {complaint.description}
              </p>
            </div>

            {complaint.status === 'resolved' && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Resolution
                </h2>
                <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-4">
                  {complaint.resolutionNotes ? (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {complaint.resolutionNotes}
                    </p>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      This complaint has been marked as resolved.
                    </p>
                  )}
                  
                  {complaint.resolutionImages && complaint.resolutionImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {complaint.resolutionImages.map((image, index) => (
                        <img 
                          key={index}
                          src={image}
                          alt={`Resolution image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rating Section (only for resolved complaints and for the citizen who filed it) */}
            {complaint.status === 'resolved' && user && user.id === complaint.userId && (
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  How would you rate the resolution?
                </h2>
                
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      filled={star <= rating}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional feedback (optional)
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    className="input"
                    placeholder="Share your experience with how this complaint was handled..."
                  />
                </div>
                
                <button
                  onClick={handleSubmitRating}
                  className="btn btn-primary"
                  disabled={rating === 0}
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplaintDetailPage;