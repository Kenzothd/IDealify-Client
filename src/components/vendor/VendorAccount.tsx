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

const SERVER = import.meta.env.VITE_SERVER;

const VendorAccount: FC = () => {
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
  const [toggle, setToggle] = useState<boolean>(false);

  //   console.log(vendorAccount);

  useEffect(() => {
    const url = urlcat(SERVER, "/vendors/id/63242cc3aa5c38de67a9dec6");

    axios
      .get(url)
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
      // uploadedFiles: null,
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
      // uploadedFiles: Yup.mixed().required("A file is required"),
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
    onSubmit: (values) => {
      console.log("values have been extracted");
      //   console.log(
      //     {
      //       fileName: values.uploadedFiles.name,
      //       type: values.uploadedFiles.type,
      //       size: `${values.uploadedFiles.size} bytes`,
      //     },
      //     null,
      //     2
      //   );

      //   setToggle(!toggle);
      const url = urlcat(SERVER, `vendors/id/63242cc3aa5c38de67a9dec6`);
      //   axios
      //     .put(url, values)
      //     .then((res) => setVendorAccount(res.data))
      //     .catch((error) => console.log(error));
    },
  });

  const handlerEdit = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {toggle ? (
        <>
          <h1>Account</h1>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="contactPersonName">Person In-Charge</label>
            <input
              required
              id="contactPersonName"
              name="contactPersonName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactPersonName}
            />
            {formik.touched.contactPersonName &&
            formik.errors.contactPersonName ? (
              <div>{formik.errors.contactPersonName}</div>
            ) : null}

            <label htmlFor="username">Username</label>
            <input
              required
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}

            <label htmlFor="email">email</label>
            <input
              required
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

            <label htmlFor="password">password</label>
            <input
              required
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <label htmlFor="contactNumber">Contact Number</label>
            <input
              required
              id="contactNumber"
              name="contactNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactNumber}
            />
            {formik.touched.contactNumber && formik.errors.contactNumber ? (
              <div>{formik.errors.contactNumber}</div>
            ) : null}

            <label htmlFor="companyName">Company Name</label>
            <input
              required
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

            <label htmlFor="registrationNumber">Registration Number</label>
            <input
              required
              id="registrationNumber"
              name="registrationNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationNumber}
            />
            {formik.touched.registrationNumber &&
            formik.errors.registrationNumber ? (
              <div>{formik.errors.registrationNumber}</div>
            ) : null}

            <label htmlFor="incorporationDate">Incorporation Date</label>
            <input
              required
              type="date"
              id="incorporationDate"
              name="incorporationDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={format(
                new Date(formik.values.incorporationDate),
                "yyyy-MM-dd"
              )}
            />
            {formik.touched.incorporationDate &&
            formik.errors.incorporationDate ? (
              <div>{formik.errors.incorporationDate}</div>
            ) : null}

            <label htmlFor="registeredOfficeAddress">
              Registered Office Address
            </label>
            <input
              required
              id="registeredOfficeAddress"
              name="registeredOfficeAddress"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registeredOfficeAddress}
            />
            {formik.touched.registeredOfficeAddress &&
            formik.errors.registeredOfficeAddress ? (
              <div>{formik.errors.registeredOfficeAddress}</div>
            ) : null}

            {/* <label htmlFor="uploadedFiles">Upload Files</label>
            <Button variant="contained" component="label">
              Upload File
              <input
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
              />
              {formik.touched.uploadedFiles && formik.errors.uploadedFiles ? (
                <div>{formik.errors.uploadedFiles}</div>
              ) : null}
            </Button> */}

            <button type="submit">done</button>
          </form>
        </>
      ) : (
        <>
          <h1>typo Page </h1>
          <h1>Account</h1>
          <div>
            <label htmlFor="contactPerson">Person In-Charge</label>
            <TextField
              disabled
              id="contactPerson"
              name="contactPerson"
              value={vendorAccount?.contactPersonName}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <TextField
              disabled
              id="username"
              name="username"
              value={vendorAccount?.username}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <TextField
              disabled
              id="email"
              name="email"
              value={vendorAccount?.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <TextField
              disabled
              id="password"
              name="password"
              type="password"
              value={vendorAccount?.password}
            />
          </div>
          <div>
            <label htmlFor="contactNumber">Contact Number</label>
            <TextField
              disabled
              id="contactNumber"
              name="contactNumber"
              value={vendorAccount?.contactNumber}
            />
          </div>
          <div>
            <label htmlFor="companyName">Company Name</label>
            <TextField
              disabled
              id="companyName"
              name="companyName"
              value={vendorAccount?.companyName}
            />
          </div>
          <div>
            <label htmlFor="registrationNumber">Registration Number</label>
            <TextField
              disabled
              id="registrationNumber"
              name="registrationNumber"
              value={vendorAccount?.registrationNumber}
            />
          </div>
          <div>
            <label htmlFor="incorporationDate">Incorporation Date</label>
            <TextField
              disabled
              type="date"
              id="incorporationDate"
              name="incorporationDate"
              value={format(
                new Date(vendorAccount?.incorporationDate),
                "yyyy-MM-dd"
              )}
            />
          </div>
          <div>
            <label htmlFor="registrationOfficeAddress">
              Registered Office Address
            </label>
            <TextField
              disabled
              id="registrationOfficeAddress"
              name="registrationOfficeAddress"
              value={vendorAccount?.registeredOfficeAddress}
            />
          </div>
          {/* <div>
            <label htmlFor="uploadedFiles">Upload Files</label>
            <Button disabled variant="contained" component="label">
              Upload File
              <input
                id="uploadedFiles"
                name="uploadedFiles"
                type="file"
                hidden
              />
            </Button>
          </div> */}
          <button onClick={handlerEdit}>Edit</button>
        </>
      )}
    </>
  );
};

export default VendorAccount;
