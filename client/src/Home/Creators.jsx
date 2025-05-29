import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Creators.scss';

const Creators = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/users/admins", {
          withCredentials: true,
        });
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <section className="creators">
      <div className="creators-header">
        <h2 className="section-title">Our Creative Team</h2>
        <p className="section-subtitle">Meet the talented individuals behind the content</p>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : admins && admins.length > 0 ? (
        <div className="creators-grid">
          {admins.slice(0, 4).map((admin) => (
            <div key={admin._id} className="creator-card">
              <div className="card-image">
                <img 
                  src={admin.photo?.url || 'https://via.placeholder.com/150'} 
                  alt={admin.name} 
                  loading="lazy"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="card-content">
                <h3 className="creator-name">{admin.name}</h3>
                <p className="creator-role">{admin.role}</p>
                <div className="social-links">
                  <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
                  <a href="#" className="social-icon"><i className="fas fa-envelope"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-creators">
          <p>No team members found</p>
        </div>
      )}
    </section>
  );
};

export default Creators;