import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';

// Example data - in a real app, you would fetch this data from an API
const mockPackages = [
  { id: 1, trackingNumber: '123456', status: 'Shipped', deliveryDate: '2025-03-15' },
  { id: 2, trackingNumber: '654321', status: 'In Transit', deliveryDate: '2025-03-18' },
  { id: 3, trackingNumber: '789012', status: 'Delivered', deliveryDate: '2025-03-05' },
];

const MyPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch or set packages data (using mock data for now)
    setPackages(mockPackages);
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h2" gutterBottom>
          Your Packages
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {packages.length === 0 ? (
          <>
            {/* Adding a Box with margin-top */}
            <Box my={2}>
              <Typography variant="h4" color="textSecondary">
                You have no packages to display.
              </Typography>
            </Box>
          </>
        ) : (
          packages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tracking Number: {pkg.trackingNumber}
                  </Typography>
                  <Typography variant="body1">Status: {pkg.status}</Typography>
                  <Typography variant="body2">Delivery Date: {pkg.deliveryDate}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" sx={{ color: '#D32F2F' }}>
                    Track Package
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default MyPackages;