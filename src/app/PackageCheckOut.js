"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Grid, TextField, Button, Typography, Box, Paper, Divider, CircularProgress } from "@mui/material"
import { CreditCard, LocalShipping, Person, Receipt } from "@mui/icons-material"

export default function PackageCheckout() {
  // Access location state passed from the previous page
  const location = useLocation()
  const { totalPrice, payload } = location.state || {} // Destructure payload from location state
  const navigate = useNavigate()

  const [taxRate, setTaxRate] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch the tax rate from the API
  useEffect(() => {
    const fetchTaxRate = async () => {
      try {
        console.log("origin address id:", payload.origin_address_id)
        const response = await fetch(`https://apipost.vercel.app/api/GetTax?address_id=${payload.origin_address_id}`)
        const data = await response.json()

        if (data) {
          setTaxRate(data.data) // Set the tax rate from the API
          console.log("tax rate: ", data.data)
        } else {
          console.error("Tax rate not found in the API response")
        }
      } catch (error) {
        console.error("Error fetching tax rate:", error)
      } finally {
        setLoading(false) // Stop loading after API call is complete
      }
    }

    fetchTaxRate()
  }, []) // Run only on mount

  // State to manage form input data for payment
  const [formData, setFormData] = useState({
    paymentMethod: "card", // Default to 'card'
    cardHolder: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  })

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleCheckout = async (e) => {
    e.preventDefault()

    // Validate form data
    if (!formData.cardHolder || !formData.cardNumber || !formData.expirationDate || !formData.cvv) {
      alert("Please fill in all card details.")
      return
    }

    const checkoutData = { ...payload }

    try {
      const response = await fetch("https://apipost.vercel.app/api/PackageCheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Checkout successful:", result)

        // Get the tracking number from the API response if available
        // If not available in the response, we'll need to make another API call to get it
        let trackingNumber

        if (result.tracking_number) {
          trackingNumber = result.tracking_number
        } else {
          // If tracking number is not in the response, we could make another API call here
          // For now, we'll use a placeholder
          trackingNumber = `USPS${payload.po_id}${Date.now().toString().slice(-8)}`
        }

        alert("Checkout successful.")
        navigate("/shipinglabel", {
          state: {
            payload: {
              ...payload,
              tracking_number: trackingNumber,
            },
            taxRate,
            total: (payload.base_price * taxRate).toFixed(2),
          },
        })
      } else {
        const errorResult = await response.json()
        console.error("Checkout failed:", errorResult)
        alert("Checkout failed. Please try again.")
      }
    } catch (error) {
      console.error("Error during checkout:", error)
      alert("Something went wrong. Please try again later.")
    }
  }

  // Conditional rendering - Show loading message if still loading
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
              color: "white",
              p: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.05,
                backgroundImage:
                  'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fillOpacity="1" fillRule="evenodd"/%3E%3C/svg%3E\')',
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold">
                Checkout Summary
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress sx={{ color: "#D32F2F", mr: 2 }} />
            <Typography variant="h6">Loading checkout information...</Typography>
          </Box>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Header with gradient background */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
            color: "white",
            p: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fillOpacity="1" fillRule="evenodd"/%3E%3C/svg%3E\')',
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold">
              Checkout Summary
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Receiver Information */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Person sx={{ color: "#B71C1C", mr: 1 }} />
            <Typography variant="h6" fontWeight="bold" color="#B71C1C">
              Receiver Information
            </Typography>
          </Box>
          <Box sx={{ pl: 4, mb: 3 }}>
            <Typography variant="body1" fontWeight="medium">
              {payload.receiver_name}
            </Typography>
            <Typography variant="body1">
              {payload.street} {payload.apt && `Apt ${payload.apt}`}, {payload.city_name},{" "}
              {payload.state_id.toUpperCase()} {payload.zip}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Package Information */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocalShipping sx={{ color: "#B71C1C", mr: 1 }} />
            <Typography variant="h6" fontWeight="bold" color="#B71C1C">
              Package Information
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ pl: 4, mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Package Type:</strong> {payload.type.charAt(0).toUpperCase() + payload.type.slice(1)}
              </Typography>
              {payload.type === "box" && (
                <>
                  <Typography variant="body1">
                    <strong>Weight:</strong> {payload.weight} kg
                  </Typography>
                  <Typography variant="body1">
                    <strong>Size:</strong> {payload.size.toUpperCase()}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Fragile:</strong> {payload.fragile === 1 ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1">
                <strong>Insurance:</strong> {payload.purchased_insurance === 1 ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1">
                <strong>Fast Delivery:</strong> {payload.fast_delivery === 1 ? "Yes" : "No"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Total Price Breakdown */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Receipt sx={{ color: "#B71C1C", mr: 1 }} />
            <Typography variant="h6" fontWeight="bold" color="#B71C1C">
              Price Breakdown
            </Typography>
          </Box>
          <Box
            sx={{
              p: 3,
              bgcolor: "#FFEBEE",
              borderRadius: 2,
              border: "1px solid #FFCDD2",
              mb: 3,
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="medium">
                  Subtotal:
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Typography variant="body1" fontWeight="medium">
                  ${payload.base_price}
                </Typography>
              </Grid>

              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="medium">
                  Tax ({((taxRate - 1) * 100).toFixed(1)}%):
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Typography variant="body1" fontWeight="medium">
                  ${(payload.base_price * (taxRate - 1)).toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={8}>
                <Typography variant="h6" fontWeight="bold" color="#B71C1C">
                  Total:
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Typography variant="h6" fontWeight="bold" color="#B71C1C">
                  ${(payload.base_price * taxRate).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Payment Method */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <CreditCard sx={{ color: "#B71C1C", mr: 1 }} />
            <Typography variant="h6" fontWeight="bold" color="#B71C1C">
              Payment Information
            </Typography>
          </Box>

          <form onSubmit={handleCheckout}>
            <Grid container spacing={3}>
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
                  SelectProps={{
                    native: true,
                  }}
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
                  label="Expiration Date (MM-YY)"
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
            </Grid>

            {/* Complete Checkout Button */}
            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  py: 1.5,
                  px: 4,
                  bgcolor: "#B71C1C",
                  "&:hover": { bgcolor: "#8B0000" },
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                Complete Checkout
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

