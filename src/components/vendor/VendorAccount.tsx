import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// When using TypeScript 4.x and above
import type {} from "@mui/x-date-pickers/themeAugmentation";

const VendorAccount = () => {
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
  return (
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
        {formik.touched.incorporationDate && formik.errors.incorporationDate ? (
          <div>{formik.errors.incorporationDate}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default VendorAccount;
