import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "Credit Card",
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.price.replace("$", "")), 0)
      .toFixed(2);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
      setError("⚠ Please fill in all required fields.");
      return;
    }

    if (formData.paymentMethod === "Credit Card" && (!formData.cardholderName || !formData.cardNumber || !formData.expirationDate || !formData.cvv)) {
      setError("⚠ Please enter your credit card details.");
      return;
    }

    setError(null);
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px", paddingBottom: "30px" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#D32F2F" }}>
        🛒 Checkout
      </Typography>

      <Grid container spacing={3}>
        {/* Checkout Form */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Shipping Information 📦
              </Typography>
              <Divider sx={{ marginBottom: "15px" }} />

              {error && <Alert severity="error" sx={{ marginBottom: "15px" }}>{error}</Alert>}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Payment Method Selection */}
                  <Grid item xs={12}>
                    <Typography variant="h6">Payment Method 💳</Typography>
                    <RadioGroup name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                      <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
                      <FormControlLabel value="Cash on Delivery" control={<Radio />} label="Cash on Delivery" />
                    </RadioGroup>
                  </Grid>

                  {/* Show Credit Card Fields ONLY if "Credit Card" is Selected */}
                  {formData.paymentMethod === "Credit Card" && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          label="Cardholder Name"
                          name="cardholderName"
                          variant="outlined"
                          fullWidth
                          required
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Card Number"
                          name="cardNumber"
                          variant="outlined"
                          fullWidth
                          required
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
                          required
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
                          required
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>

                <Box mt={3} textAlign="center">
                  <Button type="submit" variant="contained" color="primary" size="large">
                    ✅ Complete Checkout
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Order Summary 🛍
              </Typography>
              <Divider sx={{ marginBottom: "15px" }} />

              {cart.length > 0 ? (
                cart.map((item, idx) => (
                  <Box key={idx} my={2}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">Price: {item.price}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No items in the cart.
                </Typography>
              )}

              <Divider sx={{ marginBottom: "10px" }} />

              {/* Total */}
              <Box my={2} textAlign="right">
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#D32F2F" }}>
                  Total: ${calculateTotal()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Order Confirmation Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          🎉 Order Placed Successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CheckoutPage;
