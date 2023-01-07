import { Container, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';


const Footer = () => {

    const nagivate = useNavigate()
    return (

        <Box
            sx={{ backgroundColor: "#254D71", mt: '10rem', pt: "5rem", pb: "5rem" }}
        >
            <Container sx={{ display: 'flex', justifyContent: 'center', }}>
                <Typography sx={{ width: 550, textAlign: 'center', color: 'white' }}>Idealify is a project management platform that allows interior designers to plan their projects and build accountability with clients.</Typography>
            </Container>

            <Container sx={{ display: 'flex', justifyContent: 'center', gap: '3rem', mt: '2rem' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <SocialIcon url="https://github.com/clovisfong" bgColor='white' />
                    <Typography sx={{ mt: '1rem', color: 'white', }}>Clovis</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <SocialIcon url="https://github.com/Kenzothd" bgColor='white' />
                    <Typography sx={{ mt: '1rem', color: 'white', }}>Kenzo</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <SocialIcon url="https://github.com/faithyeenxin" bgColor='white' />
                    <Typography sx={{ mt: '1rem', color: 'white', }}>Faith</Typography>
                </Box>
            </Container>



        </Box>

    )
}

export default Footer