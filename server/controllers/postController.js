const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    const post = new Post({
      author: req.user._id,
      content,
      image: image || '',
    });

    const createdPost = await post.save();
    const populatedPost = await Post.findById(createdPost._id)
      .populate('author', 'username profilePicture')
      .populate('comments.user', 'username profilePicture');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posts (news feed)
// @route   GET /api/posts
// @access  Private
const getPosts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const posts = await Post.find({})
      .populate('author', 'username profilePicture')
      .populate('comments.user', 'username profilePicture')
      .populate('likes.user', 'username')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const count = await Post.countDocuments({});

    res.json({
      posts,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore: page < Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Private
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username profilePicture')
      .populate('comments.user', 'username profilePicture')
      .populate('likes.user', 'username');

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const { content, image } = req.body;

    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this post' });
      }

      post.content = content || post.content;
      post.image = image || post.image;

      const updatedPost = await post.save();
      const populatedPost = await Post.findById(updatedPost._id)
        .populate('author', 'username profilePicture')
        .populate('comments.user', 'username profilePicture');

      res.json(populatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this post' });
      }

      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like/unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      const alreadyLiked = post.likes.find(
        like => like.user.toString() === req.user._id.toString()
      );

      if (alreadyLiked) {
        // Unlike the post
        post.likes = post.likes.filter(
          like => like.user.toString() !== req.user._id.toString()
        );
      } else {
        // Like the post
        post.likes.push({ user: req.user._id });
      }

      await post.save();

      const updatedPost = await Post.findById(post._id)
        .populate('author', 'username profilePicture')
        .populate('comments.user', 'username profilePicture')
        .populate('likes.user', 'username');

      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (post) {
      const comment = {
        user: req.user._id,
        text,
      };

      post.comments.push(comment);
      await post.save();

      const updatedPost = await Post.findById(post._id)
        .populate('author', 'username profilePicture')
        .populate('comments.user', 'username profilePicture')
        .populate('likes.user', 'username');

      res.status(201).json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/posts/:id/comments/:commentId
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      const comment = post.comments.find(
        comment => comment._id.toString() === req.params.commentId
      );

      if (comment) {
        if (comment.user.toString() !== req.user._id.toString()) {
          return res.status(401).json({ message: 'Not authorized to delete this comment' });
        }

        post.comments = post.comments.filter(
          comment => comment._id.toString() !== req.params.commentId
        );

        await post.save();

        const updatedPost = await Post.findById(post._id)
          .populate('author', 'username profilePicture')
          .populate('comments.user', 'username profilePicture')
          .populate('likes.user', 'username');

        res.json(updatedPost);
      } else {
        res.status(404).json({ message: 'Comment not found' });
      }
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get posts by user
// @route   GET /api/posts/user/:userId
// @access  Private
const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'username profilePicture')
      .populate('comments.user', 'username profilePicture')
      .populate('likes.user', 'username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
  getPostsByUser,
};
