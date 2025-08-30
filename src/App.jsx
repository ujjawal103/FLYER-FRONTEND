import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import PilotLogin from './pages/PilotLogin'
import PilotSignup from './pages/PilotSignup'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import PilotHome from './pages/PilotHome'
import PilotProtectedWrapper from './pages/PilotProtectedWrapper'
import PilotLogout from './pages/PilotLogout'
import Riding from './components/Riding'
import PilotRiding from './pages/PilotRiding'
import RideCompleted from './components/RideCompleted'
import { Toaster } from "react-hot-toast";
import RideHistory from './components/RideHistory'
import RideHistoryPilot from './components/RideHistoryPilot'


// Drone Components
import DroneUserLogin from './dronePages/DroneUserLogin'
import DroneUserSignup from './dronePages/DroneUserSignup'
import DroneUserProtectedWrapper from './dronePages/DroneUserProtectedWrapper'
import DroneUserLogout from './dronePages/DroneUserLogout'
import DronePilotLogin from './dronePages/DronePilotLogin'
import DronePilotSignup from './dronePages/DronePilotSignup'
import DronePilotProtectedWrapper from './dronePages/DronePilotProtectedWrapper'
import DronePilotLogout from './dronePages/DronePilotLogout'
import DroneRiding from './droneComponents/DroneRiding'
import DronePilotRiding from './dronePages/DronePilotRiding'
import DroneRideCompleted from './droneComponents/DroneRideCompleted'
import DroneRideHistory from './droneComponents/DroneRideHistory'
import DroneRideHistoryPilot from './droneComponents/DroneRideHistoryPilot'
import DronePilotHome from './dronePages/DronePilotHome'
import DroneHome from './dronePages/DroneHome'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/riding' element={
          <UserProtectedWrapper>
            <Riding />
          </UserProtectedWrapper>
        } />  
        <Route path='/history' element={
          <UserProtectedWrapper>
            <RideHistory />
          </UserProtectedWrapper>
        } />
        <Route path='/pilot-login' element={<PilotLogin />} />
        <Route path='/pilot-signup' element={<PilotSignup />} />
         <Route path='/pilot-riding' element={
           <PilotProtectedWrapper>
             <PilotRiding />
           </PilotProtectedWrapper>
         } />               

        <Route path='/ride-completed' element={<RideCompleted />} /> {/* This is the page that shows after ride is completed */}
        <Route path='/home' element={
           <UserProtectedWrapper>                                   {/* now this route is only accessable if user loggedIn */}
            <Home />
          </UserProtectedWrapper>
        } />
       <Route path='/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />


        <Route path='/pilot-home' element={
          <PilotProtectedWrapper>
            <PilotHome />
          </PilotProtectedWrapper>
        }
        />


        <Route path='/pilot-logout' element={
          <PilotProtectedWrapper>
            <PilotLogout />
          </PilotProtectedWrapper>
        } />

        <Route path='/pilot-history' element={
          <PilotProtectedWrapper>
            <RideHistoryPilot />
          </PilotProtectedWrapper>
        } />



















        {/* ------------------DRONE ---------------------------- */}
         <Route path='/' element={<Start />} />
        <Route path='/drone/login' element={<DroneUserLogin />} />
        <Route path='/drone/signup' element={<DroneUserSignup />} />
        <Route path='/drone/riding' element={
          <DroneUserProtectedWrapper>
            <DroneRiding />
          </DroneUserProtectedWrapper>
        } />  
        <Route path='/drone/history' element={
          <DroneUserProtectedWrapper>
            <DroneRideHistory />
          </DroneUserProtectedWrapper>
        } />
        <Route path='/drone-pilot-login' element={<DronePilotLogin />} />
        <Route path='/drone-pilot-signup' element={<DronePilotSignup />} />
         <Route path='/drone-pilot-riding' element={
           <DronePilotProtectedWrapper>
             <DronePilotRiding />
           </DronePilotProtectedWrapper>
         } />               

        <Route path='/drone-ride-completed' element={<DroneRideCompleted />} /> {/* This is the page that shows after ride is completed */}
        <Route path='/drone-home' element={
           <DroneUserProtectedWrapper>                                   {/* now this route is only accessable if user loggedIn */}
            <DroneHome />
          </DroneUserProtectedWrapper>
        } />
       <Route path='/drone-logout' element={
          <DroneUserProtectedWrapper>
            <DroneUserLogout />
          </DroneUserProtectedWrapper>
        } />


        <Route path='/drone-pilot-home' element={
          <DronePilotProtectedWrapper>
            <DronePilotHome />
          </DronePilotProtectedWrapper>
        }
        />


        <Route path='/drone-pilot-logout' element={
          <DronePilotProtectedWrapper>
            <DronePilotLogout />
          </DronePilotProtectedWrapper>
        } />

        <Route path='/drone-pilot-history' element={
          <DronePilotProtectedWrapper>
            <DroneRideHistoryPilot />
          </DronePilotProtectedWrapper>
        } />


        <Route path="*" element={<NotFound />} />

      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
    </>
  )
}

export default App
