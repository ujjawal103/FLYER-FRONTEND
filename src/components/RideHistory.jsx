import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import FooterNav from "./FooterNav";
import { useNavigate } from "react-router-dom";

export default function RideHistory() {
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      setMessage("Fetching rides...");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}rides/get-user-allride`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          setRides(res.data);
          setLoading(false);
          setMessage("");
        }
      } catch (err) {
        setLoading(false);
        setMessage("");
        toast.error("Error fetching rides");
      }
    };
    fetchRides();
  }, []);

  const handleCardClick = (ride) => {
    if (["pending", "accepted", "ongoing"].includes(ride.status)) {
      setSelectedRide(ride);
    }
  };

  useEffect(() => {
    if (selectedRide) {
      navigate("/home", { state: { ride: selectedRide } });
    }
  }, [selectedRide]);

  // function to get color class
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-green-500";
      case "accepted":
        return "text-violet-500";
      case "ongoing":
        return "text-orange-500";
      case "completed":
        return "text-blue-500";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      {loading && <Loading message={message} />}
      <div className="p-4 mb-50">
        <h2 className="text-xl font-bold mb-4">My Ride History</h2>
       <div className="grid gap-4">
        {rides.map((ride) => (
          <div
            key={ride._id}
            onClick={() => handleCardClick(ride)}
            className={`p-4 border rounded-xl shadow-md transition-transform transform hover:scale-105 cursor-pointer w-full ${
              ["completed", "cancelled"].includes(ride.status.toLowerCase())
                ? "bg-gray-100 cursor-not-allowed opacity-80"
                : "bg-white hover:shadow-xl"
            }`}
          >
            {/* Top Row: Status */}
            <div className="flex justify-between items-center mb-3 flex-wrap">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  ride.status
                )} bg-gray-100 mb-1 sm:mb-0`}
              >
                {ride.status.toUpperCase()}
              </span>
              {ride.status.toLowerCase() === "completed" && (
                <span className="text-gray-500 text-sm">
                  OTP: <strong>{ride.otp}</strong>
                </span>
              )}
            </div>

            {/* From & To */}
            <div className="flex items-start mb-2">
              <span className="material-icons text-blue-500 mr-2 text-base sm:text-lg mt-1">
                location_on
              </span>
              <p className="text-gray-700 font-medium break-words">
                {ride.pickup}
              </p>
            </div>
            <div className="flex items-start mb-3">
              <span className="material-icons text-red-500 mr-2 text-base sm:text-lg mt-1">
                flag
              </span>
              <p className="text-gray-700 font-medium break-words">
                {ride.destination}
              </p>
            </div>

            {/* Pilot & Vehicle */}
            <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
              <div className="flex items-center min-w-[120px]">
                <span className="material-icons text-green-500 mr-1 text-base sm:text-lg">
                  person
                </span>
                <p className="text-gray-700 font-medium truncate">
                  {ride.pilot?.fullName.firstName || "N/A"}
                </p>
              </div>
              <div className="flex items-center min-w-[120px]">
                <span className="material-icons text-purple-500 mr-1 text-base sm:text-lg">
                  flight
                </span>
                <p className="text-gray-700 font-medium truncate">{ride.aerialVehicleType}</p>
              </div>
            </div>

            {/* Fare */}
            <div className="flex items-center justify-end mt-2">
              <span className="material-icons text-yellow-500 mr-1 text-base sm:text-lg">
                currency_rupee
              </span>
              <p className="text-gray-800 font-semibold text-lg">{ride.fare}</p>
            </div>
          </div>
        ))}
      </div>






        <FooterNav />
      </div>
    </>
  );
}
