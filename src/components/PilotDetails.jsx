import React, { useContext } from 'react'
import { PilotDataContext } from '../context/PilotContext'

const PilotDetails = () => {
 const { pilot, setPilot, isLoading, setIsLoading } = useContext(PilotDataContext);

  return (
    <div>
       <div className='flex items-center justify-between w-full p-3'>
            <div className='flex items-center justify-start gap-5'>
              <img src="/pilot.jpg" alt="pilot" className='h-14 w-14 object-cover rounded-full p-1' />
              <h4 className='text-lg font-medium capitalize'>{pilot.fullName.firstName + " " + pilot.fullName.lastName}</h4>
            </div>
            <div className='text-center'>
              <h4 className='text-xl font-semibold'>₹1123.20</h4>
              <p className='text-sm text-gray-600'>Earned</p>
            </div>
           </div>
           <div className='flex items-center justify-evenly p-3 bg-gray-100 rounded-4'>
            <div className='text-center'>
               <i className='text-2xl font-thin ri-timer-2-line'></i>
               <h5 className='text-lg font-medium'>10.2</h5>
               <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className='text-2xl font-thin ri-speed-up-line'></i>
              <h5 className='text-lg font-medium'>10.2</h5>
               <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className='text-2xl font-thin ri-booklet-line'></i>
              <h5 className='text-lg font-medium'>10.2</h5>
               <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
           </div>
    </div>
  )
}

export default PilotDetails
