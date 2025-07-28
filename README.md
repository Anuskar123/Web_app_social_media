# Social Media Web App

A full-stack social media application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🎯 Current Status - Ready for Database Connection!

✅ **Backend Server**: Running on port 5000 (waiting for database)  
✅ **Frontend Client**: Running on port 3000 (fully functional UI)  
✅ **Complete MERN Stack Implementation**: All features ready  
⏳ **Database**: Needs MongoDB Atlas setup (5 minutes)

### 🚀 **NEXT STEP: Complete Database Setup**

**Option 1: MongoDB Atlas (Recommended - 5 minutes):**
1. 📖 **Follow the guide**: Open `MONGODB_SETUP.md` in this project
2. 🌐 **Create account**: Visit https://www.mongodb.com/atlas/database
3. 🔗 **Get connection string** and update `server/.env`
4. 🎉 **Done!** Your app will be fully functional

**Option 2: Local MongoDB:**
```bash
# If you have MongoDB installed locally
net start MongoDB
```

### 🔄 **After Database Connection:**

1. **Restart the server** (it will auto-connect)
2. **Add sample data**:
   ```bash
   cd server
   npm run seed
   ```
3. **Test the app** at http://localhost:3000

### ✨ **What You'll Have:**
- Complete user registration and login
- Create, edit, delete posts
- Like and comment on posts
- User profiles and social interactions
- Professional-grade MERN stack portfolio project

## 🎯 Current Status - Successfully Running!

✅ **Backend Server**: Running on port 5000  
✅ **Frontend Client**: Running on port 3000 (with custom CSS styling)  
✅ **Complete MERN Stack Implementation**: All core features implemented  

### Quick Start (Currently Working)

1. **Backend is running** on http://localhost:5000
2. **Frontend is running** on http://localhost:3000

### ⚠️ Next Step: Database Setup

The app is fully functional except it needs MongoDB to be running. You have two options:

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally and start the service
net start MongoDB
```

**Option 2: MongoDB Atlas (Recommended)**
1. Create a free account at https://mongodb.com/atlas
2. Create a new cluster
3. Get your connection string
4. Update `server/.env` with your MongoDB Atlas URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/socialmedia
```

Once MongoDB is connected, the app will be fully functional with:
- User registration and authentication
- Post creation and management
- Likes and comments
- User profiles and social features

## Features

- ✅ User authentication (registration/login)
- ✅ Create, read, update, and delete posts
- ✅ Like/unlike posts
- ✅ Comment on posts
- ✅ User profiles
- ✅ Follow/unfollow users
- ✅ News feed with chronological posts
- ✅ Responsive design with Tailwind CSS

## Technology Stack

### Frontend
- React 19 with TypeScript
- React Router DOM for navigation
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt.js for password hashing
- Multer for file uploads
- Cloudinary for image storage

## Project Structure

```
social-media-app/
├── client/                     # React Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Main application views
│   │   ├── api/                # API service functions
│   │   ├── context/            # React Context providers
│   │   ├── App.tsx             # Main app component
│   │   └── index.tsx           # App entry point
│   └── package.json
└── server/                     # Node.js/Express Backend
    ├── config/                 # Database configuration
    ├── controllers/            # Request handlers
    ├── middleware/             # Custom middleware
    ├── models/                 # Mongoose schemas
    ├── routes/                 # API routes
    ├── utils/                  # Utility functions
    ├── server.js               # Server entry point
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Web_app_social_media
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Environment Setup
Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/socialmedia
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:3000
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend client (in a new terminal)
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts (news feed)
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get specific post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `PUT /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/posts/:id/comments/:commentId` - Delete comment

### Users
- `GET /api/users` - Search users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/:id/follow` - Follow user
- `PUT /api/users/:id/unfollow` - Unfollow user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Real-time notifications with Socket.IO
- [ ] Direct messaging system
- [ ] Image upload functionality with Cloudinary
- [ ] Search functionality
- [ ] User suggestions
- [ ] Post sharing
- [ ] Stories feature
- [ ] Dark mode
- [ ] Mobile app with React Native
