import { useContext, useEffect, useState } from "react";
import TokenContext from "../contextStore/token-context";
import { ITokenContext } from "../Interface";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import type { } from "@mui/x-date-pickers/themeAugmentation";
import urlcat from "urlcat";
import { IVendor } from "../Interface";
import axios from "axios";
import { date } from "yup/lib/locale";
import format from "date-fns/format";
import { render } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";

const SecretPage = () => {
  const [vendor, setVendor] = useState({});
  const [projects, setProjects] = useState();
  const navigate = useNavigate();
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
  });

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI0ODc2NTc5Nzk2NGEyNjk5NjhmZTgiLCJ1c2VybmFtZSI6ImNsb2NsbyIsImlhdCI6MTY2MzQwODE4NCwiZXhwIjoxNjYzNDA5OTg0fQ.xcW6Tf8b0paHmEhz8d5o85cRfk3we3GbJDIZym-GzA0"

  const token: any = sessionStorage.getItem("token");

  const SERVER = import.meta.env.VITE_SERVER;
  const vendorUrl = urlcat(SERVER, "vendors/verify");
  const projectUrl = urlcat(SERVER, "projects");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //   useEffect(() => {
  //     // Verify Vendor
  //     axios
  //       .post(vendorUrl, { data: "hello" }, config)
  //       .then((res) => console.log(res.data))
  //       .then((res) => {
  //         // Get Projects
  //         axios
  //           .get(projectUrl, config)
  //           .then((res) => setProjects(res.data))
  //           .catch((error) => console.log({ Error: error.response.data.error }));
  //       })
  //       .catch((error) => {
  //         console.log({ Error: error.response.data.error });
  //         navigate("/vendor/login");
  //       });
  //   }, []);

  const [offEditMode, setOffEditMode] = useState<boolean>(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      uploadedFiles: null,
    },
    validationSchema: Yup.object().shape({
      uploadedFiles: Yup.mixed().required("A file is required"),
      //   .test(
      //     "fileSize",
      //     "File too large",
      //     (value : any ) => value && value.size <= FILE_SIZE
      //   )
      //   .test(
      //     "fileFormat",
      //     "Unsupported Format",
      //     (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
      //   ),
    }),

    onSubmit: (values: any) => {
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

        const url = urlcat(SERVER, `vendors/id/63286fe5fb2e43bb8961973f`);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .put(url, values, config)
          .then((res) => setVendorAccount(res.data))
          .catch((error) => console.log(error));
      }
    },
  });

  return (
    <>
      <h1>Secret</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="uploadedFiles">Upload Files</label>
        <Button variant="contained" component="label">
          Upload File
          <TextField
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
        </Button>

        <Button type="submit">{offEditMode ? "Edit" : "Submit Changes"}</Button>
      </form>
    </>
  );
};

export default SecretPage;
