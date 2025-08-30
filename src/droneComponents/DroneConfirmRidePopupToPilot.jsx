import axios from 'axios';
import React, { useContext, useState , useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RideDataContext } from '../dronecontext/DroneRideContext';
import toast from 'react-hot-toast';
import { set } from 'mongoose';
import DroneLoading from './DroneLoading';

const DroneConfirmRidePopupToPilot = ({setConfirmRidePopupPannel , setRidePopupPannel , ride , rideBy , setLoading , setMessage , loading , message}) => {
    const [otp , setOtp] = useState("");
    const [otpError , setOtpError] = useState("");
    const {currRide , setCurrRide} = useContext(RideDataContext);
    // const [loading , setLoading] = useState(false);
    // const [message , setMessage] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const submitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setMessage("Scheduling Product...");

        if(otp.length !== 4 || otp !== ride.otp){
            setOtpError("Wrong OTP Entered");
            setLoading(false);
            return;
        }
        else{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}rides/start-ride?rideId=${ride._id}&otp=${otp}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });


                if(response.status === 200) {
                    setLoading(false);
                    setMessage("");
                    toast.success("Scheduled successfully");
                    setCurrRide(response.data);
                }else{
                    setLoading(false);
                    setMessage("");
                    toast.error("Failed to Schedule Product");
                    setCurrRide({});
                }

            } catch (error) {
                setConfirmRidePopupPannel(true);
                setLoading(false);
                toast.error("Failed to Schedule Product");
            }

            setOtpError("");
            setOtp("");
        }
        
    }

    const handleCancel = async () =>{
        setLoading(true);
        setMessage("Cancelling Delivery");
       try{
         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}rides/cancel-pilot-ride?rideId=${ride._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if(response.status === 200){
            setLoading(false);
            setMessage("");
            toast.success("Delivery Cancelled Successfuly");
        }
       }catch(err){
            setLoading(false);
            setMessage("");
            setConfirmRidePopupPannel(true); 
            setRidePopupPannel(true);
            toast.error(err.response.data.message);
       }
    }



    useEffect(() => {
                        if (Object.keys(currRide).length > 0) {
                            navigate("/drone-pilot-riding");
                        }
                    }, [currRide]);

  return (
    <>
    {/* {loading && <DroneLoading message={message}/> } */}
    <div>
       <h2 className='text-xl font-medium'>Confirm this Schedule to start</h2>
        <h5 className='absolute right-6 opacity-100 top-4 text-xl' onClick={()=>setConfirmRidePopupPannel(false)}><i className="ri-arrow-down-wide-line"></i></h5>
        <div className='flex items-center justify-between p-3 rounded-xl bg-blue-300 mt-3'>
            <div className='flex items-center justify-star gap-5'>
                <img src="/user.jpeg" alt="user" className='w-14 h-14 rounded-full object-cover' />
                <h4 className='text-lg font-medium'>{`${rideBy.firstName}  ${rideBy.lastName}` }</h4>
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
                        { ride.pickup && <div className='font-semibold truncate w-full max-w-[250px]'>{ride.pickup}</div> }
                    </div>
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                    <div>
                        { ride.destination && <div className='font-semibold truncate w-full max-w-[250px]'>{ride.destination}</div> }
                    </div>
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-currency-line"></i></h2>
                    <div>
                        <h3 className='font-semibold text-lg'>₹{ride.fare}</h3>
                        <p>Cash - Cash</p>
                    </div>
                </div>
            </div>
           <div className='mt-6 w-full'>
             <form className='w-full flex flex-col gap-4' onSubmit={(e)=>{submitHandler(e)}}>
                <input type="text" placeholder='Enter OTP?' required className='w-full rounded-xl bg-gray-300 font-medium p-4' onChange={(e)=> setOtp(e.target.value)} value={otp} />
                {otpError && <p className='text-red-500 text-sm'>{otpError}</p>}
                <button type="submit" className='w-full bg-green-700 text-white p-2 font-semibold rounded flex justify-center'>Confirm</button>
                <button onClick={() => {setConfirmRidePopupPannel(false); setRidePopupPannel(false); handleCancel()}} className='w-full bg-red-600 text-white p-2 font-semibold rounded'>Cancel</button>
             </form>
           </div>
        </div>
    </div>
    </>
  )
}

export default DroneConfirmRidePopupToPilot
