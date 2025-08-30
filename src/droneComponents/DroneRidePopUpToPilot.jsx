import React from 'react'

const DroneRidePopUpToPilot = ({setRidePopupPannel , setConfirmRidePopupPannel , ride , rideBy , rideConfirm , setLoading , setMessage}) => {
  return (
    <div>
       <h2 className='text-xl font-medium'>New Product For You</h2>
        <h5 className='absolute right-6 opacity-100 top-4 text-xl' onClick={()=>setRidePopupPannel(false)}><i className="ri-arrow-down-wide-line"></i></h5>
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
                        { ride.pickup && <div className='font-semibold'>{ride.pickup}</div> }
                    </div>
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                    <div>
                        { ride.destination && <div className='font-semibold'>{ride.destination}</div> }
                    </div>
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-4 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-currency-line"></i></h2>
                    <div>
                        <h3 className='font-semibold text-lg'>₹{ride.fare}</h3>
                        <p>Cash - Cash</p>
                    </div>
                </div>
            </div>
            <div className='w-full flex items-center justify-evenly gap-5'>
                 <button onClick={() => {setRidePopupPannel(false)}} className='w-full bg-gray-200 text-gray-700 p-2 py-4 font-semibold rounded flex items-center justify-center'>Ignore</button>
                 <button onClick={() => {setRidePopupPannel(false); rideConfirm(ride._id); setLoading(true); setMessage("Accepting the ride...")}} className='w-full bg-green-700 py-4 text-white p-2 font-semibold rounded flex items-center justify-center'>Accept</button>

            </div>
        </div>
    </div>
  )
}

export default DroneRidePopUpToPilot
