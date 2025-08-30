import React, { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { PilotDataContext } from '../dronecontext/DronePilotContext';
import axios from 'axios';
import { set } from 'mongoose';
import toast from 'react-hot-toast';

const DronePilotLogin = () => {


    const [ email , setEmail] = useState("");
    const [ password , setPassword] = useState("");
    const [error , setError] = useState("");
  
    const {pilot, setPilot} = React.useContext(PilotDataContext);
    const navigate = useNavigate();
  
  
    const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const pilotData = {
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}pilots/login`,
      pilotData
    );

    if (response.status === 200) {
      const data = response.data;
      setPilot(data.pilot);

      setEmail("");
      setPassword("");
      setError("");
      localStorage.setItem("token", data.token);
      navigate("/drone-pilot-home");
      toast.success("Login successful!");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError(error.response.data.message || "Login failed");
      }
    } else {
      setError("Network error. Please try again.");
    }
  }

  
};



 


  return (
    <div className=' h-screen w-full p-7 flex flex-col items-center justify-between'>
       <div className='w-full md:w-1/3'>
          <form className='w-full' onSubmit={(e) => submitHandler(e)}>
          <img  className='w-20 rounded-2xl mb-2' src="/FLYERDARK.png" alt="" />
          <h3 className='text-2xl mb-2 font-semibold'>Enter your registered email</h3>
          <input 
              className='w-full p-2 border border-gray-300 rounded mb-4 bg-[#eeeeee] mb-7 text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => setError("")}
              required 
          />
          <h3 className='text-2xl mb-2 font-semibold'>Enter Password</h3>
          <input 
              className='w-full p-2 border border-gray-300 rounded mb-4 bg-[#eeeeee] mb-7 text-lg placeholder:text-base'
              type="password"
              placeholder='********' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setError("")}
              required 
          /> 
          {error && <p className='text-red-500 mb-3 text-sm'>{error}</p>}
          <button
          className='w-full p-2 rounded mb-4 bg-[#111] text-white mb-4 text-xl font-semibold'
          >
            Login
          </button>
          </form>
          <Link to={"/drone-pilot-signup"} className='text-blue-600 hover:underline'>New here ? Create new Account</Link> 
       </div>
       <div className='w-full md:w-1/3 '>
        <Link
        to={"/drone/login"}
        className='w-full flex items-center justify-center p-3 rounded mb-4 bg-[#565ed6] text-white mb-7 text-xl font-semibold'
        >
          SignIn as User
        </Link>
       </div>
    </div>
  )
}

export default DronePilotLogin
