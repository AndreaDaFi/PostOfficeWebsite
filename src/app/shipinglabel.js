"use client"

import { useRef, useState, useEffect, useContext } from "react"
import { AuthProvider, AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Paper, Typography, Box, Grid, Divider, Button, CircularProgress } from "@mui/material"
import { Print, CheckCircle } from "@mui/icons-material"
// Import the QR code directly
import QRCodeImage from "./qr-code.png"

// Add print styles to the document head
const addPrintStyles = () => {
  const styleElement = document.createElement("style")
  styleElement.type = "text/css"
  styleElement.innerHTML = `
    @media print {
      body * {
        visibility: hidden;
      }
      .shipping-label, .shipping-label * {
        visibility: visible;
      }
      .shipping-label {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 15mm;
        border: none !important;
      }
      button {
        display: none !important;
      }
    }
  `
  document.head.appendChild(styleElement)
  return () => {
    document.head.removeChild(styleElement)
  }
}

export default function ShipingLabel() {
  const { isCustomer} = useContext(AuthContext);
  // Access location state passed from the checkout page
  const location = useLocation()
  const navigate = useNavigate()
  const { payload } = location.state || {}
  const printRef = useRef()
  const [loading, setLoading] = useState(true)
  const [trackingNumber, setTrackingNumber] = useState(null)
  const [postOfficeAddress, setPostOfficeAddress] = useState(null)
  const [error, setError] = useState(null)

  // Add print styles when component mounts
  useEffect(() => {
    const removePrintStyles = addPrintStyles()
    return () => {
      // Clean up styles when component unmounts
      removePrintStyles()
    }
  }, [])

  // Function to handle printing
  const handlePrint = () => {
    window.print()
  }

  // Function to navigate to MyPackages
  const handleDone = () => {
    if (isCustomer()){
      navigate("/MyPackages")
    }
    else {
      navigate("/ViewPOPackages");
    }
  }

  // Fetch tracking number
  useEffect(() => {
    if (payload && payload.customers_id) {
      const fetchTrackingNumber = async () => {
        try {
          const response = await fetch("https://vercel-api-post-office-seven.vercel.app/api/getCustomerPackages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customer_id: payload.customers_id }),
          })

          if (response.ok) {
            const data = await response.json()
            console.log("Customer packages response:", data)

            if (data.success && data.packages && data.packages.length > 0) {
              // Get the most recent package
              const sortedPackages = [...data.packages].sort((a, b) => b.tracking_number - a.tracking_number)
              const latestTrackingNumber = sortedPackages[0].tracking_number
              setTrackingNumber(latestTrackingNumber)
              console.log("Found tracking number:", latestTrackingNumber)
            }
          }
        } catch (error) {
          console.error("Error fetching tracking number:", error)
        }
      }

      fetchTrackingNumber()
    }
  }, [payload])

  // Fetch post office data using the correct API endpoint
  useEffect(() => {
    if (payload && payload.po_id) {
      const fetchPostOfficeData = async () => {
        try {
          setLoading(true)
          setError(null)

          // Using the correct API endpoint provided by the user
          console.log("Fetching post office locations...")
          const response = await fetch("https://vercel-api-post-office-seven.vercel.app/api/getPostOfficeLocations")

          if (!response.ok) {
            throw new Error(`API returned status ${response.status}`)
          }

          const data = await response.json()
          console.log("Post office locations response:", data)

          if (data.success && data.data && data.data.length > 0) {
            // Find the specific post office by po_id
            const postOffice = data.data.find(
              (po) => po.po_id === Number.parseInt(payload.po_id) || po.po_id === payload.po_id,
            )

            if (postOffice) {
              console.log("Found post office:", postOffice)
              setPostOfficeAddress({
                street: postOffice.street,
                city: postOffice.city_name,
                state: postOffice.state_name,
                zip: "77204", // Assuming a default zip code since it's not in the API response
              })
            } else {
              console.error("Post office not found in the response")
              setError("Post office not found")
            }
          } else {
            throw new Error("No data found in API response")
          }
        } catch (error) {
          console.error("Error fetching post office data:", error)
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }

      fetchPostOfficeData()
    } else {
      setLoading(false)
    }
  }, [payload])

  if (!payload) {
    return (
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px" }}>
          <Typography variant="h5" style={{ color: "#D32F2F" }}>
            No shipping information available
          </Typography>
          <Typography>Please complete checkout to generate a shipping label.</Typography>
        </Paper>
      </Container>
    )
  }

  if (loading) {
    return (
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px", textAlign: "center" }}>
          <CircularProgress style={{ color: "#D32F2F" }} />
          <Typography style={{ marginTop: "10px" }}>Loading shipping details...</Typography>
        </Paper>
      </Container>
    )
  }

  // Use tracking number from state, or fallback to payload, or generate one
  const displayTrackingNumber =
    trackingNumber || payload.tracking_number || `USPS${payload.po_id}${Date.now().toString().slice(-8)}`

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", marginBottom: "20px" }}>
      {/* Action buttons outside the printable area */}
      <Box mb={2} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="contained"
          startIcon={<Print />}
          onClick={handlePrint}
          sx={{ backgroundColor: "#D32F2F", color: "white" }}
        >
          Print Shipping Label
        </Button>
        <Button
          variant="contained"
          startIcon={<CheckCircle />}
          onClick={handleDone}
          sx={{ backgroundColor: "#D32F2F", color: "white" }}
        >
          Done
        </Button>
      </Box>

      {/* Printable shipping label */}
      <Paper
        elevation={3}
        ref={printRef}
        style={{
          padding: "20px",
          borderRadius: "12px",
          border: "2px dashed #D32F2F",
          backgroundColor: "white",
          pageBreakInside: "avoid",
        }}
        className="shipping-label"
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F" }}>
            COUGAR POST
          </Typography>
        </Box>

        <Divider style={{ margin: "10px 0", borderWidth: "2px" }} />

        {/* Sender Information */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              FROM:
            </Typography>
            <Typography variant="body1">Cougar Post</Typography>
           

            {/* Display post office address from API */}
            {postOfficeAddress ? (
              <>
                <Typography variant="body1">{postOfficeAddress.street}</Typography>
                <Typography variant="body1">
                  {postOfficeAddress.city}, {postOfficeAddress.state} {postOfficeAddress.zip}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" color="error">
                {error || "Could not fetch post office address"}
              </Typography>
            )}
          </Grid>

          {/* Receiver Information */}
          <Grid item xs={6}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              SHIP TO:
            </Typography>
            <Typography variant="body1" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              {payload.receiver_name}
            </Typography>
            <Typography variant="body1">
              {payload.street} {payload.apt && `APT ${payload.apt}`}
            </Typography>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {payload.city_name.toUpperCase()}, {payload.state_id.toUpperCase()} {payload.zip}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ margin: "15px 0", borderWidth: "2px" }} />

        {/* Package Information */}
        <Box mt={2} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Package Type:</strong> {payload.type}
              </Typography>
              {payload.type === "Box" && (
                <>
                  <Typography variant="body2">
                    <strong>Weight:</strong> {payload.weight} kg
                  </Typography>
                  <Typography variant="body2">
                    <strong>Size:</strong> {payload.size}
                  </Typography>
                </>
              )}
              <Typography variant="body2">
                <strong>Post Office ID:</strong> {payload.po_id}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Fragile:</strong> {payload.fragile === 1 ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <strong>Insurance:</strong> {payload.purchased_insurance === 1 ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <strong>Fast Delivery:</strong> {payload.fast_delivery === 1 ? "Yes" : "No"}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* QR Code and Tracking Number */}
        <Box mt={3} p={2} border="2px solid #000" borderRadius="4px" textAlign="center" bgcolor="#fff">
          {/* QR Code Image - using imported image */}
          <img
            src={QRCodeImage || "/placeholder.svg"}
            alt="Package QR Code"
            style={{
              width: "150px",
              height: "150px",
              margin: "0 auto",
              display: "block",
            }}
          />
          <Typography
            variant="h6"
            mt={2}
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: "1.2rem",
            }}
          >
            {displayTrackingNumber}
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

