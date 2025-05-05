import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getprofile, updateProfile, uploadProfileImage } from '../Features/userprofile/profileslice';
import Loading from '../components/Loading';

const Profile = () => {
  const { isLoading, isError, message, singleProfile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if(!user.isAdmin){
      dispatch(getprofile()); 
    }  
    if (isError && message) {
          toast.error(message);
        }
  }, [user, navigate, dispatch, isError, message,]);

  useEffect(() => {
    if (singleProfile) {
      setName(singleProfile.name || '');
      setEmail(singleProfile.email || '');
    }
  }, [singleProfile]);

  if (isLoading && !singleProfile){
    return <Loading />
  }

  // Handle profile image upload
  const handleImageUpload = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append('file', profileImage); 
      
       dispatch(uploadProfileImage(profileImage))
    
    } else {
      console.log("No image selected.");
    }
  };

  // Handle document upload change
  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentFile(file.name); 
    }
  };

  // Handle save button (for profile update)
  const handleSave = async () => {
    try {
      const updatedData = { name, email }; 

      
      await dispatch(updateProfile(updatedData));

      console.log('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Profile</h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
  <div className="relative">
    <img
      src={
        profileImage 
          ? URL.createObjectURL(profileImage)
          : singleProfile?.profilePicture
            ? singleProfile.profilePicture
            : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
      }
      alt="Profile"
      className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
    />
    <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfileImage(e.target.files[0])}
        className="hidden"
      />
      <span className="text-white text-xs">Edit</span>
    </label>
  </div>
</div>

        {/* Name (Editable) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            
            
        </div>

        {/* Email (Editable) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Document Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Upload Document</label>
          <div className="flex items-center gap-2">
            <label className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              <input
                type="file"
                onChange={handleDocumentChange}
                className="hidden"
              />
              Choose File
            </label>
            {documentFile && (
              <span className="text-gray-300 text-sm truncate">{documentFile}</span>
            )}
          </div> 
        </div>
   {/* view documents */}
   {singleProfile?.documents?.length > 0 && (
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-300 mb-1">Uploaded Documents</label>
    <ul className="space-y-2">
      {singleProfile.documents.map((docUrl, index) => (
        <li key={index}>
          <a
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-600"
          >
            View Document {index + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}

        {/* Toggle Edit/Save */}
        <div className="flex justify-between items-center mt-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={handleImageUpload}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Upload Image
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
