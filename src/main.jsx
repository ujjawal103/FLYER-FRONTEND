import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter  } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import PilotContext from './context/PilotContext.jsx'
import SocketProvider from './context/SocketContext.jsx' 
import RideContext from './context/RideContext.jsx'
import DroneUserContext from './dronecontext/DroneUserContext.jsx'
import DronePilotContext from './dronecontext/DronePilotContext.jsx'
import DroneRideContext from './dronecontext/DroneRideContext.jsx'
import DroneSocketProvider from './dronecontext/DroneSocketContext.jsx'

createRoot(document.getElementById('root')).render(
    <DroneSocketProvider>
      <DroneUserContext>
       <DronePilotContext>
        <DroneRideContext>
          <RideContext>
            <SocketProvider> 
              <PilotContext>
                <UserContext>
                  <BrowserRouter>
                      <App />
                  </BrowserRouter>
                </UserContext>
              </PilotContext>
           </SocketProvider>
          </RideContext>
        </DroneRideContext>
      </DronePilotContext>
     </DroneUserContext>
    </DroneSocketProvider>
)
