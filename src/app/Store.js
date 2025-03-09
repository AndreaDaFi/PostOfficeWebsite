import React from 'react';
import { Button, Typography } from '@mui/material';

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Store
      </Typography>
      {/* Add content or information here */}
      <Button variant="contained" color="primary" onClick={() => alert('Welcome to Home')}>
        Go to Home
      </Button>
    </div>
  );
};

export default Home;