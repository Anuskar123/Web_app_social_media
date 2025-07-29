#!/usr/bin/env node

/**
 * SocialConnect Setup Script
 * Run this after setting up your Supabase project
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 SocialConnect Setup\n');

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from template');
    console.log('❗ Please update .env with your Supabase credentials\n');
  } else {
    console.log('❌ .env.example not found');
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Instructions
console.log('📋 Next Steps:');
console.log('');
console.log('1. Create Supabase Account:');
console.log('   → Go to https://supabase.com');
console.log('   → Create new project');
console.log('');
console.log('2. Setup Database:');
console.log('   → Open Supabase SQL Editor');
console.log('   → Run the SQL from DATABASE_SETUP.md');
console.log('');
console.log('3. Update Environment Variables:');
console.log('   → Edit .env file');
console.log('   → Add your Supabase URL and anon key');
console.log('');
console.log('4. Start Development:');
console.log('   → npm start');
console.log('');
console.log('5. Deploy to Vercel:');
console.log('   → Follow DEPLOYMENT_GUIDE.md');
console.log('');
console.log('🎯 Your app will be ready with:');
console.log('   ✓ News Feed with real-time updates');
console.log('   ✓ Search functionality');
console.log('   ✓ Notifications system');
console.log('   ✓ User authentication (ready to enable)');
console.log('   ✓ Free hosting on Vercel');
console.log('   ✓ Free database on Supabase');
console.log('');
console.log('💰 Total cost: $0/month for MVP!');
console.log('');
console.log('📚 Documentation:');
console.log('   → DATABASE_SETUP.md - Database schema');
console.log('   → DEPLOYMENT_GUIDE.md - Deployment instructions');
console.log('   → FEATURES.md - Feature overview');
console.log('');
console.log('🔗 Useful Links:');
console.log('   → Supabase Docs: https://supabase.com/docs');
console.log('   → Vercel Docs: https://vercel.com/docs');
console.log('   → React Router: https://reactrouter.com');
console.log('');
console.log('Happy coding! 🎉');
