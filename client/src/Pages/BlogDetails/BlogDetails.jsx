import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlogDetails.scss';
import { FaCalendarAlt, FaUser, FaBookOpen, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/blogs/single-blogs/${id}`,{ withCredentials:true});
        setBlog(response.data); // Axios stores the response data in .data property
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="not-found">Blog not found</div>;
  }

  return (
    <div className="blog-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back to Blogs
      </button>

      <article className="blog-article">
        <header className="blog-header">
          <div className="blog-meta">
            <span className="blog-category" style={{ backgroundColor: '#FADA7A' }}>
              <FaBookOpen /> {blog.category}
            </span>
            <div className="meta-items">
              <span><FaUser /> {blog.adminName}</span>
              <span><FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-excerpt">{blog.about}</p>
        </header>

        <div className="blog-image-container">
          <img 
            src={blog.blogImage.url} 
            alt={blog.title} 
            className="blog-featured-image"
          />
        </div>

        <div className="blog-content">
          <div className="content-wrapper">
            <p className="blog-text">
              {blog.content || /* Add default content if blog.content doesn't exist */
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris..."}
            </p>
            {/* Add more content paragraphs as needed */}
          </div>

          <div className="author-info">
            <div className="author-image">
              <img 
                src={blog.adminPhoto.url} 
                alt={blog.adminName} 
              />
            </div>
            <div className="author-details">
              <h3>About the Author</h3>
              <p>{blog.adminName}</p>
              <p>Specializes in {blog.category} related content</p>
            </div>
          </div>
        </div>
      </article>

      {/* Rest of your component remains the same */}
    </div>
  );
};

export default BlogDetails;