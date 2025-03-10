import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const { cart } = location.state || {}; // Retrieve cart data from state

  // Function to calculate the total price
  const calculateTotal = () => {
    return cart?.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Checkout Submitted');
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Checkout
      </Typography>

      {/* Checkout Form */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Shipping Information
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      name="name"
                      variant="outlined"
                      fullWidth
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Address"
                      name="email"
                      variant="outlined"
                      fullWidth
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      name="address"
                      variant="outlined"
                      fullWidth
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="City"
                      name="city"
                      variant="outlined"
                      fullWidth
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Zip Code"
                      name="zipCode"
                      variant="outlined"
                      fullWidth
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6">Payment Method</Typography>
                    <TextField
                      label="Payment Method"
                      name="paymentMethod"
                      variant="outlined"
                      fullWidth
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>

                <Box mt={2} textAlign="right">
                  <Button type="submit" variant="contained" color="primary">
                    Complete Checkout
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Order Summary
              </Typography>
              <Divider />

              {/* Display Cart Items */}
              {cart?.map((item, idx) => (
                <Box my={2} key={idx}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">Price: {item.price}</Typography>
                </Box>
              ))}

              <Divider />

              {/* Total */}
              <Box my={2} textAlign="right">
                <Typography variant="h5">Total: ${calculateTotal()}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
