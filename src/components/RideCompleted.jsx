import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function RideCompleted({ passengerName = "Friend" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "user";

  const onHome = () => {
    if (userType === "user") {
      navigate("/home");
    } else {
      navigate("/pilot-home");
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex flex-col items-center justify-center p-4 gap-8">

      {/* Confetti / animated check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 1, type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center justify-center rounded-full bg-white p-8 shadow-xl"
      >
        <CheckCircle2 className="h-20 w-20 text-green-600" />
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full max-w-md text-center px-4"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          Ride Completed 🎉
        </h1>
        <p className="text-gray-700 text-sm md:text-base">
          Thanks for riding with us, <span className="font-semibold">{passengerName}</span>. We hope you had a smooth journey!
        </p>

        <motion.button
          onClick={onHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white font-semibold shadow hover:bg-gray-800 transition"
        >
          <Home className="h-5 w-5" /> Back to Home
        </motion.button>
      </motion.div>

      {/* Optional floating confetti shapes */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
        className="absolute top-10 left-1/4 w-3 h-3 bg-yellow-400 rounded-full"
      />
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2, delay: 0.5 }}
        className="absolute top-16 right-1/4 w-3 h-3 bg-pink-400 rounded-full"
      />
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2, delay: 1 }}
        className="absolute top-20 left-1/2 w-3 h-3 bg-blue-400 rounded-full"
      />
    </div>
  );
}
