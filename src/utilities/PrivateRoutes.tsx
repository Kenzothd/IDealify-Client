import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";
// how the token payload looks:
// {
//   "userId": "63259af521ed28ea05508815",
//   "username": "visvis",
//   "userType": "vendor",
//   "iat": 1663558404,
//   "exp": 1663560204
// }

const parseJwt = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

const PrivateRoutes: FC = () => {
  const token: any = sessionStorage.getItem("token");
  // checking if token is present in sessionStorage, if not present redirect to LandingPage
  if (token === undefined) {
    return <Navigate to="/" />;
  } else {
    // checking if token has expired , if expired redirect to please relogin page
    const payload = parseJwt(token);
    const today = new Date();
    const expiryDate = new Date(payload.exp * 1000);
    console.log(today);
    console.log(expiryDate);
    const diffInMilliseconds = differenceInMilliseconds(expiryDate, today);
    console.log(diffInMilliseconds);
    if (diffInMilliseconds < 0) {
      return payload.userType === "Vendor" ? (
        <Navigate to="/vendor/login" />
      ) : (
        <Navigate to="/client/login" />
      );
    } else {
      return <Outlet />;
    }
  }
};

export default PrivateRoutes;
