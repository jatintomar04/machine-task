import React from 'react'
import useAuthStatus from '../hook/useAuthStatus'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from './Loading'

const PrivateComponent = () => {
  
  const {loggedIn, checkUser} = useAuthStatus()
  if(checkUser){
    return <Loading />
  }

  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;


}

export default PrivateComponent