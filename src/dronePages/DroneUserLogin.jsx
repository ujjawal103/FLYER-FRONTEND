import React, { useState , useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../dronecontext/DroneUserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const DroneUserLogin = () => {
  const [ email , setEmail] = useState("");
  const [ password , setPassword] = useState("");
  const [userData , setUserData] = useState({});

  const { user , setUser } = useContext(UserDataContext);
  const [error , setError] = useState("");
  const navigate = useNavigate();


 const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const userData = {
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}users/login`,
      userData
    );

    // If success
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      setError("");
      localStorage.setItem("token", data.token);
      navigate("/drone-home");

      setEmail("");
      setPassword("");

      toast.success("Login successful!");
    }
  } catch (error) {
    console.error("Login failed:", error);

    // Custom error message
    if (error.response && error.response.status === 401) {
      setError("Invalid email or password");
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  
};



  return (
    <div className=' h-screen w-full p-7 flex flex-col items-center justify-between'>
       <div className='w-full md:w-1/3'>
          <form className='w-full' onSubmit={(e) => submitHandler(e)}>
          <img  className='w-20' src="/FLYER.png" alt="" />
          <h3 className='text-2xl mb-2 font-semibold'>What's your email</h3>
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
          {error && <p className='text-red-600 mb-4 text-sm'>{error}</p>}
          <button
          className='w-full p-2 rounded mb-4 bg-[#111] text-white mb-4 text-xl font-semibold'
          >
            Login
          </button>
          </form>
          <Link to={"/drone/signup"} className='text-blue-600 hover:underline'>New here ? Create new Account</Link> 
       </div>
       <div className='w-full md:w-1/3 '>
        <Link
        to={"/drone-pilot-login"}
        className='w-full flex items-center justify-center p-3 rounded mb-4 bg-[#111] text-white mb-7 text-xl font-semibold'
        >
          SignIn as pilot
        </Link>
       </div>
    </div>
  )
}

export default DroneUserLogin
