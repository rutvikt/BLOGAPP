import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyBlogs.scss';

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/blogs/my-blog", { withCredentials: true });
        setMyBlogs(data.blogs || data); // Handle both formats
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch your blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:5001/api/blogs/delete/${blogId}`, { withCredentials: true });
        setMyBlogs(myBlogs.filter(blog => blog._id !== blogId));
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete blog');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="my-blogs-container">
      <h1>Your Blog Posts</h1>
      
      {myBlogs.length === 0 ? (
        <div className="no-blogs">
          <img src="/images/no-blogs.svg" alt="No blogs" />
          <h3>You haven't created any blogs yet</h3>
          <Link to="/create-blog" className="create-btn">
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <div className="blogs-grid">
          {myBlogs.map(blog => (
            <div key={blog._id} className="blog-card">
              <div className="blog-image">
                <img 
                  src={blog.blogImage?.url || 'https://via.placeholder.com/300x200?text=No+Image'} 
                  alt={blog.title} 
                />
              </div>
              <div className="blog-content">
                <div className="category-tag">{blog.category}</div>
                <h2>{blog.title}</h2>
                <p className="admin-name">By: {blog.adminName}</p>
                <p className="blog-about">{blog.about}</p>
                <div className="blog-actions">
                  <Link 
                    to={`/update-blog/${blog._id}`} 
                    className="update-btn"
                  >
                    Update
                  </Link>
                  <button 
                    onClick={() => handleDelete(blog._id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;