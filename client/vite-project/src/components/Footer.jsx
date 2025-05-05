import React from 'react'
import {Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800  ">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-white">Admin-User-Hub</span>
          </div>
          <div className="text-gray-400">
            © {new Date().getFullYear()} AdminHub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer