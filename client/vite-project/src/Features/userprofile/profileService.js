import axios from "axios";
import { API_URL } from "../../config";

// getUser

const  getUser = async (token) => {
   

    const options = {
       headers : {
          authorization: `Bearer ${token}`  
       }
    }
 
    const response = await axios.get(`${API_URL}/api/user/profile` , options)
    localStorage.setItem("singleUser", JSON.stringify(response.data));
    return response.data
 };


//  update user 


 const updateUser = async (formData, token) => {
   const options = {
     headers: {
       authorization: `Bearer ${token}`,
     },
   };
   const response = await axios.put(`${API_URL}/api/user/profile`, formData, options);
   return response.data; 
 };

//  profile upload

 const updatePic = async (formData, token) => {
   const options = {
     headers: {
       authorization: `Bearer ${token}`,
     },
   };
   const response = await axios.post(`${API_URL}/api/user/profile`, formData, options);

   return response.data; 
 };


//  getall users
 
const  getalluserProfile = async (token) => {
   

   const options = {
      headers : {
         authorization: `Bearer ${token}`  
      }
   }

   const response = await axios.get(`${API_URL}/api/admin/users` , options)


   return response.data
};


// get single user by ID
const getUserById = async (id, token) => {
  
   const options = {
     headers: {
       authorization: `Bearer ${token}`
     }
   };
 
   const response = await axios.get(`${API_URL}/api/admin/users/${id}`, options);
   localStorage.setItem("singleUser", JSON.stringify(response.data));
   return response.data;
 };
 
 //delete user by ID
const deleteUser = async (id, token) => {
   const options = {
     headers: {
       authorization: `Bearer ${token}`
     }
   };
 
   const response = await axios.delete(`${API_URL}/api/admin/users/${id}`, options);
   return response.data;
 };


 const profileService = {getUser,getUserById,updateUser, updatePic, getalluserProfile, deleteUser}

 export default profileService