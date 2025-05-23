
const { default: mongoose } = require('mongoose');
const Blog = require('../Model/blogModel');
const User = require('../Model/userModel');
const cloudinary = require('cloudinary').v2;

const createBlog = async (req, res) => {
  try {
    const { title, category, about, education } = req.body;
    const blogImage = req.files?.blogImage; // This should be your uploaded file

    // 1. Validate required fields
    if (!title || !category || !about) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and about are required fields'
      });
    }

    // 2. Validate about length
    if (about.length < 50) {
      return res.status(400).json({
        success: false,
        message: 'About must be at least 50 characters'
      });
    }

    // 3. Validate authentication
    // if (!req.user || !req.user._id) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Unauthorized - Please log in to create a blog'
    //   });
    // }

    // 4. Validate blog image upload
    if (!blogImage || !blogImage.tempFilePath) {
      return res.status(400).json({
        success: false,
        message: 'Valid blog image is required'
      });
    }

    // 5. Upload BLOG IMAGE to Cloudinary (not adminPhoto)
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath, // Use blogImage, not adminPhoto
      {
        folder: 'blog-images',
        quality: 'auto:good'
      }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({
        success: false,
        message: 'Error uploading blog image to Cloudinary'
      });
    }

    // 6. Prepare user data (admin photo comes from user profile, not upload)
    // const user = req.user;
    // console.log(user);

    // const adminPhoto = user?.photo || {
    //   public_id: 'default/default_photo',
    //   url: 'https://example.com/default-profile.jpg'
    // };

    // 7. Create blog data
    const blogData = {
      title,
      category,
      about,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url
      },
      adminName: req?.user?.name,
      adminPhoto: req?.user?.photo, // From user profile, not file upload
      createdBy: req?.user?._id,
      // education: education || 'Graduation'
    };

    // 8. Save to database
    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });

  } catch (error) {
    console.error('Blog creation error:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "blog not found" })
  }

  await blog.deleteOne();
  res.status(200).json({ message: "blog delete succesfully" })
}

const getAllBlogs = async (req, res) => {
  const allBlog = await Blog.find();
  res.status(200).json(allBlog)
}

const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid blog" });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(400).json({ message: "blog not found" })
  }

  res.status(200).json(blog)
}

const getMyblogs = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const myBlogs = await Blog.find({ createdBy });
    res.status(200).json(myBlogs)
  } catch (error) {
    console.log(error);

  }
}

const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid blog  id" });
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  if (!updateBlog) {
    return res.status(404).json({ message: "blog not found" })
  }

  return res.status(200).json(updateBlog);
};

module.exports = { createBlog, deleteBlog, getAllBlogs, getSingleBlogs, getMyblogs, updateBlog };