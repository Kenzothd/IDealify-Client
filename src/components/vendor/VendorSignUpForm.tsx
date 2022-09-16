import axios from "axios";
import React, { FC } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";

const VendorSignUpForm: FC = () => {
  // const SERVER = import.meta.env.VITE_SERVER;
  // const url = urlcat(SERVER, "/clients");

  // const testUser = {
  //     username: "pear",
  //     password: "pearpear",
  //     email: "pear@hotmail.com",
  //     fullName: "pear"
  // }

  // const handleUser = () => {
  //     axios.post(url, testUser)
  //         .then(res => res.data)
  //         .catch(error => { error })
  // }

  const formik = useFormik({
    initialValues: {
      email: "",
      companyName: "",
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      companyName: Yup.string().required("Required"),
      userName: Yup.string()
        .min(5, "Must be 5 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="companyName">Company Name</label>
      <input
        id="companyName"
        name="companyName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.companyName}
      />
      {formik.touched.companyName && formik.errors.companyName ? (
        <div>{formik.errors.companyName}</div>
      ) : null}

      <label htmlFor="userName">User Name</label>
      <input
        id="userName"
        name="userName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.userName}
      />
      {formik.touched.userName && formik.errors.userName ? (
        <div>{formik.errors.userName}</div>
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

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default VendorSignUpForm;
