import React from 'react';
import { useAuth } from '../Context/AuthProvider';
import './Devotional.scss';

const Devotional = () => {
  const { blogs } = useAuth();
  const devotionBlogs = blogs?.filter(blog => blog.category === "Devotion") || [];

  return (
    <section className="devotional">
      <div className="devotional-header">
        <h2 className="section-title">Daily Devotionals</h2>
        <p className="section-subtitle">Nourish your spirit with these uplifting messages</p>
      </div>

      {devotionBlogs.length > 0 ? (
        <div className="devotional-grid">
          {devotionBlogs.map((blog) => (
            <div key={blog.id} className="devotional-card">
              <div className="card-image">
                <img 
                  src={blog.blogImage?.url} 
                  alt={blog.title} 
                  loading="lazy"
                />
                <div className="image-overlay"></div>
                <span className="category-badge">Devotion</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">{blog.title}</h3>
                <div className="card-footer">
                  <button className="read-btn">Read Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-devotionals">
          <p>No devotionals available at the moment</p>
        </div>
      )}
    </section>
  );
};

export default Devotional;