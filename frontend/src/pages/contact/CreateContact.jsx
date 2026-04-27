import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import leaf from "../../assets/leaf.png";
import { addContact } from "../../utills/api.js";

const CreateContact = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    contactNum: "",
    profileUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCreate = async () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.contactNum.trim()) {
      newErrors.contactNum = "Contact number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const res = await addContact({
        name: form.name,
        contactNum: form.contactNum,
        profileUrl: form.profileUrl || "",
      });

      navigate("/contacts");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message || error.message || "Failed to create contact";
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${leaf})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Glow */}
      <div className="absolute inset-0 bg-emerald-500/10 blur-3xl" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md p-6
                   bg-white/10 backdrop-blur-xl
                   border border-white/20
                   rounded-3xl
                   shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
      >

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-300 hover:text-emerald-300 mb-4"
        >
          ← Back
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-emerald-300 mb-6">
          Create Contact
        </h2>

        {/* Error Message */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-400/20 rounded-xl text-red-300 text-sm">
            {errors.submit}
          </div>
        )}

        {/* Inputs */}
        <div className="space-y-4">

          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className={`w-full bg-white/10 border
                         text-white placeholder-gray-400
                         p-3 rounded-xl backdrop-blur-md
                         focus:outline-none focus:ring-2
                         transition-all duration-300
                         ${errors.name
                  ? "border-red-400 focus:ring-red-400"
                  : "border-white/20 focus:ring-emerald-400"
                }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="contactNum"
              value={form.contactNum}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full bg-white/10 border
                         text-white placeholder-gray-400
                         p-3 rounded-xl backdrop-blur-md
                         focus:outline-none focus:ring-2
                         transition-all duration-300
                         ${errors.contactNum
                  ? "border-red-400 focus:ring-red-400"
                  : "border-white/20 focus:ring-emerald-400"
                }`}
            />
            {errors.contactNum && (
              <p className="mt-1 text-xs text-red-400">{errors.contactNum}</p>
            )}
          </div>

          <input
            name="profileUrl"
            value={form.profileUrl}
            onChange={handleChange}
            placeholder="Profile URL (optional)"
            className="w-full bg-white/10 border border-white/20
                       text-white placeholder-gray-400
                       p-3 rounded-xl backdrop-blur-md
                       focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

        </div>

        {/* Button */}
        <button
          onClick={handleCreate}
          disabled={loading}
          className="mt-6 w-full bg-emerald-500 hover:bg-emerald-400
                     text-white font-semibold py-3 rounded-xl
                     transition-all duration-300 shadow-lg
                     shadow-emerald-500/20 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Contact"}
        </button>

      </motion.div>
    </div>
  );
};

export default CreateContact;