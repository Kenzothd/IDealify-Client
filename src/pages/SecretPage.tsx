import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import type { } from "@mui/x-date-pickers/themeAugmentation";
import urlcat from "urlcat";
import { IVendor } from "../Interface";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const SecretPage = () => {

  const [images, setImages] = useState([])
  const token: any = sessionStorage.getItem("token");

  const SERVER = import.meta.env.VITE_SERVER;
  const vendorUrl = urlcat(SERVER, "vendors/verify");
  const projectUrl = urlcat(SERVER, "projects");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const imageUrl = urlcat(SERVER, "/getimages");

  useEffect(() => {
    axios
      .get(imageUrl)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

  }, [])









  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      uploadedFiles: null,
    },
    validationSchema: Yup.object().shape({
      uploadedFiles: Yup.mixed().required("A file is required"),
    }),

    onSubmit: (values: any) => {
      console.log(values.uploadedFiles)
      const formData = new FormData()
      for (let i = 0; i < values.uploadedFiles.length; i++) {
        formData.append("uploadedFiles", values.uploadedFiles[i])
      }
      console.log('FORMDATA', formData)
      const url = urlcat(SERVER, 'projects/upload-images');
      const config = {
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      axios
        .post(url, formData, config)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));

    },
  });

  return (
    <>
      <h1>Images</h1>

      <h1>Secret</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="uploadedFiles">Upload Files</label>

        <TextField
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
          hidden
        />
        {formik.touched.uploadedFiles && formik.errors.uploadedFiles ? (
          <div>{formik.errors.uploadedFiles}</div>
        ) : null}


        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default SecretPage;
