import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import urlcat from "urlcat";
import axios from "axios";
import { ReadMoreRounded } from "@mui/icons-material";

const SERVER = import.meta.env.VITE_SERVER;


const Testing = () => {

    const [previewSource, setPreviewSource] = useState('')
    const [fileInputState, setFileInputState] = useState('')
    const [response, setResponse] = useState()





    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0]
        const files = e.target.files
        console.log(files)
        previewFile(file)
    }


    const previewFile = (file: any) => {
        const reader: any = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleSubmitFile = (e: any) => {
        console.log('submitting')
        e.preventDefault()
        if (!previewSource) return
        uploadImage(previewSource)
    }


    const uploadImage = async (base64EncodedImage: any) => {
        const imageFiles = [{ data: base64EncodedImage }]
        const url = urlcat(SERVER, 'projects/upload-images');
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios
            .post(url, imageFiles, config)
            .then((res: any) => setResponse(res))
            .catch((err) => console.log(err))
    }





    return (
        <div>
            <h1>Upload</h1>
            <form onSubmit={handleSubmitFile}>
                <input
                    type="file"
                    name='image'
                    multiple accept='image/*'
                    value={fileInputState}
                    onChange={handleFileInputChange}></input>
                <button type='submit'>Upload</button>


            </form>
            {previewSource && (
                <img src={previewSource} alt='chosen' style={{ height: '300px' }} />
            )}

        </div>
    )
}

export default Testing