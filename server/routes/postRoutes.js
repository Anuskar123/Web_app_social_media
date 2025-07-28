const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
  getPostsByUser,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// @route   GET /api/posts
// @route   POST /api/posts
router.route('/').get(protect, getPosts).post(protect, createPost);

// @route   GET /api/posts/user/:userId
router.get('/user/:userId', protect, getPostsByUser);

// @route   GET /api/posts/:id
// @route   PUT /api/posts/:id
// @route   DELETE /api/posts/:id
router
  .route('/:id')
  .get(protect, getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

// @route   PUT /api/posts/:id/like
router.put('/:id/like', protect, likePost);

// @route   POST /api/posts/:id/comments
router.post('/:id/comments', protect, addComment);

// @route   DELETE /api/posts/:id/comments/:commentId
router.delete('/:id/comments/:commentId', protect, deleteComment);

module.exports = router;
