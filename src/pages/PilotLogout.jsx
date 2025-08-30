import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const PilotLogout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}pilots/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      localStorage.removeItem('token');
      navigate("/pilot-login"); // Redirect to pilot-login page after logout
      toast.success("Logout successful!");
    })
    .catch(error => {
      console.error("Error logging out:", error);
      // toast.error("Logout failed!");
    });



  return (
    <div>
      LOGOUT
    </div>
  )
}

export default PilotLogout
