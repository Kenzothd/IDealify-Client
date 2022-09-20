import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


const VendorLoginForm: FC = () => {
  const [error, setError] = useState<String>("");

  const SERVER = import.meta.env.VITE_SERVER;
  const url = urlcat(SERVER, "/vendors/login");
  const token: any = sessionStorage.getItem("token");

  const navigate = useNavigate();

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
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(url, values)
        .then((res) => {
          console.log(res.data.token);
          sessionStorage.setItem("token", res.data.token);
          const payload = parseJwt(res.data.token);
          navigate(`/vendor/${payload.userId}/dashboard`);

        })
        .catch((error) => setError(error.response.data.error));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">User Name</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <button type="submit">Log In</button>
      <span>{error}</span>
    </form>
  );
};

export default VendorLoginForm;
