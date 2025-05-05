import React from 'react'
import { Landing } from './pages/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import PrivateComponent from './components/privateComponent'

const App = () => {
  return (
    <>
  
  <BrowserRouter>
  <Navbar />
  <Routes>
  <Route path="/" element={<Landing />} />
  <Route path='/register' element ={<Register />} />
  <Route path='/login' element ={<Login />} />
  <Route element={<PrivateComponent />}>
  <Route path='/profile' element ={<Profile />} />
  <Route path='/admin' element ={<Admin />} />
  </Route>
  </Routes>
  <ToastContainer />
  <Footer />
  </BrowserRouter>
    
    </>
  )
}

export default App