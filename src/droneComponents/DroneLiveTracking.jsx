// LiveTracking.jsx
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { RideDataContext } from "../dronecontext/DroneRideContext";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper to recenter map on pilot
function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 15);
    }
  }, [coords, map]);
  return null;
}















export default function DroneLiveTracking({setDistance , setDuration}) {
  
  const [coords, setCoords] = useState(null); // Pilot live location
  const [destination , setDestination] = useState({ lat: "", lng: "" }); // Example destination
  const [route, setRoute] = useState([]); // Route coordinates

  const {currRide , setCurrRide} = useContext(RideDataContext);
  const token = localStorage.getItem("token");



  function formatDistance(meters) {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  } else {
    return `${(meters / 1000).toFixed(1)} km`;
  }
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}


   if(currRide && Object.keys(currRide).length === 0){
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-lg font-semibold">No Product in progress</p>
      </div>
    );
  }



  //get destination coordinates
   useEffect( () => {
    // setDestination({ lat: 26.8858, lng: 81.0396 });
    const fetchCoordsDestination = async() =>{
        try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}maps/get-coordinates?address=${currRide.destination}`);

        if (response.status === 200) {
          setDestination({
            lat: response.data.ltd,
            lng: response.data.lang,
          });
        }else if (response.status === 404) {
          setDestination({ lat: "", lng: "" });
        }else{
          setDestination({ lat: "", lng: "" });
        }
      } catch (error) {
        console.error("Error fetching Product data:", error);
        setDestination({ lat: "", lng: "" });
      }
    }

    fetchCoordsDestination();
  }, []);




  // Get pilot live location every 10 seconds
  useEffect(() => {
    let intervalId;
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          { enableHighAccuracy: true }
        );
      }
    };
    fetchLocation(); // Initial fetch
    intervalId = setInterval(fetchLocation, 10000); // Every 10 seconds
    // return () => clearInterval(intervalId);
  }, []);



  // Fetch route when coords available
  useEffect(() => {
    if (coords && destination && destination.lat !== "" && destination.lng !== "") {
      const fetchRoute = async () => {
        try {
          const res = await axios.get(
            `https://router.project-osrm.org/route/v1/driving/${coords.lng},${coords.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`
          );
          if (res.data.routes.length > 0) {
            const coordsArray = res.data.routes[0].geometry.coordinates.map((c) => [
              c[1],
              c[0],
            ]);
            setRoute(coordsArray);
            const formattedDistance = formatDistance(res.data.routes[0].distance);
            const formattedDuration = formatDuration(res.data.routes[0].duration);
            setDistance(formattedDistance);
            setDuration(formattedDuration);
          }
        } catch (err) {
          console.error("Route fetch error:", err);
          setDistance("");
          setDuration("");
        }
      };
      fetchRoute();
    }
    else{
      setRoute([]); // Reset route if no destination
    }
  }, [coords, destination]);







 

  return (
    <div className="w-full h-full relative z-1">
      {coords ? (
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          scrollWheelZoom={true}
          dragging={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Pilot Marker */}
          <Marker position={[coords.lat, coords.lng]}>
            <Popup>You are here 🚖</Popup>
          </Marker>

          {/* Destination Marker */}
          <Marker position={[destination.lat, destination.lng]}>
            <Popup>Destination 📍</Popup>
          </Marker>

          {/* Route Line */}
          {route.length > 0 && <Polyline positions={route} color="blue" />}

          <RecenterMap coords={coords} />
        </MapContainer>
      ) : (
        <p className="text-center pt-5">Fetching your location...</p>
      )}
    </div>
  );
}
