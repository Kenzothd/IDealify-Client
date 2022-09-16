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
import react, { useState, useEffect } from "react";
import { IVendor } from "../../Interface";
import axios from "axios";
import { date } from "yup/lib/locale";
import format from "date-fns/format";

const SERVER = import.meta.env.VITE_SERVER;

const VendorAccount = () => {
  const [vendorAccount, setVendorAccount] = useState<IVendor>({
    email: "",
    contactPersonName: "",
    username: "",
    password: "",
    contactNumber: 0,
    companyName: "",
    registrationNumber: "doiqfoeqwf0",
    incorporationDate: new Date("2015-03-25"),
    registeredOfficeAddress: "",
    uploadedFiles: ["url", "url"],
    trackedProjects: ["p1", "p2"],
    brandSummary: "",
  });
  const [toggle, setToggle] = useState<boolean>(false);

  //   console.log(vendorAccount);

  useEffect(() => {
    const url = urlcat(SERVER, "/vendors/id/6321b18a94bfa21bbb0657e4");

    axios
      .get(url)
      .then((res) => setVendorAccount(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formik = useFormik({
    initialValues: {
      contactPerson: "",
      email: "",
      password: "",
      companyName: "",
      registrationNumber: "",
      incorporationDate: "",
    },
    validationSchema: Yup.object({
      contactPerson: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
      companyName: Yup.string().required("Required"),
      registrationNumber: Yup.string()
        .min(9, "Must be 9 characters or more")
        .required("Required"),
      incorporationDate: Yup.date()
        .default(new Date())
        .max(
          new Date(),
          `Date should be equal or earlier than ${new Date().toLocaleDateString()}`
        )
        .required("End Date required"),
    }),
    onSubmit: (values) => {
      //   setToggle(!toggle);
      console.log(values);
      console.log(toggle);
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
            <label htmlFor="contactPerson">Person In-Charge</label>
            <TextField
              required
              id="contactPerson"
              name="contactPerson"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={vendorAccount?.contactPersonName}
            />
            {formik.touched.contactPerson && formik.errors.contactPerson ? (
              <div>{formik.errors.contactPerson}</div>
            ) : null}

            <label htmlFor="email">email</label>
            <TextField
              required
              label="Required"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={vendorAccount?.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password">password</label>
            <TextField
              required
              label="Required"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={vendorAccount?.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <label htmlFor="companyName">companyName</label>
            <TextField
              required
              label="Required"
              id="companyName"
              name="companyName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={vendorAccount?.companyName}
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <div>{formik.errors.companyName}</div>
            ) : null}

            <label htmlFor="registrationNumber">registrationNumber</label>
            <TextField
              required
              label="Required"
              id="registrationNumber"
              name="registrationNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={vendorAccount?.registrationNumber}
            />
            {formik.touched.registrationNumber &&
            formik.errors.registrationNumber ? (
              <div>{formik.errors.registrationNumber}</div>
            ) : null}

            <label htmlFor="incorporationDate">incorporationDate</label>
            <TextField
              required
              label="Required"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              id="incorporationDate"
              name="incorporationDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={format(
                new Date(vendorAccount?.incorporationDate),
                "yyyy-MM-dd"
              )}
            />
            {formik.touched.incorporationDate &&
            formik.errors.incorporationDate ? (
              <div>{formik.errors.incorporationDate}</div>
            ) : null}
            <button type="submit">submit</button>
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
              id="icontactPerson"
              name="contactPerson"
              value={vendorAccount?.contactPersonName}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <TextField
              disabled
              id="icontactPerson"
              name="contactPerson"
              value={vendorAccount?.email}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <TextField
              disabled
              id="incorporationDate"
              name="incorporationDate"
              value={vendorAccount?.password}
              InputProps={{
                readOnly: true,
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <label htmlFor="companyName">Company Name</label>
            <TextField
              disabled
              id="companyName"
              name="companyName"
              value={vendorAccount?.companyName}
              InputProps={{
                readOnly: true,
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <label htmlFor="registrationNumber">Registration Number</label>
            <TextField
              disabled
              id="registrationNumber"
              name="registrationNumber"
              value={vendorAccount?.registrationNumber}
              InputProps={{
                readOnly: true,
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <label htmlFor="incorporationDate">Incorporation Date</label>
            <TextField
              disabled
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              id="incorporationDate"
              name="incorporationDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // value={format(
              //   new Date(vendorAccount?.incorporationDate),
              //   "yyyy-MM-dd"
              // )}
            />
          </div>
          <button onClick={handlerEdit}>Edit</button>
        </>
      )}
    </>
  );
};

export default VendorAccount;
