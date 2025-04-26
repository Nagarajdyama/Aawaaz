import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, CheckCircle, Clock, ArrowRight, 
  Calendar, MoreHorizontal, AlertTriangle 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getAgentComplaints, updateComplaint, Complaint } from '../../utils/complaints';
import StatusBadge from '../../components/ui/StatusBadge';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AgentDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      if (user) {
        try {
          const data = await getAgentComplaints(user.id);
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

  const handleUpdateStatus = async (complaintId: string, newStatus: 'in-progress' | 'resolved') => {
    try {
      const updatedComplaint = await updateComplaint(complaintId, { status: newStatus });
      
      setComplaints(complaints.map(complaint => 
        complaint.id === complaintId ? updatedComplaint : complaint
      ));
      
      toast.success(`Complaint status updated to ${newStatus === 'in-progress' ? 'In Progress' : 'Resolved'}`);
    } catch (error) {
      toast.error('Failed to update complaint status');
      console.error('Error updating complaint status:', error);
    }
  };

  // Dashboard stats
  const totalAssigned = complaints.length;
  const inProgress = complaints.filter(c => c.status === 'in-progress').length;
  const pending = complaints.filter(c => c.status === 'assigned').length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Field Agent Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your assigned complaints</p>
        </div>
        <motion.div
          className="mt-4 sm:mt-0 flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm text-gray-600 dark:text-gray-300">Available for new assignments</span>
          <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer transition-colors duration-200">
            <input type="checkbox" className="peer sr-only" id="toggle" />
            <label 
              htmlFor="toggle" 
              className="block w-full h-full rounded-full cursor-pointer"
            >
              <span 
                className="absolute left-1 top-1 block h-4 w-4 rounded-full bg-white transition-transform duration-200 transform peer-checked:translate-x-6 peer-checked:bg-white dark:peer-checked:bg-white"
              ></span>
              <span 
                className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700 peer-checked:bg-primary-600"
              ></span>
            </label>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full">
              <FileText size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assigned</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalAssigned}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-warning-100 dark:bg-warning-900 text-warning-600 dark:text-warning-400 rounded-full">
              <AlertTriangle size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">New Assignments</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 rounded-full">
              <Clock size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{inProgress}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-400 rounded-full">
              <CheckCircle size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{resolved}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Assigned Complaints */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Assigned Complaints</h2>
          <div className="flex items-center text-sm text-primary-600 dark:text-primary-400 cursor-pointer">
            <Link to="/assigned-complaints" className="flex items-center">
              <span>View All</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <motion.div
              className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : complaints.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Complaint
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {complaints.slice(0, 5).map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                            {complaint.imageUrl ? (
                              <img src={complaint.imageUrl} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <FileText size={16} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {complaint.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {complaint.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={complaint.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex space-x-2">
                          {complaint.status === 'assigned' && (
                            <button
                              onClick={() => handleUpdateStatus(complaint.id, 'in-progress')}
                              className="text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-300"
                            >
                              Start
                            </button>
                          )}
                          {complaint.status === 'in-progress' && (
                            <button
                              onClick={() => handleUpdateStatus(complaint.id, 'resolved')}
                              className="text-success-600 hover:text-success-900 dark:text-success-400 dark:hover:text-success-300"
                            >
                              Resolve
                            </button>
                          )}
                          <Link 
                            to={`/assigned-complaints/${complaint.id}`}
                            className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 dark:text-gray-300">No complaints have been assigned to you yet.</p>
          </motion.div>
        )}
      </div>

      {/* Recent Activity */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        
        {complaints.length > 0 ? (
          <div className="space-y-4">
            {complaints.slice(0, 3).map((complaint) => (
              <div 
                key={complaint.id}
                className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                  <Calendar size={18} />
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{complaint.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {complaint.status === 'assigned' 
                      ? 'Newly assigned to you' 
                      : complaint.status === 'in-progress'
                        ? 'You marked as in progress'
                        : 'You resolved this complaint'
                    }
                  </p>
                </div>
                <StatusBadge status={complaint.status} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No recent activity</p>
        )}
      </motion.div>
    </div>
  );
};

export default AgentDashboard;