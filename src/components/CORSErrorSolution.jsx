import React, { useState } from "react";

const CORSErrorSolution = () => {
  const [showSolutions, setShowSolutions] = useState(false);

  return (
    <div className="fixed top-4 right-4 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            CORS Error Detected
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              Your backend server is blocking requests from this domain due to
              CORS policy.
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setShowSolutions(!showSolutions)}
              className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
            >
              {showSolutions ? "Hide Solutions" : "Show Solutions"}
            </button>
          </div>
        </div>
      </div>

      {showSolutions && (
        <div className="mt-4 border-t border-red-200 pt-4">
          <h4 className="font-semibold text-red-900 mb-2">Quick Solutions:</h4>

          <div className="space-y-3 text-sm">
            <div className="bg-white p-3 rounded border">
              <h5 className="font-medium text-gray-900">
                1. Backend Fix (Recommended)
              </h5>
              <p className="text-gray-600 mt-1">
                Add CORS configuration to your backend:
              </p>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                {`// Express.js example
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));`}
              </pre>
            </div>

            <div className="bg-white p-3 rounded border">
              <h5 className="font-medium text-gray-900">
                2. Browser Extension
              </h5>
              <p className="text-gray-600 mt-1">
                Install "CORS Unblock" extension for development
              </p>
              <a
                href="https://chrome.google.com/webstore/search/cors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Chrome Web Store
              </a>
            </div>

            <div className="bg-white p-3 rounded border">
              <h5 className="font-medium text-gray-900">
                3. Chrome Flags (Temporary)
              </h5>
              <p className="text-gray-600 mt-1">Launch Chrome with:</p>
              <code className="block mt-1 p-1 bg-gray-100 rounded text-xs">
                --disable-web-security --user-data-dir="C:/temp"
              </code>
            </div>

            <div className="bg-white p-3 rounded border">
              <h5 className="font-medium text-gray-900">4. Use Proxy</h5>
              <p className="text-gray-600 mt-1">Add to vite.config.js:</p>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                {`export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend-url',
        changeOrigin: true,
        secure: true
      }
    }
  }
})`}
              </pre>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> The backend CORS fix is the proper
              solution. Other methods are temporary workarounds for development.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CORSErrorSolution;
