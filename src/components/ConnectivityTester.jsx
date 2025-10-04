import React, { useState, useEffect } from "react";

const ConnectivityTester = () => {
  const [testResults, setTestResults] = useState({});
  const [testing, setTesting] = useState(false);

  const API_URLS = [
    "https://backend-bharat-cure-plus-ceph0ijnr-f60751720-9569s-projects.vercel.app/api/v1",
    "http://localhost:4000/api/v1",
    "https://jsonplaceholder.typicode.com/posts/1", // Known working API for comparison
  ];

  const testURL = async (url) => {
    const startTime = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);
      const endTime = Date.now();

      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        responseTime: endTime - startTime,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      const endTime = Date.now();
      return {
        success: false,
        error: error.message,
        errorType: error.name,
        responseTime: endTime - startTime,
      };
    }
  };

  const runTests = async () => {
    setTesting(true);
    setTestResults({});

    for (const url of API_URLS) {
      console.log(`Testing: ${url}`);
      const result = await testURL(url);

      setTestResults((prev) => ({
        ...prev,
        [url]: result,
      }));
    }

    setTesting(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusColor = (result) => {
    if (!result) return "bg-gray-100";
    return result.success
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              API Connectivity Tester
            </h1>
            <button
              onClick={runTests}
              disabled={testing}
              className={`px-4 py-2 rounded font-medium ${
                testing
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {testing ? "Testing..." : "Run Tests"}
            </button>
          </div>

          <div className="space-y-4">
            {API_URLS.map((url) => {
              const result = testResults[url];
              return (
                <div key={url} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 break-all">
                        {url}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {url.includes("jsonplaceholder") &&
                          "(Test API - should always work)"}
                        {url.includes("localhost") &&
                          "(Local development server)"}
                        {url.includes("vercel.app") &&
                          "(Your production server)"}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(
                        result
                      )}`}
                    >
                      {!result
                        ? "Testing..."
                        : result.success
                        ? "Connected"
                        : "Failed"}
                    </div>
                  </div>

                  {result && (
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      {result.success ? (
                        <div className="space-y-1">
                          <div>
                            <strong>Status:</strong> {result.status}{" "}
                            {result.statusText}
                          </div>
                          <div>
                            <strong>Response Time:</strong>{" "}
                            {result.responseTime}ms
                          </div>
                          <details className="mt-2">
                            <summary className="cursor-pointer text-blue-600">
                              View Headers
                            </summary>
                            <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-auto">
                              {JSON.stringify(result.headers, null, 2)}
                            </pre>
                          </details>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div>
                            <strong>Error Type:</strong> {result.errorType}
                          </div>
                          <div>
                            <strong>Error Message:</strong> {result.error}
                          </div>
                          <div>
                            <strong>Response Time:</strong>{" "}
                            {result.responseTime}ms
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              Diagnosis Help:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • If <strong>jsonplaceholder</strong> fails: Internet connection
                issue
              </li>
              <li>
                • If <strong>localhost</strong> fails: Local server not running
              </li>
              <li>
                • If <strong>vercel.app</strong> fails: Server down or incorrect
                URL
              </li>
              <li>
                • If all fail with "Failed to fetch": CORS or network firewall
                issue
              </li>
              <li>• If timeout errors: Server is slow or overloaded</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">
              Common Solutions:
            </h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Check if your backend server is running</li>
              <li>• Verify the API URL is correct</li>
              <li>• Check CORS configuration on your server</li>
              <li>• Try disabling browser extensions or use incognito mode</li>
              <li>• Check network connectivity and firewall settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectivityTester;
