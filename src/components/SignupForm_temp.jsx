import React, { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserSignup, useDoctorSignup, useAuth } from "../hooks/useAuth";

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const {
    signupUser,
    loading: userLoading,
    error: userError,
    success: userSuccess,
    resetState: resetUserState,
  } = useUserSignup();
  const {
    signupDoctor,
    loading: doctorLoading,
    error: doctorError,
    success: doctorSuccess,
    resetState: resetDoctorState,
  } = useDoctorSignup();
  const { setIsAuthenticated, setUserType } = useAuth();

  // State Object to handle form
  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    registrationNumber: "",
    yearOfRegistration: "",
    bloodGroup: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  // State to handle password visibilty
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // State to track the account type
  const [accountType, setAccountType] = useState("patient");

  // function to handle form submission
  async function submitHandler(event) {
    // preventing the default action
    event.preventDefault();

    // Checking both password fields
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "email",
      "phoneNo",
      "password",
    ];
    if (accountType === "patient") {
      requiredFields.push("bloodGroup");
    } else {
      requiredFields.push("role", "registrationNumber", "yearOfRegistration");
    }

    const missingFields = requiredFields.filter(
      (field) => !formData[field]?.trim()
    );
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    // Reset previous states
    resetUserState();
    resetDoctorState();

    const userData = { ...formData, accountType };
    console.log("Submitting signup form for:", accountType);
    console.log("User data:", userData);

    try {
      let result;

      if (accountType === "patient") {
        result = await signupUser(userData);
      } else {
        result = await signupDoctor(userData);
      }

      if (result) {
        // Update authentication state
        setIsLoggedIn(true);
        setIsAuthenticated(true);
        setUserType(accountType);

        // Show success toast
        toast.success("Account Created Successfully");

        console.log("Account creation successful:", result);

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        console.log("Signup failed - no result returned");
        toast.error("Account creation failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Account creation failed. Please check your information.");
    }
  }

  function inputChangeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  return (
    <div>
      {/* Patient - Doctor tab */}
      <div className="flex bg-neutral-800 max-w-max p-1 gap-x-1 my-6 rounded-full border-b-[0.15rem] border-neutral-700">
        {/* Patient button */}
        <button
          onClick={() => setAccountType("patient")}
          className={`${
            accountType === "patient"
              ? "bg-neutral-900 text-white"
              : "bg-transparent text-neutral-400"
          } py-2 px-5 rounded-full transition-all duration-400`}
        >
          Patient
        </button>

        {/* Doctor button */}
        <button
          onClick={() => setAccountType("doctor")}
          className={`${
            accountType === "doctor"
              ? "bg-neutral-900 text-white"
              : "bg-transparent text-neutral-400"
          } py-2 px-5 rounded-full transition-all duration-400`}
        >
          Doctor
        </button>
      </div>

      {/* Form */}
      <form onSubmit={submitHandler} className="flex flex-col gap-y-4 mt-6">
        {/* Role */}
        {accountType === "doctor" && (
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Role<sup className="text-pink-700">*</sup>
            </p>
            <input
              type="text"
              name="role"
              value={formData.role}
              placeholder="Enter your role (e.g. Specialist, Surgeon etc.)"
              onChange={inputChangeHandler}
              className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
            />
          </label>
        )}

        {/* First Name - Last Name */}
        <div className="flex gap-x-4">
          {/* First Name Input */}
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              First Name<sup className="text-pink-700">*</sup>
            </p>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter first name"
              onChange={inputChangeHandler}
              className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
            />
          </label>

          {/* Last Name Input */}
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Last Name<sup className="text-pink-700">*</sup>
            </p>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter last name"
              onChange={inputChangeHandler}
              className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
            />
          </label>
        </div>

        {/* Age - Gender */}
        <div className="flex gap-x-4">
          {/* Age Input */}
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Age<sup className="text-pink-700">*</sup>
            </p>
            <input
              type="number"
              name="age"
              value={formData.age}
              placeholder="Enter age"
              onChange={inputChangeHandler}
              className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
            />
          </label>

          {/* Gender Input */}
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Gender<sup className="text-pink-700">*</sup>
            </p>
            <select
              name="gender"
              value={formData.gender}
              onChange={inputChangeHandler}
              className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        {/* Blood Group Input */}
        {accountType === "patient" && (
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Blood Group<sup className="text-pink-700">*</sup>
            </p>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={inputChangeHandler}
              className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </label>
        )}

        {/* Registration Number - Year of Registration */}
        {accountType === "doctor" && (
          <div className="flex gap-x-4">
            {/* Registration Number Input */}
            <label className="w-full relative">
              <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
                Registration Number<sup className="text-pink-700">*</sup>
              </p>
              <input
                type="number"
                name="registrationNumber"
                value={formData.registrationNumber}
                placeholder="Enter registration number (numbers only)"
                onChange={inputChangeHandler}
                min="1"
                className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
              />
            </label>

            {/* Year of Registration Input */}
            <label className="w-full relative">
              <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
                Year of Registration<sup className="text-pink-700">*</sup>
              </p>
              <input
                type="number"
                name="yearOfRegistration"
                value={formData.yearOfRegistration}
                placeholder="Enter year (e.g., 2020)"
                onChange={inputChangeHandler}
                min="1900"
                max="2030"
                className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
              />
            </label>
          </div>
        )}

        {/* Phone Number Input */}
        <label className="w-full relative">
          <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
            Phone Number<sup className="text-pink-700">*</sup>
          </p>
          <input
            required
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            placeholder="Enter phone number"
            onChange={inputChangeHandler}
            className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
          />
        </label>

        {/* Email Input */}
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

        {/* Create Password and Confirm Password */}
        <div className="flex gap-x-4">
          {/* Create Password Input */}
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Create Password<sup className="text-pink-700">*</sup>
            </p>
            <input
              required
              type={showPassword1 ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={inputChangeHandler}
              className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
            />
            {/* Eye Icon */}
            <span
              className="absolute right-3 top-[40px] cursor-pointer"
              onClick={() => setShowPassword1((prev) => !prev)}
            >
              {showPassword1 ? (
                <EyeOff size={24} className="text-[#AFB2BF]" />
              ) : (
                <Eye size={24} className="text-[#AFB2BF]" />
              )}
            </span>
          </label>

          {/* Confirm Password Input */}
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-700">*</sup>
            </p>
            <input
              required
              type={showPassword2 ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={inputChangeHandler}
              className="bg-slate-200 rounded-[0.5rem] w-full p-[12px] border-b-[0.15rem] border-neutral-700 focus:outline-[0.125rem] focus:outline-blue-400"
            />
            {/* Eye Icon */}
            <span
              className="absolute right-3 top-[40px] cursor-pointer"
              onClick={() => setShowPassword2((prev) => !prev)}
            >
              {showPassword2 ? (
                <EyeOff size={24} className="text-[#AFB2BF]" />
              ) : (
                <Eye size={24} className="text-[#AFB2BF]" />
              )}
            </span>
          </label>
        </div>

        {/* Error Display */}
        {(userError || doctorError) && (
          <div className="text-red-500 text-sm mt-2 p-2 bg-red-100 rounded">
            {userError || doctorError}
          </div>
        )}

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={userLoading || doctorLoading}
          className={`w-full rounded-[8px] font-medium px-[12px] py-[8px] mt-6 ${
            userLoading || doctorLoading
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-500"
          }`}
        >
          <p>
            {userLoading || doctorLoading
              ? "Creating Account..."
              : "Create Account"}
          </p>
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
