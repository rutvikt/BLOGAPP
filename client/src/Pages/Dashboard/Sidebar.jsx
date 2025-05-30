import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './Sidebar.scss';
import axios from 'axios';

const Sidebar = ({ activeComponent = 'myBlogs', setActiveComponent }) => {
  const { profile, isAuthenticated ,setAuthenicated} = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (component) => {
    setActiveComponent(component);
    setIsMobileMenuOpen(false);
  };

  const handleLogout =async () => {
    console.log(isAuthenticated);
    try {
      
      const {data}=await axios.get("http://localhost:5001/api/users/logout",{withCredentials:true});
      // setAuthenicated(false)
      console.log(data);
      setAuthenicated(false);
    } catch (error) {
      console.log(error);
      alert(error.response.message,"failed to logout")
      
    }
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <span className="close-icon">✕</span>
        ) : (
          <span className="menu-icon">☰</span>
        )}
      </button>

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar Content */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* User Profile Section */}
        <div className="user-profile">
          <div className="profile-image-container">
            <img 
              src={profile?.photo?.url || 'https://via.placeholder.com/150'} 
              alt={profile?.name || 'User profile'}
              className="profile-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <div className="online-status" />
          </div>
          <div className="profile-info">
            <h3 className="profile-name">{profile?.name || 'User'}</h3>
            <p className="profile-email">{profile?.email}</p>
            <p className="profile-role">{profile?.role || 'Member'}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <button 
            className={`nav-btn ${activeComponent === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
            aria-current={activeComponent === 'home' ? 'page' : undefined}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </button>
          
          <button 
            className={`nav-btn ${activeComponent === 'myProfile' ? 'active' : ''}`}
            onClick={() => handleNavigation('myProfile')}
            aria-current={activeComponent === 'myProfile' ? 'page' : undefined}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">My Profile</span>
          </button>
          
          <button 
            className={`nav-btn ${activeComponent === 'myBlogs' ? 'active' : ''}`}
            onClick={() => handleNavigation('myBlogs')}
            aria-current={activeComponent === 'myBlogs' ? 'page' : undefined}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">My Blogs</span>
          </button>
          
          <button 
            className={`nav-btn ${activeComponent === 'updateBlog' ? 'active' : ''}`}
            onClick={() => handleNavigation('updateBlog')}
            aria-current={activeComponent === 'updateBlog' ? 'page' : undefined}
          >
            <span className="nav-icon">✏️</span>
            <span className="nav-text">Create Blog</span>
          </button>
          
          <div className="nav-divider" />
          
          <button 
            className="nav-btn logout-btn"
            onClick={handleLogout}
          >
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;