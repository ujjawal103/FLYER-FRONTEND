import React from 'react'


const DroneVehicalPannel = ({setConfirmRidePannel , setVehicalPannel ,fair , setFinalFair , setVehicleType}) => {

  
  
   if (!fair || !fair.drone) {
    return <div className='w-screen flex flex-col items-center p-1'>
      <h5 className='flex justify-center opacity-100 text-xl' onClick={()=>setVehicalPannel(false)}><i className="ri-arrow-down-wide-line font-semibold text-3xl"></i></h5>
    <div className='h-[180px] text-center text-gray-500 text-3xl flex items-center p-8'>Sorry we are not currently there ..</div>
    </div>
  }

  return (
    <div className='p-4 pb-[100px]'>
        <h2 className='text-xl font-medium'>Click At AirCraft</h2>
        <h5 className='absolute right-6 opacity-100 top-4 text-xl' onClick={()=>{setVehicalPannel(false)}}><i className="ri-arrow-down-wide-line"></i></h5>
        <div onClick={() => {setConfirmRidePannel(true); setFinalFair(fair.drone); setVehicleType("drone")}} className='flex items-center justify-evenly p-2 my-2 border-1 rounded-xl border-black'>
          <img src="/drone.png" alt="" width={70}/>
          <div className='w-1/2'>
            <h4 className='font-medium text-sm'>Drone<span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-medium text-xs'>Affordable , fast rides</p>
          </div>
          <h2 className='text-semibold text-xl'>₹{fair.drone}</h2>
        </div>
    </div>
  )
}

export default DroneVehicalPannel
