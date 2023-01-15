import axios from "axios";
import React, { FC, useContext, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const AWSVendorSignUpForm: FC = () => {
  const token: any = sessionStorage.getItem("token");

  const [username, setUsername] = useState(0);
  const [userEmail, setUserEmail] = useState(0);
  const [regNum, setRegNum] = useState(0);
  const [userData, setUserData] = useState({});
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
      contactPersonName: "",
      username: "",
      email: "",
      password: "",
      contactNumber: "",
      companyName: "",
      registrationNumber: "",
      incorporationDate: "",
      registeredOfficeAddress: "",
      uploadedFiles: null,
    },
    validationSchema: Yup.object({
      contactPersonName: Yup.string().required("Required"),
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required")
        .test("value-name", "Username is in used", (name: any): boolean => {
          const userUrl = urlcat(SERVER, `vendors/findByName/${name}`);
          axios
            .get(userUrl)
            .then((res) => setUsername(res.data.length))
            .catch((err) => console.log(err));
          return username === 0 ? true : false;
        }),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .test("value-email", "Email is in used", (email: any): boolean => {
          const clientUrl = urlcat(SERVER, `vendors/findByEmail/${email}`);
          axios
            .get(clientUrl)
            .then((res) => setUserEmail(res.data.length))
            .catch((err) => console.log(err));
          return userEmail === 0 ? true : false;
        }),
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
            const userUrl = urlcat(
              SERVER,
              `vendors/findByRegistrationNum/${num}`
            );
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
      uploadedFiles: Yup.mixed().required("A file is required"),
    }),
    onSubmit: (values: any) => {
      const formData = new FormData();
      for (let i = 0; i < values.uploadedFiles.length; i++) {
        formData.append("uploadedFiles", values.uploadedFiles[i]);
      }

      const uploadImgUrl = urlcat(SERVER, "/aws/upload-files");
      const createVendorUrl = urlcat(SERVER, "/vendors");
      const config = {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(uploadImgUrl, formData, config)
        .then((res) => {
          // AWS immediately returns a list with file objects
          console.log(res.data);
          let filesArr = [];
          for (let i = 0; i < res.data.length; i++) {
            filesArr.push(res.data[i].location);
          }
          console.log(filesArr);
          values.uploadedFiles = filesArr;
          console.log(values);
        })
        .then(() => axios.post(createVendorUrl, values))
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          const payload = parseJwt(res.data.token);
          console.log(payload.userId);
          navigateToProjects(`/vendor/${payload.userId}/dashboard`);
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
          <Grid item sm={12}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  CONTACT PERSON
                </Typography>

                <TextField
                  required
                  id="contactPersonName"
                  autoComplete="off"
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

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  USERNAME
                </Typography>
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
            </Grid>
          </Grid>

          <Grid item sm={12}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  EMAIL ADDRESS
                </Typography>
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

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  PASSWORD
                </Typography>

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
          </Grid>

          <Grid item sm={12}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  CONTACT NUMBER
                </Typography>
                <TextField
                  required
                  id="contractNumber"
                  autoComplete="off"
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

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  COMPANY NAME
                </Typography>

                <TextField
                  required
                  id="companyName"
                  autoComplete="off"
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

          <Grid item sm={12}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  REGISTRATION NUMBER
                </Typography>

                <TextField
                  required
                  id="registrationNumber"
                  autoComplete="off"
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

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  INCORPORATION DATE
                </Typography>

                <TextField
                  required
                  id="incorporationDate"
                  autoComplete="off"
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

          <Grid item sm={12}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  REGISTERED OFFICE ADDRESS
                </Typography>

                <TextField
                  required
                  id="registeredOfficeAddress"
                  autoComplete="off"
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

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  sx={{ mb: "0.5rem", color: "#444444" }}
                >
                  COMPANY REGISTRATION DOCUMENTS (PDF only)
                </Typography>

                <TextField
                  id="uploadedFiles"
                  name="uploadedFiles"
                  inputProps={{
                    multiple: true,
                    accept: "application/pdf",
                  }}
                  type="file"
                  onChange={(event: any) => {
                    formik.setFieldValue(
                      "uploadedFiles",
                      event.currentTarget.files
                    );
                  }}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                  hidden
                />
                {formik.touched.uploadedFiles && formik.errors.uploadedFiles ? (
                  <div>{formik.errors.uploadedFiles}</div>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ textAlign: "center" }}>
          <Button
            type="submit"
            sx={{
              background: "#254D71",
              color: "white",
              letterSpacing: "0.2rem",
              mt: "3rem",
              width: { xs: "100%", sm: "0" },
              pl: { sm: "6rem" },
              pr: { sm: "6rem" },
              "&:hover": {
                backgroundColor: "#173754",
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AWSVendorSignUpForm;
