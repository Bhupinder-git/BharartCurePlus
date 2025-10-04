import React from "react";
import Template from "../components/Template";
import loginImg from "../assets/login.jpeg";

const Login = ({ setIsLoggedIn }) => {
  return (
    <Template
      title="Welcome Back"
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
};

export default Login;
