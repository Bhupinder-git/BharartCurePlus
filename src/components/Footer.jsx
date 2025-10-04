import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Video,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <footer className="bg-gray-50 pt-6 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Know Us */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Know Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Press Coverage
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Business Partnership
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Become a Health Partner
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Corporate Governance
                </a>
              </li>
            </ul>
          </div>

          {/* Our Policies */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              Our Policies
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-base"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-base"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Editorial Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Return Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  IP Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Grievance Redressal Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              Our Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-base"
                >
                  Live Resource Tracker
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Book Bed and Lab Tests
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  24/7 Ai Powered Consultation (SIA)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Urgent Blood Alerts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Comparison
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Connect</h3>
            <div>
              <p className="text-gray-700 font-semibold mb-3 text-base">
                Social Links
              </p>
              <div className="flex gap-2 mb-6">
                <a
                  href="#"
                  className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700"
                >
                  <Facebook size={18} className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded flex items-center justify-center hover:opacity-90"
                >
                  <Instagram size={18} className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center hover:bg-sky-600"
                >
                  <Twitter size={18} className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700"
                >
                  <Youtube size={18} className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center hover:bg-blue-800"
                >
                  <Linkedin size={18} className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center hover:bg-gray-800"
                >
                  <Video size={18} className="text-white" />
                </a>
              </div>
              <p className="text-gray-700 font-semibold mb-2 text-base">
                Want daily dose of health?
              </p>
              <button
                onClick={handleSignUpClick}
                className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded text-base transition-colors duration-200"
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b">
          {/* Reliable */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center">
                <img
                  src="/src/assets/TrustBadges/reliable.png"
                  alt="Reliable"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Reliable</h4>
              <p className="text-gray-600 text-sm">
                Only verified hospitals, pharmacies, and trusted doctors are
                listed on Bharat Cure+ ensuring safe, reliable, and transparent
                healthcare.
              </p>
            </div>
          </div>

          {/* Secure */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center">
                <img
                  src="/src/assets/TrustBadges/secure.png"
                  alt="Secure"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Secure</h4>
              <p className="text-gray-600 text-sm">
                Bharat Cure+ ensures safety with secure login verification and
                128-bit SSL encryption for protected access and transactions.
              </p>
            </div>
          </div>

          {/* Affordable */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center">
                <img
                  src="/src/assets/TrustBadges/affordable.png"
                  alt="Affordable"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">
                Affordable
              </h4>
              <p className="text-gray-600 text-sm">
                With Bharat Cure+, compare prices for medicines and surgeries to
                find the most affordable options, saving you more on quality
                healthcare.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
