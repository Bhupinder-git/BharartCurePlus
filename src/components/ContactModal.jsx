import React from "react";
import { X, Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Contact Us</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Admin Information */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">AC</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-1">
              Admin Contact
            </h4>
            <p className="text-gray-600">Bharat Cure+ Support Team</p>
          </div>

          <div className="space-y-4">
            {/* Phone Number */}
            <div className="flex items-center p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                <p className="font-semibold text-gray-800">+91-98765-43210</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email Address</p>
                <p className="font-semibold text-gray-800">
                  admin@bharatcure.com
                </p>
              </div>
            </div>

            {/* Office Address */}
            <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Office Address</p>
                <p className="font-semibold text-gray-800">
                  Mumbai, Maharashtra, India
                </p>
              </div>
            </div>

            {/* Support Hours */}
            <div className="flex items-center p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Support Hours</p>
                <p className="font-semibold text-gray-800">24/7 Available</p>
              </div>
            </div>
          </div>

          {/* Emergency Note */}
          <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
            <p className="text-sm text-red-800">
              <span className="font-semibold">Emergency?</span> For urgent
              medical assistance, please call our emergency helpline or contact
              your nearest hospital directly.
            </p>
          </div>

          {/* Close Button */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
