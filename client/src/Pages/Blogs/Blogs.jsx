import React from 'react';
import { useAuth } from '../../Context/AuthProvider';
import './Blogs.scss';

const Blogs = () => {
  const { blogs } = useAuth();
  
  return (
    <div className="blogs-container">
      <h1 className="blogs-title">Our Blog Posts</h1>
      <div className="blogs-grid">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <div className="blog-image-container">
                <img 
                  src={blog.blogImage.url} 
                  alt={blog.title} 
                  className="blog-image"
                />
                <span className="blog-category">{blog.category}</span>
              </div>
              <div className="blog-content">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-about">{blog.about}</p>
                <div className="blog-meta">
                  <div className="admin-info">
                    <img 
                      src={blog.adminPhoto?.url} 
                      alt={blog.adminName} 
                      className="admin-photo"
                    />
                    <span>{blog.adminName}</span>
                  </div>
                  <div className="blog-date">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-blogs">No blogs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;