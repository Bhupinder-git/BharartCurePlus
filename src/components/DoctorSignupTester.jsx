import React, { useState } from "react";

const DoctorSignupTester = () => {
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

  const testDoctorSignup = async (testName, doctorData) => {
    setLoading(true);
    try {
      console.log(`Testing: ${testName}`);
      console.log("Data being sent:", doctorData);

      const response = await fetch("/api/v1/signup/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
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

  const runTests = async () => {
    setTestResults([]);

    const baseData = {
      firstName: "Dr. Test",
      lastName: "Doctor",
      email: `doctor${Date.now()}@example.com`,
      password: "test123456",
      age: 35,
      gender: "male",
      role: "Cardiologist",
      phoneNo: "1234567890",
      accountType: "doctor",
    };

    // Test 1: Registration number as pure number
    await testDoctorSignup("Registration as Number", {
      ...baseData,
      registrationNumber: 123456,
      yearOfRegistration: 2020,
    });

    // Test 2: Registration number as string number
    await testDoctorSignup("Registration as String Number", {
      ...baseData,
      registrationNumber: "123456",
      yearOfRegistration: "2020",
    });

    // Test 3: Registration number with letters (original format)
    await testDoctorSignup("Registration with Letters", {
      ...baseData,
      registrationNumber: "DR123456",
      yearOfRegistration: 2020,
    });

    // Test 4: Different field names
    await testDoctorSignup("Alternative Field Names", {
      ...baseData,
      registration_number: 123456,
      year_of_registration: 2020,
    });

    // Test 5: Minimal required fields only
    await testDoctorSignup("Minimal Fields", {
      firstName: "Test",
      lastName: "Doctor",
      email: `min${Date.now()}@example.com`,
      password: "test123456",
      registrationNumber: 123456,
    });

    // Test 6: Age as string
    await testDoctorSignup("Age as String", {
      ...baseData,
      age: "35",
      registrationNumber: 123456,
      yearOfRegistration: 2020,
    });
  };

  return (
    <div className="p-6 bg-gray-100 text-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Doctor Signup Data Type Tester
        </h1>

        <div className="mb-6">
          <button
            onClick={runTests}
            disabled={loading}
            className={`px-6 py-2 rounded font-medium ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Running Tests..." : "Run All Tests"}
          </button>
        </div>

        <div className="bg-red-100 border border-red-400 p-4 rounded mb-6">
          <h3 className="font-bold text-red-800 mb-2">
            Backend Error Analysis:
          </h3>
          <p className="text-red-700 text-sm">
            <strong>Error:</strong> "registrationNumber: Cast to Number failed
            for value 'DR123456'"
          </p>
          <p className="text-red-700 text-sm mt-2">
            <strong>Solution:</strong> Backend expects registrationNumber as a
            pure number, not string with letters.
          </p>
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
                  View Details
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

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">Expected Fix:</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>Problem:</strong> Backend expects registrationNumber as
              integer, getting string "DR123456"
            </p>
            <p>
              <strong>Solution 1:</strong> Extract numbers only: "DR123456" →
              123456
            </p>
            <p>
              <strong>Solution 2:</strong> Use pure numeric registration numbers
              in form
            </p>
            <p>
              <strong>Solution 3:</strong> Ask backend to accept string format
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded">
          <h3 className="font-semibold text-yellow-900 mb-2">
            Form Validation Needed:
          </h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Registration Number: Only accept numeric input (123456)</li>
            <li>• Year of Registration: Must be 4-digit year (2020)</li>
            <li>• Age: Convert string to number</li>
            <li>• Email: Must be valid email format</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignupTester;
