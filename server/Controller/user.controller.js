// Assuming you have a User model

const User = require("../Model/userModel");
const cloudinary = require('cloudinary').v2;
const bcrypt =require("bcryptjs")
const createTokenAndSaveCookie = require("../jwt/AuthToken");
const { json } = require("express");



const register = async (req, res) => {
    if (!req.files || Object.keys(req.files).length===0) {
        return res.status(400).json({message:"user photo required"})
        
    }

    const {photo} =req.files;
    const allowedFormates =["image/jpg","image/png","image/webp"]
    if (!allowedFormates.includes(photo.mimetype)) {
        return res.status(400).json({message:"only jpg,png,webp format"})
    }
  try {
    const { email, name, password, phoneNo, education, role } = req.body;

    // Check all required fields
    if (!email || !name || !password || !phoneNo || !education || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath
    )
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log(cloudinaryResponse.error);
        
    }

    const hashPassword = await bcrypt.hash(password,10);
    // Create new user
    const newUser = new User({
      email,
      name,
      password:hashPassword, // Note: You should hash the password before saving (see below)
      phoneNo,
      education,
      role,
      photo:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.url
      }
    });

    // Save user to database
    await newUser.save();
if (newUser) {
      const token= await createTokenAndSaveCookie(newUser._id,res);
      console.log(token);
      res.status(201).json({ 
      message: "User registered successfully",
     newUser,token:token
    });
    }

    
    
    // Return success response (you might want to omit sensitive data)
    

    
   
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // 1. Check if all fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Please provide email, password, and role' });
    }

    // 2. Find user by email and role
    const user = await User.findOne({ email, role }).select('+password');;
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    // 3. Compare provided password with stored hash
    
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Create token and set cookie
    const token = await createTokenAndSaveCookie(user._id, res);

    // 5. Send response (excluding sensitive data)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      // include other non-sensitive fields as needed
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'An error occurred during login',
      error: error.message 
    });
  }
};

const logout = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      sameSite: 'strict' // Protection against CSRF
    });

   

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during logout',
      error: error.message
    });
  }
};


const myProfile = async(req,res)=>{
  const user= await req.user;
  res.status(200).json(user);
}

const getAllAdmins= async(req,res)=>{
  const admins = await User.find({role:"admin"})
  res.status(200).json(admins)
}
module.exports = { register,login ,logout,myProfile,getAllAdmins};
