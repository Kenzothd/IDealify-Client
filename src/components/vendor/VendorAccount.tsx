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
const SERVER = import.meta.env.VITE_SERVER;

const VendorAccount = () => {
  const [vendorAccount, setVendorAccount] = useState<IVendor | undefined>();
  const [toggle, setToggle] = useState<boolean>(false);

  console.log(vendorAccount);

  useEffect(() => {
    const url = urlcat(SERVER, "/vendors/id/6323ee4d75db88b24321a1ef");

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
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handlerEdit = () => {
    setToggle(!toggle);
  };

  const handlerDone = () => {
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
              label="Required"
              id="contactPerson"
              name="contactPerson"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactPerson}
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
              value={formik.values.email}
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
              value={formik.values.password}
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
              value={formik.values.companyName}
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
              value={formik.values.registrationNumber}
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
              value={formik.values.incorporationDate}
            />
            {formik.touched.incorporationDate &&
            formik.errors.incorporationDate ? (
              <div>{formik.errors.incorporationDate}</div>
            ) : null}
          </form>
          <button onClick={handlerDone}>Done</button>
        </>
      ) : (
        <>
          <h1>typo Page </h1>
          <h1>Account</h1>
          <p>
            <label htmlFor="contactPerson">Person In-Charge</label>
            <span> {vendorAccount?.contactPersonName}</span>
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <span> {vendorAccount?.email}</span>
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <TextField
              disabled
              type="password"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              id="incorporationDate"
              name="incorporationDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.incorporationDate}
            />
          </p>
          <p>
            <label htmlFor="companyName">Company Name</label>
            <span> {vendorAccount?.companyName}</span>
          </p>
          <p>
            <label htmlFor="registrationNumber">Registration Number</label>
            <span> {vendorAccount?.registrationNumber}</span>
          </p>
          <p>
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
              value={formik.values.incorporationDate}
            />
          </p>
          <button onClick={handlerEdit}>Edit</button>
        </>
      )}
    </>
  );
};

export default VendorAccount;
