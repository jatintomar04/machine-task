import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  deleteuser, getalluser, getuser } from '../Features/userprofile/profileslice'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const Alluser = () => {
   
      const {allprofiles, isLoading} = useSelector((state)=> state.profile)

         
      const dispatch = useDispatch()
      const navigate = useNavigate()


        // Handle deleting a user
        const handleDelete = (id) => {
            dispatch(deleteuser(id)).then(() => {
              dispatch(getalluser());
            });
          };
      const handleEdit = (id) => {
     dispatch(getuser(id));
      navigate('/profile'); 
   };

   if(isLoading) {
    <Loading />
   }

  return (
    <>
    {allprofiles.map((user) => (
        <tr key={user._id}  className="border-b border-gray-700">
          <td className="px-6 py-4">{user._id}</td>
          <td className="px-6 py-4">{user.name}</td>
          <td className="px-6 py-4">{user.email}</td>
          <td className="px-6 py-4 flex gap-2">
            <button
              onClick={() => handleEdit(user._id)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      </>
  )
}

export default Alluser