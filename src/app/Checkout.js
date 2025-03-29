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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const [taxRate, setTaxRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { cart, selectedPostOffice } = location.state || {};
  const [insurance, setInsurance] = useState(null); //either 1 or 0, they do or dont purchase insurance
  const [fast, setFast] = useState(null); //either 1 or 0, the do or dont chose fast delivery
  const [total, setTotal] = useState(0);

  const handleInsuranceChange = (e) => {
    const value = e.target.value === "Yes" ? 1 : 0;
    setInsurance(value);
  };
  const handleFastChange = (e) => {
    const value = e.target.value === "Yes" ? 1 : 0;
    setFast(value);
  };

  useEffect(() => {
    const fetchTaxRate = async () => {
      try {
        console.log("origin address id:", user.address_id);
        const response = await fetch(
          ` https://apipost.vercel.app/api/GetTax?address_id=${user.address_id}`
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
    let calculatedTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    if (insurance === 1) {
      calculatedTotal += 10; // Add $10 for insurance
    }

    if (fast === 1) {
      calculatedTotal += 12; // Add $12 for fast delivery
    }

    return calculatedTotal.toFixed(2); // Return the total as a string with 2 decimal places
  };

  useEffect(() => {
    setTotal(calculateTotal()); // Update total whenever insurance or fast changes
  }, [insurance, fast, cart]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare cart data
    const cart = location.state?.cart || [];
    const dataToSend = {
      cart: cart,
      customers_id: user.customers_id,
      customers_address_id: user.address_id,
      purchased_insurance: insurance,
      fast_delivery: fast,
      total_amount: (taxRate * total).toFixed(2),
      total_tax: ((taxRate - 1) * total).toFixed(2),
      po_id: selectedPostOffice,
    };

    try {
      const response = await fetch(" https://apipost.vercel.app/api/ProcessStoreCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Checkout Submitted");
        // Optionally handle any response data if needed
      } else {
        console.error("Error during checkout submission");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
                <FormControl fullWidth margin="normal">
                  <InputLabel id="insurance-label">
                    Do you want insurance? (additional $10 charge)
                  </InputLabel>
                  <Select
                    labelId="insurance-label"
                    id="insurance"
                    value={
                      insurance === null ? "" : insurance === 1 ? "Yes" : "No"
                    }
                    onChange={handleInsuranceChange}
                    label="Do you want insurance?"
                    sx={{
                      backgroundColor: "white", // Set background color to white
                      "&:hover": {
                        backgroundColor: "#f5f5f5", // Light gray background on hover
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d32f2f", // Border color to UH red
                        },
                        "&:hover fieldset": {
                          borderColor: "#c62828", // On hover, change the border color
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#d32f2f", // Label color to UH red
                      },
                    }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>

                {/* Fast Delivery Dropdown */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="fast-label">
                    Do you want fast delivery? (additional $12 charge)
                  </InputLabel>
                  <Select
                    labelId="fast-label"
                    id="fast"
                    value={fast === null ? "" : fast === 1 ? "Yes" : "No"}
                    onChange={handleFastChange}
                    label="Do you want fast delivery?"
                    sx={{
                      backgroundColor: "white", // Set background color to white
                      "&:hover": {
                        backgroundColor: "#f5f5f5", // Light gray background on hover
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d32f2f", // Border color to UH red
                        },
                        "&:hover fieldset": {
                          borderColor: "#c62828", // On hover, change the border color
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#d32f2f", // Label color to UH red
                      },
                    }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>

                {/* Optionally you can have a submit button */}
                <button type="submit">Submit</button>

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
                <Typography variant="h5">
                  subtotal: ${total}
                </Typography>
                <Typography variant="h5">
                  tax: ${((taxRate - 1) * total).toFixed(2)}
                </Typography>
                <Typography variant="h5">
                  total (with tax): ${(taxRate * total).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
