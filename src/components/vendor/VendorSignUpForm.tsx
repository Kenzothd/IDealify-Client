import axios from "axios";
import React, { FC, useContext, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import TokenContext from "../../contextStore/token-context";
import { ITokenContext } from "../../Interface";
import { useNavigate } from "react-router-dom";



const VendorSignUpForm: FC = () => {

  const [username, setUsername] = useState(0);
  const [regNum, setRegNum] = useState(0);
  const SERVER = import.meta.env.VITE_SERVER;
  const url = urlcat(SERVER, "/vendors");
  const { setTokenState } = useContext<ITokenContext>(TokenContext);
  const navigateToProjects = useNavigate()


  const formik = useFormik({
    initialValues: {
      contactPersonName: '',
      username: '',
      email: '',
      password: '',
      contactNumber: '',
      companyName: '',
      registrationNumber: '',
      incorporationDate: '',
      registeredOfficeAddress: '',
      // uploadedFiles: null,
    },
    validationSchema: Yup.object().shape({
      contactPersonName: Yup.string().required("Required"),
      username: Yup.string().required("Required")
        .test(
          "value-name",
          "Vendor username is in used",
          (name: any): boolean => {
            const userUrl = urlcat(SERVER, `vendors/findByName/${name}`);
            axios
              .get(userUrl)
              .then((res) => setUsername(res.data.length))
              .catch((err) => console.log(err));
            return username === 0 ? true : false;
          }
        ),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
      contactNumber: Yup.number().required("Required"),
      companyName: Yup.string().required("Required"),
      registrationNumber: Yup.string()
        .min(9, "Must be 9 characters or more")
        .required("Required")
        .test(
          "value-registrationNumber",
          "Registration number is in used",
          (num: any): boolean => {
            const userUrl = urlcat(SERVER, `vendors/findByRegistrationNum/${num}`);
            axios
              .get(userUrl)
              .then((res) => setRegNum(res.data.length))
              .catch((err) => console.log(err));
            return regNum === 0 ? true : false;
          }
        ),
      incorporationDate: Yup.date()
        .default(new Date())
        .max(
          new Date(),
          `Date should be ${new Date().toLocaleDateString()} or earlier`
        )
        .required("Required"),
      registeredOfficeAddress: Yup.string().required("Required"),
      // uploadedFiles: Yup.mixed().required("A file is required"),

    }),
    onSubmit: (values: any) => {
      // console.log(values);
      axios
        .post(url, values)
        .then((res) => setTokenState(res.data.token))
        .catch((error) => console.log(error.response.data.error));
      navigateToProjects("/vendor/secret");
    },
  },
  );


  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <Grid item sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="contactPersonName"
                autoComplete="off"
                variant="filled"
                label="Person In-Charge"
                name="contactPersonName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                value={formik.values.contactPersonName}
              />
              {formik.touched.contactPersonName &&
                formik.errors.contactPersonName ? (
                <div>{formik.errors.contactPersonName}</div>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="username"
                autoComplete="off"
                variant="filled"
                label="Username"
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
          </Grid>
        </Grid>


        <Grid item sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="email"
                autoComplete="off"
                variant="filled"
                label="Email"
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

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="password"
                autoComplete="off"
                variant="filled"
                label="Password"
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
        </Grid>


        <Grid item sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="contractNumber"
                autoComplete="off"
                variant="filled"
                label="Contact Number"
                name="contactNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                value={formik.values.contactNumber}
              />
              {formik.touched.contactNumber && formik.errors.contactNumber ? (
                <div>{formik.errors.contactNumber}</div>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="companyName"
                autoComplete="off"
                variant="filled"
                label="Company Name"
                name="companyName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                value={formik.values.companyName}
              />
              {formik.touched.companyName && formik.errors.companyName ? (
                <div>{formik.errors.companyName}</div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>


        <Grid item sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="registrationNumber"
                autoComplete="off"
                variant="filled"
                label="Registration Number"
                name="registrationNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                value={formik.values.registrationNumber}
              />
              {formik.touched.registrationNumber &&
                formik.errors.registrationNumber ? (
                <div>{formik.errors.registrationNumber}</div>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="incorporationDate"
                autoComplete="off"
                variant="filled"
                label="Incorporation Date"
                name="incorporationDate"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                // value={format(
                //   new Date(formik.values.incorporationDate),
                //   "yyyy-MM-dd"
                // )}
                value={formik.values.incorporationDate}

              />
              {formik.touched.incorporationDate &&
                formik.errors.incorporationDate ? (
                <div>{formik.errors.incorporationDate}</div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>


        <Grid item sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="registeredOfficeAddress"
                autoComplete="off"
                variant="filled"
                label="Registered Office Address"
                name="registeredOfficeAddress"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                value={formik.values.registeredOfficeAddress}
              />
              {formik.touched.registeredOfficeAddress &&
                formik.errors.registeredOfficeAddress ? (
                <div>{formik.errors.registeredOfficeAddress}</div>
              ) : null}
            </Grid>

            {/* <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="uploadedFiles"
                autoComplete="off"
                variant="filled"
                label="Upload Files"
                name="uploadedFiles"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
              // value={formik.values.username}
              />
              {formik.touched.uploadedFiles && formik.errors.uploadedFiles ? (
                <div>{formik.errors.uploadedFiles}</div>
              ) : null}
            </Grid> */}
          </Grid>
        </Grid>


        <Button type="submit">Submit</Button>
      </Grid>
    </form>
  );
};

export default VendorSignUpForm;
