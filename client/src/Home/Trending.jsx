import React, { useState, useEffect } from 'react';
import { useAuth } from "../Context/AuthProvider";
import "./Trending.scss";

const Trending = () => {
    const { blogs } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const trendingBlogs = blogs?.slice(0, 6) || [];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === trendingBlogs.length - slidesToShow ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? trendingBlogs.length - slidesToShow : prevIndex - 1
        );
    };

    return (
        <section className="trending">
            <div className="trending-header">
                <h2 className="trending-title">Trending Now</h2>
                <div className="trending-controls">
                    <button className="control-btn prev" onClick={prevSlide}>
                        &lt;
                    </button>
                    <button className="control-btn next" onClick={nextSlide}>
                        &gt;
                    </button>
                </div>
            </div>

            <div className="trending-carousel">
                <div 
                    className="carousel-track" 
                    style={{ 
                        transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
                        width: `${(trendingBlogs.length / slidesToShow) * 100}%`
                    }}
                >
                    {trendingBlogs.map((blog) => (
                        <div key={blog.id} className="trending-card">
                            <div className="card-image">
                                <img 
                                    src={blog.blogImage?.url} 
                                    alt={blog.title} 
                                    loading="lazy"
                                />
                                <div className="card-tag">
                                    {blog.tags?.[0] && <span>{blog.tags[0]}</span>}
                                </div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{blog.title}</h3>
                                <div className="card-meta">
                                    <div className="admin-info">
                                        <img 
                                            src={blog.adminPhoto} 
                                            alt={blog.adminName} 
                                            className="admin-avatar"
                                        />
                                        <span className="admin-name">{blog.adminName}</span>
                                    </div>
                                    <span className="trending-badge">Trending</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trending;