import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './pages/DashboardLayout';
import CitizenDashboard from './pages/dashboard/CitizenDashboard';
import AgentDashboard from './pages/dashboard/AgentDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import FileComplaintPage from './pages/complaints/FileComplaintPage';
import ComplaintDetailPage from './pages/complaints/ComplaintDetailPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardSelector />} />
              <Route path="citizen" element={<CitizenDashboard />} />
              <Route path="agent" element={<AgentDashboard />} />
              <Route path="admin" element={<AdminDashboard />} />
            </Route>
            
            {/* Complaint Routes */}
            <Route path="/file-complaint" element={<DashboardLayout />}>
              <Route index element={<FileComplaintPage />} />
            </Route>
            
            <Route path="/complaints" element={<DashboardLayout />}>
              <Route index element={<CitizenDashboard />} />
              <Route path=":complaintId" element={<ComplaintDetailPage />} />
            </Route>
            
            <Route path="/assigned-complaints" element={<DashboardLayout />}>
              <Route index element={<AgentDashboard />} />
              <Route path=":complaintId" element={<ComplaintDetailPage />} />
            </Route>
            
            <Route path="/all-complaints" element={<DashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path=":complaintId" element={<ComplaintDetailPage />} />
            </Route>
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
};

// Helper component to route to the correct dashboard based on user role
const DashboardSelector: React.FC = () => {
  const storageUser = localStorage.getItem('aavaaz-user');
  
  if (!storageUser) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const { role } = JSON.parse(storageUser);
    
    switch (role) {
      case 'citizen':
        return <CitizenDashboard />;
      case 'agent':
        return <AgentDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error('Error parsing user:', error);
    return <Navigate to="/login" replace />;
  }
};

export default App;