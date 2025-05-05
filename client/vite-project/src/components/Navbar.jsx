import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../Features/auth/authslice'
import { resetProfile } from '../Features/userprofile/profileslice'


const Navbar = () => {

    const {user} = useSelector(state => state.auth)
    const dispatch  = useDispatch()
    const navigate = useNavigate()

      const handleLogout = () => {
        dispatch(resetProfile());
        dispatch(logoutUser());                          
        navigate("/login");                
      };


  return (
    <nav className="px-4 py-5 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-blue-500" />
          <Link to={"/"} className="ml-2 text-2xl font-bold text-white">Admin-User-Hub</Link>
        </div>
        <div className="space-x-4">
         {
            !user ?(
            <>
             <Link
            to="/login"
            className="px-6 py-2 text-white hover:text-blue-400 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
            </>):(
                <>
                <button onClick={handleLogout}
            
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
            </>)
         }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
