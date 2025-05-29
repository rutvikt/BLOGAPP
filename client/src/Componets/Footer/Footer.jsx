import React from 'react';
import './Footer.scss';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-about">
            <h3 className="footer-logo">Blog<span>Verse</span></h3>
            <p className="footer-description">
              Inspiring readers with quality content on technology, lifestyle, and personal growth. 
              Join our community of passionate writers and readers.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="links-column">
              <h4 className="links-title">Quick Links</h4>
              <ul className="links-list">
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog Posts</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="links-column">
              <h4 className="links-title">Categories</h4>
              <ul className="links-list">
                <li><a href="#">Technology</a></li>
                <li><a href="#">Lifestyle</a></li>
                <li><a href="#">Travel</a></li>
                <li><a href="#">Food</a></li>
              </ul>
            </div>

            <div className="links-column">
              <h4 className="links-title">Support</h4>
              <ul className="links-list">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} BlogVerse. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FaHeart className="heart-icon" /> by BlogTeam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;