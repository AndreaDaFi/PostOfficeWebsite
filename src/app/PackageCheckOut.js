import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grid, TextField, Button, Typography, Box, Paper, Card, CardContent, Divider } from '@mui/material';

export default function PackageCheckout() {
  // Access location state passed from the previous page
  const location = useLocation();
  const { totalPrice, packageData } = location.state || {};
  const navigate = useNavigate();

  // State to manage form input data
  const [formData, setFormData] = useState({
    paymentMethod: "card", // Default to 'card'
    cardHolder: "",
    cardNumber: "",
    expirationDate: "",
    cvv: ""
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleCheckout = (e) => {
    e.preventDefault();
    // Validate form data (you can add more validation logic as needed)
    if (!formData.cardHolder || !formData.cardNumber || !formData.expirationDate || !formData.cvv) {
      alert("Please fill in all card details.");
      return;
    }

    // Proceed with the checkout logic (e.g., submit to server or confirm payment)
    alert("Checkout complete!");
    navigate("/confirmation"); // Redirect to a confirmation page (for example)
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px" }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#D32F2F" }}>
          📦 Checkout Summary
        </Typography>

        {/* Receiver Information */}
        <Typography variant="h6" style={{ marginTop: "20px", fontWeight: "bold" }}>Receiver Information</Typography>
        <Typography>Name: {packageData.receiverFirstName} {packageData.receiverLastName}</Typography>
        <Typography>Address: {packageData.receiverStreet} {packageData.receiverApartment}, {packageData.receiverCity}, {packageData.receiverState} {packageData.receiverZip}</Typography>

        {/* Package Information */}
        <Typography variant="h6" style={{ marginTop: "20px", fontWeight: "bold" }}>Package Information</Typography>
        <Typography>Package Type: {packageData.packageType}</Typography>
        {packageData.packageType === "Box" && (
          <>
            <Typography>Weight: {packageData.weight} kg</Typography>
            <Typography>Size: {packageData.size}</Typography>
          </>
        )}
        <Typography>Fragile: {packageData.fragile ? "Yes" : "No"}</Typography>
        <Typography>Insurance: {packageData.insurance ? "Yes" : "No"}</Typography>
        <Typography>Service Type: {packageData.serviceType}</Typography>

        {/* Total Price */}
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "20px" }}>
          💲 Total: ${totalPrice}
        </Typography>

        {/* Payment Method */}
        <form onSubmit={handleCheckout}>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            {/* Payment Method (This will automatically be 'card') */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                variant="outlined"
                disabled // Make it read-only since it's automatically set to 'card'
              >
                <option value="card">Credit/Debit Card</option>
              </TextField>
            </Grid>

            {/* Card Information Fields */}
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

            {/* Complete Checkout Button */}
            <Box mt={2} textAlign="right">
              <Button type="submit" variant="contained" color="primary">
                Complete Checkout
              </Button>
            </Box>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
