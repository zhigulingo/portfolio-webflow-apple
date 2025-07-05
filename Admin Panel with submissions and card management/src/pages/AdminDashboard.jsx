import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DocumentTextIcon, 
  CogIcon, 
  ArrowRightOnRectangleIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
// import netlifyIdentity from 'netlify-identity-widget';
import SubmissionsPage from './SubmissionsPage';
import CMSPage from './CMSPage';

const tabs = [
  {
    id: 'submissions',
    name: 'Questionnaire Submissions',
    icon: DocumentTextIcon,
    path: '/',
    description: 'View and manage client questionnaire responses'
  },
  {
    id: 'cms',
    name: 'Content Management',
    icon: CogIcon,
    path: '/cms',
    description: 'Manage portfolio projects and testimonials'
  }
];

export default function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTab = tabs.find(tab => tab.path === location.pathname) || tabs[0];

  const handleLogout = () => {
    // Development mode - just reload the page
    window.location.reload();
    
    /* Production logout - uncomment for production
    netlifyIdentity.logout();
    */
  };

  const handleTabChange = (tab) => {
    navigate(tab.path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Development Mode Notice */}
      <div className="fixed top-4 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-100 border border-amber-300 text-amber-800 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <ExclamationTriangleIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Development Mode</span>
        </motion.div>
      </div>

      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-600">{user?.user_metadata?.full_name || user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabChange(tab)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  currentTab.id === tab.id
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <tab.icon className="w-6 h-6" />
                  <div>
                    <div className="font-medium">{tab.name}</div>
                    <div className={`text-sm ${
                      currentTab.id === tab.id ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {tab.description}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Development Info */}
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">Development Mode</h3>
            <p className="text-xs text-amber-700 mb-3">
              Authentication is bypassed for development. For production deployment, uncomment the authentication code in App.jsx and AdminDashboard.jsx.
            </p>
            <div className="text-xs text-amber-600">
              <p>• Netlify Identity integration ready</p>
              <p>• Decap CMS configured</p>
              <p>• Git Gateway enabled</p>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="font-medium">Exit Dashboard</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bars3Icon className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentTab.name}</h1>
                <p className="text-gray-600">{currentTab.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<SubmissionsPage />} />
            <Route path="/cms" element={<CMSPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}