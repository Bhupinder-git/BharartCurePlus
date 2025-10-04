import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Lenis from "lenis";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import HospitalComparison from "./pages/HospitalComparison";
import LiveResourceTracker from "./pages/LiveResourceTracker";
import BloodUrgentAlerts from "./pages/BloodUrgentAlerts";
import SkinCareRoutinePlanner from "./pages/SkinCareRoutinePlanner";
import Store from "./pages/Store";
import WellnessHub from "./components/WellnessHub";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import APIDebugger from "./components/APIDebugger";
import ConnectivityTester from "./components/ConnectivityTester";
import CORSErrorSolution from "./components/CORSErrorSolution";
import APIEndpointTester from "./components/APIEndpointTester";
import DoctorSignupTester from "./components/DoctorSignupTester";
import LoginTester from "./components/LoginTester";

// Main App Component wrapped with AuthProvider
function AppContent() {
  // State to track the user login (keeping for backward compatibility)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  // Sync local state with authentication context
  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* Routes */}
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* SignUp Route */}
        <Route
          path="/signup"
          element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Hospital Comparison Route */}
        <Route path="/hospital-comparison" element={<HospitalComparison />} />

        {/* Live Resource Tracker Route */}
        <Route
          path="/live-resource-tracker"
          element={<LiveResourceTracker />}
        />

        {/* Blood Urgent Alerts Route */}
        <Route path="/blood-urgent-alerts" element={<BloodUrgentAlerts />} />

        {/* SkinCare Routine Planner Route */}
        <Route
          path="/skincare-routine-planner"
          element={<SkinCareRoutinePlanner />}
        />

        {/* Store Route */}
        <Route path="/store" element={<Store />} />

        {/* Wellness Hub Route */}
        <Route path="/wellness-hub" element={<WellnessHub />} />

        {/* API Debug Route - TEMPORARY */}
        <Route path="/debug" element={<APIDebugger />} />

        {/* Connectivity Test Route - TEMPORARY */}
        <Route path="/test-connection" element={<ConnectivityTester />} />

        {/* API Endpoint Tester - TEMPORARY */}
        <Route path="/test-endpoints" element={<APIEndpointTester />} />

        {/* Doctor Signup Tester - TEMPORARY */}
        <Route path="/test-doctor" element={<DoctorSignupTester />} />

        {/* Login Tester - TEMPORARY */}
        <Route path="/test-login" element={<LoginTester />} />
      </Routes>
    </div>
  );
}

// App component with AuthProvider wrapper
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
