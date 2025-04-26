import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Users, BarChart, Settings, Briefcase } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../utils/auth';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  roles: UserRole[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Home',
      icon: <Home size={20} />,
      path: '/',
      roles: ['citizen', 'agent', 'admin'],
    },
    {
      title: 'My Complaints',
      icon: <FileText size={20} />,
      path: '/complaints',
      roles: ['citizen'],
    },
    {
      title: 'File Complaint',
      icon: <FileText size={20} />,
      path: '/file-complaint',
      roles: ['citizen'],
    },
    {
      title: 'Assigned Complaints',
      icon: <Briefcase size={20} />,
      path: '/assigned-complaints',
      roles: ['agent'],
    },
    {
      title: 'All Complaints',
      icon: <FileText size={20} />,
      path: '/all-complaints',
      roles: ['admin'],
    },
    {
      title: 'Field Agents',
      icon: <Users size={20} />,
      path: '/field-agents',
      roles: ['admin'],
    },
    {
      title: 'Analytics',
      icon: <BarChart size={20} />,
      path: '/analytics',
      roles: ['admin'],
    },
    {
      title: 'Settings',
      icon: <Settings size={20} />,
      path: '/settings',
      roles: ['citizen', 'agent', 'admin'],
    },
  ];

  const filteredItems = sidebarItems.filter(
    item => !user || item.roles.includes(user.role)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-[61px] left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-md z-10 border-r border-gray-200 dark:border-gray-700"
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ ease: "easeOut", duration: 0.25 }}
        >
          <div className="p-4">
            <ul className="space-y-2">
              {filteredItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center p-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                      location.pathname === item.path && 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;