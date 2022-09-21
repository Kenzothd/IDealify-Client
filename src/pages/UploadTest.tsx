import React, { FC, useState } from "react";

const UploadTest = () => {

    const [image, setImage] = useState<any>([]);
    const [url, setUrl] = useState("");


    console.log(image)
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "Idealify")
        data.append("cloud_name", "dilbgcspk")
        fetch("  https://api.cloudinary.com/v1_1/dilbgcspk/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div>
                <input type="file" multiple accept='image/*' onChange={(e: any) => setImage(e.target.files)}></input>
                <button onClick={uploadImage}>Upload</button>
            </div>
            <div>
                <h1>Uploaded image will be displayed here</h1>
                <img src={url} />
            </div>
        </div>
    )
}

export default UploadTest
