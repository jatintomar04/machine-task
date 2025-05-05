import axios from "axios";

// getUser

const  getUser = async (token) => {
   

    const options = {
       headers : {
          authorization: `Bearer ${token}`  
       }
    }
 
    const response = await axios.get(`/api/user/profile` , options)
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
   const response = await axios.put('/api/user/profile', formData, options);
   return response.data; 
 };

//  profile upload

 const updatePic = async (formData, token) => {
   const options = {
     headers: {
       authorization: `Bearer ${token}`,
     },
   };
   const response = await axios.post('/api/user/profile', formData, options);

   return response.data; 
 };


//  getall users
 
const  getalluserProfile = async (token) => {
   

   const options = {
      headers : {
         authorization: `Bearer ${token}`  
      }
   }

   const response = await axios.get(`/api/admin/users` , options)


   return response.data
};


// get single user by ID
const getUserById = async (id, token) => {
  
   const options = {
     headers: {
       authorization: `Bearer ${token}`
     }
   };
 
   const response = await axios.get(`/api/admin/users/${id}`, options);
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
 
   const response = await axios.delete(`/api/admin/users/${id}`, options);
   return response.data;
 };


 const profileService = {getUser,getUserById,updateUser, updatePic, getalluserProfile, deleteUser}

 export default profileService