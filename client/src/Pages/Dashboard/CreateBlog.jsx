import React, { useState } from 'react';
import './CreateBlog.scss';
import axios from 'axios';
import toast from "react-hot-toast"

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    about: '',
    blogImage: null,
    blogImagePreview: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Devotion',
    'Sports',
    'Coding',
    'Business',
    'Entertainment'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          blogImage: file,
          blogImagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('about', formData.about);
      if (formData.blogImage) {
        formDataToSend.append('blogImage', formData.blogImage);
      }

      const response = await axios.post('http://localhost:5001/api/blogs/create', formDataToSend,{
        
         withCredentials: true,headers:{"Content-Type":"multipart/form-data"}
      });

      toast.success(response.message || "blog created succusfulyy")
    //   const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Blog created successfully!');
      // Reset form
      setFormData({
        title: '',
        category: '',
        about: '',
        blogImage: null,
        blogImagePreview: null
      });
    } catch (err) {
      setError(err.message);
      toast.error(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-blog-container">
      <div className="create-blog-card">
        <div className="form-header">
          <h2>Create New Blog</h2>
          <p>Share your thoughts with the world</p>
        </div>
        
        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="What's your blog about?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <div className="select-wrapper">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="about">Blog Content</label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              required
              rows="8"
              placeholder="Write your amazing content here..."
            ></textarea>
          </div>

          <div className="form-group image-upload">
            <label>Featured Image</label>
            <div className="upload-area">
              {formData.blogImagePreview ? (
                <div className="image-preview">
                  <img src={formData.blogImagePreview} alt="Preview" />
                  <button 
                    type="button" 
                    className="change-image"
                    onClick={() => setFormData({...formData, blogImage: null, blogImagePreview: null})}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="blogImage"
                    name="blogImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="blogImage" className="upload-label">
                    <div className="upload-icon">+</div>
                    <div>Click to upload or drag and drop</div>
                    <div className="upload-hint">PNG, JPG up to 5MB</div>
                  </label>
                </>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Publishing...
              </>
            ) : (
              'Publish Blog'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;