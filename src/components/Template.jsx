import React from "react";
import frameIamge from "../assets/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { FcGoogle } from "react-icons/fc";

const Template = ({ title, image, formType, setIsLoggedIn }) => {
  return (
    // Main template for logIn or signUp
    <div className="flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto mt-20">
      {/* Left Container */}
      <div className="flex flex-col w-[450px]">
        {/* Main title */}
        <h1 className="font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>

        {/* Descriptions */}
        <p className="text-[1.125rem] leading-[1.625rem] mt-4">
          <span>Your trusted & healthcare navigation starts here.</span>
          <br />
          <span className="text-blue-400 italic">
            Your Wellness, Our Priority
          </span>
        </p>

        {/* Displaying the form acc to the formType */}
        {formType === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}

        {/* Or wali line */}
        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="w-full h-[1px] bg-neutral-700"></div>
          <p className="font-medium leading-[1.375rem] text-neutral-600">OR</p>
          <div className="w-full h-[1px] bg-neutral-700"></div>
        </div>

        {/* Google Sign In Button */}
        <button className="w-full flex items-center justify-center rounded-[8px] font-medium border border-neutral-700 px-[12px] py-[8px] gap-x-2">
          <FcGoogle />
          <p>Sign in with google</p>
        </button>
      </div>

      {/* Right Container */}
      <div className="relative w-11/12 max-w-[450px] mt-10">
        {/* background pattern image */}
        <img
          src={frameIamge}
          alt="pattern"
          width={580}
          height={442}
          loading="lazy"
          className="absolute top-12 left-2 opacity-60"
        />

        {/* Image to be displayed passed acc to the form type */}
        <img
          src={image}
          alt="students"
          width={558}
          height={490}
          loading="lazy"
          className="absolute -top-4 -left-4 z-10"
        />
      </div>
    </div>
  );
};

export default Template;
