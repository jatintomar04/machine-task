import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getalluser } from '../Features/userprofile/profileslice';
import Alluser from '../components/Alluser';

const Admin = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getalluser());
  },[dispatch]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Admin Panel</h2>

        {/* User Table */}
        <table className="min-w-full text-left text-sm text-gray-400">
          <thead>
            <tr>
              <th className="px-6 py-4 font-medium text-white">ID</th>
              <th className="px-6 py-4 font-medium text-white">Name</th>
              <th className="px-6 py-4 font-medium text-white">Email</th>
              <th className="px-6 py-4 font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
           <Alluser />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
