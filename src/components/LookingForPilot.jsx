import React from 'react'

const LookingForPilot = ({setVehicalFound , pickup , destination , finalFair}) => {
  return (
     <div>
       <h2 className='text-xl font-medium'>Looking For The Pilot</h2>
        <h5 className='absolute right-6 opacity-100 top-4 text-xl' onClick={()=>setVehicalFound(false)}><i className="ri-arrow-down-wide-line"></i></h5>
        <div className='flex justify-center items-center flex-col gap-3'>
            <img src="/air-taxi1.png" alt="" className='h-40' />
            <div className='w-full'>
                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-3 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                    {finalFair && <div> {pickup} </div>}
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 p-3 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                    {finalFair && <div> {destination} </div>}
                </div>

                <div className='w-full flex items-center gap-4 p-4'>
                    <h2 className='w-9 h-9 flex items-center justify-center bg-gray-300 rounded-full'><i className="ri-currency-line"></i></h2>
                    <div>
                        <h3 className='font-semibold text-lg'>₹{finalFair}</h3>
                        <p>Cash - Cash</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default LookingForPilot




//waiting for the pilot to accept the ride