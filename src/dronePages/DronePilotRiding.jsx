import React, { use, useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DroneFinishRide from '../droneComponents/DroneFinishRide'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DroneLiveTracking from '../droneComponents/DroneLiveTracking';
import DroneLoading from '../droneComponents/DroneLoading';
import { RideDataContext } from '../dronecontext/DroneRideContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import DroneFooterNavPilot from '../droneComponents/DroneFooterNavPilot';

const DronePilotRiding = () => {
  const [finishRidePannel , setFinishRidePannel] = useState(false);
  const finishRidePannelRef = useRef(null);
  const [loading , setLoading] = useState(false);
  const [message , setMessage] = useState("");
  const {currRide , setCurrRide} = useContext(RideDataContext);

  const [distance, setDistance] = useState("0m"); // Formatted distance
  const [duration, setDuration] = useState("0s"); // Formatted duration
  const navigate = useNavigate();


  const token = localStorage.getItem("token");



    const getPilotCurrentRide = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}rides/get-pilot-ride`,{
        headers : {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status !== 200) {
        // throw new Error("Failed to fetch current ride");
        toast.error("Failed to fetch current ride");
      }
      return response.data;
    };
  
  
    useEffect(() => {
      const fetchData = async () => {
        const ride = await getPilotCurrentRide();
        setCurrRide(ride);
      };
      fetchData();
    },[]);



   useGSAP(function(){
    if(finishRidePannel){
      gsap.to(finishRidePannelRef.current , {
      transform : "translateY(0)"
      })
    }
    else{
      gsap.to(finishRidePannelRef.current , {
      transform : "translateY(100%)"
    })
    }
  },[finishRidePannel])



  return (
    <>
    {loading && <DroneLoading message={message}/>}
     {
      currRide && Object.keys(currRide).length > 0 ? 
    <div className='h-screen w-screen max-h-screen max-w-screen overflow-hidden relative'>
       <div className='w-full p-3 fixed top-0 flex items-center justify-between z-9999999999999'>
          <img src="/FLYER.png" alt="" width={100}/>
          <Link to={"/drone-pilot-logout"} className='h-14 w-14 bg-white flex items-center justify-center rounded-full'>
            <i className="ri-logout-box-r-line text-xl font-semibold"></i>
          </Link>
        </div>
      <div className='h-4/5'>
        {/* <img src="/map.png" alt="" className='h-full w-full object-cover'/> */}
        <DroneLiveTracking setDistance={setDistance} setDuration={setDuration} />
      </div>
      <div className='absolute h-1/5 p-6 bg-blue-400 bottom-14 w-full z-99 pb-7' onClick={(e) => setFinishRidePannel(true)}>
        <h5 className='w-full flex justify-center items-center opacity-100 text-lg relative font-semibold top-[-14px]'><i className="ri-arrow-up-wide-line text-xl font-semibold"></i></h5>
        <div className=' flex items-center justify-between mb-12' >
          <div className='flex flex-col gap-2 bg-white rounded-xl p-2 mb-2'> 
            <h4 className='text-sm '>{distance} away</h4><hr />
            <h4 className='text-sm '>{duration} to arrive</h4>
          </div>
          <button className=' bg-yellow-400 py-4 text-black px-6 font-semibold rounded flex items-center justify-center'>Complete Ride</button>
         </div>
      </div>


          
         <div ref={finishRidePannelRef} className='absolute z-999 bottom-0 bg-white w-full p-4 translate-y-full h-4/5 mb-12'>
            <DroneFinishRide setFinishRidePannel={setFinishRidePannel} setLoading={setLoading} setMessage={setMessage} />
       </div>
    </div>
    :
    <div className="h-1/2 p-4">
  <div className="h-full w-full flex items-center justify-center">
    <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-md">
      {/* animated top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-[length:200%_100%] animate-[bg-slide_2s_linear_infinite]" />
      
      <div className="px-6 py-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
          <i className="ri-error-warning-fill text-3xl text-yellow-600 animate-bounce" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Currently No Product Scheduled</h2>
        <p className="mt-2 text-gray-600">
          You don’t have an active scheduled product right now. Please wait for a new product to get started.
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate("/drone-pilot-home")}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/30"
          >
            <i className="ri-road-map-line text-lg" />
            Go to home
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Tailwind keyframes (add once in your globals if needed) */}
  <style>
    {`
      @keyframes bg-slide {
        0% { background-position: 0% 0%; }
        100% { background-position: 200% 0%; }
      }
    `}
  </style>
      </div>
     }

     <DroneFooterNavPilot />
    </>
  )
}

export default DronePilotRiding
