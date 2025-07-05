import React from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import netlifyIdentity from 'netlify-identity-widget';

export default function LoginPage() {
  const handleLogin = () => {
    netlifyIdentity.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-black text-white px-8 py-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 15 }}
            className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UserIcon className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Sign in to access your dashboard</p>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Access your submissions and content management system
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors duration-200"
          >
            <LockClosedIcon className="w-5 h-5" />
            <span>Sign In with Netlify Identity</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-500">
              Secure authentication powered by Netlify Identity
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}