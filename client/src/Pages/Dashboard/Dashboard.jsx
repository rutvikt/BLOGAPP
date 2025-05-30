import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import Sidebar from './Sidebar';
import UpdateBlog from './UpdateBlog';
import MyBlogs from './MyBlogs';
import MyProfile from './MyProfile';
import Home from '../../Componets/Home/Home';
import './Dashboard.scss';
import CreateBlog from './CreateBlog';

const Dashboard = () => {
  const { profile, isAuthenticated } = useAuth();
  const [activeComponent, setActiveComponent] = useState('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <div className="auth-message">Please login to access the dashboard</div>;
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home/>;
      case 'myProfile':
        return <MyProfile profile={profile} />;
      case 'myBlogs':
        return <MyBlogs />;
      case 'updateBlog':
        return <CreateBlog />;
      default:
        return <Home />;
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        isMobileOpen={isMobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      
      <div 
        className={`main-content ${isMobileSidebarOpen ? 'sidebar-open' : ''}`}
        onClick={() => isMobileSidebarOpen && setIsMobileSidebarOpen(false)}
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;