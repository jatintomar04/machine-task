const User = require('../models/userModel');
const path = require('path');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Fix profilePicture path
    if (user.profilePicture) {
      user.profilePicture = `${baseUrl}/${user.profilePicture.replace(/\\/g, "/")}`;
    }

    // // Fix each document path
    if (Array.isArray(user.documents)) {
      user.documents = user.documents.map((doc) =>
        `${baseUrl}/${doc.replace(/\\/g, "/")}`
      );
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Handle file upload (profile picture or PDF document)
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const filePath = req.file.path; // The file path where the file is stored
    const fileType = path.extname(filePath).toLowerCase();

    // Save file details to user profile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (fileType === '.jpg' || fileType === '.png') {
      user.profilePicture = filePath;
    } else if (fileType === '.pdf') {
      user.documents.push(filePath); // Assuming `documents` is an array in the user schema
    }

    await user.save();
    res.json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, updateUserProfile, uploadProfilePicture };
