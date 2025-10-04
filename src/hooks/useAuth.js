import { useState } from "react";

// Primary API URL
const API_BASE_URL =
  "https://backend-bharat-cure-plus-ceph0ijnr-f60751720-9569s-projects.vercel.app/api/v1";

// Proxy URL (bypasses CORS in development)
const PROXY_API_URL = "/api/v1";

// Fallback URLs (add your backup URLs here if you have any)
const FALLBACK_URLS = [
  PROXY_API_URL, // Use Vite proxy to bypass CORS
  "http://localhost:4000/api/v1", // Local development server
  // Add more fallback URLs if available
];

// Function to test API connectivity with CORS detection
const testAPIConnectivity = async (baseUrl) => {
  try {
    console.log(`Testing connectivity to: ${baseUrl}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Try a simple OPTIONS request first (CORS preflight)
    const response = await fetch(baseUrl, {
      method: "OPTIONS",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        Origin: window.location.origin,
      },
    });

    clearTimeout(timeoutId);
    console.log(`✅ ${baseUrl} is reachable (Status: ${response.status})`);
    return true;
  } catch (error) {
    console.log(`❌ ${baseUrl} is not reachable:`, error.message);

    // Check if it's specifically a CORS error
    if (
      error.message.toLowerCase().includes("cors") ||
      error.message.toLowerCase().includes("cross-origin")
    ) {
      console.log(`🚫 CORS issue detected for ${baseUrl}`);
      return "cors_error";
    }

    return false;
  }
};

// Get working API URL
const getWorkingAPIUrl = async () => {
  // Test primary URL first
  const primaryTest = await testAPIConnectivity(API_BASE_URL);
  if (primaryTest === true) {
    return API_BASE_URL;
  } else if (primaryTest === "cors_error") {
    console.warn(
      "⚠️ CORS error detected with primary URL. Backend needs CORS configuration."
    );
    // Still return the primary URL as CORS might be configured for POST requests
    return API_BASE_URL;
  }

  // Test fallback URLs
  for (const fallbackUrl of FALLBACK_URLS) {
    const fallbackTest = await testAPIConnectivity(fallbackUrl);
    if (fallbackTest === true) {
      console.log(`Using fallback URL: ${fallbackUrl}`);
      return fallbackUrl;
    }
  }

  console.warn("No working API URL found, using primary URL anyway");
  return API_BASE_URL;
};

// Helper function for making API requests with better error handling
const makeAPIRequest = async (url, options = {}, retries = 2) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

  const defaultOptions = {
    method: "GET",
    mode: "cors", // Explicitly set CORS mode
    credentials: "omit", // Don't send credentials to avoid CORS issues
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: window.location.origin,
    },
    signal: controller.signal,
    ...options,
  };

  console.log(`Making ${defaultOptions.method} request to:`, url);
  console.log("Request options:", {
    ...defaultOptions,
    signal: "[AbortSignal]", // Don't log the actual signal object
  });

  try {
    const response = await fetch(url, defaultOptions);
    clearTimeout(timeoutId);

    console.log("Response received:");
    console.log("- Status:", response.status);
    console.log("- Status Text:", response.statusText);
    console.log("- OK:", response.ok);
    console.log("- Headers:", Object.fromEntries(response.headers.entries()));

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Fetch error:", {
      name: error.name,
      message: error.message,
      cause: error.cause,
    });

    // Retry logic for network errors
    if (
      retries > 0 &&
      (error.name === "NetworkError" ||
        error.name === "TypeError" ||
        error.message.includes("fetch"))
    ) {
      console.log(`Retrying request... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retry
      return makeAPIRequest(url, options, retries - 1);
    }

    throw error;
  }
};

