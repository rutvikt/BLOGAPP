import { useState } from 'react'
import {Route,Routes, useLocation} from 'react-router-dom';
import './App.css'
import Navbar from './Componets/Navbar/Navbar'
import Footer from './Componets/Footer/Footer'
import Home from './Componets/Home/Home'
import Blogs from './Pages/Blogs/Blogs';
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import { useAuth } from './Context/AuthProvider';
function App() {
  const location = useLocation();
  const hideNavbarFooter=["/dashboard","/login","register"].includes(location.pathname)


  const{blogs}=useAuth();
  console.log(blogs);
  
  return (
    <>
   {!hideNavbarFooter && <Navbar/>}
   
    {/* Desine Routes */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    {!hideNavbarFooter && <Footer/>}
    </>
  )
}

export default App
