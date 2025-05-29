import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

import Cookies from 'js-cookie';



export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState();
    const [profile, setProfile] = useState();
    const [isAuthenticated, setAuthenicated] = useState(false);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                 const { data } = await axios.get("http://localhost:5001/api/users/my-profile", {
                    withCredentials: true, headers: { 'content-type': 'application/json' }
                });


                console.log(data);
                setProfile(data)
                setAuthenicated(true);  
               
            } catch (error) {
                console.log(error);

            }
        };
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/blogs/all-blogs", {
                    withCredentials: true,
                });


                console.log(response, "context");
                setBlogs(response.data)

            } catch (error) {
                console.log(error);

            }
        };
        fetchBlogs();
        fetchProfile();
    }, []);
    return (
        <AuthContext.Provider value={{ blogs, profile, isAuthenticated }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

