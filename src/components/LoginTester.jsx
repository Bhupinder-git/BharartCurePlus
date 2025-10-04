import React, { useState } from "react";

const LoginTester = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (testName, success, data, error) => {
    setTestResults((prev) => [
      ...prev,
      {
        testName,
        success,
        data,
        error,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const testLogin = async (testName, email, password, userType) => {
    setLoading(true);
    try {
      console.log(`Testing: ${testName}`);

      const loginData = {
        email: email?.trim(),
        password,
        userType: userType === "patient" ? "user" : userType, // Map patient to user
      };

      console.log("Login data being sent:", loginData);

      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const responseText = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = responseText;
      }

      addResult(
        testName,
        response.ok,
        responseData,
        response.ok ? null : `HTTP ${response.status}`
      );
    } catch (error) {
      addResult(testName, false, null, error.message);
    }
    setLoading(false);
  };

  const runLoginTests = async () => {
    setTestResults([]);

    // Test different userType combinations
    await testLogin(
      "Login with userType: 'user'",
      "test@example.com",
      "test123",
      "user"
    );
    await testLogin(
      "Login with userType: 'patient' (mapped to 'user')",
      "test@example.com",
      "test123",
      "patient"
    );
    await testLogin(
      "Login with userType: 'doctor'",
      "doctor@example.com",
      "test123",
      "doctor"
    );
    await testLogin(
      "Login with invalid userType",
      "test@example.com",
      "test123",
      "invalid"
    );
  };

  return (
    <div className="p-6 bg-gray-100 text-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login UserType Tester</h1>

        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded">
          <h3 className="font-bold text-red-800 mb-2">Backend Error Found:</h3>
          <p className="text-red-700 text-sm">
            <strong>Error:</strong> "Invalid userType. Must be 'user' or
            'doctor'"
          </p>
          <p className="text-red-700 text-sm mt-2">
            <strong>Issue:</strong> Frontend sends "patient", backend expects
            "user"
          </p>
          <p className="text-green-700 text-sm mt-2">
            <strong>Fix Applied:</strong> Map "patient" → "user" in login
            request
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={runLoginTests}
            disabled={loading}
            className={`px-6 py-2 rounded font-medium ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Testing..." : "Test Login UserTypes"}
          </button>
        </div>

        <div className="space-y-4">
          {testResults.map((result, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{result.testName}</h3>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    result.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.success ? "SUCCESS" : "FAILED"}
                </span>
              </div>

              {result.error && (
                <div className="mb-2 p-2 bg-red-50 rounded text-sm">
                  <strong>Error:</strong> {result.error}
                </div>
              )}

              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600 text-sm">
                  View Response
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>

              <div className="text-xs text-gray-500 mt-2">
                {new Date(result.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded">
          <h3 className="font-semibold text-green-900 mb-2">
            Expected Fix Results:
          </h3>
          <div className="text-sm text-green-800 space-y-2">
            <p>
              ✅ <strong>userType: "user"</strong> - Should work directly
            </p>
            <p>
              ✅ <strong>userType: "patient"</strong> - Should be mapped to
              "user" and work
            </p>
            <p>
              ✅ <strong>userType: "doctor"</strong> - Should work directly
            </p>
            <p>
              ❌ <strong>userType: "invalid"</strong> - Should fail with clear
              error
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">
            UserType Mapping:
          </h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>
              <strong>Frontend → Backend</strong>
            </p>
            <p>"patient" → "user" (for login)</p>
            <p>"doctor" → "doctor" (unchanged)</p>
            <p>
              This maintains frontend UX while matching backend expectations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTester;
