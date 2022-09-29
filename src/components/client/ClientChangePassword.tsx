import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import type { } from "@mui/x-date-pickers/themeAugmentation";
import urlcat from "urlcat";
import { IClient, } from "../../Interface";
import axios from "axios";
import { date } from "yup/lib/locale";
import format from "date-fns/format";
import Button from "@mui/material/Button";
import { render } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { values } from "lodash";


const SERVER = import.meta.env.VITE_SERVER;

const ClientChangePassword: FC = () => {
    const token: any = sessionStorage.getItem("token");

    const [errorMsg, setErrorMsg] = useState('');

    const [offEditMode, setOffEditMode] = useState<boolean>(true);
    const { clientid } = useParams();
    const navigate = useNavigate();
    const [clientAccount, setClientAccount] = useState<IClient>({
        email: "",
        username: "",
        password: "",
        fullName: ""
    });


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        //get client account details
        const clientURL = urlcat(SERVER, `/clients/id/${clientid}`);
        axios
            .get(clientURL, config)
            .then((res) => setClientAccount(res.data))
            .catch((err) => console.log(err));

    }, []);




    const formik = useFormik({
        initialValues: {
            previousPassword: '',
            newPassword: '',
            confirmPassword: '',
        },

        validationSchema: Yup.object({
            previousPassword: Yup.string()
                .required("Required"),
            newPassword: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character"
                )
                .required("Required"),
            confirmPassword: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must contain at least 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character"
                )
                .required("Required"),

            // oldPassword: Yup.string()
            //     .test(
            //         "value-password",
            //         "Password is wrong",
            //         (pw: any): boolean => {
            //             const clientUrl = urlcat(SERVER, `clients/validatepw/${clientid}`);
            //             const pwTest = { password: pw }

            //             axios
            //                 .post(clientUrl, pwTest)
            //                 .then((res) => setPwCheck(res.data.msg))
            //                 .catch((error) => setPwCheck(error.response.data.error));
            //             return pwCheck === "Password Validated" || pwCheck === "No Input" ? true : false;
            //         }
            //     ),


        }),


        onSubmit: (values: any) => {
            console.log("submit button", values);
            const clientUrl = urlcat(SERVER, `clients/validatepw/${clientid}`);
            const pwTest = { password: values.previousPassword }
            axios
                .post(clientUrl, pwTest)
                .then((res) => {
                    if (values.newPassword !== values.confirmPassword) {
                        setErrorMsg('New password does not match.')
                    } else {
                        const client = res.data
                        const url = urlcat(SERVER, `clients/id/${clientid}`);

                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        };
                        client.password = values.newPassword
                        return axios.put(url, client, config)
                    }
                })
                .then((res: any) => {
                    setErrorMsg('Password updated successfully!')

                })
                .catch((error) => setErrorMsg(error.response.data.error));



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
                    <Typography variant='h3'>Change Password</Typography>
                </Grid>


                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={4}>


                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>PREVIOUS PASSWORD</Typography>

                            <TextField
                                required
                                type='password'
                                id="previousPassword"
                                autoComplete="off"
                                name="previousPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.previousPassword}
                            />
                            {formik.touched.previousPassword && formik.errors.previousPassword ? (
                                <div>{formik.errors.previousPassword}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>NEW PASSWORD</Typography>

                            <TextField
                                required
                                type='password'
                                id="newPassword"
                                autoComplete="off"
                                name="newPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.newPassword}
                            />
                            {formik.touched.newPassword && formik.errors.newPassword ? (
                                <div>{formik.errors.newPassword}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>CONFIRM PASSWORD</Typography>

                            <TextField
                                required
                                type='password'
                                id="confirmPassword"
                                autoComplete="off"
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.confirmPassword}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div>{formik.errors.confirmPassword}</div>
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
                            mb: '0.5rem',
                            '&:hover': {
                                backgroundColor: '#254D71',
                            }
                        }}> Change Password
                        </Button>

                        <Typography variant='body2' sx={{ color: 'red' }} >{errorMsg}</Typography>
                    </Grid>

                </form>
            </Grid>
        </Container>
    );
};

export default ClientChangePassword;
