import { Grid, ImageList, ImageListItem, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import urlcat from "urlcat";

const PortfolioDetails = () => {

    const [bigImg, setBigImg] = useState('https://images.unsplash.com/photo-1551782450-a2132b4ba21d')
    const [vendorPortfolio, setVendorPortfolio] = useState({})

    const { portfolioid } = useParams()
    const SERVER = import.meta.env.VITE_SERVER;
    const portfolioUrl = urlcat(SERVER, `/portfolios/id/${portfolioid}`);

    useEffect(() => {
        axios
            .get(portfolioUrl)
            .then((res) => console.log(res.data))
            .catch((error) => console.log(error));
    }, [])

    const handleEnlarge = (e: any) => {
        setBigImg(e.target.src)
    }


    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
        },]

    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: "5rem",
                mb: "5rem",
                pr: "2rem",
                pl: "2rem",

            }}
        >


            <Grid container spacing={6} sx={{ mb: '5rem' }}>

                <Grid item xs={12} >
                    <Typography variant="h3"
                        sx={{
                            borderBottom: 1,
                            borderBottomColor: "#444444",
                            mb: '1rem',
                            pb: '0.5rem'
                        }}
                    >Portfolio Details
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}  >
                    <img
                        src={bigImg}
                        alt='Hats'
                        style={{ width: '99%', marginBottom: '1rem', borderRadius: 15 }}
                    />
                    <Box sx={{ display: 'flex', gap: '3%', flexWrap: 'wrap', rowGap: '0.8rem' }}>
                        {itemData.map((item, index) => (

                            <img
                                key={index}
                                src={item.img}
                                alt={item.title}
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
                            <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>Minimalist</Typography>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>HOUSING TYPE</Typography>
                            <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>Detached House</Typography>

                        </Grid>
                    </Grid>
                    <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>DESCRIPTION</Typography>
                    <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>Minimal to the max</Typography>

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
                        <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>Best designer in Batam, coming to SG NOW</Typography>
                    </Box>
                </Grid>

                <Grid container spacing={4}>


                    <Grid item xs={12} sm={6}>
                        <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>COMPANY NAME</Typography>
                        <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>Best designer in Batam, coming to SG NOW</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>CONTACT PERSON</Typography>
                        <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>Best designer in Batam, coming to SG NOW</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>PHONE NUMBER</Typography>
                        <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>Best designer in Batam, coming to SG NOW</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant='body2' sx={{ mb: '0.5rem', color: '#444444' }}>EMAIL</Typography>
                        <Typography variant='h5' sx={{ mb: '0.5rem', color: '#444444' }}>Best designer in Batam, coming to SG NOW</Typography>
                    </Grid>


                </Grid>

            </Grid>
        </Container >
    )
}

export default PortfolioDetails