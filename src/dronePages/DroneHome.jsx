import React, { useEffect, useRef, useState , useContext } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import DroneLocationSearchPannel from '../droneComponents/DroneLocationSearchPannel.jsx';
import DroneVehicalPannel from '../droneComponents/DroneVehicalPannel.jsx';
import DroneConfirmRide from '../droneComponents/DroneConfirmRide.jsx';
import DroneLookingForPilot from '../droneComponents/DroneLookingForPilot.jsx';
import DroneWaitingForPilot from '../droneComponents/DroneWaitingForPilot.jsx';
import axios from "axios";
import { useSocket } from '../dronecontext/DroneSocketContext.jsx';
import { UserDataContext } from '../dronecontext/DroneUserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { RideDataContext } from '../dronecontext/DroneRideContext.jsx';
import DroneLoading from '../droneComponents/DroneLoading.jsx';
import toast from "react-hot-toast";
import DroneFooterNav from '../droneComponents/DroneFooterNav.jsx';
import { useLocation } from 'react-router-dom';


gsap.registerPlugin(useGSAP);

const DroneHome = () => {
  const [pickup , setPickup] = useState("");
  const [destination , setDestination] = useState("");
  const [pannel , setPannel] = useState(false);            //when pannel open of all locations
  const pannelRef = useRef(null);
  const pannelCloseRef = useRef(null);
  const vehicalPannelRef = useRef(null);
  const [vehiclePannel , setVehicalPannel] = useState(false);
  const confirmRidePannelRef = useRef(null);
  const [confirmRidePannel , setConfirmRidePannel] = useState(false);
  const vehicalFoundRef = useRef(null);
  const [vehicalFound , setVehicalFound] = useState(false);
  const waitingForPilotRef = useRef(null);
  const [waitingForPilot , setWaitingForPilot] = useState(false);
  const [loading , setLoading] = useState(false);
  const [message , setMessage] = useState("");
  const [pickupOrDestination , setPickupOrDestination] = useState(0);       //0----> for pickup suggestion , 1----> for destination suggestion

  const [suggestedLocation , setSuggestedLocation] = useState([]);
  const token = localStorage.getItem('token');
  const [unavailableLocation , setUnavailableLocation] = useState("Find you locations..");

  const [fair , setFair] = useState({});
  const [error , setError] = useState("");

  const [finalFair , setFinalFair] = useState();
  const [vehicleType , setVehicleType] = useState("");

  const { sendMessage, recieveMessage , socket } = useSocket();
  const { user , setUser } = useContext(UserDataContext);

  const [rideCreated , setRideCreated] = useState({});
  const [rideConfirmed , setRideConfirmed] = useState({});

  const {currRide , setCurrRide} = useContext(RideDataContext);

  const navigate = useNavigate();
  const location = useLocation();
  const rideInProgress = location.state?.ride;
  useEffect(()=>{
    if(rideInProgress?.status === "accepted"){
      setRideConfirmed(rideInProgress);
      setWaitingForPilot(true);
    }
    if(rideInProgress?.status === "ongoing"){
      setCurrRide(rideInProgress);
    }
  },[location])

  useEffect(() => {
    sendMessage("join", {userType : "user" , userId: user._id });
  }, [user]);


  socket.on("ride-confirmed", (data) => {
    setRideConfirmed(data);
    setVehicalFound(false);
    setWaitingForPilot(true);
  });


  socket.on("ride-started", (data) => {
    toast.success("Schedule started successfully");
    setCurrRide(data);
    setWaitingForPilot(false);
  });

  socket.on("ride-cancelled-by-pilot" ,(data) => {
    toast.success("Schedule cancelled By Drone");
    setWaitingForPilot(false);
    setCurrRide({});
  })

  useEffect(() => {
    if (Object.keys(currRide).length > 0) {
      navigate("/drone/riding");
    }
  }, [currRide]);


  const handleLocationSuggestion = async (location) =>{
   if(location.length >= 4){
        try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}maps/get-suggestions?input=${location}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setSuggestedLocation(response.data);
        }
        else if(response.status === 404){
          setUnavailableLocation("Currently we are not here..");
        }

      } catch (error) {
        setUnavailableLocation("Not found");
      }
    }else{
      setUnavailableLocation("Find a location..");
    }
  }

  
  

  const submitHandler = (e) =>{
      e.preventDefault();
  }


  useGSAP(function (){
    if(pannel){
      gsap.to(pannelRef.current , {
        height : "75%",
        display : "block",
        padding : 20,

      })
      gsap.to(pannelCloseRef.current , {
        opacity : 1,
        
      })
    }else{
      gsap.to(pannelRef.current , {
        height : "0%",
        display : "none",
       
      })
      gsap.to(pannelCloseRef.current , {
        opacity : 0,
       
      })
    }
  },[pannel])

  useGSAP(function(){
    if(vehiclePannel){
      gsap.to(vehicalPannelRef.current , {
      transform : "translateY(0)"
      })
    }
    else{
      gsap.to(vehicalPannelRef.current , {
      transform : "translateY(200%)"
    })
    }
  },[vehiclePannel])


    useGSAP(function(){
    if(confirmRidePannel){
      gsap.to(confirmRidePannelRef.current , {
      transform : "translateY(0)"
      })
    }
    else{
      gsap.to(confirmRidePannelRef.current , {
      transform : "translateY(200%)"
    })
    }
  },[confirmRidePannel])


    useGSAP(function(){
    if(vehicalFound){
      gsap.to(vehicalFoundRef.current , {
      transform : "translateY(0%)"
      })
    }
    else{
      gsap.to(vehicalFoundRef.current , {
      transform : "translateY(200%)"
    })
    }
  },[vehicalFound])


    useGSAP(function(){
    if(waitingForPilot){
      gsap.to(waitingForPilotRef.current , {
      transform : "translateY(0)"
      })
    }
    else{
      gsap.to(waitingForPilotRef.current , {
      transform : "translateY(200%)"
    })
    }
  },[waitingForPilot])







  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}rides/create`,
        {
          pickup,
          destination,
          aerialVehicleType: vehicleType,
          fare: finalFair,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setRideCreated(response.data);
        toast.success("Schedule created");
        setLoading(false);
        setVehicalFound(true);
      }
      
    } catch (error) {
      if (error.response?.status === 409) {
      toast.error(error.response.data.message);
      setLoading(false);
      setMessage("");
      setVehicalFound(false);
      navigate("/drone/history");                    //set to current state of ride
    } else {
      toast.error("Schedule not Created, try again!");
      setLoading(false);
      setMessage("");
      setConfirmRidePannel(true);
    }
    }
  }






  

  return (
    <>
    {loading && <DroneLoading message={message}/>}
    <div className='h-screen relative'>
       <img className='w-20 absolute left-5 top-5' src="/FLYER.png" alt="Logo" />

       <div className='h-screen w-screen '>
        <img className='object-cover h-full w-full' src="/map.png" alt="map" />
       </div>

       <div className='absolute top-0 w-full h-screen flex flex-col justify-end'>
        <div className='h-[40%] p-5 bg-white relative'>
              <h5 className='absolute right-6 opacity-0 top-6 text-xl' onClick={()=>setPannel(false)} ref={pannelCloseRef}><i className="ri-arrow-down-wide-line"></i></h5>
              <h3 className='font-semibold text-xl'>Schedule Your Product Delivery</h3>
            <form onSubmit={(e) => submitHandler(e)}>
              <div className='line absolute h-15 w-1 top-[36%] left-8 bg-gray-700 rounded-full'></div>
              <input
                onClick={(e) =>{ setPannel(true) ; setPickupOrDestination(0); }} 
                onChange={(e) => {setPickup(e.target.value) ; handleLocationSuggestion(e.target.value); setError("")} }
                value={pickup}
                type="text" 
                placeholder='Add a pick up location' 
                className='bg-[#eee] px-8 py-3 rounded-lg w-full mt-5 text-base'
              />
              <input
                onClick={(e) => {setPannel(true) ; setPickupOrDestination(1);}} 
                onChange={(e) =>{ setDestination(e.target.value); handleLocationSuggestion(e.target.value); setError("")}}  
                value={destination}
                type="text" 
                placeholder='Enter your destination' 
                className='bg-[#eee] px-8 py-3 rounded-lg w-full mt-3 text-base'
              />
              {error && <p className='text-red-700 text-sm mt-1'>{error}</p>}
            </form>
        </div>
        <div className='h-0 bg-white mt-[-80px] z-11000' ref={pannelRef}>
            <DroneLocationSearchPannel 
            pannel={pannel} 
            setPannel={setPannel} 
            vehiclePannel={vehiclePannel} 
            setVehicalPannel={setVehicalPannel} 
            suggestedLocation={suggestedLocation}
            setSuggestedLocation={setSuggestedLocation}
            pickup={pickup} 
            setPickup={setPickup} 
            destination={destination} 
            setDestination={setDestination} 
            pickupOrDestination={pickupOrDestination}
            setUnavailableLocation={setUnavailableLocation}
            fair={fair}
            setFair={setFair}
            error={error}
            setError={setError}
            />
            
           {
             suggestedLocation.length <=0 && <h3>{unavailableLocation}</h3>
           }
        </div>
       </div>



       <div ref={vehicalPannelRef} className='fixed z-10 bottom-12 bg-white w-full  translate-y-full'>
            <DroneVehicalPannel  
              setConfirmRidePannel={setConfirmRidePannel} 
              setVehicalPannel={setVehicalPannel} 
              fair={fair}
              setFinalFair={setFinalFair}
              setVehicleType={setVehicleType}
            />      
       </div>

       <div ref={confirmRidePannelRef} className='fixed z-10 bottom-14 bg-white w-full p-4 translate-y-full'>
            <DroneConfirmRide 
              setConfirmRidePannel={setConfirmRidePannel} 
              setVehicalFound={setVehicalFound} 
              pickup={pickup} 
              destination={destination}
              finalFair={finalFair}
              vehicleType={vehicleType}
              createRide={createRide}
              setLoading={setLoading}
              setMessage={setMessage}
            />
       </div>

       <div ref={vehicalFoundRef} className='fixed z-10 bottom-12 bg-white w-full p-4 translate-y-full'>
            <DroneLookingForPilot 
              setVehicalFound={setVehicalFound}
              pickup={pickup}
              destination={destination}
              finalFair={finalFair}
            />
       </div>


  
       <div ref={waitingForPilotRef} className='fixed z-10 bottom-12 bg-white w-full p-4 translate-y-full'>
            <DroneWaitingForPilot setWaitingForPilot={setWaitingForPilot} rideConfirmed={rideConfirmed} rideOtp={rideCreated.otp || rideConfirmed.otp}/>
       </div>

       <DroneFooterNav />    
    </div>
    </>
  )
}

export default DroneHome
