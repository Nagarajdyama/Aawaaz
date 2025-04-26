import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserComplaints, Complaint } from '../../utils/complaints';
import ComplaintCard from '../../components/ui/ComplaintCard';

const CitizenDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      if (user) {
        try {
          const data = await getUserComplaints(user.id);
          setComplaints(data);
        } catch (error) {
          console.error('Error fetching complaints:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchComplaints();
  }, [user]);

  // Dashboard stats
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => ['pending', 'assigned', 'in-progress'].includes(c.status)).length;
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Here's an overview of your complaints</p>
        </div>
        <motion.button
          className="btn btn-primary mt-4 sm:mt-0 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/file-complaint')}
        >
          <Plus className="mr-2 h-4 w-4" />
          File New Complaint
        </motion.button>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full">
              <FileText size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Complaints</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalComplaints}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-warning-100 dark:bg-warning-900 text-warning-600 dark:text-warning-400 rounded-full">
              <FileText size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Complaints</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingComplaints}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-400 rounded-full">
              <CheckCircle size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved Complaints</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{resolvedComplaints}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Complaints */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Complaints</h2>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <motion.div
              className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : complaints.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {complaints.slice(0, 6).map((complaint) => (
              <motion.div key={complaint.id} variants={itemVariants}>
                <ComplaintCard complaint={complaint} linkTo={`/complaints/${complaint.id}`} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 dark:text-gray-300">You haven't filed any complaints yet.</p>
            <button
              onClick={() => navigate('/file-complaint')}
              className="btn btn-primary mt-4"
            >
              File Your First Complaint
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;