// Hook for User Signup
export const useUserSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signupUser = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Clean and validate user data
    const cleanUserData = {
      firstName: userData.firstName?.trim(),
      lastName: userData.lastName?.trim(),
      email: userData.email?.trim()?.toLowerCase(),
      password: userData.password,
      age: parseInt(userData.age) || userData.age,
      gender: userData.gender?.toLowerCase(),
      bloodGroup: userData.bloodGroup?.trim(),
      phoneNo: userData.phoneNo?.trim(),
      accountType: userData.accountType?.toLowerCase() || "patient",
    };

    console.log("User signup attempt with:", cleanUserData);
    console.log("Original data:", userData);

    try {
      // Get working API URL
      const workingApiUrl = await getWorkingAPIUrl();

      const response = await makeAPIRequest(`${workingApiUrl}/signup/user`, {
        method: "POST",
        body: JSON.stringify(cleanUserData),
      });

      console.log("Signup response status:", response.status);
      console.log("Signup response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Signup response error:", errorText);
        setError(`HTTP ${response.status}: ${response.statusText}`);
        return null;
      }

      const data = await response.json();
      console.log("Signup response data:", data);

      if (data.success) {
        setSuccess(true);
        return data;
      } else {
        setError(data.message || "Signup failed");
        return null;
      }
    } catch (err) {
      console.error("Signup error:", err);

      // Provide specific error messages based on error type
      if (err.name === "AbortError") {
        setError("Request timed out. Please check your internet connection.");
      } else if (err.message.toLowerCase().includes("failed to fetch")) {
        setError(
          "Unable to connect to server. Please check if the server is running and your internet connection."
        );
      } else if (err.message.toLowerCase().includes("cors")) {
        setError("Server configuration error (CORS). Please contact support.");
      } else {
        setError(err.message || "Network error occurred");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    signupUser,
    loading,
    error,
    success,
    resetState,
  };
};

// Hook for Doctor Signup
export const useDoctorSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signupDoctor = async (doctorData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Clean and validate doctor data
    const cleanDoctorData = {
      firstName: doctorData.firstName?.trim(),
      lastName: doctorData.lastName?.trim(),
      email: doctorData.email?.trim()?.toLowerCase(),
      password: doctorData.password,
      age: parseInt(doctorData.age) || doctorData.age,
      gender: doctorData.gender?.toLowerCase(),
      role: doctorData.role?.trim(),
      registrationNumber:
        parseInt(doctorData.registrationNumber?.replace(/\D/g, "")) ||
        doctorData.registrationNumber?.replace(/\D/g, ""), // Extract numbers only
      yearOfRegistration:
        parseInt(doctorData.yearOfRegistration) ||
        doctorData.yearOfRegistration,
      phoneNo: doctorData.phoneNo?.trim(),
      accountType: doctorData.accountType?.toLowerCase() || "doctor",
    };

    // Remove fields that couldn't be converted properly
    if (
      !cleanDoctorData.registrationNumber ||
      isNaN(cleanDoctorData.registrationNumber)
    ) {
      console.warn(
        "registrationNumber could not be converted to number:",
        doctorData.registrationNumber
      );
      // Try sending as string if number conversion fails
      cleanDoctorData.registrationNumber =
        doctorData.registrationNumber?.trim();
    }

    console.log("Doctor signup attempt with:", cleanDoctorData);
    console.log("Original data:", doctorData);
    console.log(
      "Registration number type:",
      typeof cleanDoctorData.registrationNumber
    );
    console.log(
      "Year of registration type:",
      typeof cleanDoctorData.yearOfRegistration
    );

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "age",
      "gender",
      "role",
      "registrationNumber",
      "yearOfRegistration",
      "phoneNo",
    ];
    const missingFields = requiredFields.filter(
      (field) => !cleanDoctorData[field]
    );

    if (missingFields.length > 0) {
      const errorMsg = `Missing required fields: ${missingFields.join(", ")}`;
      console.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      return null;
    }

    try {
      // Get working API URL
      const workingApiUrl = await getWorkingAPIUrl();

      const response = await makeAPIRequest(`${workingApiUrl}/signup/doctor`, {
        method: "POST",
        body: JSON.stringify(cleanDoctorData),
      });

      console.log("Doctor signup response status:", response.status);
      console.log("Doctor signup response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Doctor signup response error:", errorText);
        console.error("Status:", response.status, response.statusText);

        try {
          const errorData = JSON.parse(errorText);
          console.error("Parsed doctor signup error:", errorData);
          setError(
            errorData.message ||
              `HTTP ${response.status}: ${response.statusText}`
          );
        } catch (e) {
          setError(
            `HTTP ${response.status}: ${response.statusText} - ${errorText}`
          );
        }

        return null;
      }

      const data = await response.json();
      console.log("Doctor signup response data:", data);

      if (data.success) {
        setSuccess(true);
        return data;
      } else {
        setError(data.message || "Doctor signup failed");
        return null;
      }
    } catch (err) {
      console.error("Doctor signup error:", err);

      // Provide specific error messages based on error type
      if (err.name === "AbortError") {
        setError("Request timed out. Please check your internet connection.");
      } else if (err.message.toLowerCase().includes("failed to fetch")) {
        setError(
          "Unable to connect to server. Please check if the server is running and your internet connection."
        );
      } else if (err.message.toLowerCase().includes("cors")) {
        setError("Server configuration error (CORS). Please contact support.");
      } else {
        setError(err.message || "Network error occurred");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    signupDoctor,
    loading,
    error,
    success,
    resetState,
  };
};

