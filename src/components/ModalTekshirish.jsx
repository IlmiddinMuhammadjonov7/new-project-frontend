// components/SuccessModal.js
import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 bg-opacity-30 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl"
      >
        <CheckCircle className="text-green-500 mx-auto mb-4" size={60} />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Topshiriq yuborildi!</h2>
        <p className="text-gray-600">Topshiriq uchun javoblaringiz muvoffaqiyatli topshirildi!</p>
        <button
          onClick={onClose}
          className="mt-6 bg-[#13265C] text-white px-6 py-2 rounded-full shadow hover:bg-[#101f4a] transition"
        >
          Yopish
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
