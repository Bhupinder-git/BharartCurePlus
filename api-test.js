// API Test Utility
// Run this in browser console to test API connectivity

const API_BASE_URL =
  "https://backend-bharat-cure-plus-ceph0ijnr-f60751720-9569s-projects.vercel.app/api/v1";

// Test API connectivity
async function testAPI() {
  console.log("Testing API connectivity...");

  try {
    // Test basic connectivity
    const response = await fetch(API_BASE_URL + "/test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("API Response Status:", response.status);
    console.log("API Response OK:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("API Error Response:", errorText);
    } else {
      const data = await response.json();
      console.log("API Success Response:", data);
    }
  } catch (error) {
    console.error("API Connection Error:", error);
  }
}

// Test login endpoint
async function testLogin() {
  console.log("Testing login endpoint...");

  const testData = {
    email: "test@example.com",
    password: "testpassword",
    userType: "patient",
  };

  try {
    const response = await fetch(API_BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log("Login Response Status:", response.status);
    console.log("Login Response OK:", response.ok);

    const responseText = await response.text();
    console.log("Login Response Text:", responseText);

    try {
      const data = JSON.parse(responseText);
      console.log("Login Response Data:", data);
    } catch (e) {
      console.log("Response is not valid JSON");
    }
  } catch (error) {
    console.error("Login Test Error:", error);
  }
}

// Test signup endpoint
async function testSignup() {
  console.log("Testing user signup endpoint...");

  const testData = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    password: "testpassword",
    age: "25",
    gender: "male",
    bloodGroup: "A+",
    phoneNo: "1234567890",
    accountType: "patient",
  };

  try {
    const response = await fetch(API_BASE_URL + "/signup/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log("Signup Response Status:", response.status);
    console.log("Signup Response OK:", response.ok);

    const responseText = await response.text();
    console.log("Signup Response Text:", responseText);

    try {
      const data = JSON.parse(responseText);
      console.log("Signup Response Data:", data);
    } catch (e) {
      console.log("Response is not valid JSON");
    }
  } catch (error) {
    console.error("Signup Test Error:", error);
  }
}

// Run tests
console.log("=== API Testing Utility ===");
console.log("Run these functions in console:");
console.log("testAPI() - Test basic connectivity");
console.log("testLogin() - Test login endpoint");
console.log("testSignup() - Test signup endpoint");

// Auto-run basic test
testAPI();
