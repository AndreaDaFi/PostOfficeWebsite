"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material"
import {
  Print,
  Close,
  CheckCircle,
  LocalPostOffice,
  WarningAmber,
  FlashOn,
  QrCode2,
  ShieldOutlined,
} from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"

export default function PackageCheckout() {
  // Access location state passed from the previous page
  const location = useLocation()
  const { totalPrice, payload } = location.state || {} // Destructure payload from location state
  const navigate = useNavigate()

  const [taxRate, setTaxRate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const [packageInfo, setPackageInfo] = useState(null)
  const [showSticker, setShowSticker] = useState(false)

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

  // Fetch package information after checkout
  const fetchPackageInfo = async (customerId) => {
    try {
      const response = await fetch("https://apipost.vercel.app/api/getCustomerPackages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id: customerId }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success && result.packages.length > 0) {
          // Get the most recent package (assuming it's the one just created)
          setPackageInfo(result.packages[result.packages.length - 1])
          return result.packages[result.packages.length - 1]
        }
      }
      return null
    } catch (error) {
      console.error("Error fetching package info:", error)
      return null
    }
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

        // Set checkout as complete
        setCheckoutComplete(true)

        // Fetch package information for the sticker
        const packageData = await fetchPackageInfo(payload.customers_id || 1) // Use customer ID from payload or default to 1

        if (packageData) {
          setShowSticker(true)
        } else {
          alert("Checkout successful, but couldn't retrieve package information for the sticker.")
        }
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

  const handlePrintSticker = () => {
    const stickerContent = document.getElementById("package-sticker")
    const printWindow = window.open("", "_blank")

    printWindow.document.write(`
      <html>
        <head>
          <title>Package Sticker</title>
          <style>
            @page { size: 4in 6in; margin: 0; }
            body { 
              font-family: Arial, sans-serif; 
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            .sticker-container {
              width: 100%;
              height: 100%;
              padding: 0.25in;
              box-sizing: border-box;
            }
            .sticker { 
              border: 2px solid #000; 
              padding: 15px; 
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              position: relative;
              background-color: white;
            }
            .header { 
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 2px solid #D32F2F;
            }
            .logo {
              display: flex;
              align-items: center;
            }
            .logo-text {
              font-size: 24px;
              font-weight: bold;
              color: #D32F2F;
              margin-left: 10px;
            }
            .office-info {
              text-align: right;
            }
            .office-id {
              font-weight: bold;
            }
            .address-box {
              border: 1px solid #ddd;
              padding: 10px;
              margin-bottom: 15px;
              background-color: #f8f8f8;
            }
            .address-title {
              font-weight: bold;
              margin-bottom: 5px;
              color: #D32F2F;
            }
            .receiver-name {
              font-size: 18px;
              font-weight: bold;
            }
            .package-details {
              border: 1px solid #ddd;
              padding: 10px;
              background-color: #f8f8f8;
            }
            .details-title {
              font-weight: bold;
              margin-bottom: 5px;
              color: #D32F2F;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            .detail-label {
              font-weight: bold;
            }
            .special-tags {
              margin-top: 10px;
            }
            .tag {
              display: flex;
              align-items: center;
              margin-bottom: 5px;
            }
            .tag-text {
              font-weight: bold;
              margin-left: 5px;
            }
            .fragile {
              color: #D32F2F;
            }
            .priority {
              color: #1976D2;
            }
            .insured {
              color: #388E3C;
            }
            .tracking-section {
              border: 1px solid #ddd;
              padding: 10px;
              margin-top: 15px;
              background-color: #f8f8f8;
              text-align: center;
            }
            .tracking-title {
              font-weight: bold;
              margin-bottom: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .tracking-number {
              font-size: 18px;
              font-weight: bold;
              letter-spacing: 1px;
            }
            .barcode {
              margin-top: 10px;
              padding: 5px;
              border: 1px solid #000;
              background-color: #fff;
              font-family: monospace;
              font-size: 24px;
              letter-spacing: 2px;
            }
            .qr-code {
              margin-top: 10px;
              text-align: center;
            }
            .qr-code img {
              width: 100px;
              height: 100px;
            }
            .special-handling {
              margin-top: 15px;
              padding: 10px;
              text-align: center;
              font-weight: bold;
              font-size: 18px;
            }
            .fragile-handling {
              border: 2px dashed #D32F2F;
              color: #D32F2F;
              background-color: rgba(211, 47, 47, 0.05);
            }
            .priority-handling {
              border: 2px solid #1976D2;
              color: #1976D2;
              background-color: rgba(25, 118, 210, 0.05);
            }
            .grid-container {
              display: grid;
              grid-template-columns: 60% 40%;
              gap: 15px;
            }
            .full-width {
              grid-column: 1 / -1;
            }
          </style>
        </head>
        <body>
          <div class="sticker-container">
            <div class="sticker">
              <!-- Logo and Header -->
              <div class="header">
                <div class="logo">
                  <div class="logo-text">POST OFFICE</div>
                </div>
                <div class="office-info">
                  <div class="office-id">Office #: ${payload.po_id}</div>
                  <div>${new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <!-- Main Content -->
              <div class="grid-container">
                <!-- Left Column - Addresses -->
                <div>
                  <!-- To Address -->
                  <div class="address-box">
                    <div class="address-title">DELIVER TO:</div>
                    <div class="receiver-name">${payload.receiver_name}</div>
                    <div>${payload.street} ${payload.apt}</div>
                    <div>${payload.city_name}, ${payload.state_id} ${payload.zip}</div>
                  </div>

                  <!-- From Address -->
                  <div class="address-box">
                    <div class="address-title">FROM:</div>
                    <div class="detail-label">Post Office #${payload.po_id}</div>
                  </div>
                </div>

                <!-- Right Column - Package Details -->
                <div class="package-details">
                  <div class="details-title">PACKAGE DETAILS:</div>

                  <div class="detail-row">
                    <div class="detail-label">Type:</div>
                    <div>${payload.type}</div>
                  </div>

                  ${
                    payload.type === "Box"
                      ? `
                    <div class="detail-row">
                      <div class="detail-label">Weight:</div>
                      <div>${payload.weight} kg</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">Size:</div>
                      <div>${payload.size}</div>
                    </div>
                  `
                      : ""
                  }

                  ${
                    packageInfo
                      ? `
                    <div class="detail-row">
                      <div class="detail-label">Status:</div>
                      <div>${packageInfo.status}</div>
                    </div>
                  `
                      : ""
                  }

                  <div class="special-tags">
                    ${
                      payload.fragile === 1
                        ? `
                      <div class="tag">
                        <div class="tag-text fragile">FRAGILE</div>
                      </div>
                    `
                        : ""
                    }

                    ${
                      payload.fast_delivery === 1
                        ? `
                      <div class="tag">
                        <div class="tag-text priority">PRIORITY DELIVERY</div>
                      </div>
                    `
                        : ""
                    }

                    ${
                      payload.purchased_insurance === 1
                        ? `
                      <div class="tag">
                        <div class="tag-text insured">INSURED</div>
                      </div>
                    `
                        : ""
                    }
                  </div>
                </div>

                <!-- Tracking Number and Barcode -->
                <div class="tracking-section full-width">
                  <div class="tracking-title">
                    <div style="margin-right: 5px;">TRACKING NUMBER</div>
                  </div>

                  ${
                    packageInfo
                      ? `
                    <div class="tracking-number">${packageInfo.tracking_number}</div>

                    <div class="barcode">${generateBarcodeDisplay(packageInfo.tracking_number)}</div>
                    
                    <div class="qr-code">
                      <img src="/qr-code.png" alt="QR Code" />
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>

              <!-- Special Handling Instructions -->
              ${
                payload.fragile === 1 || payload.fast_delivery === 1
                  ? `
                <div class="special-handling ${payload.fragile === 1 ? "fragile-handling" : "priority-handling"}">
                  ${payload.fragile === 1 ? "FRAGILE - HANDLE WITH CARE" : "PRIORITY - EXPEDITED DELIVERY"}
                </div>
              `
                  : ""
              }
            </div>
          </div>
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  const handleCloseSticker = () => {
    setShowSticker(false)
    navigate("/Mypackages")
  }

  // Generate a random tracking barcode for display purposes
  const generateBarcodeDisplay = (trackingNumber) => {
    if (!trackingNumber) return ""

    // Create a visual representation of a barcode using characters
    const chars = "▮▯"
    let result = ""

    for (let i = 0; i < trackingNumber.length; i++) {
      const code = trackingNumber.charCodeAt(i) % 2
      result += chars[code].repeat(2)
    }

    return result
  }

  // Conditional rendering - Show loading message if still loading
  if (loading) {
    return (
      <Container maxWidth="md" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px" }}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#D32F2F" }}>
            Checkout Summary
          </Typography>
          <Typography>Loading...</Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px" }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#D32F2F" }}>
          Checkout Summary
        </Typography>

        {/* Receiver Information */}
        <Typography variant="h6" style={{ marginTop: "20px", fontWeight: "bold" }}>
          Receiver Information
        </Typography>
        <Typography>Receiver name: {payload.receiver_name}</Typography>
        <Typography>
          Address: {payload.street} {payload.apt}, {payload.city_name}, {payload.state_id} {payload.zip}
        </Typography>

        {/* Package Information */}
        <Typography variant="h6" style={{ marginTop: "20px", fontWeight: "bold" }}>
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
        <Typography>Insurance: {payload.purchased_insurance === 1 ? "Yes" : "No"}</Typography>
        <Typography>Fast Delivery: {payload.fast_delivery === 1 ? "Yes" : "No"}</Typography>
        <Typography>Post Office ID: {payload.po_id}</Typography>

        {/* Total Price Breakdown */}
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "20px" }}>
          subtotal: $ {payload.base_price}+
        </Typography>
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "20px" }}>
          tax: ${(payload.base_price * (taxRate - 1)).toFixed(2)} +
        </Typography>
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "10px" }}>
          total (with tax): $ {(payload.base_price * taxRate).toFixed(2)}
        </Typography>

        {/* Payment Method */}
        {!checkoutComplete && (
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

              {/* Complete Checkout Button */}
              <Grid item xs={12}>
                <Box textAlign="right">
                  <Button type="submit" variant="contained" sx={{ color: "#ffffff", backgroundColor: "#D32F2F" }}>
                    Complete Checkout
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}

        {/* Package Sticker Dialog */}
        <Dialog open={showSticker} onClose={handleCloseSticker} maxWidth="md" fullWidth>
          <DialogContent sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <CheckCircle color="success" sx={{ fontSize: 40, mr: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Payment Successful! Here's your shipping label
              </Typography>
            </Box>

            <div
              id="package-sticker"
              style={{
                border: "2px solid #000",
                borderRadius: "8px",
                padding: "20px",
                position: "relative",
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {/* Logo and Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  pb: 2,
                  borderBottom: "2px solid #D32F2F",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalPostOffice sx={{ color: "#D32F2F", fontSize: 36, mr: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#D32F2F" }}>
                    POST OFFICE
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Office #: {payload.po_id}
                  </Typography>
                  <Typography variant="body2">{new Date().toLocaleDateString()}</Typography>
                </Box>
              </Box>

              {/* Main Content */}
              <Grid container spacing={3}>
                {/* Left Column - Addresses */}
                <Grid item xs={12} md={7}>
                  {/* To Address */}
                  <Paper elevation={0} sx={{ p: 2, mb: 2, backgroundColor: "#f8f8f8", border: "1px solid #ddd" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#D32F2F" }}>
                      DELIVER TO:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {payload.receiver_name}
                    </Typography>
                    <Typography>
                      {payload.street} {payload.apt}
                    </Typography>
                    <Typography>
                      {payload.city_name}, {payload.state_id} {payload.zip}
                    </Typography>
                  </Paper>

                  {/* From Address */}
                  <Paper elevation={0} sx={{ p: 2, backgroundColor: "#f8f8f8", border: "1px solid #ddd" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#D32F2F" }}>
                      FROM:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Post Office #{payload.po_id}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Right Column - Package Details */}
                <Grid item xs={12} md={5}>
                  <Paper
                    elevation={0}
                    sx={{ p: 2, backgroundColor: "#f8f8f8", border: "1px solid #ddd", height: "100%" }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#D32F2F" }}>
                      PACKAGE DETAILS:
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Type:
                      </Typography>
                      <Typography variant="body2">{payload.type}</Typography>
                    </Box>

                    {payload.type === "Box" && (
                      <>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            Weight:
                          </Typography>
                          <Typography variant="body2">{payload.weight} kg</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            Size:
                          </Typography>
                          <Typography variant="body2">{payload.size}</Typography>
                        </Box>
                      </>
                    )}

                    {packageInfo && (
                      <>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            Status:
                          </Typography>
                          <Chip label={packageInfo.status} size="small" color="primary" variant="outlined" />
                        </Box>
                      </>
                    )}

                    <Box sx={{ mt: 2 }}>
                      {payload.fragile === 1 && (
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <WarningAmber sx={{ color: "#D32F2F", mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: "bold", color: "#D32F2F" }}>
                            FRAGILE
                          </Typography>
                        </Box>
                      )}

                      {payload.fast_delivery === 1 && (
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <FlashOn sx={{ color: "#1976D2", mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: "bold", color: "#1976D2" }}>
                            PRIORITY DELIVERY
                          </Typography>
                        </Box>
                      )}

                      {payload.purchased_insurance === 1 && (
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <ShieldOutlined sx={{ color: "#388E3C", mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: "bold", color: "#388E3C" }}>
                            INSURED
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>

                {/* Tracking Number and Barcode */}
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      backgroundColor: "#f8f8f8",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                      <QrCode2 sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        TRACKING NUMBER
                      </Typography>
                    </Box>

                    {packageInfo && (
                      <>
                        <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
                          {packageInfo.tracking_number}
                        </Typography>

                        <Box
                          sx={{
                            mt: 2,
                            p: 1,
                            border: "1px solid #000",
                            backgroundColor: "#fff",
                            fontFamily: "monospace",
                            fontSize: "24px",
                            letterSpacing: "2px",
                          }}
                        >
                          {generateBarcodeDisplay(packageInfo.tracking_number)}
                        </Box>

                        {/* QR Code */}
                        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                          <img src="/qr-code.png" alt="QR Code" width={100} height={100} style={{ maxWidth: "100%" }} />
                        </Box>
                      </>
                    )}
                  </Paper>
                </Grid>
              </Grid>

              {/* Special Handling Instructions */}
              {(payload.fragile === 1 || payload.fast_delivery === 1) && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    border: payload.fragile === 1 ? "2px dashed #D32F2F" : "2px solid #1976D2",
                    borderRadius: "4px",
                    backgroundColor: payload.fragile === 1 ? "rgba(211, 47, 47, 0.05)" : "rgba(25, 118, 210, 0.05)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: payload.fragile === 1 ? "#D32F2F" : "#1976D2",
                    }}
                  >
                    {payload.fragile === 1 ? "FRAGILE - HANDLE WITH CARE" : "PRIORITY - EXPEDITED DELIVERY"}
                  </Typography>
                </Box>
              )}
            </div>
          </DialogContent>
          <DialogActions sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
            <Button
              onClick={handlePrintSticker}
              variant="contained"
              sx={{ backgroundColor: "#D32F2F", "&:hover": { backgroundColor: "#B71C1C" } }}
              startIcon={<Print />}
            >
              Print Shipping Label
            </Button>
            <Button
              onClick={handleCloseSticker}
              variant="outlined"
              sx={{ color: "#D32F2F", borderColor: "#D32F2F", "&:hover": { borderColor: "#B71C1C" } }}
              startIcon={<Close />}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  )
}

