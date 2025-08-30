import React, { useRef, useState , useEffect , useContext } from 'react'
import { Link } from 'react-router-dom'
import PilotDetails from '../components/PilotDetails'
import RidePopUpToPilot from '../components/RidePopUpToPilot'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopupToPilot from '../components/ConfirmRidePopupToPilot'
import { useSocket } from '../context/SocketContext.jsx';
import { PilotDataContext } from '../context/PilotContext.jsx'
import axios from 'axios'
import Loading from '../components/Loading.jsx';
import toast from "react-hot-toast";
import FooterNavPilot from '../components/FooterNavPilot.jsx';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PilotHome = () => {

  

  const ridePopupPannelRef = useRef(null);
  const [ridePopupPannel , setRidePopupPannel] = useState(false);
  const confirmRidePopupPannelRef = useRef(null);
  const [confirmRidePopupPannel , setConfirmRidePopupPannel] = useState(false);
  const [loading , setLoading] = useState(false);
  const [message , setMessage] = useState("");

  const [ride , setRide] = useState({});
  const [rideBy , setRideBy] = useState({});

  const { socket } = useSocket();
  const { pilot , setPilot } = useContext(PilotDataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const rideInProgress = location.state?.ride;

   const token = localStorage.getItem('token');
  
    // useEffect(() => {
    //   socket.emit("join", {userType : "pilot" , userId: pilot._id });
    //   // console.log("pilot : ", pilot);



    //   const updatePilotLocation = () => {
    //     if(navigator.geolocation){
    //       navigator.geolocation.getCurrentPosition(async (position) => {
    //         const { latitude, longitude } = position.coords;
    //         // console.log("Pilot Location Updated:", { ltd: latitude, lang: longitude });

    //         await socket.emit("update-pilot-location", {
    //           pilotId: pilot._id,
    //           location: { ltd: latitude, lang: longitude }
    //         });

    //         setPilot(prev => ({
    //           ...prev,
    //           location: { ltd: latitude, lang: longitude }
    //         }));




    //       }, (error) => {
    //         console.error("Error getting location:", error);
    //       });
    //     }
    //   }


    //   const locationInterval = setInterval(updatePilotLocation, 10000); // Update every 10 seconds
    //   updatePilotLocation(); // Initial call to set location immediately

    // }, [pilot]); 


    useEffect(()=>{
        if(rideInProgress?.status === "accepted"){
          setRide(rideInProgress);
          setRideBy(rideInProgress.user.fullName);
          setConfirmRidePopupPannel(true);
          setRidePopupPannel(false);
        }
        if(rideInProgress?.status === "ongoing"){
          navigate("/pilot-riding");
        }
      },[location])

    useEffect(() => {
        socket.emit("join", { userType: "pilot", userId: pilot._id });

        const updatePilotLocation = () => {
          // console.log("Updating pilot location...");
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;

              socket.emit("update-pilot-location", {
                pilotId: pilot._id,
                location: { ltd: latitude, lang: longitude }
              });
            }, (error) => {
              console.error("Error getting location:", error);
            });
          }
        };

        const locationInterval = setInterval(updatePilotLocation, 10000);
        updatePilotLocation();

        return () => clearInterval(locationInterval); // cleanup
}, []); // <-- empty deps so it runs only once




    socket.on("new-ride", (data , rideBy) => {
        setRide(data);
        setRideBy(rideBy);
        setRidePopupPannel(true);
    });








   





    const rideConfirm = async (rideId) => {
     try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}rides/confirm-ride`,
        {
          rideId
        },
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (response.status === 200) {
          setRide(response.data);
          setLoading(false);
          toast.success("ride confirmed");
          setConfirmRidePopupPannel(true);
        }
     } catch (err) {
             setLoading(false);
             toast.error(err.message);
             setRidePopupPannel(true)

               if (err.response) {
              toast.error(err.response.data.message); 
            } else {
              toast.error("Error:", err.message);
            }
        }
    }





    socket.on("remove-ride", (data) => {
    const  rideId  = data.toString();
    // console.log("curr ride:", ride);
    if(rideId === ride._id) setRidePopupPannel(false);
    // console.log("Popup removed for ride:", rideId);
    });

    socket.on("ride-cancelled-by-user" ,(data) => {
    toast.success("Ride cancelled By User");
    setConfirmRidePopupPannel(false);
    setRidePopupPannel(false);
    setRide({});
    })

    // useEffect(() => {
    //   console.log("Ride data updated:", ride);
    // }, [ride]);



   useGSAP(function(){
    if(ridePopupPannel){
      gsap.to(ridePopupPannelRef.current , {
      transform : "translateY(0)"
      })
    }
    else{
      gsap.to(ridePopupPannelRef.current , {
      transform : "translateY(200%)"
    })
    }
  },[ridePopupPannel])


    useGSAP(function(){
    if(confirmRidePopupPannel){
      gsap.to(confirmRidePopupPannelRef.current , {
      transform : "translateY(0)"
      })
    }
    else{
      gsap.to(confirmRidePopupPannelRef.current , {
      transform : "translateY(200%)"
    })
    }
  },[confirmRidePopupPannel])



  return (
   <>
   {loading && <Loading message={message}/>}
    <div className='h-screen '>
        <div className='w-full p-3 fixed top-0 flex items-center justify-between'>
          <img src="/FLYER.png" alt="" width={100}/>
          <Link to={"/home"} className='h-14 w-14 bg-white flex items-center justify-center rounded-full'>
            <i className="ri-logout-box-r-line text-xl font-semibold"></i>
          </Link>
        </div>
      <div className='h-3/5'>
        <img src="/map.png" alt="" className='h-full w-full object-cover'/>
      </div>
      <div className='h-2/5 p-4'>
          <PilotDetails />
      </div>


       <div ref={ridePopupPannelRef} className='fixed z-10 bottom-12 bg-white w-full p-4 translate-y-full'>
            <RidePopUpToPilot 
              setRidePopupPannel={setRidePopupPannel} 
              setConfirmRidePopupPannel={setConfirmRidePopupPannel} 
              ride={ride} 
              rideBy={rideBy}
              rideConfirm={rideConfirm}
              setLoading={setLoading}
              setMessage={setMessage}
            />
       </div>

       <div ref={confirmRidePopupPannelRef} className='fixed z-10 bottom-0 bg-white w-full p-4 translate-y-full h-screen'>
            <ConfirmRidePopupToPilot setConfirmRidePopupPannel={setConfirmRidePopupPannel} setRidePopupPannel={setRidePopupPannel} ride={ride} rideBy={rideBy} setLoading={setLoading} setMessage={setMessage} loading={loading} message={message} />
       </div>
    </div>


    <FooterNavPilot />
   </>
  )
}

export default PilotHome
