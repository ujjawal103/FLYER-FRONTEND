import React, { useContext, useEffect } from 'react';
import { PilotDataContext } from '../dronecontext/DronePilotContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DroneLoading from '../droneComponents/DroneLoading';
import toast from 'react-hot-toast';

const DronePilotProtectedWrapper = ({ children }) => {

  const { pilot, setPilot, isLoading, setIsLoading } = useContext(PilotDataContext);


  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/drone-pilot-login");
    }


  axios.get(`${import.meta.env.VITE_BASE_URL}pilots/profile` , {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if(response.status === 200 && response.data.pilot.aerialVehicle.aerialVehicleType === "drone"){
        setPilot(response.data.pilot);
        setIsLoading(false);
      }else{
        localStorage.removeItem('token');
        navigate("/drone-pilot-login");
        toast.error("Pilot is not registered for drone services");
        setIsLoading(false);
        setPilot({});
      }
    })
    .catch(error => {
        localStorage.removeItem('token');
        navigate("/drone-pilot-login");
        setIsLoading(false);
        setPilot({});
    });

  }, [token, navigate]);

  if(isLoading){
    return <DroneLoading message="Loading..." />;
  }

  return <>{children}</>;
};

export default DronePilotProtectedWrapper;
