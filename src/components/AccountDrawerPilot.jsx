import React, { useRef, useEffect } from "react";
import { User, Mail, LogOut, Plane, Car, MapPin, Hash, Users, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccountDrawer({ isOpen, onClose, pilot }) {
  // console.log(pilot);
  const drawerRef = useRef();
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleLogout = () => {
    navigate("/pilot-logout");
  };

  return (
    <>
      {/* Overlay with fade animation */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? "bg-opacity-40" : "bg-opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-2/3 sm:w-1/2 lg:w-1/3 flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Pilot Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* User Details */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {/* Status */}
          <div className="flex items-center gap-3">
            <Circle
              className={`w-4 h-4 ${
                pilot?.status === "active" ? "text-green-500" : "text-gray-400"
              }`}
              fill={pilot?.status === "active" ? "green" : "gray"}
            />
            <p className="text-gray-700">
              <span className="font-medium">Status:</span> {pilot?.status || "N/A"}
            </p>
          </div>

          {/* Name */}
          <div className="flex items-center gap-3">
            <User className="text-blue-500 w-6 h-6" />
            <p className="text-gray-700">
              <span className="font-medium">First Name:</span>{" "}
              {pilot?.fullName?.firstName || "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <User className="text-purple-500 w-6 h-6" />
            <p className="text-gray-700">
              <span className="font-medium">Last Name:</span>{" "}
              {pilot?.fullName?.lastName || "N/A"}
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-green-500 w-6 h-6" />
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {pilot?.email || "N/A"}
            </p>
          </div>

          {/* Aerial Vehicle Info */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center gap-2">
              <Plane className="text-indigo-500 w-5 h-5" /> Aerial Vehicle
            </h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-700">
                <Car className="text-blue-400 w-5 h-5" /> 
                <span className="font-medium">Type:</span> {pilot?.aerialVehicle?.aerialVehicleType || "N/A"}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Users className="text-orange-400 w-5 h-5" /> 
                <span className="font-medium">Capacity:</span> {pilot?.aerialVehicle?.capacity || "N/A"}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Hash className="text-gray-500 w-5 h-5" /> 
                <span className="font-medium">Plate:</span> {pilot?.aerialVehicle?.plate || "N/A"}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Circle className="text-red-500 w-5 h-5" /> 
                <span className="font-medium">Color:</span> {pilot?.aerialVehicle?.color || "N/A"}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center gap-2">
              <MapPin className="text-pink-500 w-5 h-5" /> Current Location
            </h3>
            <p className="text-gray-700">
              <span className="font-medium">Latitude:</span>{" "}
              {pilot?.location?.ltd || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Longitude:</span>{" "}
              {pilot?.location?.lang || "N/A"}
            </p>
          </div>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
    </>
  );
}
