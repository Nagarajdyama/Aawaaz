import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, FilePlus, FileCheck, FileWarning, 
  Users, Calendar, ArrowRight, Download 
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  getAllComplaints, 
  getComplaintStatistics, 
  getMonthlyComplaintTrends,
  Complaint,
  ComplaintCategory
} from '../../utils/complaints';

const AdminDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    pending: number;
    assigned: number;
    inProgress: number;
    resolved: number;
    rejected: number;
    byCategory: Record<ComplaintCategory, number>;
  } | null>(null);
  const [monthlyTrends, setMonthlyTrends] = useState<{ month: string; complaints: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsData, statsData, trendsData] = await Promise.all([
          getAllComplaints(),
          getComplaintStatistics(),
          getMonthlyComplaintTrends(),
        ]);
        
        setComplaints(complaintsData);
        setStats(statsData);
        setMonthlyTrends(trendsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare data for pie chart
  const pieChartData = stats ? [
    { name: 'Pending', value: stats.pending, color: '#F59E0B' },
    { name: 'Assigned', value: stats.assigned, color: '#0EA5E9' },
    { name: 'In Progress', value: stats.inProgress, color: '#6366F1' },
    { name: 'Resolved', value: stats.resolved, color: '#22C55E' },
    { name: 'Rejected', value: stats.rejected, color: '#EF4444' },
  ] : [];

  // Prepare data for category bar chart
  const categoryChartData = stats ? Object.entries(stats.byCategory).map(
    ([category, count]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      count,
    })
  ) : [];

  return (
    <div className="space-y-6">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Monitor and manage complaints across the system</p>
        </div>
        <motion.button
          className="btn btn-primary mt-4 sm:mt-0 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </motion.button>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-12">
          <motion.div
            className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <>
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
                  <FilePlus size={20} />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Complaints</h2>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats?.total || 0}</p>
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
                  <FileWarning size={20} />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</h2>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats?.pending || 0}</p>
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
                <div className="flex items-center justify-center w-12 h-12 bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-400 rounded-full">
                  <FileCheck size={20} />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</h2>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats?.resolved || 0}</p>
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
                <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 rounded-full">
                  <Users size={20} />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Field Agents</h2>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Complaint Status Distribution */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Complaint Status Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Monthly Trends */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Complaint Trends</h2>
                <div className="flex items-center text-sm text-primary-600 dark:text-primary-400 cursor-pointer">
                  <span>View All</span>
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyTrends}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="complaints" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Category Distribution */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Complaints by Category</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0EA5E9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              <div className="flex items-center text-sm text-primary-600 dark:text-primary-400 cursor-pointer">
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
            
            <div className="space-y-4">
              {complaints.slice(0, 5).map((complaint) => (
                <div 
                  key={complaint.id}
                  className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    <Calendar size={18} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{complaint.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Filed on {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;