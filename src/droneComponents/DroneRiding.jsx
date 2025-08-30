import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RideDataContext } from '../dronecontext/DroneRideContext'
import { useSocket } from '../dronecontext/DroneSocketContext';
import DroneLiveTracking from './DroneLiveTracking';
import axios from 'axios';
import toast from 'react-hot-toast';
import DroneLoading from './DroneLoading';
import { useState } from 'react';
import DroneFooterNav from './DroneFooterNav';


const DroneRiding = () => {
  const [loading , setLoading] = useState(false);
  const [message , setMessage] = useState("");

  const {currRide , setCurrRide} = useContext(RideDataContext);
  const navigate = useNavigate();
  const {socket} = useSocket();
  const [distance, setDistance] = useState("0m");
  const [duration, setDuration] = useState("0s"); 


  const token = localStorage.getItem("token");

  const getUserCurrentRide = async () => {
    setLoading(true);
    setMessage("Fetching Product Details..");
   try{
     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}rides/get-user-ride`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      // throw new Error("Failed to fetch current ride");
      toast.error("Failed to fetch current product");
    }
    setLoading(false);
    setMessage("");
    return response.data;
   }catch(error){
    setLoading(false);
    setMessage("");
     toast.error("Failed to fetch current product");
   }
  };


  useEffect(() => {
    const fetchData = async () => {
      const ride = await getUserCurrentRide();
      setCurrRide(ride);
    };
    fetchData();
  },[]);




  useEffect(() => {
    if (Object.keys(currRide).length > 0 && currRide.status === "completed") {
       navigate("/drone-ride-completed", { state: { userType: "user" } });
    }
  }, [currRide]);


  socket.on("ride-ended", (data) => {
    setCurrRide(data);
  });

  return (
    <>
    {loading && <DroneLoading message={message}/>}
     <div className='h-screen mb-14'>
        <Link to={"/drone-home"} className='fixed  h-10 w-10 bg-white flex items-center justify-center rounded-full top-2 left-2 '>
            <i className="ri-home-4-line text-lg font-medium"></i>
        </Link>
      <div className='h-1/2'>
        {/* <img src="/map.png" alt="" className='h-full w-full object-cover'/> */}
        {currRide && Object.keys(currRide).length > 0 && <DroneLiveTracking setDistance={setDistance} setDuration={setDuration} />}
      </div>


      {
        currRide && Object.keys(currRide).length > 0 ?
        <div className='h-2/3 p-4 '>
            <div className='flex justify-center items-center flex-col gap-2'>
                <div className='flex items-center justify-between w-full px-4 py-1'>
                <img src="/drone.png" alt="" className='h-20' />
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize'>{`${currRide.pilot?.fullName?.firstName} ${currRide.pilot?.fullName?.lastName}`}</h2>
                    <h4 className='text-xl font-semi'>{currRide.pilot?.aerialVehicle.plate}</h4>
                    <p className='text-sm'>{currRide.aerialVehicleType}</p>
                </div>
                </div>


                <div className='flex justify-between bg-white rounded-xl p-2 mb-2 w-full'> 
                  <h4 className='text-sm '>{distance} away</h4><hr />
                  <h4 className='text-sm '>{duration} to arrive</h4>
               </div> 
     

                <div className='w-full'>
                    <div className='w-full flex items-center gap-4 p-4'>
                        <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                        <div>
                            {currRide.destination && <p className='truncate w-full max-w-[250px]'>{currRide.destination}</p>}
                        </div>
                    </div>

                    <div className='w-full flex items-center gap-4 p-4'>
                        <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-currency-line"></i></h2>
                        <div>
                            <h3 className='font-semibold text-lg'>₹{currRide.fare}</h3>
                            <p>Cash - Cash</p>
                        </div>
                    </div>

                     <button className='w-full bg-green-700 text-white p-2 font-semibold rounded'>Make a Payment</button>
                </div>
            
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
        <h2 className="text-2xl font-semibold text-gray-900">No Scheduled Product</h2>
        <p className="mt-2 text-gray-600">
          You don’t have an active Scheduled delivery right now. Please schedule a delivery to get started.
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate("/drone-home")}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/30"
          >
            <i className="ri-road-map-line text-lg" />
            Schedule New Product
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
    </div>
    <DroneFooterNav />
    </>
   
  )
}

export default DroneRiding
