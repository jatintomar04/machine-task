const express = require('express');
const { getAllUsers, getUserById, updateUserByAdmin, deleteUser } = require('../controllers/adminController');
const { adminProtect } = require('../middlewares/adminMiddleware');

const router = express.Router();


router.use(adminProtect);

// Admin Routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserByAdmin);
router.delete('/users/:id', deleteUser);

module.exports = router;
