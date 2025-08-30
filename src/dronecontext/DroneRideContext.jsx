import React, { createContext, useState } from 'react'

export const RideDataContext = createContext();

const DroneRideContext = ({children}) => {

   const [currRide , setCurrRide] = useState({});


  return (
    <div>
      <RideDataContext.Provider value={{ currRide, setCurrRide }}>
        {children}
      </RideDataContext.Provider>
    </div>
  )
}

export default DroneRideContext