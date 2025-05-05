const User = require ("../models/userModel")

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({isAdmin : false}).select('-password');
    return res.json(users); // Use return to ensure no further code is executed after this response
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Convert image path to full URL
    if (user.profilePicture) {
      user.profilePicture = `${req.protocol}://${req.get('host')}/${user.profilePicture.replace(/\\/g, '/')}`;
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update user by Admin
const updateUserByAdmin = async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body; 
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;

    const updatedUser = await user.save();

    return res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    return res.json({ message: 'User deleted successfully' }); // Return after sending response
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, getUserById, updateUserByAdmin, deleteUser };
