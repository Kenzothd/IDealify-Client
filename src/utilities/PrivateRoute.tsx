import React, { FC } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
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

interface IPrivateRouteProps {
  outlet: JSX.Element;
}
const PrivateRoute = ({ outlet }: IPrivateRouteProps) => {
  const token: any = sessionStorage.getItem("token");
  if (token !== undefined) {
    const payload = parseJwt(token);
    const today = new Date();
    const expiryDate = new Date(payload.exp * 1000);
    console.log(payload);
    console.log(today);
    console.log(expiryDate);
    const diffInMilliseconds = differenceInMilliseconds(expiryDate, today);
    console.log(diffInMilliseconds);
    if (diffInMilliseconds < 0) {
      return <Navigate to="/login-redirect" />;
    } else {
      return outlet;
    }
  } else {
    return <Navigate to="/" />;
  }
};
export default PrivateRoute;
