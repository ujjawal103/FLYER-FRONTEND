import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from './Loading';


const WaitingForPilot = ({setWaitingForPilot , rideConfirmed , rideOtp}) => {

    const [loading , setLoading] = useState(false);
    const [message , setMessage] = useState("");

    const handleCancel = async () =>{
        setLoading(true);
        setMessage("Cancelling ride");
       try{
         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}rides/cancel-user-ride?rideId=${rideConfirmed._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if(response.status === 200){
            setLoading(false);
            setMessage("");
            setWaitingForPilot(false);
            toast.success("Ride Cancelled Successfuly");
        }
       }catch(err){
        setLoading(false);
        setMessage("");
        toast.error(err.response.data.message);
       }
    }



  return (
     <>
     {loading && <Loading message={message}/>}
     <div>
       <h2 className='text-xl font-medium'>Waiting For The Pilot to pickup</h2>
        <h5 className='absolute right-6 opacity-100 top-4 text-xl' onClick={()=>setWaitingForPilot(false)}><i className="ri-arrow-down-wide-line"></i></h5>
        
        <div className='flex justify-center items-center flex-col gap-3 mt-3'>
            <div className='flex items-center justify-between w-full px-8 py-3'>
              <img src="/air-taxi1.png" alt="" className='h-20' />
              <div className='text-right'>
                <h2 className='text-lg font-medium capitalize'>{`${rideConfirmed.pilot?.fullName?.firstName} ${rideConfirmed.pilot?.fullName?.lastName}`}</h2>
                <h4 className='text-xl font-semi'>{rideConfirmed.pilot?.aerialVehicle?.plate}</h4>
                <p className='text-sm'>{rideConfirmed?.aerialVehicleType}</p>
              </div>
            </div>




            <div className='w-full'>
                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                    <div>
                        {rideConfirmed?.pickup && <p className='truncate max-w-[280px]'>{rideConfirmed.pickup}</p>}
                    </div>
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                    <div>
                        {rideConfirmed?.destination && <p className='truncate max-w-[280px]'>{rideConfirmed.destination}</p>}
                    </div>
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-currency-line"></i></h2>
                    <div>
                        <h3 className='font-semibold text-lg'>₹{rideConfirmed?.fare}</h3>
                        <p>Cash - Cash</p>
                    </div>
                </div>


                <div className='w-full flex justify-between items-center px-10 py-4 bg-gray-100 rounded-lg mt-4 mb-3'>
                    <h5>Share this OTP to pilot</h5>
                     <h4 className='font-semibold text-2xl'>{rideOtp}</h4>
                </div>
                <button onClick={handleCancel} className='w-full bg-red-600 text-white p-2 font-semibold rounded mb-2'>Cancel Ride</button>
            </div>

            
            
        </div>
    </div>
     </>
  )
}

export default WaitingForPilot
