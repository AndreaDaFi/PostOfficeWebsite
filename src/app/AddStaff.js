import React from 'react';
import { Button, Typography } from '@mui/material';

const AddStore = () => {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Page so Managers can add a new staff member
      </Typography>
      {/* Add login form or content here */}
      <Button variant="contained" color="primary" onClick={() => alert('Employee Login')}>
        Login as Employee
      </Button>
    </div>
  );
};

export default AddStore;