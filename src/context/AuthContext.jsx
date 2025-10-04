import React, { createContext, useContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const authData = useAuth();

  // Initialize authentication state from localStorage on app start
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userType = localStorage.getItem("userType");
    const userData = localStorage.getItem("user");

    if (isAuthenticated && userType && userData) {
      authData.setIsAuthenticated(true);
      authData.setUserType(userType);
    }
  }, []);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