// Hook for Login
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password, userType) => {
    setLoading(true);
    setError(null);

    // Map frontend userType to backend expected values
    const mapUserType = (frontendUserType) => {
      const type = frontendUserType?.toLowerCase();
      if (type === "patient") return "user";
      if (type === "doctor") return "doctor";
      return type; // fallback to original value
    };

    const loginData = {
      email: email?.trim(),
      password,
      userType: mapUserType(userType), // Convert "patient" to "user"
    };

    console.log("Login attempt with:", {
      email: loginData.email,
      userType: loginData.userType,
      passwordLength: password?.length,
    });
    console.log("Full login request body:", loginData);

    try {
      // Get working API URL
      const workingApiUrl = await getWorkingAPIUrl();

      const response = await makeAPIRequest(`${workingApiUrl}/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Login Response error:", errorText);
        console.error("Status:", response.status, response.statusText);

        try {
          const errorData = JSON.parse(errorText);
          console.error("Parsed error data:", errorData);
          setError(
            errorData.message ||
              `HTTP ${response.status}: ${response.statusText}`
          );
        } catch (e) {
          setError(
            `HTTP ${response.status}: ${response.statusText} - ${errorText}`
          );
        }

        return null;
      }

      const data = await response.json();
      console.log("Login Response data:", data);

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userType", data.userType);
        localStorage.setItem("isAuthenticated", "true");
        return data;
      } else {
        setError(data.message || "Login failed");
        return null;
      }
    } catch (err) {
      console.error("Login error:", err);

      // Provide specific error messages based on error type
      if (err.name === "AbortError") {
        setError("Request timed out. Please check your internet connection.");
      } else if (err.message.toLowerCase().includes("failed to fetch")) {
        setError(
          "Unable to connect to server. Please check if the server is running and your internet connection."
        );
      } else if (err.message.toLowerCase().includes("cors")) {
        setError("Server configuration error (CORS). Please contact support.");
      } else {
        setError(err.message || "Network error occurred");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  return {
    login,
    loading,
    error,
    resetError,
  };
};

// Hook for Authentication State Management
export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [userType, setUserType] = useState(() => {
    return localStorage.getItem("userType") || null;
  });

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    localStorage.removeItem("isAuthenticated");
    setUser(null);
    setIsAuthenticated(false);
    setUserType(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return {
    user,
    isAuthenticated,
    userType,
    logout,
    updateUser,
    setIsAuthenticated,
    setUserType,
  };
};
