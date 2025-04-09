
import React from "react";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/30 to-blue-100/20"></div>
        <div className="frost-overlay"></div>
      </div>
      
      <LoginForm />
    </div>
  );
};

export default Login;
