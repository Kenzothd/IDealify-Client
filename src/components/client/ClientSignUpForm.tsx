import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface IUsers {
  _id?: String;
  username?: String;
  password?: String;
  email?: String;
  trackedProjects?: String[];
  // updatedAt?: Date;
  // createdAt?: Date
  // __v?: Number;
}

const ClientSignUpForm: FC = () => {
  // const [currentUsers, setCurrentUsers] = useState<Object[]>([])
  const [error, setError] = useState<String>("");

  const SERVER = import.meta.env.VITE_SERVER;
  const url = urlcat(SERVER, "/clients");
  const findNameUrl = urlcat(SERVER, "/clients/name");

  // useEffect(() => {
  //     axios(url).then(res => setCurrentUsers(res.data))
  // }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      // .test('testing', 'Email is in used', function (value): boolean {
      //     const foundEmailTest = currentUsers.map((user: IUsers) => user.email).some((email) => email?.toLowerCase() === value?.toLowerCase())
      //     console.log(`this is input: ${value}, this is ${foundEmailTest}`)
      //     return !foundEmailTest
      // }),
      fullName: Yup.string().required("Required"),
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      // .test('testing', 'Username is in used', function (value): boolean {
      //     const foundUserTest = currentUsers.map((user: IUsers) => user.username).some((name) => name?.toLowerCase() === value?.toLowerCase())
      //     console.log(`this is input: ${value}, this is ${foundUserTest}`)
      //     return !foundUserTest
      // })
      // .test('testing', 'Username is in used', function (value): boolean {
      //     const user = { username: value }
      //     console.log(user)
      //     setTimeout(() => {
      //         axios.post(url, user)
      //             .then(res => console.log(res.data))
      //             .catch(error => setError(error.response.data.error))
      //     }, 2000)

      //     const a = error === '' ? true : false

      //     return a
      // })
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(url, values)
        .then((res) => console.log(res.data))
        .catch((error) => setError(error.response.data.error));
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

      <label htmlFor="fullName">Full Name</label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.fullName}
      />
      {formik.touched.fullName && formik.errors.fullName ? (
        <div>{formik.errors.fullName}</div>
      ) : null}

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

      <button type="submit">Sign Up</button>
      <span>{error}</span>
    </form>
  );
};

export default ClientSignUpForm;
