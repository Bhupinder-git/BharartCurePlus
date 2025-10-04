import React, { useState, useEffect } from "react";
import { Bot, X } from "lucide-react";
import AIDoctorChatbot from "./MessageIcon";
import SiaImage from "../assets/Sia.jpeg";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
    };

    window.addEventListener("openSiaChatbot", handleOpenChatbot);

    return () => {
      window.removeEventListener("openSiaChatbot", handleOpenChatbot);
    };
  }, []);

  return (
    <>
      {/* Floating Chat Button - Only show when chatbot is closed */}
      {!isOpen && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center">
          {/* Main Button */}
          <button
            onClick={toggleChatbot}
            className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full w-24 h-24 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ring-4 ring-[#f97316]/20 flex items-center justify-center overflow-hidden animate-bounce"
            aria-label="Open SIA"
          >
            <img
              src={SiaImage}
              alt="SIA"
              className="w-full h-full object-cover"
            />
          </button>

          {/* SIA Text */}
          <div className="mt-2 text-center">
            <span className="text-[#f97316] font-bold text-xl bg-white px-3 py-1 rounded-full shadow-md border-2 border-[#f97316]/20">
              SIA
            </span>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleChatbot}
          />

          {/* Chatbot Container with Close Button Below */}
          <div className="absolute bottom-24 right-6 flex flex-col items-center">
            {/* Chatbot Interface */}
            <div className="w-96 h-[600px] bg-white rounded-lg shadow-2xl overflow-hidden mb-4">
              <AIDoctorChatbot />
            </div>

            {/* Close Button Below Chatbot */}
            <button
              onClick={toggleChatbot}
              className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full w-12 h-12 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              aria-label="Close SIA"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
