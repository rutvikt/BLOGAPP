import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Creators.scss';

const Creator = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/users/admins");
        setCreators(data);
        console.log(data);
        
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return (
      <div className="creator-page loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="creator-page">
      <div className="creator-header">
        <h1>Our Creative Team</h1>
        <p>Meet the talented administrators behind our platform</p>
      </div>
      
      <div className="creator-grid">
        {creators.map((creator) => (
          <CreatorCard key={creator._id} creator={creator} />
        ))}
      </div>
    </div>
  );
};

const CreatorCard = ({ creator }) => {
  return (
    <div className="creator-card">
      <div className="card-image">
        <img 
          src={creator.photo?.url || 'https://via.placeholder.com/150'} 
          alt={creator.name} 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150';
          }}
        />
      </div>
      <div className="card-content">
        <h3>{creator.name}</h3>
        <p className="role">{creator.role}</p>
        
        <div className="contact-info">
          <div className="info-item">
            <span className="icon">✉️</span>
            <span>{creator.email}</span>
          </div>
          {creator.phone && (
            <div className="info-item">
              <span className="icon">📞</span>
              <span>{creator.phone}</span>
            </div>
          )}
        </div>
        
        <div className="social-links">
          <button className="social-btn">LinkedIn</button>
          <button className="social-btn">Twitter</button>
        </div>
      </div>
    </div>
  );
};

export default Creator;