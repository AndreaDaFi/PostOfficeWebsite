"use client"

import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Paper,
  Typography,
  Alert,
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Tooltip,
} from "@mui/material"
import { LocalShipping, Person, Scale, Inventory2, ErrorOutline, ArrowForward } from "@mui/icons-material"

const MyPackages = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      if (!user?.customers_id) {
        setError("⚠ Missing customer ID.")
        setLoading(false)
        return
      }

      try {
        const response = await fetch("https://apipost.vercel.app/api/getCustomerPackages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: user.customers_id,
          }),
        })

        const data = await response.json()
        console.log("📦 Packages response:", data)

        if (!response.ok) throw new Error(data.error || "Failed to fetch packages")

        setPackages(data.packages)
      } catch (err) {
        setError("❌ " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [user])

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success"
      case "in transit":
        return "error" // Changed from "info" to "error" to make it red
      case "pending":
        return "warning"
      case "cancelled":
        return "error"
      default:
        return "default"
    }
  }

  // Function to navigate to package history page
  const viewPackageHistory = (trackingNumber) => {
    navigate(`/TrackPackage?trackingNumber=${trackingNumber}`)
  }
  

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center" py={4}>
      {/* Wide welcome banner */}
      <Box
        sx={{
          width: { xs: "95%", sm: "95%", md: "95%" },
          maxWidth: "1200px",
          mb: 4,
          p: 3,
          bgcolor: "#ffebee", // Light red background
          borderRadius: 2,
          border: "1px solid #ffcdd2",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4" // Reduced from h3
          fontWeight="bold"
          color="error.main"
        >
          Welcome to your packages
        </Typography>
      </Box>

      {/* Wide package container - same width as welcome banner */}
      <Box
        sx={{
          width: { xs: "95%", sm: "95%", md: "95%" },
          maxWidth: "1200px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "error.main", // Using MUI's red color
              color: "error.contrastText",
              p: 2.5, // Moderate padding
              display: "flex",
              alignItems: "center",
              gap: 1.5, // Moderate gap
            }}
          >
            <Inventory2 sx={{ fontSize: 24 }} /> {/* Moderate icon size */}
            <Typography variant="h5" fontWeight="bold">
              {" "}
              {/* Back to h5 */}
              My Packages
            </Typography>
          </Box>

          <Box p={3}>
            {" "}
            {/* Moderate padding */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  "& .MuiAlert-message": { fontSize: "1rem" }, // Medium error text
                }}
                icon={<ErrorOutline />}
              >
                {error}
              </Alert>
            )}
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress size={40} /> {/* Medium loading spinner */}
              </Box>
            ) : packages.length === 0 ? (
              <Box textAlign="center" p={4}>
                <Typography variant="body1" fontSize="1rem" color="text.secondary">
                  {" "}
                  {/* Medium text */}🚫 No packages found.
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2.5}>
                {" "}
                {/* Moderate spacing */}
                {packages.map((pkg) => (
                  <Card
                    key={pkg.tracking_number}
                    variant="outlined"
                    sx={{
                      borderLeft: "5px solid #d32f2f", // Moderate border
                      boxShadow: "0 1px 4px rgba(0,0,0,0.1)", // Subtle shadow
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => viewPackageHistory(pkg.tracking_number)}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      {" "}
                      {/* Moderate padding */}
                      <Grid container spacing={2.5}>
                        {" "}
                        {/* Moderate spacing */}
                        <Grid item xs={12}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                            <Typography
                              variant="subtitle1" // Back to subtitle1
                              fontSize="1.1rem" // Medium-sized text
                              fontWeight="bold"
                            >
                              Tracking: {pkg.tracking_number}
                            </Typography>
                            <Chip
                              label={pkg.status}
                              color={getStatusColor(pkg.status)}
                              size="medium" // Keep medium size
                              sx={{ fontSize: "0.9rem" }} // Medium text
                            />
                          </Box>
                          <Divider sx={{ borderWidth: 1 }} /> {/* Medium divider */}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Scale sx={{ fontSize: 20 }} color="action" /> {/* Medium icon */}
                            <Typography fontSize="1rem">
                              {" "}
                              {/* Medium text */}
                              <strong>Weight:</strong> {pkg.weight} kg
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Person sx={{ fontSize: 20 }} color="action" /> {/* Medium icon */}
                            <Typography fontSize="1rem">
                              {" "}
                              {/* Medium text */}
                              <strong>Receiver:</strong> {pkg.receiver_name}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <LocalShipping sx={{ fontSize: 20 }} color="action" /> {/* Medium icon */}
                            <Typography fontSize="1rem">
                              {" "}
                              {/* Medium text */}
                              <strong>Type:</strong> {pkg.type}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Tooltip title="View package history">
                              <Button
                                variant="text"
                                color="error"
                                size="small"
                                endIcon={<ArrowForward />}
                                onClick={(e) => {
                                  e.stopPropagation() // Prevent card click event
                                  viewPackageHistory(pkg.tracking_number)
                                }}
                              >
                                View History
                              </Button>
                            </Tooltip>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default MyPackages

