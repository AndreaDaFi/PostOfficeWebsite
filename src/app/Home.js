import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Cougar from '../components/Cougar.png';

const Home = () => {
  return (
    <Container>
      {/* Header Section */}
      <Box my={4}>
        <Typography variant="h1" gutterBottom align="center">
          Welcome to...
        </Typography>

        {/*Cougar Post logo*/}
        <figure style={{ textAlign: 'center' }}>
            <img 
              src={Cougar} 
              alt="Logo" 
              className="hover-image"  // Add the hover-image class here
              style={{ 
              maxWidth: '600px', 
              height: 'auto', 
              display: 'block', 
              margin: '0 auto',
              transition: 'transform 0.3s ease-in-out'  // Move transition into inline styles
          }} />
          <figcaption style={{ fontSize: '12px', color: '#555', marginTop: '8px' }}>
            Reference image: 
          <a 
            href="https://www.dreamstime.com/cougar-growling-close-up-mountain-lion-image220929865" 
            style={{ color: '#D32F2F' }} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            here
          </a>
          </figcaption>
        </figure>

        <style jsx>{`.hover-image:hover {transform: translateY(-25px);`}</style>

        <Box my={4}></Box>
        <Typography variant="h6" color="textSecondary" align="center">
          We provide the best postal services for all your needs
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;