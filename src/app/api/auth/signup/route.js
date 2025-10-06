// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // User Schema (same as login)
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, default: 'customer' },
//   cartItems: { type: Object, default: {} },
//   createdAt: { type: Date, default: Date.now },
//   // Add this to your existing user schema in all auth APIs
// wishlistItems: { type: Array, default: [] }
// });

// let isConnected = false;

// async function connectToDatabase() {
//   if (isConnected) {
//     return;
//   }

//   const MONGODB_URI = process.env.MONGODB_URI;
//   if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable');
//   }

//   await mongoose.connect(MONGODB_URI);
//   isConnected = true;
// }

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export async function POST(request) {
//   try {
//     await connectToDatabase();
    
//     const { username, email, password } = await request.json();

//     // Input validation
//     if (!username || !email || !password) {
//       return NextResponse.json(
//         { success: false, error: 'All fields are required' },
//         { status: 400 }
//       );
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { success: false, error: 'Please enter a valid email address' },
//         { status: 400 }
//       );
//     }

//     // Password strength validation
//     if (password.length < 6) {
//       return NextResponse.json(
//         { success: false, error: 'Password must be at least 6 characters long' },
//         { status: 400 }
//       );
//     }

//     // Username validation
//     if (username.length < 3) {
//       return NextResponse.json(
//         { success: false, error: 'Username must be at least 3 characters long' },
//         { status: 400 }
//       );
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({
//       $or: [{ email }, { username }]
//     });

//     if (existingUser) {
//       if (existingUser.email === email) {
//         return NextResponse.json(
//           { success: false, error: 'User with this email already exists' },
//           { status: 400 }
//         );
//       } else {
//         return NextResponse.json(
//           { success: false, error: 'Username already taken' },
//           { status: 400 }
//         );
//       }
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Create user
//     const user = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role: 'customer',
//       cartItems: {},
//       wishlistItems: []
//     });

//     await user.save();

//     // Generate JWT token
//     const JWT_SECRET = process.env.JWT_SECRET;
//     if (!JWT_SECRET) {
//       return NextResponse.json(
//         { success: false, error: 'Server configuration error' },
//         { status: 500 }
//       );
//     }

//     const token = jwt.sign(
//       { 
//         userId: user._id.toString(), 
//         username: user.username,
//         email: user.email,
//         role: user.role
//       },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     // Return user data without password
//     const userResponse = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//       role: user.role,
//       cartItems: user.cartItems,
//       createdAt: user.createdAt,
//       wishlistItems: user.wishlistItems
//     };

//     return NextResponse.json(
//       { 
//         success: true,
//         message: 'User created successfully', 
//         user: userResponse,
//         token: token
//       },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error('Signup error:', error);
    
//     // Handle duplicate key errors
//     if (error.code === 11000) {
//       return NextResponse.json(
//         { success: false, error: 'User with this email or username already exists' },
//         { status: 400 }
//       );
//     }
    
//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return NextResponse.json(
//         { success: false, error: errors.join(', ') },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       { success: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User Schema (same as login)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
  cartItems: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
  wishlistItems: { type: Array, default: [] }
});

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('MONGODB_URI is not defined');
      throw new Error('MONGODB_URI environment variable is missing');
    }

    // Add connection options for better stability
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    });

    isConnected = mongoose.connection.readyState === 1;
    console.log('MongoDB connected successfully');
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const { username, email, password } = await request.json();

    // Input validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Username validation
    if (username.length < 3) {
      return NextResponse.json(
        { success: false, error: 'Username must be at least 3 characters long' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { success: false, error: 'User with this email already exists' },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { success: false, error: 'Username already taken' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: 'customer',
      cartItems: {},
      wishlistItems: []
    });

    await user.save();

    // Generate JWT token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { 
        userId: user._id.toString(), 
        username: user.username,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      cartItems: user.cartItems,
      createdAt: user.createdAt,
      wishlistItems: user.wishlistItems
    };

    return NextResponse.json(
      { 
        success: true,
        message: 'User created successfully', 
        user: userResponse,
        token: token
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'User with this email or username already exists' },
        { status: 400 }
      );
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      );
    }

    // Handle connection errors
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      return NextResponse.json(
        { success: false, error: 'Database connection failed. Please try again.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}