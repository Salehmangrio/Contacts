import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import leaf from "../../assets/leaf.png";
import logo from "../../assets/logo.gif";

const Landing = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative h-screen overflow-hidden"
        >

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{ backgroundImage: `url(${leaf})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />

            {/* Animated Glow */}
            <motion.div
                className="absolute inset-0 bg-emerald-500/10 blur-3xl"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-3xl w-full text-center space-y-8 p-8 md:p-12 rounded-3xl 
                               bg-white/10 backdrop-blur-xl border border-white/20 
                               shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                >

                    {/* Logo */}
                    <div className="flex items-center justify-center gap-4">
                        <img
                            src={logo}
                            alt="logo"
                            className="h-14 w-14 object-contain drop-shadow-lg"
                        />
                        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-300 tracking-tight">
                            Contacts
                        </h1>
                    </div>

                    {/* Heading */}
                    <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
                        Your contacts, <br />
                        <span className="text-emerald-300">
                            organized beautifully.
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        A modern contact management system where you can securely save,
                        organize, and access your contacts from any device — instantly, anywhere.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <NavLink
                                to="/register"
                                className="bg-emerald-500 hover:bg-emerald-400 
                                           text-white font-semibold px-8 py-3 rounded-xl 
                                           transition-all duration-300 shadow-lg shadow-emerald-500/20"
                            >
                                Get Started
                            </NavLink>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <NavLink
                                to="/login"
                                className="bg-white/10 hover:bg-white/20 
                                           text-white font-semibold px-8 py-3 rounded-xl 
                                           border border-white/20 transition-all duration-300"
                            >
                                Login
                            </NavLink>
                        </motion.div>

                    </div>

                    {/* Feature Pills */}
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                        className="flex flex-wrap justify-center gap-3 pt-4 text-sm text-white/80"
                    >

                        {[
                            "🔐 Secure Login",
                            "☁️ Cloud Sync",
                            "📇 Smart Contacts"
                        ].map((item, index) => (
                            <motion.span
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                className="bg-white/10 px-4 py-2 rounded-full 
                                           border border-white/10 backdrop-blur-md"
                            >
                                {item}
                            </motion.span>
                        ))}

                    </motion.div>

                </motion.div>
            </div>
        </motion.div>
    );
};

export default Landing;