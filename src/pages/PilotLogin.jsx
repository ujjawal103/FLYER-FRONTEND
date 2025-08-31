import React, { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { PilotDataContext } from '../context/PilotContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

const PilotLogin = () => {


    const [ email , setEmail] = useState("");
    const [ password , setPassword] = useState("");
    const [error , setError] = useState("");
  
    const {pilot, setPilot} = React.useContext(PilotDataContext);
    const navigate = useNavigate();

    const [loading , setLoading] = useState(false);
    const [message , setMessage] = useState("");
  
  
    const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("Logging In....")

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
      setLoading(false);
      setMessage("");
      setEmail("");
      setPassword("");
      setError("");
      localStorage.setItem("token", data.token);
      navigate("/pilot-home");
      toast.success("Login successful!");
    }
  } catch (error) {
    setLoading(false);
    setMessage("");
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
    <>
    {loading && <Loading message={message}/>}
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
          <Link to={"/pilot-signup"} className='text-blue-600 hover:underline'>New here ? Create new Account</Link> 
       </div>
       <div className='w-full md:w-1/3 '>
        <Link
        to={"/login"}
        className='w-full flex items-center justify-center p-3 rounded mb-4 bg-[#565ed6] text-white mb-7 text-xl font-semibold'
        >
          SignIn as User
        </Link>
       </div>
    </div>
    </>
  )
}

export default PilotLogin
