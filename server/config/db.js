const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Database URI:', process.env.MONGODB_URI ? 'URI is set' : 'URI is not set');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmedia');
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error message:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('🔧 Troubleshooting tips:');
      console.log('1. Make sure MongoDB is running locally, OR');
      console.log('2. Update MONGODB_URI in .env with your MongoDB Atlas connection string');
      console.log('3. Check if your IP is whitelisted in MongoDB Atlas');
    } else if (error.message.includes('ETIMEDOUT') || error.message.includes('ENOTFOUND')) {
      console.log('🔧 Troubleshooting tips for Atlas connection:');
      console.log('1. Check if your IP address is whitelisted in MongoDB Atlas Network Access');
      console.log('2. Verify your username and password are correct');
      console.log('3. Make sure your cluster is running and accessible');
      console.log('4. Check your internet connection');
    }
    
    console.log('⏳ Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
