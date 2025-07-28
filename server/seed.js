const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Post = require('./models/Post');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create sample users
    const users = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 12),
        bio: 'Software developer who loves coding and coffee ☕',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com', 
        password: await bcrypt.hash('password123', 12),
        bio: 'Designer & photographer 📸 Capturing life\'s beautiful moments',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
      },
      {
        username: 'mike_wilson',
        email: 'mike@example.com',
        password: await bcrypt.hash('password123', 12),
        bio: 'Travel enthusiast 🌍 Always exploring new places',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      },
      {
        username: 'sarah_jones',
        email: 'sarah@example.com',
        password: await bcrypt.hash('password123', 12),
        bio: 'Food lover 🍕 Sharing my culinary adventures',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create sample posts
    const posts = [
      {
        user: createdUsers[0]._id,
        content: 'Just finished building an amazing social media app! 🚀 #coding #webdev',
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop'
      },
      {
        user: createdUsers[1]._id,
        content: 'Beautiful sunset from my evening walk 🌅 Nature never fails to amaze me!',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
      },
      {
        user: createdUsers[2]._id,
        content: 'Exploring the mountains this weekend! The view from up here is incredible 🏔️ #hiking #adventure',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
      },
      {
        user: createdUsers[3]._id,
        content: 'Made homemade pizza tonight! 🍕 Nothing beats fresh ingredients and good company',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop'
      },
      {
        user: createdUsers[0]._id,
        content: 'Great day at the local tech meetup! Met so many talented developers 👨‍💻👩‍💻'
      },
      {
        user: createdUsers[1]._id,
        content: 'Working on a new photography project. Here\'s a sneak peek! 📷✨',
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop'
      }
    ];

    const createdPosts = await Post.insertMany(posts);
    console.log(`✅ Created ${createdPosts.length} posts`);

    // Add some likes and comments
    await Post.findByIdAndUpdate(createdPosts[0]._id, {
      $push: { 
        likes: [createdUsers[1]._id, createdUsers[2]._id],
        comments: [
          {
            user: createdUsers[1]._id,
            text: 'This looks amazing! Can\'t wait to try it out 😍',
            createdAt: new Date()
          }
        ]
      }
    });

    await Post.findByIdAndUpdate(createdPosts[1]._id, {
      $push: { 
        likes: [createdUsers[0]._id, createdUsers[2]._id, createdUsers[3]._id],
        comments: [
          {
            user: createdUsers[0]._id,
            text: 'Absolutely gorgeous! 📸',
            createdAt: new Date()
          },
          {
            user: createdUsers[2]._id,
            text: 'I love sunset photos! This is perfect 🌅',
            createdAt: new Date()
          }
        ]
      }
    });

    // Add some follows
    await User.findByIdAndUpdate(createdUsers[0]._id, {
      $push: { following: [createdUsers[1]._id, createdUsers[2]._id] }
    });
    
    await User.findByIdAndUpdate(createdUsers[1]._id, {
      $push: { 
        followers: [createdUsers[0]._id],
        following: [createdUsers[0]._id, createdUsers[3]._id]
      }
    });

    await User.findByIdAndUpdate(createdUsers[2]._id, {
      $push: { followers: [createdUsers[0]._id, createdUsers[1]._id] }
    });

    console.log('✅ Added interactions (likes, comments, follows)');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Sample Account Credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: jane@example.com | Password: password123'); 
    console.log('Email: mike@example.com | Password: password123');
    console.log('Email: sarah@example.com | Password: password123');
    console.log('\n🌐 You can now login with any of these accounts at http://localhost:3000');

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding
seedData();
