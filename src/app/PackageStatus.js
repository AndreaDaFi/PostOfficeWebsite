"use client"

import { useState, useContext } from "react"
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  MenuItem,
  Select,
  InputAdornment,
  Box,
  Divider,
} from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import SearchIcon from "@mui/icons-material/Search"
import BadgeIcon from "@mui/icons-material/Badge"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { AuthContext } from "../context/AuthContext"

export default function UpdatePackageStatus() {
  const { user } = useContext(AuthContext)
  const [trackingNumber, setTrackingNumber] = useState("")
  const employeeId = user?.employees_id
  const [status, setStatus] = useState("")
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const statusOptions = ["Pending", "In Transit", "Out for Delivery", "Delivered", "Returned", "Missing"]

  const handleUpdateStatus = async () => {
    setError(null)
    setSuccessMessage(null)

    if (!trackingNumber.trim()) return setError("⚠ Please enter the tracking number.")
    if (!status.trim()) return setError("⚠ Please select a package status.")

    try {
      const response = await fetch("https://final-po-api.vercel.app/api/updatePackage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber, employeeId, status }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Failed to update package status.")

      setSuccessMessage(data.message)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      {/* Header with gradient background */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(211, 47, 47, 0.15)",
          },
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
            color: "white",
            p: 3,
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
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
          <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <LocalShippingIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold">
              Update Package Status
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
              Enter tracking number and select the package's new status
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        }}
      >
        {/* Messages */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              bgcolor: "#FFEBEE",
              border: "1px solid #FFCDD2",
            }}
            icon={<ErrorOutlineIcon sx={{ color: "#D32F2F" }} />}
          >
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 2,
              bgcolor: "#FFEBEE",
              border: "1px solid #FFCDD2",
              color: "#D32F2F",
            }}
            icon={<CheckCircleIcon sx={{ color: "#D32F2F" }} />}
          >
            {successMessage}
          </Alert>
        )}

        <Box sx={{ mb: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 2, border: "1px solid #e0e0e0" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
            How to update a package:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: "#555" }}>
            1. Enter the tracking number of the package
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: "#555" }}>
            2. Select the new status from the dropdown menu
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            3. Click "Update Status & Details" to save the changes
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "medium", color: "#333" }}>
            Package Information
          </Typography>

          <TextField
            fullWidth
            label="Tracking Number"
            name="trackingNumber"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D32F2F",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D32F2F",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#D32F2F" }} />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption" color="textSecondary" sx={{ display: "block", mt: -1, mb: 2 }}>
            Tracking Number must be exactly 10 characters, required field
          </Typography>

          <Select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            displayEmpty
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ddd",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D32F2F",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D32F2F",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Package Status
            </MenuItem>
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 2 }}>
            Package status selection is required
          </Typography>
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleUpdateStatus}
            sx={{
              py: 1.5,
              bgcolor: "#D32F2F",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#B71C1C",
              },
              boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
            }}
          >
            UPDATE STATUS & DETAILS
          </Button>
        </Box>

        {/* Employee Info */}
        <Box
          sx={{ mt: 4, p: 2, bgcolor: "#FFEBEE", borderRadius: 2, border: "1px solid #FFCDD2", textAlign: "center" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <BadgeIcon sx={{ color: "#D32F2F", mr: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#D32F2F" }}>
              Employee Information
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "#D32F2F" }}>
            Updates will be recorded under your employee ID: <strong>{employeeId || "Not available"}</strong>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

