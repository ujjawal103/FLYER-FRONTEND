import axios from 'axios';
import React, { useState } from 'react'


const DroneLocationSearchPannel = ({pannel , setPannel , vehiclePannel , setVehicalPannel , suggestedLocation , setSuggestedLocation , setPickup , setDestination ,pickup , destination ,  pickupOrDestination , setUnavailableLocation ,fair , setFair , error , setError}) => {
  const [isSearching , setIsSearching] = useState("Search Drone");
  const token = localStorage.getItem('token');





  const getFare = async(pickup , destination) => {
     setFair({});
     setIsSearching("Searching...");
      try{
            const responseGetFair = await axios.get(`${import.meta.env.VITE_BASE_URL}rides/get-fair?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
          );
          if (responseGetFair.status === 200) {
              setFair(responseGetFair.data);
              setIsSearching("Search Drone");
          }
      }catch (err){
        setError("Please Enter valid locations.")
        setIsSearching("Search Drone");
      }
  }


  const handleClick = async (location) =>{
    if(pickupOrDestination === 0){
      setPickup(location);
      setSuggestedLocation([]);
      if(destination === ""){
        setUnavailableLocation("Choose a destination location");
      }else{
        setUnavailableLocation("");
      }
    }

    if(pickupOrDestination === 1){
      setDestination(location);
      setSuggestedLocation([]);
      if(pickup === ""){
        setUnavailableLocation("Choose a pickup location");
      }else{
        setUnavailableLocation("");
      }
    }

    if(pickup && destination){
       await getFare(pickup , destination);
      
      
      setVehicalPannel(true); 
      setPannel(false)
    }

  }



  return (
    <div>
      {/* lOCATION sEARCH pANNEL */}

      {(pickup && destination) ? <button className='w-full bg-black p-3 flex items-center justify-center text-white font-semibold rounded-xl text-lg mb-2' onClick={async () =>{ await getFare(pickup , destination) ; setVehicalPannel(true); setPannel(false)}}>{isSearching}</button> : <></>}

      {
        suggestedLocation.map(function(location , idx){
          return <div onClick={() => handleClick(location)} key={idx}
                  className='w-full flex items-center justify-start gap-4 my-2 border-2 border-gray-50 rounded-xl p-3 active:border-black '>
                  <h2 className='w-[30px] h-[30px] flex items-center justify-center bg-gray-300 rounded-full p-4'><i className="ri-map-pin-2-fill"></i></h2>
                  <h3 className='font-medium'>{location}</h3>
                 </div>
        })
      }
    </div>
  )
}

export default DroneLocationSearchPannel
