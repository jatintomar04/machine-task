import React from 'react'
import { Link } from 'react-router-dom';
import { Users, Shield, BarChart } from 'lucide-react';
import { useSelector } from 'react-redux';

export const Landing = () => {

  const { user } = useSelector((state) => state.auth);
   const { singleProfile } = useSelector((state) => state.profile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Welcome to User-Admin Dashboard
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          A powerful and intuitive dashboard for managing users and administrative tasks. Built with modern technologies for optimal performance.
        </p>
        <div className="flex justify-center space-x-6">
         

{user ? (
  user.isAdmin ? (
    <Link
      to="/Admin"
      className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
    >
      All Users
    </Link>
  ) : (
    <Link
      to="/profile"
      className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
    >
      Your Profile
    </Link>
  )
) : (
  <>
    <Link
      to="/login"
      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
    >
      Get Started
    </Link>
    <Link
      to="/register"
      className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
    >
      Sign Up
    </Link>
  </>
)}

        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">User Management</h3>
          <p className="text-gray-400">
            Efficiently manage users, roles, and permissions with our intuitive interface.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">Secure Access</h3>
          <p className="text-gray-400">
            Advanced security features to protect your data and control access levels.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
            <BarChart className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">Analytics</h3>
          <p className="text-gray-400">
            Comprehensive analytics and reporting tools to track user activity.
          </p>
        </div>
      </div>
    </div>

  </div>
  )
}

