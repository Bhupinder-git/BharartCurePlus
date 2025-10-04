import React, { useState } from "react";
import { useLogin, useUserSignup, useDoctorSignup } from "../hooks/useAuth";

const APIEndpointTester = () => {
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

  const addTestResult = (test, result, error = null) => {
    setTestResults((prev) => [
      ...prev,
      {
        test,
        result,
        error,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // Test different login formats
  const testLoginFormats = async () => {
    const testCases = [
      {
        name: "Login - Lowercase userType",
        data: {
          email: "test@example.com",
          password: "test123",
          userType: "patient",
        },
      },
      {
        name: "Login - Uppercase userType",
        data: {
          email: "test@example.com",
          password: "test123",
          userType: "PATIENT",
        },
      },
      {
        name: "Login - Doctor userType",
        data: {
          email: "doctor@example.com",
          password: "test123",
          userType: "doctor",
        },
      },
    ];

    for (const testCase of testCases) {
      try {
        console.log(`Testing: ${testCase.name}`);
        const result = await login(
          testCase.data.email,
          testCase.data.password,
          testCase.data.userType
        );
        addTestResult(testCase.name, result, null);
      } catch (error) {
        addTestResult(testCase.name, null, error.message);
      }
    }
  };

  // Test doctor signup with different field combinations
  const testDoctorSignupFormats = async () => {
    const testCases = [
      {
        name: "Doctor Signup - Standard Format",
        data: {
          firstName: "Dr. Test",
          lastName: "Doctor",
          email: `doctor${Date.now()}@example.com`,
          password: "test123456",
          age: "35",
          gender: "male",
          role: "Cardiologist",
          registrationNumber: "DR123456",
          yearOfRegistration: "2020",
          phoneNo: "1234567890",
          accountType: "doctor",
        },
      },
      {
        name: "Doctor Signup - Alternative Field Names",
        data: {
          first_name: "Dr. Test2", // Alternative field name
          last_name: "Doctor2",
          email: `doctor2${Date.now()}@example.com`,
          password: "test123456",
          age: 35, // Number instead of string
          gender: "MALE", // Uppercase
          specialization: "Cardiologist", // Alternative to role
          registration_number: "DR123457",
          year_of_registration: "2021",
          phone: "1234567891", // Alternative to phoneNo
          user_type: "doctor", // Alternative to accountType
        },
      },
    ];

    for (const testCase of testCases) {
      try {
        console.log(`Testing: ${testCase.name}`);
        const result = await signupDoctor(testCase.data);
        addTestResult(testCase.name, result, null);
      } catch (error) {
        addTestResult(testCase.name, null, error.message);
      }
    }
  };

  // Manual API test
  const testManualAPI = async (endpoint, method, body) => {
    try {
      const response = await fetch(`/api/v1${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const responseText = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = responseText;
      }

      addTestResult(
        `Manual ${method} ${endpoint}`,
        {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        },
        response.ok ? null : `HTTP ${response.status}`
      );
    } catch (error) {
      addTestResult(`Manual ${method} ${endpoint}`, null, error.message);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 bg-gray-100 text-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Endpoint Tester</h1>

        {/* Test Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button
            onClick={testLoginFormats}
            disabled={loginLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loginLoading ? "Testing..." : "Test Login Formats"}
          </button>

          <button
            onClick={testDoctorSignupFormats}
            disabled={doctorLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {doctorLoading ? "Testing..." : "Test Doctor Signup"}
          </button>

          <button
            onClick={() =>
              testManualAPI("/login", "POST", {
                email: "test@test.com",
                password: "test123",
                userType: "patient",
              })
            }
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Manual Login Test
          </button>

          <button
            onClick={clearResults}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Results
          </button>
        </div>

        {/* Manual Test Form */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-semibold mb-3">Manual API Test</h3>
          <div className="grid grid-cols-3 gap-4">
            <select
              id="manual-method"
              className="border p-2 rounded"
              defaultValue="POST"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>

            <input
              id="manual-endpoint"
              type="text"
              placeholder="/login"
              className="border p-2 rounded"
            />

            <button
              onClick={() => {
                const method = document.getElementById("manual-method").value;
                const endpoint =
                  document.getElementById("manual-endpoint").value;
                const bodyText = document.getElementById("manual-body").value;

                let body = null;
                if (bodyText.trim()) {
                  try {
                    body = JSON.parse(bodyText);
                  } catch (e) {
                    alert("Invalid JSON in request body");
                    return;
                  }
                }

                testManualAPI(endpoint, method, body);
              }}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Test
            </button>
          </div>

          <textarea
            id="manual-body"
            placeholder='{"email": "test@test.com", "password": "test123", "userType": "patient"}'
            className="w-full mt-2 p-2 border rounded h-20"
          />
        </div>

        {/* Current Errors */}
        {(loginError || userError || doctorError) && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
            <h3 className="font-bold text-red-800">Current Errors:</h3>
            {loginError && <p className="text-red-700">Login: {loginError}</p>}
            {userError && (
              <p className="text-red-700">User Signup: {userError}</p>
            )}
            {doctorError && (
              <p className="text-red-700">Doctor Signup: {doctorError}</p>
            )}
          </div>
        )}

        {/* Test Results */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Test Results</h2>
          {testResults.length === 0 ? (
            <p className="text-gray-500">
              No tests run yet. Use the buttons above to test different
              scenarios.
            </p>
          ) : (
            <div className="space-y-4">
              {testResults.map((test, index) => (
                <div key={index} className="border p-3 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{test.test}</h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          test.error
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {test.error ? "FAILED" : "SUCCESS"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(test.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {test.error && (
                    <div className="mb-2 p-2 bg-red-50 rounded">
                      <strong>Error:</strong> {test.error}
                    </div>
                  )}

                  {test.result && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-blue-600">
                        View Response
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                        {JSON.stringify(test.result, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Debugging Info */}
        <div className="mt-6 p-4 bg-yellow-50 rounded">
          <h3 className="font-semibold mb-2">Common 400 Bad Request Causes:</h3>
          <ul className="text-sm space-y-1">
            <li>• Missing required fields in request body</li>
            <li>• Incorrect field names (e.g., "phone" vs "phoneNo")</li>
            <li>• Wrong data types (string vs number)</li>
            <li>• Invalid email format</li>
            <li>• Password doesn't meet requirements</li>
            <li>• Invalid userType values</li>
            <li>• Extra fields that backend doesn't expect</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default APIEndpointTester;
