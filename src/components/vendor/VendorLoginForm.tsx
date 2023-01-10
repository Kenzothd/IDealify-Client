import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import jwt_decode from "jwt-decode";

const VendorLoginForm: FC = () => {
  const [error, setError] = useState<String>("");

  const SERVER = import.meta.env.VITE_SERVER;
  const url = urlcat(SERVER, "/vendors/login");
  const googleurl = urlcat(SERVER, "/vendors/google");

  const token: any = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const handleSignInWithGoogle = (response: any) => {
    console.log("google sign in");
    console.log(jwt_decode(response.credential));
    axios
      .post(googleurl, jwt_decode(response.credential))
      .then((res) => {
        console.log(res.data.token);
        sessionStorage.setItem("token", res.data.token);
        const payload = parseJwt(res.data.token);
        console.log(payload.userId);
        navigate(`/vendor/${payload.userId}/dashboard`);
      })
      .catch((error) => setError(error.response.data.error));
  };

  useEffect(() => {
    //global google
    google.accounts.id.initialize({
      client_id:
        "505631696316-r6irfrjv1osgcsd9osrim1c9p357nr9l.apps.googleusercontent.com",
      callback: handleSignInWithGoogle,
    });
    const googleLoginDiv: HTMLElement =
      document.getElementById("googlelogInDiv")!;
    google.accounts.id.renderButton(googleLoginDiv, {
      type: "standard",
      text: "signin_with",
      theme: "outline",
      size: "large",
      shape: "circle",
      width: "400",
    });

    // google.accounts.id.prompt();
  }, []);

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
          console.log(payload.userId);
          navigate(`/vendor/${payload.userId}/dashboard`);
        })
        .catch((error) => setError(error.response.data.error));
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          sx={{
            display: "flex",
          }}
        >
          <Grid item xs={12} sx={{ mb: "2rem" }}>
            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#444444" }}>
              USERNAME*
            </Typography>
            <TextField
              id="username"
              autoComplete="off"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              sx={{
                width: "100%",
              }}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} sx={{ mb: "2rem" }}>
            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#444444" }}>
              PASSWORD*
            </Typography>
            <TextField
              id="password"
              autoComplete="off"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              sx={{ width: "100%" }}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </Grid>
        </Grid>
        <Container sx={{ alignItems: "center", textAlign: "center" }}>
          <Button
            type="submit"
            sx={{
              background: "#254D71",
              color: "white",
              width: "400px",
              height: "45px",
              letterSpacing: "0.2rem",
              borderRadius: 8,
              mb: "0.5rem",
              "&:hover": {
                backgroundColor: "#173754",
              },
            }}
          >
            Log In
          </Button>
          <Button
            type="submit"
            sx={{
              // background: "#254D71",
              color: "white",
              width: "400",
              letterSpacing: "0.2rem",
              mb: "0.5rem",
              borderRadius: 8,
              // "&:hover": {
              //   backgroundColor: "#173754",
              // },
            }}
          >
            <div id="googlelogInDiv"></div>
          </Button>
        </Container>

        <Typography variant="body2" sx={{ color: "red" }}>
          {error}
        </Typography>
      </form>
    </Box>
  );
};

export default VendorLoginForm;
