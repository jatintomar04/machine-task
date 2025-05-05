import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Features/auth/authslice';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const Login = () => {

    
const {user, isLoading, isError , isSuccess, message} = useSelector(state => state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Local state to handle form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
         dispatch(loginUser(formData))

  };
  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [user, isError, message, navigate]);
  
  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Create one
            </Link>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
