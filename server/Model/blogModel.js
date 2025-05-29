const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  blogImage: {
    public_id: {
      type: String,
      required: [true, 'Image public_id is required']
    },
    url: {
      type: String,
      required: [true, 'Image URL is required']
    }
  },
  
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Technology', 'Health', 'Travel', 'Food', 'Lifestyle', 'Education','Devotion'],
      message: 'Please select correct category'
    }
  },
  about: {
    type: String,
    required: [true, 'About section is required'],
    minlength: [50, 'About should be at least 50 characters'],
    maxlength: [300, 'About cannot exceed 200 characters']
  },
  created: {
    type: Date,
    default: Date.now
  },
  adminName: {
    type: String,
    // required: [true, 'Admin name is required']
  },
  adminPhoto: {
    public_id: {
      type: String,
    //   required: true
    },
    url: {
      type: String,
      // required: true
    }
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Add text index for search functionality
blogSchema.index({ title: 'text', about: 'text', category: 'text' });

module.exports = mongoose.model('Blog', blogSchema);