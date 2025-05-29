import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://api.web3forms.com/submit', {
        access_key: 'dd37d618-2d2d-4ab4-8fde-7e70e801ef33',
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      if (response.data.success) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        toast.error(response.data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Toaster position="top-center" />
      <div className="contact-container">
        <div className="contact-info">
          <h1>Get in Touch</h1>
          <p>Have questions or want to discuss a project? Reach out to us and we'll get back to you as soon as possible.</p>
          <div className="contact-details">
            <p>Email: contact@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>

        <div className="contact-form">
          <h1>Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;