import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container>
      {/* Header Section */}
      <Box my={4}>
        <Typography variant="h1" gutterBottom align="center">
          Welcome to CougarPost
        </Typography>
        <Typography variant="h6" color="textSecondary" align="center">
          We provide the best postal services for all your needs
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;