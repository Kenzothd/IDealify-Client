import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import type { } from "@mui/x-date-pickers/themeAugmentation";
import urlcat from "urlcat";
import { IClient, } from "../../Interface";
import axios from "axios";
import { date } from "yup/lib/locale";
import format from "date-fns/format";
import Button from "@mui/material/Button";
import { render } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@mui/material";


const SERVER = import.meta.env.VITE_SERVER;

const ClientAccount: FC = () => {
  const token: any = sessionStorage.getItem("token");
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [offEditMode, setOffEditMode] = useState<boolean>(true);
  const { clientid } = useParams();
  const navigate = useNavigate();
  const [clientAccount, setClientAccount] = useState<IClient>({
    email: "",
    username: "",
    password: "",
    fullName: ""
  });

  console.log(offEditMode);

  console.log(token);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    //get client account details
    const clientURL = urlcat(SERVER, `/clients/id/${clientid}`);
    axios
      .get(clientURL, config)
      .then((res) => setClientAccount(res.data))
      .catch((err) => console.log(err));

  }, []);

  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: clientAccount.username,
      email: clientAccount.email,
      password: clientAccount.password,
      fullName: clientAccount.fullName
    },
    validationSchema: offEditMode ? null : Yup.object({
      email: Yup.string().email("Invalid email address").required("Required")
        .test(
          "email-name",
          "Email is in used",
          (email: any): boolean => {
            const clientUrl = urlcat(SERVER, `clients/findByEmail/${email}`);
            axios
              .get(clientUrl)
              .then((res) => setUserEmail(res.data.length === 0 ? '' : res.data[0].email))
              .catch((err) => console.log(err));
            return userEmail === '' || userEmail === clientAccount.email ? true : false;
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
              .then((res) => setUserName(res.data.length === 0 ? '' : res.data[0].username))
              .catch((err) => console.log(err));
            return userName === '' || userName === clientAccount.username ? true : false;
          }
        ),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
    }),

    onSubmit: (values: any) => {
      console.log("submit button");
      if (offEditMode) {
        setOffEditMode(!offEditMode);
      } else {
        setOffEditMode(!offEditMode);

        const url = urlcat(SERVER, `clients/id/${clientid}`);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .put(url, values, config)
          .then((res) => setClientAccount(res.data))
          .catch((error) => console.log(error));
      }
    },
  });

  return (
    <Container maxWidth='md' sx={{
      mb: '5rem',
      pr: '2rem',
      pl: '2rem'

    }}>
      <Grid container>

        <Grid item xs={12} sx={{ mb: '3rem' }}>
          <Typography variant='h3'>Account</Typography>
        </Grid>


        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>FULL NAME</Typography>

              <TextField
                required
                disabled={offEditMode}
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
                disabled={offEditMode}
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
                disabled={offEditMode}
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
                disabled={offEditMode}
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
              pl: '6rem',
              pr: '6rem',
              '&:hover': {
                backgroundColor: '#254D71',
              }
            }}> {offEditMode ? "Edit" : "Submit Changes"}
            </Button>
          </Grid>

        </form>
      </Grid>
    </Container>
  );
};

export default ClientAccount;
