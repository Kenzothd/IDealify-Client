import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";


const ClientSignUpForm: FC = () => {
  const token: any = sessionStorage.getItem("token");

  const [username, setUsername] = useState(0);
  const [userEmail, setUserEmail] = useState(0);
  const [regNum, setRegNum] = useState(0);
  const [userData, setUserData] = useState({})
  const SERVER = import.meta.env.VITE_SERVER;

  const navigateToProjects = useNavigate();

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
      email: "",
      fullName: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required")
        .test(
          "value-email",
          "Email is in used",
          (email: any): boolean => {
            const clientUrl = urlcat(SERVER, `clients/findByEmail/${email}`);
            axios
              .get(clientUrl)
              .then((res) => setUserEmail(res.data.length))
              .catch((err) => console.log(err));
            return userEmail === 0 ? true : false;
          }
        ),
      fullName: Yup.string().required("Required"),
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required")
        .test(
          "value-name",
          "Username is in used",
          (name: any): boolean => {
            const clientUrl = urlcat(SERVER, `clients/findByName/${name}`);
            axios
              .get(clientUrl)
              .then((res) => setUsername(res.data.length))
              .catch((err) => console.log(err));
            return username === 0 ? true : false;
          }
        ),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const createClientUrl = urlcat(SERVER, "/clients");

      axios
        .post(createClientUrl, values)
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          const payload = parseJwt(res.data.token);
          console.log(payload.userId);
          navigateToProjects(`/client/${payload.userId}/dashboard`);
        })
        .catch((error) => console.log(error.response.data.error));
    },
  });
  return (
    <Grid item xs={12}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <Grid item xs={12}>
            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>FULL NAME</Typography>

            <TextField
              required
              id="fullName"
              autoComplete="off"
              name="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              value={formik.values.fullName}
            />
            {formik.touched.fullName &&
              formik.errors.fullName ? (
              <div>{formik.errors.fullName}</div>
            ) : null}
          </Grid>




          <Grid item xs={12}>
            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>USERNAME</Typography>
            <TextField
              required
              id="username"
              autoComplete="off"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
          </Grid>


          <Grid item xs={12}>
            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>EMAIL ADDRESS</Typography>
            <TextField
              required
              id="email"
              autoComplete="off"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </Grid>


          <Grid item xs={12}>
            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>PASSWORD</Typography>

            <TextField
              required
              id="password"
              autoComplete="off"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </Grid>
        </Grid>

        <Grid item sx={{ textAlign: 'center' }}>
          <Button type="submit" sx={{
            background: '#254D71',
            color: 'white',
            letterSpacing: '0.2rem',
            mt: '3rem',
            width: { xs: '100%', sm: '0' },
            pl: { sm: '6rem' },
            pr: { sm: '6rem' },
            "&:hover": {
              backgroundColor: "#173754",
            },
          }}>
            Submit</Button>
        </Grid>

      </form>
    </Grid>
  );
};

export default ClientSignUpForm;
