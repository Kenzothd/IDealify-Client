import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import TokenContext from "../../contextStore/token-context";
import { ITokenContext } from "../../Interface";

const VendorLoginForm: FC = () => {
  const [error, setError] = useState<String>("");

  const SERVER = import.meta.env.VITE_SERVER;
  const url = urlcat(SERVER, "/vendors/login");

  const { setTokenState } = useContext<ITokenContext>(TokenContext);

  const navigateToProjects = useNavigate();

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

          sessionStorage.setItem('token', res.data.token)
          // setTokenState(token);
          navigateToProjects("/vendor/secret");
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
