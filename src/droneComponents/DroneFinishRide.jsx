import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RideDataContext } from '../dronecontext/DroneRideContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const DroneFinishRide = ({setFinishRidePannel , setLoading , setMessage}) => {

    const {currRide , setCurrRide} = useContext(RideDataContext);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const finishRide = async() =>{
        const rideId = currRide._id;
        setLoading(true);
        setMessage("Finishing Delivery...");

        try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}rides/end-ride`,
        {
          rideId
        },
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (response.status === 200) {
          setCurrRide(response.data);
          setLoading(false);
          setMessage("");
          toast.success("Product Scheduled");
        //   toast.warning("Check you received money or not");
        }
     } catch (err) {
             toast.error("Error completing delivery:");
             setLoading(false);
             setMessage("");
        }
    }



    useEffect(() => {
      if (Object.keys(currRide).length > 0 && currRide.status === "completed") {
        navigate("/drone-ride-completed", { state: { userType: "pilot" } });
      }
    }, [currRide]);

  return (
    <div>
       <h2 className='text-xl font-medium'>Finish this Delivery</h2>
        <h5 className='absolute right-6 opacity-100 top-3 bg-gray-200 text-xl p-4 rounded-full h-[20px] w-[20px] flex items-center justify-center' onClick={()=>setFinishRidePannel(false)}><i className="ri-arrow-down-wide-line"></i></h5>
        <div className='flex items-center justify-between p-3 rounded-xl bg-blue-300 mt-3'>
            <div className='flex items-center justify-star gap-5'>
                <img src="/user.jpeg" alt="user" className='w-14 h-14 rounded-full object-cover' />
                <h4 className='text-lg font-medium capitalize'>{`${currRide.user?.fullName?.firstName} ${currRide.user?.fullName?.lastName}`}</h4>
            </div>
            <div>
                <h4 className='text-lg font-semibold'>2.2 KM</h4>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col gap-3'>
            <div className='w-full'>
                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                    <div>
                        {currRide.pickup}
                    </div>
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                    <div>
                        {currRide.destination}
                    </div>
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-currency-line"></i></h2>
                    <div>
                        <h3 className='font-semibold text-lg'>₹{currRide.fare}</h3>
                        <p>Cash - Cash</p>
                    </div>
                </div>
            </div>
           <div className='mt-6 w-full flex flex-col gap-3'>
            <button onClick={finishRide} className='w-full bg-green-700 text-white p-2 font-semibold rounded flex justify-center'>Finish Delivery</button>
            <p className='mt-2 text-red-500 text-xs'>click on finish delivery button if you have completed the payment</p>
           </div>
        </div>
    </div>
  )
}

export default DroneFinishRide
