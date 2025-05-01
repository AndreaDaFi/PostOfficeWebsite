"use client"

import { useState, useEffect } from "react"
import { Container, TextField, Button, Typography, MenuItem, Grid, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { LocalShipping as LocalShippingIcon } from "@mui/icons-material"

export default function LowStockPage() {
  const [selectedPostOffice, setSelectedPostOffice] = useState("")
  const [postOffices, setPostOffices] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchPostOffices = async () => {
      try {
        const response = await fetch("https://final-po-api.vercel.app/api/CustAddPackage") // Your API endpoint
        const result = await response.json()

        if (result.success) {
          setPostOffices(result.data) // Set the fetched data to state
        } else {
          setError("Failed to load post office data.")
        }
      } catch (error) {
        setError(error.message) // Set error if fetch fails
      }
    }

    fetchPostOffices()
  }, [])

  const handlePostOfficeChange = (e) => {
    const selectedPoId = e.target.value
    console.log("Selected Post Office ID:", selectedPoId) // Debugging line
    setSelectedPostOffice(selectedPoId) // Update state with selected post office ID
  }

  return (
    <Container
      maxWidth="md" // Changed from sm to md for larger width
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 9, // 1.5x of original 6
          position: "relative",
          overflow: "hidden",
          borderRadius: "36px", // 1.5x of original 24px
          background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
          boxShadow: "0 30px 60px rgba(211, 47, 47, 0.2)", // 1.5x shadow
          p: 9, // 1.5x of original 6
          color: "white",
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fillOpacity="1" fillRule="evenodd"/%3E%3C/svg%3E\')',
            backgroundSize: "150px 150px", // 1.5x pattern size
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4.5, // 1.5x of original 3
              "& svg": {
                fontSize: 90, // 1.5x of original 60
                filter: "drop-shadow(0 6px 9px rgba(0,0,0,0.2))", // Enhanced shadow
              },
            }}
          >
            <LocalShippingIcon />
          </Box>
          <Typography
            variant="h2" // Changed from h3 to h2 for larger size
            sx={{
              fontWeight: 800,
              mb: 3, // 1.5x of original 2
              textShadow: "0 3px 6px rgba(0,0,0,0.2)", // Enhanced shadow
              fontSize: "3rem", // 1.5x of original size
            }}
          >
            Choose Your Store
          </Typography>
          <Typography
            variant="h6" // Changed from body1 to h6 for larger size
            sx={{
              mb: 6, // 1.5x of original 4
              opacity: 0.9,
              maxWidth: "650px", // Increased from 500px
              mx: "auto",
              fontSize: "1.5rem", // 1.5x of original 1.1rem
            }}
          >
            Different locations will have different items available. Please select a Post Office location to see
            available items.
          </Typography>

          <Grid item xs={12} sx={{ width: "100%", mb: 4.5, maxWidth: "70%", mx: "auto" }}>
            <TextField
              select
              fullWidth
              label="Select Post Office"
              value={selectedPostOffice}
              onChange={handlePostOfficeChange}
              InputProps={{
                style: { fontSize: "1.3rem", padding: "12px" }, // Larger text and padding
              }}
              InputLabelProps={{
                style: { fontSize: "1.3rem" }, // Larger label
              }}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "12px", // 1.5x of original 8px
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px", // 1.5x of original 8px
                },
                "& .MuiInputLabel-root": {
                  color: "#B71C1C",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "& .MuiSelect-select": {
                  color: "#333",
                },
              }}
            >
              {postOffices.length === 0 ? (
                <MenuItem disabled style={{ fontSize: "1.3rem" }}>
                  No Post Offices Available
                </MenuItem>
              ) : (
                postOffices.map((po) => (
                  <MenuItem key={po.po_id} value={po.po_id} style={{ fontSize: "1.3rem" }}>
                    {po.address}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>

          <Button
            component={Link}
            to={`/Store?selectedPostOffice=${selectedPostOffice}`}
            variant="contained"
            disabled={!selectedPostOffice}
            sx={{
              py: 2.25, // 1.5x of original 1.5
              px: 6, // 1.5x of original 4
              fontSize: "1.5rem", // 1.5x of original 1rem
              fontWeight: "bold",
              backgroundColor: "white",
              color: "#B71C1C",
              borderRadius: "12px", // 1.5x of original 8px
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)", // Enhanced shadow
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 9px 24px rgba(0, 0, 0, 0.2)", // Enhanced shadow
              },
              "&:disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                color: "rgba(183, 28, 28, 0.5)",
              },
              textTransform: "none",
            }}
          >
            View Store
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

