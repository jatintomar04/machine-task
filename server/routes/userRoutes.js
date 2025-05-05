const express = require('express');
const router = express.Router();
const multer = require('multer');



const { getUserProfile, updateUserProfile, uploadProfilePicture } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Protect all routes with authentication middleware
router.use(authMiddleware);

// Get user profile
router.get('/profile', getUserProfile);

// Update user profile
router.put('/profile', updateUserProfile);

// Upload profile picture and document (PDF)
router.post('/upload', uploadMiddleware.single('file'), uploadProfilePicture);

module.exports = router;
