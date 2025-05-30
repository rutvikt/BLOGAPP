import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './UpdateBlog.scss';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    category: '',
    image: '',
  });

  const categories = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Devotion'];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/blogs/single-blogs/${id}`,{withCredentials:true});
        console.log(res);
        
        setBlog({
          title: res.data.title,
          content: res.data.content,
          category: res.data.category,
          image: res.data.image?.url || '',
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        
        toast.error(err.response?.data?.message || 'Failed to fetch blog');
        // navigate('/blogs');
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBlog({ ...blog, image: res.data.url });
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/blogs/update/${id}`, blog, {
       withCredentials:true
      });
      toast.success('Blog updated successfully');
      navigate(`/`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update blog');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="update-blog">
      <div className="update-blog__card">
        <button onClick={() => navigate(-1)} className="update-blog__back-button">
          <FiArrowLeft /> Back
        </button>

        <h2 className="update-blog__title">Update Your Blog</h2>
        
        <form onSubmit={handleSubmit} className="update-blog__form">
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Blog Content</label>
            <textarea
              id="content"
              name="content"
              value={blog.about}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows="8"
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={blog.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <div className="image-upload">
                {blog.image ? (
                  <div className="image-upload__preview">
                    <img src={blog.image} alt="Blog preview" />
                    <label className="image-upload__replace">
                      <FiUpload /> Replace
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        hidden
                      />
                    </label>
                  </div>
                ) : (
                  <label className="image-upload__label">
                    <FiUpload /> Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      hidden
                    />
                  </label>
                )}
                {uploading && <div className="image-upload__status">Uploading...</div>}
              </div>
            </div>
          </div>

          <button type="submit" className="update-blog__submit">
            <FiSave /> Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;