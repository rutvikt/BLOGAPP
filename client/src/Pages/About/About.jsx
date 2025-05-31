import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Our Blog</h1>
          <p>Discover the story behind our passion for sharing knowledge and connecting with readers worldwide.</p>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p>We strive to create meaningful content that educates, inspires, and brings people together through the power of storytelling and technology.</p>
          <div className="mission-cards">
            <div className="mission-card">
              <div className="icon-box" style={{ backgroundColor: '#FADA7A' }}>
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Inspire</h3>
              <p>Spark creativity and new ideas through thought-provoking articles.</p>
            </div>
            <div className="mission-card">
              <div className="icon-box" style={{ backgroundColor: '#F0A04B' }}>
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Educate</h3>
              <p>Share valuable knowledge across various technology topics.</p>
            </div>
            <div className="mission-card">
              <div className="icon-box" style={{ backgroundColor: '#B1C29E' }}>
                <i className="fas fa-users"></i>
              </div>
              <h3>Connect</h3>
              <p>Build a community of like-minded individuals passionate about tech.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: '#F0A04B' }}>
                <span>M</span>
              </div>
              <h3>Model</h3>
              <p>Founder & Lead Writer</p>
              <p>Graduation in Computer Science with 5+ years of blogging experience.</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <h3>Authenticity</h3>
              <p>We believe in genuine, well-researched content that provides real value.</p>
            </div>
            <div className="value-item">
              <h3>Quality</h3>
              <p>Every article goes through rigorous review before publication.</p>
            </div>
            <div className="value-item">
              <h3>Community</h3>
              <p>Our readers are at the heart of everything we do.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;