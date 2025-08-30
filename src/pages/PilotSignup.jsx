import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PilotDataContext } from '../context/PilotContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const PilotSignup = () => {
      const [ firstName , setFirstName] = useState("");
      const [ lastName , setLastName] = useState("");
      const [ email , setEmail] = useState("");
      const [ password , setPassword] = useState("");
      // const [userData , setUserData] = useState({});

      const [color , setColor] = useState("");
      const [capacity , setCapacity] = useState("");
      const [plate , setPlate] = useState("");
      const [aerialVehicleType , setAerialVehicleType] = useState("");

      const [error , setError] = useState("");

      const {pilot, setPilot} = React.useContext(PilotDataContext);
      const navigate = useNavigate();
    
    
    const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const pilotData = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      aerialVehicle: {
        color,
        plate,
        capacity,
        aerialVehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}pilots/register`,
      pilotData
    );

    if (response.status === 201) {
      const data = response.data;
      setPilot(data.pilot);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setColor("");
      setPlate("");
      setCapacity("");
      setAerialVehicleType("");
      localStorage.setItem("token", data.token);
      navigate("/pilot-home");
      toast.success("Registration successful!");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        setError("Pilot with this email already exists");
      } else {
        setError(error.response.data.message || "Registration failed");
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
          <img  className='w-20' src="/FLYERDARK.png" alt="" />
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

          <h3 className='text-2xl mb-2 font-semibold'>aerialVehicle Detail's</h3>
          <div className='w-full flex gap-4'>

            <select
              className='w-1/2 p-2 border border-gray-300 rounded bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
              value={aerialVehicleType}
              onChange={(e) => setAerialVehicleType(e.target.value)}
              onClick={() => setError("")}
              required
            >
              <option value="" disabled className='text-sm'>Select Type</option>
              {/* <option value="drone" className='text-sm'>Drone</option> */}
              <option value="airPod" className='text-sm'>air pod</option>
              <option value="airCab" className='text-sm'>air Cab</option>
            </select>
            <input 
              className='w-1/2 p-2 border border-gray-300 rounded  bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
              type="number"
              placeholder='Enter Capacity' 
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              onClick={() => setError("")}
              required 
          /> 
        

          </div>
          <div className='w-full flex gap-4'>
            <input 
              className='w-1/2 p-2 border border-gray-300 rounded  bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
              type="text"
              placeholder='color' 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              onClick={() => setError("")}
              required 
          /> 
          <input 
              className='w-1/2 p-2 border border-gray-300 rounded  bg-[#eeeeee] mb-4 text-lg placeholder:text-base'
              type="text"
              placeholder='Plate Number' 
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              onClick={() => setError("")}
              required 
          /> 
          </div>

          {error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}

          <button
          className='w-full p-2 rounded mb-4 bg-[#111] text-white mb-4 text-xl font-semibold'
          >
            Register
          </button>
          </form>
          <Link to={"/pilot-login"} className='text-blue-600 hover:underline'>Already have an Account ? login</Link> 
       </div>




       {/* <div className='w-full md:w-1/3 '>
        <Link
        to={"/signup"}
        className='w-full flex items-center justify-center p-3 rounded mb-4 bg-[#111] text-white mb-7 text-xl font-semibold'
        >
          SignUp as User
        </Link>
       </div> */}
    </div>
  )
}

export default PilotSignup
