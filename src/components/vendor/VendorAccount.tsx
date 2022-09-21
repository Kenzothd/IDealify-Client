import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// When using TypeScript 4.x and above
import type {} from "@mui/x-date-pickers/themeAugmentation";
import urlcat from "urlcat";
import react, { FC, useState, useEffect } from "react";
import { IVendor } from "../../Interface";
import axios from "axios";
import { date } from "yup/lib/locale";
import format from "date-fns/format";
import Button from "@mui/material/Button";
import { render } from "react-dom";
import { Grid, Paper } from "@mui/material";

const buttonSx = {
  backgroundColor: "blue",
  color: "white",
  margin: "3% auto",
  display: "flex",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: 1,
  borderRadius: 2,
  padding: "0.5rem 1.5rem",
};

const SERVER = import.meta.env.VITE_SERVER;

const VendorAccount: FC = () => {
  const token: any = sessionStorage.getItem("token");
  const [offEditMode, setOffEditMode] = useState<boolean>(true);
  const [vendorId, setVendorId] = useState("");
  const [vendorAccount, setVendorAccount] = useState<IVendor>({
    email: "",
    contactPersonName: "",
    username: "",
    password: "",
    contactNumber: 0,
    companyName: "",
    registrationNumber: "",
    incorporationDate: new Date(),
    registeredOfficeAddress: "",
    uploadedFiles: [""],
    trackedProjects: [""],
    brandSummary: "",
  });

  console.log(offEditMode);

  console.log(token);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    //verify and get vendor id from payload
    const verifyURL = urlcat(SERVER, "/vendors/verify");
    axios
      .post(verifyURL, { data: "hello" }, config)
      .then((res) => {
        const vendorID = res.data._id;
        setVendorId(vendorID);
        //get vendor account details
        const vendorURL = urlcat(SERVER, `/vendors/id/${vendorID}`);
        axios
          .get(vendorURL, config)
          .then((res) => setVendorAccount(res.data))
          .catch((err) => console.log(err));
      })
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
      contactPersonName: vendorAccount.contactPersonName,
      username: vendorAccount.username,
      email: vendorAccount.email,
      password: vendorAccount.password,
      contactNumber: vendorAccount.contactNumber,
      companyName: vendorAccount.companyName,
      registrationNumber: vendorAccount.registrationNumber,
      incorporationDate: vendorAccount.incorporationDate,
      registeredOfficeAddress: vendorAccount.registeredOfficeAddress,
      //   uploadedFiles: null,
    },
    validationSchema: Yup.object().shape({
      contactPersonName: Yup.string().required("Required"),
      username: Yup.string()
        .test(
          "value-name",
          "username must not have spacing",
          (username: any) => !username.includes(" ")
        )
        .required("Required"),
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
          "value-name",
          "Registration Number must not have spacing",
          (username: any) => !username.includes(" ")
        ),
      incorporationDate: Yup.date()
        .default(new Date())
        .max(
          new Date(),
          `Date should be equal or earlier than ${new Date().toLocaleDateString()}`
        )
        .required("End Date required"),
      registeredOfficeAddress: Yup.string().required("Required"),
      //   uploadedFiles: Yup.mixed().required("A file is required"),
      // .test(
      //   "fileSize",
      //   "File too large",
      //   (value) => value && value.size <= FILE_SIZE
      // )
      // .test(
      //   "fileFormat",
      //   "Unsupported Format",
      //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
      // ),
    }),

    onSubmit: (values: any) => {
      console.log("submit button");
      if (offEditMode) {
        setOffEditMode(!offEditMode);
      } else {
        setOffEditMode(!offEditMode);
        console.log(
          // {
          //   fileName: values.uploadedFiles.name,
          //   type: values.uploadedFiles.type,
          //   size: `${values.uploadedFiles.size} bytes`,
          // },
          // null,
          // 2,
          // values.uploadedFiles,
          values
        );

        const url = urlcat(SERVER, `vendors/id/${vendorId}`);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        //form update
        axios
          .put(url, values, config)
          .then((res) => setVendorAccount(res.data))
          .catch((error) => console.log(error));
      }
    },
  });

  return (
    <>
      <h1>Account</h1>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={6} md={6}>
            <label htmlFor="contactPersonName">Person In-Charge</label>
            <TextField
              required
              disabled={offEditMode}
              id="contactPersonName"
              name="contactPersonName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactPersonName}
              sx={{ width: "100%" }}
            />
            {formik.touched.contactPersonName &&
            formik.errors.contactPersonName ? (
              <div>{formik.errors.contactPersonName}</div>
            ) : null}
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <label htmlFor="companyName">Company Name</label>
            <TextField
              required
              disabled={offEditMode}
              id="companyName"
              name="companyName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.companyName}
              sx={{ width: "100%" }}
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <div>{formik.errors.companyName}</div>
            ) : null}
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <label htmlFor="contactNumber">Contact Number</label>
            <TextField
              required
              disabled={offEditMode}
              id="contactNumber"
              name="contactNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactNumber}
              sx={{ width: "100%" }}
            />
            {formik.touched.contactNumber && formik.errors.contactNumber ? (
              <div>{formik.errors.contactNumber}</div>
            ) : null}
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <label htmlFor="registrationNumber">Registration Number</label>
            <TextField
              required
              disabled={offEditMode}
              id="registrationNumber"
              name="registrationNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationNumber}
              sx={{ width: "100%" }}
            />
            {formik.touched.registrationNumber &&
            formik.errors.registrationNumber ? (
              <div>{formik.errors.registrationNumber}</div>
            ) : null}
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <label htmlFor="email">Email</label>
            <TextField
              required
              disabled={offEditMode}
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              sx={{ width: "100%" }}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <label htmlFor="incorporationDate">Incorporation Date</label>
            <TextField
              required
              disabled={offEditMode}
              type="date"
              id="incorporationDate"
              name="incorporationDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={format(
                new Date(formik.values.incorporationDate),
                "yyyy-MM-dd"
              )}
              sx={{ width: "100%" }}
            />
            {formik.touched.incorporationDate &&
            formik.errors.incorporationDate ? (
              <div>{formik.errors.incorporationDate}</div>
            ) : null}
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <label htmlFor="username">Username</label>
            <TextField
              required
              disabled={offEditMode}
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              sx={{ width: "100%" }}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <label htmlFor="registeredOfficeAddress">
              Registered Office Address
            </label>
            <TextField
              required
              disabled={offEditMode}
              id="registeredOfficeAddress"
              name="registeredOfficeAddress"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registeredOfficeAddress}
              sx={{ width: "100%" }}
            />
            {formik.touched.registeredOfficeAddress &&
            formik.errors.registeredOfficeAddress ? (
              <div>{formik.errors.registeredOfficeAddress}</div>
            ) : null}
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <label htmlFor="password">password</label>
            <TextField
              required
              disabled={offEditMode}
              id="password"
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

          {/* <Grid item xs={6} sm={6} md={6}>
            <Button variant="contained" component="label">
              Upload Files
              <TextField
                disabled={offEditMode}
                id="uploadedFiles"
                name="uploadedFiles"
                type="file"
                onChange={(event: any) => {
                  formik.setFieldValue(
                    "uploadedFiles",
                    event.currentTarget.files[0]
                  );
                }}
                onBlur={formik.handleBlur}
                hidden
                sx={{ width: "100%" }}
              />
              {formik.touched.uploadedFiles && formik.errors.uploadedFiles ? (
                <div>{formik.errors.uploadedFiles}</div>
              ) : null}
            </Button>
          </Grid> */}

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="submit" sx={buttonSx}>
              {offEditMode ? "Edit" : "Submit Changes"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default VendorAccount;
