import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface IUsers {
    _id?: String;
    username?: String;
    password?: String;
    email?: String
    trackedProjects?: String[];
    // updatedAt?: Date;
    // createdAt?: Date
    // __v?: Number;
}

const ClientSignUpForm: FC = () => {

    const [currentUsers, setCurrentUsers] = useState<Object[]>([])
    const [error, setError] = useState<String>('')

    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/clients");

    useEffect(() => {
        axios(url).then(res => setCurrentUsers(res.data))
    }, [])

    // console.log(currentUsers)
    // console.log(currentUsers.map((user: IUsers) => user.username).includes('clovis'))


    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object(
            {
                email: Yup.string().email("Invalid email address").required("Required"),
                fullName: Yup.string().required("Required"),
                username: Yup.string()
                    .min(3, "Must be 3 characters or more")
                    .max(20, 'Must be 20 characters or less')
                    .required('Required')
                    .test('testing', 'Username Existed', function (value: any): any {
                        const foundUserTest = currentUsers.map((user: IUsers) => user.username).some((name) => name === value)
                        console.log(`this is input: ${value}, this is ${foundUserTest}`)
                        return !foundUserTest
                    }),
                password: Yup.string()
                    .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                    )
                    .required("Required"),
            }),
        onSubmit: values => {
            console.log(values)
            axios.post(url, values)
                .then(res => console.log(res.data))
                .catch(error => setError(error.response.data.error))

        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>

            <label htmlFor="email">Email Address</label>
            <input
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

            <label htmlFor="fullName">Full Name</label>
            <input
                id="fullName"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
                <div>{formik.errors.fullName}</div>
            ) : null}

            <label htmlFor="username">User Name</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}



            <button type="submit">Sign Up</button>
        </form>
    );
};

export default ClientSignUpForm;