// Assuming you have a User model

const User = require("../Model/userModel");
const cloudinary = require('cloudinary').v2;



const register = async (req, res) => {
    if (!req.files || Object.keys(req.files).length===0) {
        return res.status(400).json({message:"user photo required"})
        
    }

    const {photo} =req.files;
    const allowedFormates =["jpg","png","webp"]
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

    // Create new user
    const newUser = new User({
      email,
      name,
      password, // Note: You should hash the password before saving (see below)
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

    // Return success response (you might want to omit sensitive data)
    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

module.exports = { register };
