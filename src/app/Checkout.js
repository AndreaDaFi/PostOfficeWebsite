import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const cart = location.state?.cart || []; // ✅ Ensure cart is always an array

  // Function to calculate the total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0).toFixed(2);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card', // Default to 'card'
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolder: '',
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
                      label="First Name"
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      variant="outlined"
                      fullWidth
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
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

                  {/* Payment Method (default to 'card') */}
                  <Grid item xs={12}>
                    <Typography variant="h6">Payment Method</Typography>
                    <TextField
                      label="Payment Method (Card)"
                      name="paymentMethod"
                      variant="outlined"
                      fullWidth
                      value={formData.paymentMethod}
                      disabled // Make it disabled since it’s always set to 'card'
                    />
                  </Grid>

                  {/* Card Information Fields */}
                  {formData.paymentMethod.toLowerCase() === 'card' && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          label="Card Holder Name"
                          name="cardHolder"
                          variant="outlined"
                          fullWidth
                          value={formData.cardHolder}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Card Number"
                          name="cardNumber"
                          variant="outlined"
                          fullWidth
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Expiration Date (MM/YY)"
                          name="expirationDate"
                          variant="outlined"
                          fullWidth
                          value={formData.expirationDate}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="CVV"
                          name="cvv"
                          variant="outlined"
                          fullWidth
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </>
                  )}
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
              {cart.map((item, idx) => (
                <Box my={2} key={idx}>
                  <Typography variant="h6">{item.name} x{item.quantity}</Typography>
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
