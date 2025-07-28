const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB Atlas connection...');
console.log('Connection string format check:', process.env.MONGODB_URI ? 'MONGODB_URI is set' : 'MONGODB_URI is missing');

// Test connection with different timeout settings
const testConnection = async () => {
  try {
    console.log('\n🔄 Attempting connection...');
    
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      bufferCommands: false
    };
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log('✅ SUCCESS! Connected to MongoDB Atlas');
    console.log('📊 Database:', conn.connection.name);
    console.log('🖥️  Host:', conn.connection.host);
    console.log('📡 Port:', conn.connection.port);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      message: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('ConnectionTest', testSchema);
    
    const testDoc = new TestModel({
      message: 'Connection test successful!'
    });
    
    await testDoc.save();
    console.log('✅ Test document saved successfully');
    
    // Clean up
    await TestModel.deleteMany({});
    console.log('🧹 Test document cleaned up');
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    if (error.message.includes('ETIMEDOUT') || error.message.includes('queryTxt ETIMEOUT')) {
      console.log('\n🔧 This is likely a network access issue. Please check:');
      console.log('1. 📍 Your IP address is whitelisted in MongoDB Atlas Network Access');
      console.log('2. 🌐 Your internet connection is stable');
      console.log('3. 🔐 Your username and password are correct');
      console.log('4. 🏢 Corporate firewall is not blocking MongoDB Atlas (port 27017)');
    }
    
    process.exit(1);
  }
};

testConnection();
