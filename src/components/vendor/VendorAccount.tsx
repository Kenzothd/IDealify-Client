import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import type { } from "@mui/x-date-pickers/themeAugmentation";
import urlcat from "urlcat";
import { IVendor } from "../../Interface";
import axios from "axios";
import { date } from "yup/lib/locale";
import format from "date-fns/format";
import Button from "@mui/material/Button";
import { render } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { Email } from "@mui/icons-material";

// const buttonSx = {
//   backgroundColor: "blue",
//   color: "white",
//   margin: "3% auto",
//   display: "flex",
//   fontWeight: 700,
//   fontSize: 12,
//   letterSpacing: 1,
//   borderRadius: 2,
//   padding: "0.5rem 1.5rem",
// };

const SERVER = import.meta.env.VITE_SERVER;

const VendorAccount: FC = () => {
  const token: any = sessionStorage.getItem("token");
  const [offEditMode, setOffEditMode] = useState<boolean>(true);
  const { vendorid } = useParams();
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('')
  const [userRegNum, setUserRegNum] = useState('')
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
    const url = urlcat(SERVER, `/vendors/id/${vendorid}`);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    //get vendor account details
    const vendorURL = urlcat(SERVER, `/vendors/id/${vendorid}`);
    axios
      .get(vendorURL, config)
      .then((res) => setVendorAccount(res.data))
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
      uploadedFiles: vendorAccount.uploadedFiles,
    },
    validationSchema: Yup.object().shape({
      contactPersonName: Yup.string().required("Required"),
      username: Yup.string()
        .required("Required")
        .min(3, "Must be 3 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required")
        .test(
          "value-name",
          "Username is in used",
          (name: any): boolean => {
            const clientUrl = urlcat(SERVER, `vendors/findByName/${name}`);
            axios
              .get(clientUrl)
              .then((res) => setUsername(res.data.length === 0 ? '' : res.data[0].username))
              .catch((err) => console.log(err));
            return userName === '' || userName === vendorAccount.username ? true : false;
          }
        ),
      // .test(
      //   "value-name",
      //   "username must not have spacing",
      //   (username: any) => !username.includes(" ")
      // )
      email: Yup.string().email("Invalid email address").required("Required")
        .test(
          "email-name",
          "Email is in used",
          (email: any): boolean => {
            const clientUrl = urlcat(SERVER, `vendors/findByEmail/${email}`);
            axios
              .get(clientUrl)
              .then((res) => setUserEmail(res.data.length === 0 ? '' : res.data[0].email))
              .catch((err) => console.log(err));
            return userEmail === '' || userEmail === vendorAccount.email ? true : false;
          }
        ),
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
          "regis-name",
          "Registration number is in used",
          (regNum: any): boolean => {
            const clientUrl = urlcat(SERVER, `vendors/findByRegistrationNum/${regNum}`);
            axios
              .get(clientUrl)
              .then((res) => setUserRegNum(res.data.length === 0 ? '' : res.data[0].registrationNumber))
              .catch((err) => console.log(err));
            return userRegNum === '' || userRegNum === vendorAccount.registrationNumber ? true : false;
          }
        ),
      // .test(
      //   "value-name",
      //   "Registration Number must not have spacing",
      //   (username: any) => !username.includes(" ")
      // ),
      incorporationDate: Yup.date()
        .default(new Date())
        .max(
          new Date(),
          `Date should be equal or earlier than ${new Date().toLocaleDateString()}`
        )
        .required("End Date required"),
      registeredOfficeAddress: Yup.string().required("Required"),
      uploadedFiles: Yup.mixed()
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
        // console.log('seehere',
        // {
        //   fileName: values.uploadedFiles.name,
        //   type: values.uploadedFiles.type,
        //   size: `${values.uploadedFiles.size} bytes`,
        // },
        // null,
        // 2,
        // values.uploadedFiles,
        //   values
        // );

        const url = urlcat(SERVER, `vendors/id/${vendorid}`);
        const uploadImgUrl = urlcat(SERVER, '/upload-images');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const configForImg = {
          headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        };

        const formData = new FormData()
        for (let i = 0; i < values.uploadedFiles.length; i++) {
          formData.append("uploadedFiles", values.uploadedFiles[i])
        }

        axios
          .post(uploadImgUrl, formData, configForImg)
          .then((res) => {
            values.uploadedFiles = res.data.imageLinks
            console.log('check values', values)
            return axios.put(url, values, config)
          })
          .then((res) => setVendorAccount(res.data))
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
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>PERSON-IN-CHARGE</Typography>

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

            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>Company Name</Typography>

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

            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>CONTACT NUMBER</Typography>

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

            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>REGISTRATION NUMBER</Typography>
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

            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>EMAIL</Typography>

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

            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>INCORPORATION DATE</Typography>
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

            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>USERNAME</Typography>

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

            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>REGISTERTED OFFICE ADDRESS</Typography>

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

            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>PASSWORD</Typography>

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

            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>UPLOAD FILES</Typography>



              <TextField
                disabled={offEditMode}
                id="uploadedFiles"
                name="uploadedFiles"
                inputProps={{
                  multiple: true
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

export default VendorAccount;
