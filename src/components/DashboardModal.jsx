import React from "react";
import { Edit, Wallet, ChevronRight, LogOut, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";

const DashboardModal = ({ isOpen, onClose, setIsLoggedIn }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Use auth context logout
    setIsLoggedIn(false); // Keep for backward compatibility
    toast.success("Logged Out");
    onClose(); // Close the modal after logout
  };

  // Function to blur the last 7 digits of mobile number
  const formatMobileNumber = (number) => {
    if (number.length >= 10) {
      const firstThree = number.substring(0, 3);
      const blurredPart = "*".repeat(7);
      return firstThree + blurredPart;
    }
    return number;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container - Positioned at top right */}
      <div className="absolute top-25 right-30 bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[70vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      U
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        User
                      </h2>
                      <p className="text-gray-600">
                        {formatMobileNumber("9915609813")}
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 font-medium">
                    EDIT
                  </button>
                </div>
              </div>

              {/* Plus Membership Card */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">⬥</span>
                  </div>
                  <span className="font-bold text-lg">Plus</span>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">Save flat 5% extra on</p>
                  <p className="text-lg font-semibold">
                    medicines & enjoy FREE
                  </p>
                  <p className="text-lg font-semibold">delivery with PLUS</p>
                  <p className="text-lg font-semibold">membership</p>
                </div>
                <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
              </div>

              {/* Wallet Balance Card */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">
                        Wallet Balance
                      </p>
                      <p className="text-2xl font-bold text-gray-900">₹0</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Your Account
              </h3>

              {/* Menu Items */}
              <div className="space-y-1">
                <button className="w-full text-left py-4 px-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  Orders
                </button>

                <button className="w-full text-left py-4 px-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  Saved Doctor's Notes
                </button>

                <button className="w-full text-left py-4 px-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  My Addresses
                </button>

                <button className="w-full text-left py-4 px-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  Refund Settings
                </button>

                <button className="w-full text-left py-4 px-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  Need Help?
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left py-4 px-2 text-gray-400 hover:bg-red-400 hover:text-black hover:outline-2 rounded-lg font-medium flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
