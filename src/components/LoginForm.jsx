import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useLogin, useAuth } from "../hooks/useAuth";

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { login, loading, error, resetError } = useLogin();
  const { setIsAuthenticated, setUserType } = useAuth();

  // State to handle form data
  const [formData, setFormData] = useState({
    userType: "patient",
    email: "",
    password: "",
  });

  // State to handle password visibilty
  const [showPassword, setShowPassword] = useState(false);

  // Form Input Change Handler(update formData states)
  function inputChangeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  // Function to handle form submission
  async function submitHandler(event) {
    // Preventing the default behaviour
    event.preventDefault();
    resetError();

    console.log("Form submitted with:", formData);

    try {
      const result = await login(
        formData.email,
        formData.password,
        formData.userType
      );

      if (result) {
        // Update local state
        setIsLoggedIn(true);
        setIsAuthenticated(true);
        setUserType(formData.userType);

        // Show success toast
        toast.success("Logged In Successfully");

        // Navigate to dashboard
        navigate("/");

        console.log("Login successful:", result);
      } else {
        console.log("Login failed - no result returned");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.");
    }
  }
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-4 mt-6"
      >
        {/* Patient - Doctor tab */}
        <div className="flex bg-slate-50 max-w-max p-1 gap-x-1 my-6 rounded-full border-b-[0.15rem] border-neutral-700">
          {/* Patient button */}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, userType: "patient" }))
            }
            className={`${
              formData.userType === "patient"
                ? "bg-neutral-900 text-white"
                : "bg-transparent text-neutral-400"
            } py-2 px-5 rounded-full transition-all duration-400`}
          >
            Patient
          </button>

          {/* Doctor button */}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, userType: "doctor" }))
            }
            className={`${
              formData.userType === "doctor"
                ? "bg-neutral-900 text-white"
                : "bg-transparent text-neutral-400"
            } py-2 px-5 rounded-full transition-all duration-400`}
          >
            Doctor
          </button>
        </div>

        {/* Email Address Input */}
        <label className="w-full relative">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Email Address<sup className="text-pink-700">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email id"
            onChange={inputChangeHandler}
            className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
          />
        </label>

        {/* Password Input */}
        <label className="w-full relative">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Password<sup className="text-pink-700">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Enter password"
            onChange={inputChangeHandler}
            className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
          />

          {/* Eye Icon */}
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[40px] cursor-pointer"
          >
            {showPassword ? (
              <EyeOff size={24} className="text-[#afb2bf]" />
            ) : (
              <Eye size={24} className="text-[#afb2bf]" />
            )}
          </span>

          {/* forgot password */}
          <Link to="#">
            <p className="text-xs mt-1 text-blue-400 max-w-max ml-auto">
              Forgot Password
            </p>
          </Link>
        </label>

        {/* Error Display */}
        {error && (
          <div className="text-red-500 text-sm mt-2 p-2 bg-red-100 rounded">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`rounded-[8px] font-medium px-[12px] py-[8px] mt-6 ${
            loading
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-500"
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
