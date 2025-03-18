import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EmpDashboard = () => {
  return (
    <Container style={{ marginTop: 20 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Employee Dashboard
        </Typography>
      </Box>
    </Container>
  );
};

export default EmpDashboard;
