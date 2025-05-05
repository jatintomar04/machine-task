import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        <span className="text-white text-2xl">Loading...</span>
      </div>
    </div>
  )
}

export default Loading