
import { Box, Container } from "@mui/system";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid, ImageList, ImageListItem, TextField, Typography } from "@mui/material"
import React, { useContext, useEffect, useState, FC } from "react";
import urlcat from "urlcat";
import { IVendorPortfolio } from "../Interface"



const PortfolioDetails: FC = () => {
    const [vendorPortfolio, setVendorPortfolio] = useState<IVendorPortfolio>({
        _id: '',
        vendorId: { _id: '', brandSummary: '', companyName: '', contactPersonName: '', contactNumber: '', email: '' },
        portfolioName: '',
        housingType: '',
        images: [],
        description: '',
        designTheme: '',
        __v: 0,
    })

    const [bigImg, setBigImg] = useState('')


    const { portfolioid } = useParams();
    const SERVER = import.meta.env.VITE_SERVER;
    const portfolioUrl = urlcat(SERVER, `/portfolios/id/${portfolioid}`);


    useEffect(() => {
        axios
            .get(portfolioUrl)
            .then((res) => {
                setBigImg(res.data.images[0])
                setVendorPortfolio(res.data)

            })
            .catch((error) => console.log(error));
    }, [])

    const handleEnlarge = (e: any) => {
        setBigImg(e.target.src)
    }




    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: '10rem',
                mb: "10rem",
                pb: "0.5rem",
            }}
        >


            <Grid container sx={{ mt: '5rem', mb: '3rem' }}>
                <Grid item xs={12} >
                    <Typography variant="h3"
                        sx={{
                            borderBottom: 1,
                            borderBottomColor: "#444444",
                            mb: '3rem',
                            pb: '0.5rem'
                        }}
                    >{vendorPortfolio.portfolioName}
                    </Typography>
                </Grid>



                <Grid container spacing={6} sx={{ mb: '5rem' }}>

                    <Grid item xs={12} sm={6}  >
                        <img
                            src={bigImg}
                            alt='Hats'
                            style={{ width: '99%', marginBottom: '1rem', borderRadius: 15 }}
                        />
                        <Box sx={{ display: 'flex', gap: '3%', flexWrap: 'wrap', rowGap: '0.8rem' }}>
                            {vendorPortfolio.images.map((image, index) => (

                                <img
                                    key={index}
                                    src={image}
                                    alt={image}
                                    style={{ width: '31%', borderRadius: 15 }}
                                    onClick={handleEnlarge}
                                />
                            ))}
                        </Box>
                    </Grid>


                    <Grid item xs={12} sm={6} sx={{ mb: '5rem' }}>
                        <Grid container sx={{ mb: '2rem' }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>DESIGN THEME</Typography>
                                <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>{vendorPortfolio.designTheme}</Typography>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>HOUSING TYPE</Typography>
                                <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>{vendorPortfolio.housingType}</Typography>

                            </Grid>
                        </Grid>
                        <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>DESCRIPTION</Typography>
                        <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>{vendorPortfolio.description}</Typography>
                    </Grid>

                </Grid>



                <Grid container  >

                    <Grid item xs={12} >
                        <Typography variant="h3"
                            sx={{
                                borderBottom: 1,
                                borderBottomColor: "#444444",
                                mb: '3rem',
                                pb: '0.5rem'
                            }}
                        >Designer Profile
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ mb: '3rem' }}>
                        <Box>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>BRAND SUMMARY</Typography>
                            <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>{vendorPortfolio.vendorId.brandSummary}</Typography>
                        </Box>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>COMPANY NAME</Typography>
                            <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>{vendorPortfolio.vendorId.companyName}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>CONTACT PERSON</Typography>
                            <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>{vendorPortfolio.vendorId.contactPersonName}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>PHONE NUMBER</Typography>
                            <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>{vendorPortfolio.vendorId.contactNumber}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>EMAIL</Typography>
                            <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>{vendorPortfolio.vendorId.email}</Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>

        </Container>
    );
};

export default PortfolioDetails;
