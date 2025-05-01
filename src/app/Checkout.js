"use client"

import { useState, useContext, useEffect } from "react"
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

// Import icons if you have Material UI icons installed
// If not, we'll handle it without icons
let CreditCardIcon, ShieldIcon, RocketIcon
try {
  const Icons = require("@mui/icons-material")
  CreditCardIcon = Icons.CreditCard
  ShieldIcon = Icons.Shield
  RocketIcon = Icons.FlightTakeoff
} catch (error) {
  // Icons not available, we'll handle this case
}

const CheckoutPage = () => {
  const { user } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  const { cart, selectedPostOffice } = location.state || {
    cart: [],
    selectedPostOffice: null,
  }

  const [taxRate, setTaxRate] = useState(1.0825) // Default tax rate
  const [loading, setLoading] = useState(false)
  const [insurance, setInsurance] = useState(null)
  const [fast, setFast] = useState(null)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [stockError, setStockError] = useState(false)

  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolder: "",
  })

  const handleInsuranceChange = (e) => {
    const value = e.target.value === "Yes" ? 1 : 0
    setInsurance(value)
  }

  const handleFastChange = (e) => {
    const value = e.target.value === "Yes" ? 1 : 0
    setFast(value)
  }

  // Function to calculate the total price
  const calculateTotal = () => {
    let calculatedTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    if (insurance === 1) {
      calculatedTotal += 10 // Add $10 for insurance
    }

    if (fast === 1) {
      calculatedTotal += 12 // Add $12 for fast delivery
    }

    return calculatedTotal.toFixed(2)
  }

  useEffect(() => {
    setTotal(calculateTotal())
  }, [insurance, fast, cart])

  useEffect(() => {
    const fetchTaxRate = async () => {
      try {
        setLoading(true)
        console.log("origin address id:", user?.address_id)
        const response = await fetch(`https://final-po-api.vercel.app/api/GetTax?address_id=${user?.address_id}`)
        const tax = await response.json()

        if (tax) {
          setTaxRate(tax.data)
          console.log("tax rate: ", tax.data)
        } else {
          console.error("Tax rate not found in the API response")
        }
      } catch (error) {
        console.error("Error fetching tax rate:", error)
        setError("Failed to fetch tax rate. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchTaxRate()
  }, [user?.address_id])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setStockError(false)

    // Validate form
    if (!formData.cardHolder || !formData.cardNumber || !formData.expirationDate || !formData.cvv) {
      setError("Please fill in all payment details")
      setLoading(false)
      return
    }

    if (insurance === null || fast === null) {
      setError("Please select options for insurance and delivery speed")
      setLoading(false)
      return
    }

    // Prepare data to send
    const dataToSend = {
      cart: cart,
      customers_id: user?.customers_id,
      customers_address_id: user?.address_id,
      purchased_insurance: insurance,
      fast_delivery: fast,
      total_amount: (taxRate * Number.parseFloat(total)).toFixed(2),
      total_tax: ((taxRate - 1) * Number.parseFloat(total)).toFixed(2),
      po_id: selectedPostOffice,
    }

    try {
      const response = await fetch("https://final-po-api.vercel.app/api/ProcessStoreCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      const result = await response.json()

      // Check if the response indicates a stock issue (status 400 with success: false)
      if (response.status === 400 && result.success === false) {
        console.error("Stock error:", result.message)
        setStockError(true)
        setError(result.message || "Not enough stock available for one or more items in your cart.")
        setLoading(false)
        return
      }

      // Handle other error responses
      if (!response.ok || result.success === false) {
        console.error("Checkout failed:", result)
        setError(result.error || "Checkout failed. Please try again.")
        setLoading(false)
        return
      }

      // Success case
      console.log("Checkout successful:", result)
      setSuccess(true)
      setLoading(false)

      // If there are low stock items, we could show a warning, but we'll proceed with checkout
      if (result.lowStockItems && result.lowStockItems.length > 0) {
        console.log("Low stock items:", result.lowStockItems)
      }

      // Wait a moment before redirecting
      setTimeout(() => {
        navigate("/MyPackages")
      }, 2000)
    } catch (error) {
      console.error("Error during checkout:", error)
      setError("Something went wrong. Please try again later.")
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "40px", marginBottom: "40px" }}>
      {success ? (
        <Paper
          elevation={3}
          style={{
            padding: "32px",
            textAlign: "center",
            backgroundColor: "#f1f8e9",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" style={{ color: "#2E7D32", marginBottom: "16px" }}>
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for your purchase. Your order has been processed.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/MyPackages")}
            style={{ marginTop: "16px" }}
          >
            View My Packages
          </Button>
        </Paper>
      ) : (
        <>
          <Typography
            variant="h3"
            gutterBottom
            style={{
              fontWeight: 700,
              color: "#424242",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            Checkout
          </Typography>

          {stockError && (
            <Alert severity="warning" style={{ marginBottom: "24px" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Insufficient Stock Available
              </Typography>
              <Typography variant="body2">
                {error ||
                  "We apologize, but one or more items in your cart are currently out of stock or don't have enough quantity available. Please try again later or adjust the quantities in your cart."}
              </Typography>
            </Alert>
          )}

          {error && !stockError && (
            <Alert severity="error" style={{ marginBottom: "24px" }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={4}>
            {/* Checkout Form */}
            <Grid item xs={12} md={8}>
              <Card
                elevation={3}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "box-shadow 0.3s ease-in-out",
                }}
              >
                <Box
                  style={{
                    backgroundColor: "#D32F2F",
                    color: "white",
                    padding: "16px 24px",
                  }}
                >
                  <Typography variant="h5" style={{ fontWeight: 600 }}>
                    Payment Details
                  </Typography>
                </Box>
                <CardContent style={{ padding: "24px" }}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      marginBottom: "24px",
                      color: "#757575",
                      fontStyle: "italic",
                    }}
                  >
                    All items purchased will be sent to the address saved to this account
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Card Holder Name"
                          name="cardHolder"
                          variant="outlined"
                          fullWidth
                          value={formData.cardHolder}
                          onChange={handleInputChange}
                          required
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
                          InputProps={{
                            startAdornment: CreditCardIcon && (
                              <CreditCardIcon style={{ color: "#757575", marginRight: 8 }} />
                            ),
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Expiration Date (MM/YY)"
                          name="expirationDate"
                          variant="outlined"
                          fullWidth
                          value={formData.expirationDate}
                          onChange={handleInputChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="CVV"
                          name="cvv"
                          variant="outlined"
                          fullWidth
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </Grid>
                    </Grid>

                    <Box style={{ marginTop: "32px" }}>
                      <Typography variant="h6" gutterBottom style={{ color: "#424242" }}>
                        Additional Options
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="insurance-label">Insurance Protection</InputLabel>
                            <Select
                              labelId="insurance-label"
                              id="insurance"
                              value={insurance === null ? "" : insurance === 1 ? "Yes" : "No"}
                              onChange={handleInsuranceChange}
                              label="Insurance Protection"
                              required
                              startAdornment={ShieldIcon && <ShieldIcon style={{ color: "#757575", marginRight: 8 }} />}
                            >
                              <MenuItem value="">Select</MenuItem>
                              <MenuItem value="Yes">Yes (+$10.00)</MenuItem>
                              <MenuItem value="No">No</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="fast-label">Fast Delivery</InputLabel>
                            <Select
                              labelId="fast-label"
                              id="fast"
                              value={fast === null ? "" : fast === 1 ? "Yes" : "No"}
                              onChange={handleFastChange}
                              label="Fast Delivery"
                              required
                              startAdornment={RocketIcon && <RocketIcon style={{ color: "#757575", marginRight: 8 }} />}
                            >
                              <MenuItem value="">Select</MenuItem>
                              <MenuItem value="Yes">Yes (+$12.00)</MenuItem>
                              <MenuItem value="No">No</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        style={{
                          backgroundColor: "#D32F2F",
                          color: "white",
                          padding: "12px 32px",
                          fontWeight: 600,
                          borderRadius: "4px",
                        }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Complete Checkout"}
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Card
                elevation={3}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "box-shadow 0.3s ease-in-out",
                }}
              >
                <Box
                  style={{
                    backgroundColor: "#424242",
                    color: "white",
                    padding: "16px 24px",
                  }}
                >
                  <Typography variant="h5" style={{ fontWeight: 600 }}>
                    Order Summary
                  </Typography>
                </Box>
                <CardContent style={{ padding: 0 }}>
                  <Box style={{ padding: "24px" }}>
                    {/* Display Cart Items */}
                    {cart && cart.length > 0 ? (
                      cart.map((item, idx) => (
                        <Box
                          key={idx}
                          style={{
                            padding: "16px 0",
                            borderBottom: idx < cart.length - 1 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <Typography variant="body1" style={{ fontWeight: 500 }}>
                                {item.name} × {item.quantity}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" style={{ fontWeight: 600 }}>
                                ${(item.price * item.quantity).toFixed(2)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body1" style={{ padding: "16px 0", color: "#757575" }}>
                        No items in cart
                      </Typography>
                    )}

                    {/* Additional Services */}
                    {insurance === 1 && (
                      <Box style={{ padding: "16px 0", borderBottom: "1px solid #e0e0e0" }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item>
                            <Typography variant="body1" style={{ color: "#757575" }}>
                              Insurance Protection
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" style={{ fontWeight: 600 }}>
                              $10.00
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    {fast === 1 && (
                      <Box style={{ padding: "16px 0", borderBottom: "1px solid #e0e0e0" }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item>
                            <Typography variant="body1" style={{ color: "#757575" }}>
                              Fast Delivery
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" style={{ fontWeight: 600 }}>
                              $12.00
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>

                  {/* Totals */}
                  <Box
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "24px",
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <Grid container justifyContent="space-between" style={{ marginBottom: "8px" }}>
                      <Grid item>
                        <Typography variant="body1">Subtotal</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                          ${total}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between" style={{ marginBottom: "16px" }}>
                      <Grid item>
                        <Typography variant="body1">Tax</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                          ${((taxRate - 1) * Number.parseFloat(total)).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider style={{ margin: "16px 0" }} />

                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h6" style={{ fontWeight: 700 }}>
                          Total
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" style={{ fontWeight: 700, color: "#D32F2F" }}>
                          ${(taxRate * Number.parseFloat(total)).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}

export default CheckoutPage

