import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { useAuth } from '../../Context/AuthProvider';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const{setAuthenicated,isAuthenticated,profile} =useAuth();
  console.log(profile?.user);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Blog</span>
          <span className="logo-dot">.</span>
        </Link>

        {/* Mobile menu button */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
          <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
          <span className={isMenuOpen ? 'bar open' : 'bar'}></span>
        </div>

        {/* Navigation Links */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blogs" className="nav-link" onClick={toggleMenu}>
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/creators" className="nav-link" onClick={toggleMenu}>
              Creators
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={toggleMenu}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link dashboard-link" onClick={toggleMenu}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link login-link" onClick={toggleMenu}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;