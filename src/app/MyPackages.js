import React from 'react';
import { Button, Typography } from '@mui/material';

const EmpLogin = () => {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Page so customers can view all of their packages and their current status
      </Typography>
      {/* Add login form or content here */}
      <Button variant="contained" color="primary" onClick={() => alert('Employee Login')}>
        Login as Employee
      </Button>
    </div>
  );
};

export default EmpLogin;