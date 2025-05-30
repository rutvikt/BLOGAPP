import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';
import './MyProfile.scss';

const MyProfile = () => {
  const { profile, isAuthenticated, setAuthenicated } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users/my-profile', {
          withCredentials:true
        });
        setUserProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-details">
        {userProfile.photo?.url && (
          <div className="profile-photo">
            <img 
              src={userProfile.photo.url} 
              alt="Profile" 
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
        )}
        
        <div className="profile-info">
          <p><strong>Name:</strong> {userProfile.name}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Phone:</strong> {userProfile.phoneNo}</p>
          <p><strong>Education:</strong> {userProfile.education}</p>
          <p><strong>Role:</strong> {userProfile.role}</p>
          <p><strong>Member Since:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;