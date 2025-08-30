import React, { useEffect, useRef, useState , useContext } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehicalPannel from '../components/VehicalPannel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForPilot from '../components/LookingForPilot';
import WaitingForPilot from '../components/WaitingForPilot';
import axios from "axios";
import { useSocket } from '../context/SocketContext.jsx';
import { UserDataContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { RideDataContext } from '../context/RideContext.jsx';
import Loading from '../components/Loading.jsx';
import toast from "react-hot-toast";
import FooterNav from '../components/FooterNav.jsx';
import { useLocation } from 'react-router-dom';


gsap.registerPlugin(useGSAP);

const Home = () => {
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
    // console.log("User : ", user);

  }, [user]);


  socket.on("ride-confirmed", (data) => {
    setRideConfirmed(data);
    setVehicalFound(false);
    setWaitingForPilot(true);
  });


  socket.on("ride-started", (data) => {
    toast.success("Ride started successfully");
    setCurrRide(data);
    setWaitingForPilot(false);
  });

  socket.on("ride-cancelled-by-pilot" ,(data) => {
    toast.success("Ride cancelled By Pilot");
    setWaitingForPilot(false);
    setCurrRide({});
  })

  useEffect(() => {
    if (Object.keys(currRide).length > 0) {
      navigate("/riding");
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
        toast.success("ride created");
        setLoading(false);
        setVehicalFound(true);
      }
      
    } catch (error) {
      if (error.response?.status === 409) {
      toast.error(error.response.data.message);
      setLoading(false);
      setMessage("");
      setVehicalFound(false);
      navigate("/history");                    //set to current state of ride
    } else {
      toast.error("Ride not Created, try again!");
      setLoading(false);
      setMessage("");
      setConfirmRidePannel(true);
    }
    }
  }






  

  return (
    <>
    {loading && <Loading message={message}/>}
    <div className='h-screen relative'>
       <img className='w-20 absolute left-5 top-5' src="/FLYER.png" alt="Logo" />

       <div className='h-screen w-screen '>
        <img className='object-cover h-full w-full' src="/map.png" alt="map" />
       </div>

       <div className='absolute top-0 w-full h-screen flex flex-col justify-end'>
        <div className='h-[40%] p-5 bg-white relative'>
              <h5 className='absolute right-6 opacity-0 top-6 text-xl' onClick={()=>setPannel(false)} ref={pannelCloseRef}><i className="ri-arrow-down-wide-line"></i></h5>
              <h4 className='font-semibold text-2xl'>Find a trip</h4>
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
            <LocationSearchPannel 
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
            <VehicalPannel  
              setConfirmRidePannel={setConfirmRidePannel} 
              setVehicalPannel={setVehicalPannel} 
              fair={fair}
              setFinalFair={setFinalFair}
              setVehicleType={setVehicleType}
            />      
       </div>

       <div ref={confirmRidePannelRef} className='fixed z-10 bottom-14 bg-white w-full p-4 translate-y-full'>
            <ConfirmRide 
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
            <LookingForPilot 
              setVehicalFound={setVehicalFound}
              pickup={pickup}
              destination={destination}
              finalFair={finalFair}
            />
       </div>


  
       <div ref={waitingForPilotRef} className='fixed z-10 bottom-12 bg-white w-full p-4 translate-y-full'>
            <WaitingForPilot setWaitingForPilot={setWaitingForPilot} rideConfirmed={rideConfirmed} rideOtp={rideCreated.otp || rideConfirmed.otp}/>
       </div>

       <FooterNav />    
    </div>
    </>
  )
}

export default Home
