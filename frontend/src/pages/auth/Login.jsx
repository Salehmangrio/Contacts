import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import leaf from "../../assets/leaf.png";
import logo from "../../assets/logo.gif";
import { loginUser } from "../../utills/api.js";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setResult(null);

    try {
      const data = await loginUser(user);

      // save token
      localStorage.setItem("token", data.data.token);

      setResult({
        success: true,
        message: data.message,
      });
      navigate("/contacts");

    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${leaf})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Animated Glow */}
      <motion.div
        className="absolute inset-0 bg-emerald-500/10 blur-3xl"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 
                     shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]
                     rounded-3xl p-8 space-y-6"
        >

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-1 md:gap-3">
              <img src={logo} alt="logo" className="h-14 w-14 object-contain drop-shadow-lg" />
              <h1 className="text-2xl md:text-4xl font-bold md:font-extrabold text-emerald-300 tracking-tight">
                Contacts
              </h1>
            </div>

            <p className="text-xs md:text-sm text-gray-300">
              Welcome back! Please login to continue
            </p>
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-md md:text-xl font-semibold text-white">
              Sign In
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              Access your account
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">

            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300
                         rounded-xl p-2 md:p-3 backdrop-blur-md
                         transition-all duration-300
                         hover:bg-white/20 hover:border-white/30
                         focus:bg-white/20 focus:border-emerald-400 
                         focus:ring-2 focus:ring-emerald-400/40
                         focus:scale-[1.02] focus:shadow-lg focus:shadow-emerald-500/10
                         outline-none text-sm md:text-md"
            />

            <input
              name="password"
              value={user.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"

              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300
                         rounded-xl p-2 md:p-3 backdrop-blur-md
                         transition-all duration-300
                         hover:bg-white/20 hover:border-white/30
                         focus:bg-white/20 focus:border-emerald-400 
                         focus:ring-2 focus:ring-emerald-400/40
                         focus:scale-[1.02] focus:shadow-lg focus:shadow-emerald-500/10
                         outline-none text-sm md:text-md"
            />

          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 
                       text-white font-semibold py-2 md:py-3 rounded-xl 
                       transition-all duration-300 
                       shadow-lg shadow-emerald-500/20 disabled:opacity-50 text-sm md:text-md"
          >
            {loading ? "Logging in..." : "Sign In"}
          </motion.button>

          {/* Footer */}
          <div className="flex justify-center items-center gap-2 text-sm">
            <p className="text-xs md:text-sm text-gray-400">Don’t have an account?</p>
            <NavLink
              to="../register"
              className="text-emerald-300 font-medium md:font-semibold hover:underline"
            >
              Sign up
            </NavLink>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;