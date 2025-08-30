import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const DroneUserLogout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      localStorage.removeItem('token');
      navigate("/drone/login"); // Redirect to login page after logout

      toast.success("Logout successful!");
    })
    .catch(error => {
      console.error("Error logging out:", error);
      // toast.error("Logout failed!");
    });

  return (
    <div>
      User LogOut
    </div>
  )
}

export default DroneUserLogout
