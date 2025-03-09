import React from 'react';
import { Button, Typography } from '@mui/material';

const CustLogin = () => {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Customer Login
      </Typography>
      {/* Add login form or content here */}
      <Button variant="contained" color="primary" onClick={() => alert('Customer Login')}>
        Login as Customer
      </Button>
    </div>
  );
};

export default CustLogin;