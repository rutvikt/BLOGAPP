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
import  { Toaster } from 'react-hot-toast';
import Creator from './Pages/Creaters/Creator'
import { useAuth } from './Context/AuthProvider';
import UpdateBlog from './Pages/Dashboard/UpdateBlog';
import BlogDetails from './Pages/BlogDetails/BlogDetails';
function App() {
  const location = useLocation();
  const hideNavbarFooter=["/dashboard","/login","register"].includes(location.pathname)


  const{blogs}=useAuth();

  
  return (
    <>
   {!hideNavbarFooter && <Navbar/>}
   
    {/* Desine Routes */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
       <Route path="/creators" element={<Creator/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
       <Route path="/blog/:id" element={<BlogDetails/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='/update-blog/:id' element={<UpdateBlog/>}/>
    </Routes>
    <Toaster/>
    {!hideNavbarFooter && <Footer/>}
    </>
  )
}

export default App
