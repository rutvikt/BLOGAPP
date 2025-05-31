import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './Register.scss';
import axios from "axios";

const Register = () => {
 const [formData, setFormData] = useState({
  email: "",
  name: "",
  password: "",
  phoneNo: "",
  education: "",
  role: "",
  photo: null
});

const handleChange = (e) => {
  if (e.target.name === "photo") {
    setFormData({ ...formData, photo: e.target.files[0] });
  } else {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("email", formData.email);
  data.append("name", formData.name);
  data.append("password", formData.password);
  data.append("phoneNo", formData.phoneNo);
  data.append("education", formData.education);
  data.append("role", formData.role);
  data.append("photo", formData.photo); // File must be appended like this

  try {
    const response = await axios.post(
      "http://localhost:5001/api/users/register",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
   toast.success(response.data.message || "User registered successfully");

  } catch (error) {
    toast.error(error.response?.data.message || error.message);

    console.log(error);
    
  }
};


  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Register</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-control"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="education">Education</label>
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BBA">BBA</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="photo">Profile Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleChange}
              className="form-control"
              accept="image/*"
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <div className="login-link">
          Already registered? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;