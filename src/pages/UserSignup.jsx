import React, { useContext, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { set } from 'mongoose'
import toast from 'react-hot-toast'

const UserSignup = () => {
    const [ firstName , setFirstName] = useState("");
    const [ lastName , setLastName] = useState("");
    const [ email , setEmail] = useState("");
    const [ password , setPassword] = useState("");
    const [error , setError] = useState("");
    // const [userData , setUserData] = useState({});
  
    const navigate = useNavigate();
    const {user , setUser} = React.useContext(UserDataContext);

   const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const newUser = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      localStorage.setItem("token", data.token);
      navigate("/home");
      toast.success("Registration successful!");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        setError("Email already exists");
      } else {
        setError(error.response.data.message || "Signup failed fill correct details");
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
          <img  className='w-20' src="/FLYER.png" alt="" />
          <h3 className='text-2xl mb-2 font-semibold'>Enter your Full name</h3>
          <div className='w-full flex gap-4'>
            <input 
              className='w-1/2 p-2 border border-gray-300 rounded  bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
              type="text"
              placeholder='First name' 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onClick={() => setError("")}
              required 
          /> 
          <input 
              className='w-1/2 p-2 border border-gray-300 rounded  bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
              type="text"
              placeholder='Last name' 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onClick={() => setError("")}
              // required 
          /> 
          </div>
          <h3 className='text-2xl mb-2 font-semibold'>Enter your email</h3>
          <input 
              className='w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => setError("")}
              required 
          />
          <h3 className='text-2xl mb-2 font-semibold'>Enter Password</h3>
          <input 
              className='w-full p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
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
            Register
          </button>
          </form>
          <Link to={"/login"} className='text-blue-600 hover:underline'>Already have an Account ? login</Link> 
       </div>
       <div className='w-full md:w-1/3 '>
        <Link
        to={"/pilot-signup"}
        className='w-full flex items-center justify-center p-3 rounded mb-4 bg-[#111] text-white mb-7 text-xl font-semibold'
        >
          SignUp as pilot
        </Link>
       </div>
    </div>
  )
}

export default UserSignup
