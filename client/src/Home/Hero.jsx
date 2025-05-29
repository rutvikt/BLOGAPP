import React from 'react';
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import "./Hero.scss";

const Hero = () => {
    const { blogs } = useAuth();

    return (
        <section className="hero">
            <div className="hero-container">
                {blogs && blogs.length > 0 ? (
                    blogs.slice(0, 4).map((blog) => (
                        <Link to={`/blog/${blog.id}`} key={blog.id} className="hero-card">
                            <div className="card-image">
                                <img 
                                    src={blog.blogImage.url} 
                                    alt={blog.title} 
                                    loading="lazy"
                                />
                                <div className="card-tag">
                                    {blog.tags?.slice(0, 1).map((tag, index) => (
                                        <span key={index}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{blog.title}</h3>
                                <div className="card-admin">
                                    <img 
                                        src={blog.adminPhoto} 
                                        alt={blog.adminName} 
                                        className="admin-avatar"
                                    />
                                    <span className="admin-name">{blog.adminName}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="no-blogs">No blogs available</div>
                )}
            </div>
        </section>
    );
};

export default Hero;