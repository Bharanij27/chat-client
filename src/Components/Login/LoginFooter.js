import React from "react";

const LoginFooter = ({ setIsLogin }) => {
  return (
    <div className="text-center">
      Didn't have an account?
      <a className="d-block text-center mt-2 cursor" onClick={() => setIsLogin(false)}>
        Sign In
      </a>
    </div>
  );
};

export default LoginFooter;
