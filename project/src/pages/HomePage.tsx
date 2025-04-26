import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Logo from '../components/ui/Logo';
import { MessageSquare, Megaphone, Users, BarChart, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary-600" />,
      title: 'File Complaints',
      description: 'Easily submit grievances with detailed information and supporting media.',
    },
    {
      icon: <Megaphone className="h-6 w-6 text-primary-600" />,
      title: 'Track Progress',
      description: 'Follow your complaint through every stage until resolution.',
    },
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: 'Dedicated Support',
      description: 'Field agents assigned to address your concerns in a timely manner.',
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary-600" />,
      title: 'Transparent Process',
      description: 'Gain insights into complaint handling statistics and resolution times.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  Your Voice Matters <br />
                  <span className="text-accent-300">Be Heard. Get Resolved.</span>
                </h1>
                <p className="mt-4 text-lg text-primary-100 max-w-lg">
                  Aavaaz streamlines the complaint resolution process between citizens and government agencies, ensuring your concerns are heard and addressed efficiently.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <motion.button
                    className="btn bg-white text-primary-700 hover:bg-gray-100 focus:ring-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/register')}
                  >
                    Register Now
                  </motion.button>
                  <motion.button
                    className="btn btn-outline border-white text-white hover:bg-primary-800"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div
                className="hidden md:block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src="https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Aavaaz - Government Complaint System" 
                  className="w-full rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                How Aavaaz Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our platform simplifies the complaint resolution process with a citizen-first approach.
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-center items-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-md mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-primary-600 rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Ready to get your concerns addressed?
                </h2>
                <p className="text-primary-100 mb-8 max-w-3xl">
                  Join thousands of citizens who have successfully resolved their grievances through our platform. File your first complaint today and experience the difference.
                </p>
                <motion.button
                  className="btn bg-white text-primary-700 hover:bg-gray-100 inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center">
                <Logo className="mr-2" />
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  © 2023 Aavaaz. All rights reserved.
                </p>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;