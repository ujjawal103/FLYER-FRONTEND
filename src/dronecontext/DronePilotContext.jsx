import React , {createContext, useContext , useState} from 'react'



export const PilotDataContext = createContext();

const DronePilotContext = ({children}) => {

    const [pilot, setPilot] = useState({});
    const [ isLoading , setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const updatePilot = (pilotData) => {
        setPilot(pilotData);
    }

    const value = {
      pilot,
      setPilot,
      updatePilot,
      isLoading,
      setIsLoading,
      error,
      setError
    };

  return (
    <PilotDataContext.Provider value={value}>
      {children}
    </PilotDataContext.Provider>
  )
}

export default DronePilotContext
