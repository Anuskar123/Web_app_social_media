const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
  getUsers,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// @route   GET /api/users
router.get('/', protect, getUsers);

// @route   GET /api/users/:id
router.get('/:id', protect, getUserProfile);

// @route   PUT /api/users/profile
router.put('/profile', protect, updateUserProfile);

// @route   PUT /api/users/:id/follow
router.put('/:id/follow', protect, followUser);

// @route   PUT /api/users/:id/unfollow
router.put('/:id/unfollow', protect, unfollowUser);

module.exports = router;
