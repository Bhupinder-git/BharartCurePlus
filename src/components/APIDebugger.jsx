import React, { useState } from "react";
import { useLogin, useUserSignup, useDoctorSignup } from "../hooks/useAuth";

const APIDebugger = () => {
  const { login, loading: loginLoading, error: loginError } = useLogin();
  const {
    signupUser,
    loading: userLoading,
    error: userError,
  } = useUserSignup();
  const {
    signupDoctor,
    loading: doctorLoading,
    error: doctorError,
  } = useDoctorSignup();

  const [testResults, setTestResults] = useState([]);

  const addTestResult = (test, result) => {
    setTestResults((prev) => [
      ...prev,
      { test, result, timestamp: new Date().toISOString() },
    ]);
  };

  const testLogin = async () => {
    console.log("Testing login...");
    try {
      const result = await login("test@example.com", "testpassword", "patient");
      addTestResult("Login Test", {
        success: !!result,
        result,
        error: loginError,
      });
    } catch (err) {
      addTestResult("Login Test", { success: false, error: err.message });
    }
  };

  const testUserSignup = async () => {
    console.log("Testing user signup...");
    const userData = {
      firstName: "Test",
      lastName: "User",
      email: `test${Date.now()}@example.com`,
      password: "testpassword",
      age: "25",
      gender: "male",
      bloodGroup: "A+",
      phoneNo: "1234567890",
      accountType: "patient",
    };

    try {
      const result = await signupUser(userData);
      addTestResult("User Signup Test", {
        success: !!result,
        result,
        error: userError,
      });
    } catch (err) {
      addTestResult("User Signup Test", { success: false, error: err.message });
    }
  };

  const testDoctorSignup = async () => {
    console.log("Testing doctor signup...");
    const doctorData = {
      firstName: "Dr Test",
      lastName: "Doctor",
      email: `doctor${Date.now()}@example.com`,
      password: "testpassword",
      age: "35",
      gender: "male",
      role: "Cardiologist",
      registrationNumber: "DR123456",
      yearOfRegistration: "2020",
      phoneNo: "1234567890",
      accountType: "doctor",
    };

    try {
      const result = await signupDoctor(doctorData);
      addTestResult("Doctor Signup Test", {
        success: !!result,
        result,
        error: doctorError,
      });
    } catch (err) {
      addTestResult("Doctor Signup Test", {
        success: false,
        error: err.message,
      });
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 bg-gray-100 text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">API Debugger</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={testLogin}
          disabled={loginLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loginLoading ? "Testing Login..." : "Test Login"}
        </button>

        <button
          onClick={testUserSignup}
          disabled={userLoading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {userLoading ? "Testing User Signup..." : "Test User Signup"}
        </button>

        <button
          onClick={testDoctorSignup}
          disabled={doctorLoading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
        >
          {doctorLoading ? "Testing Doctor Signup..." : "Test Doctor Signup"}
        </button>

        <button
          onClick={clearResults}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Results
        </button>
      </div>

      {(loginError || userError || doctorError) && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
          <h3 className="font-bold text-red-800">Current Errors:</h3>
          {loginError && (
            <p className="text-red-700">Login Error: {loginError}</p>
          )}
          {userError && (
            <p className="text-red-700">User Signup Error: {userError}</p>
          )}
          {doctorError && (
            <p className="text-red-700">Doctor Signup Error: {doctorError}</p>
          )}
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Test Results</h2>
        {testResults.length === 0 ? (
          <p className="text-gray-500">
            No tests run yet. Click the buttons above to test API endpoints.
          </p>
        ) : (
          <div className="space-y-3">
            {testResults.map((test, index) => (
              <div key={index} className="border p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{test.test}</h3>
                  <span className="text-sm text-gray-500">
                    {test.timestamp}
                  </span>
                </div>
                <div
                  className={`p-2 rounded text-sm ${
                    test.result.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <strong>Status:</strong>{" "}
                  {test.result.success ? "SUCCESS" : "FAILED"}
                  {test.result.error && (
                    <div className="mt-1">
                      <strong>Error:</strong> {test.result.error}
                    </div>
                  )}
                </div>
                {test.result.result && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-600">
                      View Response Data
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(test.result.result, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-100 rounded">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Open browser console (F12) to see detailed API logs</li>
          <li>Click test buttons to check API endpoints</li>
          <li>Check network tab for HTTP request details</li>
          <li>Look for CORS, network, or server errors</li>
          <li>Verify API URL and endpoint structure</li>
        </ol>
      </div>
    </div>
  );
};

export default APIDebugger;
