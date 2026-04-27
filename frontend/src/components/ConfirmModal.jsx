import React from "react";
import { motion } from "framer-motion";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", isDangerous = false }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-xl font-bold text-emerald-300 mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-300 text-sm mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold
                       bg-gray-500/20 hover:bg-gray-500/30
                       text-gray-300 border border-gray-400/20
                       transition-all duration-300"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold
                       transition-all duration-300
                       ${isDangerous
                       ? "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/20"
                       : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/20"
                       }`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmModal;
