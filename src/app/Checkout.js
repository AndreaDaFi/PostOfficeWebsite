import React, { useState, useContext, useEffect } from "react";
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
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const [taxRate, setTaxRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const cart = location.state?.cart || [];

  useEffect(() => {
      const fetchTaxRate = async () => {
        try {
          console.log("origin address id:", user.address_id);
          const response = await fetch(
            `https://vercel-api-powebapp.vercel.app/api/GetTax?address_id=${user.address_id}`
          );
          const tax = await response.json();
  
          if (tax) {
            setTaxRate(tax.data);
            console.log("tax rate: ", tax.data);
          } else {
            console.error("Tax rate not found in the API response");
          }
        } catch (error) {
          console.error("Error fetching tax rate:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTaxRate();
    }, []);

  // Function to calculate the total price
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolder: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Checkout Submitted");
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Checkout
      </Typography>

      {/* Checkout Form */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                All items purchased will be sent to the address saved to this
                account
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
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
                </Grid>

                <Box mt={2} textAlign="right">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#d32f2f",
                      "&:hover": { backgroundColor: "#c62828" },
                    }}
                  >
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
                  <Typography variant="h6">
                    {item.name} x{item.quantity}
                  </Typography>
                  <Typography variant="body2">Price: {item.price}</Typography>
                </Box>
              ))}

              <Divider />

              {/* Total */}
              <Box my={2} textAlign="right">
                <Typography variant="h5">subtotal: ${calculateTotal()}</Typography>
                <Typography variant="h5">tax: ${((taxRate-1)*calculateTotal()).toFixed(2)}</Typography>
                <Typography variant="h5">total (with tax): ${((taxRate)*calculateTotal()).toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
