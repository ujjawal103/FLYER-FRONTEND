import React, { useContext, useEffect } from 'react';
import { PilotDataContext } from '../context/PilotContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const PilotProtectedWrapper = ({ children }) => {

  const { pilot, setPilot, isLoading, setIsLoading } = useContext(PilotDataContext);


  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/pilot-login");
    }


  axios.get(`${import.meta.env.VITE_BASE_URL}pilots/profile` , {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if(response.status === 200 && (response.data.pilot.aerialVehicle.aerialVehicleType === "airCab" || response.data.pilot.aerialVehicle.aerialVehicleType === "airPod")){
        setPilot(response.data.pilot);
        setIsLoading(false);
      }else{
        localStorage.removeItem('token');
        navigate("/pilot-login");
        toast.error("Pilot is not registered for ride services");
        setIsLoading(false);
        setPilot({});
      }
      
    })
    .catch(error => {
        localStorage.removeItem('token');
        navigate("/pilot-login");
        toast.error("Something went wrong !");
        setIsLoading(false);
        setPilot({});
    });

  }, [token, navigate]);

  if(isLoading){
    return <Loading message="Loading..." />;
  }

  return <>{children}</>;
};

export default PilotProtectedWrapper;
