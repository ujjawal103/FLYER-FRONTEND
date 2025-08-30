import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

const UserProtectedWrapper = ({ children }) => {

  const {user , setUser} = useContext(UserDataContext);
  const [isLoading , setIsLoading] = useState(true);


  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }



     axios.get(`${import.meta.env.VITE_BASE_URL}users/profile`, {                 //validation part as it must be user not pilot
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoading(false);
      }
    })
    .catch(error => {
      localStorage.removeItem('token');
      navigate("/login");
    });

  }, [token, navigate]);

  // Optional: prevent rendering children while redirecting
  if (!token) return null;



    if(isLoading){
      return <Loading message="Loading..." />;
    }



  return <>{children}</>;               //if its self user then return the children
};

export default UserProtectedWrapper;
//this is just a higher order function that tell is user currently loggedIn or not 
// if logged in then move to the requested route
// otherwise again at "/login"


//the route which we need to make protected is wrapped with this component
// so that it can check if user is logged in or not