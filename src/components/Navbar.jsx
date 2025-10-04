import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logo1 from "../assets/Logo1.jpg";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import DashboardModal from "./DashboardModal";
import ContactModal from "./ContactModal";
import {
  Home,
  Info,
  Phone,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Radio,
  MessageSquare,
  Droplet,
  Search,
  Sparkles,
  Store as StoreIcon,
  Heart,
} from "lucide-react";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const features = [
    {
      icon: <Radio className="w-5 h-5" />,
      title: "Live Resource Tracker",
      description: "Real-time bed and ventilator tracking",
      path: "/live-resource-tracker",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "AI Chatbot Assistant",
      description: "24/7 AI-powered medical guidance",
      action: () => window.dispatchEvent(new CustomEvent("openSiaChatbot")),
    },
    {
      icon: <Droplet className="w-5 h-5 fill-red-500" />,
      title: "Urgent Blood Alerts",
      description: "Blood donation and request system",
      path: "/blood-urgent-alerts",
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "Hospital Comparison",
      description: "Compare hospitals and services",
      path: "/hospital-comparison",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "SkinCare Routine Planner",
      description: "Personalized skincare routines and diet plans",
      path: "/skincare-routine-planner",
    },
  ];

  const handleFeatureClick = (feature) => {
    setIsFeaturesOpen(false);
    if (feature.path) {
      navigate(feature.path);
    } else if (feature.action) {
      feature.action();
    }
  };

  return (
    <>
      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
        <div className="flex justify-between items-center w-full max-w-[1600px] py-4 mx-auto pr-4">
          {/* Linking Logo Image to Home Page using router */}
          <Link to="/" className="pl-4">
            {/* Logo Image */}
            <img src={logo} alt="logo" width={320} height={40} loading="lazy" />
          </Link>

          {/* Navigation Links */}
          <nav>
            <ul className="flex items-center gap-x-6">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
                >
                  <Home size={28} />
                  <span>Home</span>
                </Link>
              </li>
              <li className="relative">
                <div
                  className="flex items-center gap-1 hover:text-yellow-400 transition-colors cursor-pointer"
                  onMouseEnter={() => setIsFeaturesOpen(true)}
                  onMouseLeave={() => setIsFeaturesOpen(false)}
                >
                  <Info size={28} />
                  <span>Features</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isFeaturesOpen ? "rotate-180" : ""
                    }`}
                  />

                  {/* Dropdown Menu */}
                  {isFeaturesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-4 z-[60]">
                      <div className="px-4 pb-3 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800 text-lg">
                          Our Features
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Explore our healthcare solutions
                        </p>
                      </div>
                      {features.map((feature, index) => (
                        <button
                          key={index}
                          onClick={() => handleFeatureClick(feature)}
                          className="w-full px-4 py-3 hover:bg-orange-50 transition-colors text-left flex items-start gap-3 group"
                        >
                          <div className="text-orange-600 mt-1 group-hover:scale-110 transition-transform">
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                              {feature.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <Link
                  to="/store"
                  className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
                >
                  <StoreIcon size={28} />
                  <span>Store</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/wellness-hub"
                  className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
                >
                  <Heart size={28} />
                  <span>Wellness Hub</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Buttons */}
          {/* Login - SignUp - LogOut - Dashboard */}
          <div className="flex items-center gap-x-4 text-neutral-100">
            {/* Login Button */}
            {!isLoggedIn && (
              <Link to="/login">
                <button className="bg-neutral-800 py-[8px] px-[12px] rounded-[8px] border border-neutral-700 flex items-center gap-2 hover:bg-neutral-700 transition-colors">
                  <LogIn size={18} />
                  <span>Log in</span>
                </button>
              </Link>
            )}

            {/* SignUp Button */}
            {!isLoggedIn && (
              <Link to="/signup">
                <button className="bg-neutral-800 py-[8px] px-[12px] rounded-[8px] border border-neutral-700 flex items-center gap-2 hover:bg-neutral-700 transition-colors">
                  <UserPlus size={18} />
                  <span>Sign up</span>
                </button>
              </Link>
            )}

            {/* Dashboard button */}
            {isLoggedIn && (
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="bg-neutral-800 py-[8px] px-[12px] rounded-[8px] border border-neutral-700 flex items-center gap-2 hover:bg-neutral-700 transition-colors"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
