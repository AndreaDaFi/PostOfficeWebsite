import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

export default function PackageCheckout() {
  // Access location state passed from the previous page
  const location = useLocation();
  const { totalPrice, payload } = location.state || {}; // Destructure payload from location state
  const navigate = useNavigate();

  const [taxRate, setTaxRate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the tax rate from the API
  useEffect(() => {
    const fetchTaxRate = async () => {
      try {
        console.log("origin address id:", payload.origin_address_id);
        const response = await fetch(
          `http://localhost:3000/api/GetTax?address_id=${payload.origin_address_id}`
        );
        const data = await response.json();

        if (data) {
          setTaxRate(data.data); // Set the tax rate from the API
          console.log("tax rate: ", data.data);
        } else {
          console.error("Tax rate not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching tax rate:", error);
      } finally {
        setLoading(false); // Stop loading after API call is complete
      }
    };

    fetchTaxRate();
  }, []); // Run only on mount

  // State to manage form input data for payment
  const [formData, setFormData] = useState({
    paymentMethod: "card", // Default to 'card'
    cardHolder: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
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
  const handleCheckout = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.cardHolder ||
      !formData.cardNumber ||
      !formData.expirationDate ||
      !formData.cvv
    ) {
      alert("Please fill in all card details.");
      return;
    }

    const checkoutData = {...payload};

    try {
      const response = await fetch("https://vercel-api-powebapp.vercel.app/api/PackageCheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Checkout successful:", result);

        alert("Checkout successful.");
        navigate("/Home");
      } else {
        const errorResult = await response.json();
        console.error("Checkout failed:", errorResult);
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Conditional rendering - Show loading message if still loading
  if (loading) {
    return (
      <Container
        maxWidth="md"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px" }}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ fontWeight: "bold", color: "#D32F2F" }}
          >
            Checkout Summary
          </Typography>
          <Typography>Loading...</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px" }}>
        <Typography
          variant="h5"
          gutterBottom
          style={{ fontWeight: "bold", color: "#D32F2F" }}
        >
          Checkout Summary
        </Typography>

        {/* Receiver Information */}
        <Typography
          variant="h6"
          style={{ marginTop: "20px", fontWeight: "bold" }}
        >
          Receiver Information
        </Typography>
        <Typography>Receiver name: {payload.receiver_name}</Typography>
        <Typography>
          Address: {payload.street} {payload.apt}, {payload.city_name},{" "}
          {payload.state_id} {payload.zip}
        </Typography>

        {/* Package Information */}
        <Typography
          variant="h6"
          style={{ marginTop: "20px", fontWeight: "bold" }}
        >
          Package Information
        </Typography>
        <Typography>Package Type: {payload.type}</Typography>
        {payload.type === "Box" && (
          <>
            <Typography>Weight: {payload.weight} kg</Typography>
            <Typography>Size: {payload.size}</Typography>
          </>
        )}
        <Typography>Fragile: {payload.fragile === 1 ? "Yes" : "No"}</Typography>
        <Typography>
          Insurance: {payload.purchased_insurance === 1 ? "Yes" : "No"}
        </Typography>
        <Typography>
          Fast Delivery: {payload.fast_delivery === 1 ? "Yes" : "No"}
        </Typography>
        <Typography>Post Office ID: {payload.po_id}</Typography>

        {/* Total Price Breakdown */}
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "20px" }}
        >
          subtotal: $ {payload.base_price}+
        </Typography>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "20px" }}
        >
          tax: ${(payload.base_price * (taxRate - 1)).toFixed(2)} +
        </Typography>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "10px" }}
        >
          total (with tax): $ {(payload.base_price * taxRate).toFixed(2)}
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
              <Button
                type="submit"
                variant="contained"
                sx={{ color: "#ffffff", backgroundColor: "#D32F2F" }}
                style={{ marginTop: "15px" }}
              >
                Complete Checkout
              </Button>
            </Box>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
