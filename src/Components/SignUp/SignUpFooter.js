import React from "react";

const SignUpFooter = ({ setIsLogin }) => {
  return (
    <div className="text-center">
      Have an account?
      <a className="d-block text-center mt-2 cursor" onClick={() => setIsLogin(true)}>
        Login
      </a>
    </div>
  );
};

export default SignUpFooter;
