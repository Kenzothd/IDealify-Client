import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const LoginRedirect: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Sorry! Your session has timed out</h1>
      <h2>Please re-login to access your account!</h2>
      <button onClick={() => navigate("/client/login")}>
        Return to Client Login
      </button>
      <button onClick={() => navigate("/vendor/login")}>
        Return to Vendor Login
      </button>
    </>
  );
};

export default LoginRedirect;
