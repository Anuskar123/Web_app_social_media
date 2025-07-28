const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config();

const sampleUsers = [
  {
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    bio: 'Software developer passionate about technology and innovation.'
  },
  {
    username: 'janedoe',
    email: 'jane@example.com',
    password: 'password123',
    bio: 'Designer and creative thinker. Love creating beautiful user experiences.'
  },
  {
    username: 'alexsmith',
    email: 'alex@example.com',
    password: 'password123',
    bio: 'Entrepreneur and startup enthusiast. Always looking for the next big idea.'
  }
];

const samplePosts = [
  {
    content: "Just built my first MERN stack application! 🚀 Feeling excited about full-stack development.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500"
  },
  {
    content: "Beautiful sunset today! 🌅 Sometimes you need to step away from the code and enjoy nature.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500"
  },
  {
    content: "Working on a new project. The best way to learn is by building something you're passionate about. #coding #webdev"
  },
  {
    content: "Coffee + Code = Perfect Monday morning ☕️💻",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500"
  },
  {
    content: "Just discovered this amazing new JavaScript framework. The developer experience is incredible! Anyone else tried it?"
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmedia');
    console.log('✅ Connected to database');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      
      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`👤 Created user: ${userData.username}`);
    }

    // Create posts
    for (let i = 0; i < samplePosts.length; i++) {
      const post = new Post({
        ...samplePosts[i],
        author: createdUsers[i % createdUsers.length]._id
      });
      
      await post.save();
      console.log(`📝 Created post: "${samplePosts[i].content.substring(0, 30)}..."`);
    }

    // Add some likes and comments
    const posts = await Post.find().populate('author');
    
    for (const post of posts) {
      // Add random likes
      const numLikes = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numLikes; i++) {
        const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
        if (!post.likes.some(like => like.user.toString() === randomUser._id.toString())) {
          post.likes.push({ user: randomUser._id });
        }
      }
      
      // Add random comments
      const comments = [
        "Great post! 👍",
        "Love this! 😍",
        "Thanks for sharing!",
        "This is awesome! 🔥",
        "Totally agree!",
        "Inspiring! 💪"
      ];
      
      const numComments = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numComments; i++) {
        const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
        const randomComment = comments[Math.floor(Math.random() * comments.length)];
        
        post.comments.push({
          user: randomUser._id,
          text: randomComment
        });
      }
      
      await post.save();
    }

    console.log('💬 Added likes and comments');
    console.log('🎉 Database seeding completed successfully!');
    console.log(`👥 Created ${createdUsers.length} users`);
    console.log(`📝 Created ${samplePosts.length} posts`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
