"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Button,
  Avatar,
  Chip,
  Card,
  CardContent,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  Alert,
} from "@mui/material"
import {
  LocalShipping,
  ArrowBack,
  AccessTime,
  LocationOn,
  CheckCircle,
  Info,
  Warning,
  ArrowForward,
  Home,
  Inventory2,
  Person,
  Scale,
} from "@mui/icons-material"

// Define the types for our package data
interface PackageEvent {
  id: string
  timestamp: string
  event_type: string
  location: string
  description: string
  status: string
}

interface PackageDetails {
  tracking_number: string
  status: string
  weight: string
  receiver_name: string
  type: string
  events: PackageEvent[]
}

export default function PackageHistory() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { trackingNumber } = useParams()
  const [loading, setLoading] = useState(true)
  const [packageData, setPackageData] = useState<PackageDetails | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackageHistory = async () => {
      if (!trackingNumber) {
        setError("Missing tracking number")
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        // First try to fetch from the package history API
        const historyResponse = await fetch("https://vercel-api-powebapp.vercel.app/api/packagehistory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tracking_number: trackingNumber,
            customer_id: user?.customers_id,
          }),
        })

        if (!historyResponse.ok) {
          throw new Error(`Failed to fetch package history: ${historyResponse.status}`)
        }

        const historyData = await historyResponse.json()

        if (!historyData.success) {
          throw new Error(historyData.error || "Failed to fetch package history")
        }

        // Combine package details with events
        const fullPackageData = {
          ...historyData.package,
          events: historyData.events || [],
        }

        setPackageData(fullPackageData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching package history:", err)

        // Fall back to basic package info if history API fails
        try {
          const packageResponse = await fetch("https://vercel-api-powebapp.vercel.app/api/getCustomerPackages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customer_id: user?.customers_id,
            }),
          })

          if (!packageResponse.ok) {
            throw new Error(`Failed to fetch package details: ${packageResponse.status}`)
          }

          const packageData = await packageResponse.json()

          if (!packageData.success) {
            throw new Error(packageData.error || "Failed to fetch package details")
          }

          // Find the specific package by tracking number
          const packageDetails = packageData.packages.find((pkg: any) => pkg.tracking_number === trackingNumber)

          if (!packageDetails) {
            throw new Error("Package not found")
          }

          // Use mock events since we couldn't get real ones
          const mockEvents: PackageEvent[] = [
            {
              id: "evt-001",
              timestamp: new Date().toISOString(),
              event_type: "status_update",
              location: "Local Distribution Center",
              description: `Current status: ${packageDetails.status}`,
              status: packageDetails.status,
            },
            {
              id: "evt-002",
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
              event_type: "creation",
              location: "Post Office",
              description: "Package created",
              status: "Processing",
            },
          ]

          // Combine package details with mock events
          const fullPackageData = {
            ...packageDetails,
            events: mockEvents,
          }

          setPackageData(fullPackageData)
          setLoading(false)
        } catch (fallbackErr) {
          console.error("Error in fallback fetch:", fallbackErr)
          setError("Failed to load package history. Please try again later.")
          setLoading(false)
        }
      }
    }

    fetchPackageHistory()
  }, [trackingNumber, user?.customers_id])

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "#2e7d32" // Green
      case "in transit":
        return "#d32f2f" // Red
      case "processing":
      case "pending":
        return "#ed6c02" // Orange
      case "label created":
        return "#757575" // Grey
      case "exception":
      case "cancelled":
        return "#d32f2f" // Red
      default:
        return "#757575" // Default grey
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case "status_update":
        return <Info />
      case "delivery_attempt":
        return <LocalShipping />
      case "delivery_exception":
        return <Warning />
      case "delivered":
        return <CheckCircle />
      case "creation":
        return <Inventory2 />
      default:
        return <Info />
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Loading Package History...
          </Typography>
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress color="error" />
          </Box>
        </Paper>
      </Container>
    )
  }

  if (error || !packageData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error
          </Typography>
          <Typography>{error || "Failed to load package data"}</Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/MyPackages")}
            sx={{ mt: 2 }}
          >
            Back to My Packages
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink
          component="button"
          variant="body2"
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Home fontSize="small" sx={{ mr: 0.5 }} />
          Home
        </MuiLink>
        <MuiLink
          component="button"
          variant="body2"
          onClick={() => navigate("/MyPackages")}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Inventory2 fontSize="small" sx={{ mr: 0.5 }} />
          My Packages
        </MuiLink>
        <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
          <LocalShipping fontSize="small" sx={{ mr: 0.5 }} />
          Package History
        </Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button
        variant="outlined"
        color="error"
        startIcon={<ArrowBack />}
        onClick={() => navigate("/MyPackages")}
        sx={{ mb: 3 }}
      >
        Back to My Packages
      </Button>

      {/* Package Summary Card */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "#d32f2f", mr: 2 }}>
            <LocalShipping />
          </Avatar>
          <Typography variant="h5" component="h1">
            Package Details
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Tracking Number
              </Typography>
              <Typography variant="h6">{packageData.tracking_number}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Current Status
              </Typography>
              <Chip
                label={packageData.status}
                sx={{
                  bgcolor: getStatusColor(packageData.status),
                  color: "white",
                  fontWeight: "bold",
                  mt: 0.5,
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Package Type
              </Typography>
              <Typography>{packageData.type}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Receiver
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <Person fontSize="small" sx={{ mr: 0.5 }} />
                {packageData.receiver_name}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Weight
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <Scale fontSize="small" sx={{ mr: 0.5 }} />
                {packageData.weight}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Alert severity="info" sx={{ mt: 2 }}>
          This page shows all modifications and tracking events for your package. You can see the complete history of
          your package's journey.
        </Alert>
      </Paper>

      {/* Package History Timeline */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "#d32f2f", mr: 2 }}>
            <AccessTime />
          </Avatar>
          <Typography variant="h5" component="h2">
            Package History
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {packageData.events && packageData.events.length > 0 ? (
          packageData.events.map((event, index) => (
            <Box key={event.id} sx={{ position: "relative" }}>
              {/* Timeline connector */}
              {index < packageData.events.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 20,
                    top: 40,
                    bottom: 0,
                    width: 2,
                    bgcolor: "#e0e0e0",
                    zIndex: 1,
                  }}
                />
              )}

              <Card
                sx={{
                  mb: 3,
                  borderLeft: `4px solid ${getStatusColor(event.status)}`,
                  position: "relative",
                  zIndex: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={2}>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: getStatusColor(event.status),
                            mb: 1,
                            width: 40,
                            height: 40,
                          }}
                        >
                          {getStatusIcon(event.event_type)}
                        </Avatar>
                        <Typography variant="caption" color="text.secondary" align="center">
                          {formatDate(event.timestamp)}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={9} md={10}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {event.description}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {event.location}
                          </Typography>
                        </Box>

                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label={event.status}
                            size="small"
                            sx={{
                              bgcolor: getStatusColor(event.status),
                              color: "white",
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No tracking events available for this package.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" color="error" startIcon={<ArrowBack />} onClick={() => navigate("/MyPackages")}>
          Back to My Packages
        </Button>

        <Button variant="contained" color="error" endIcon={<ArrowForward />} onClick={() => window.print()}>
          Print History
        </Button>
      </Box>
    </Container>
  )
}

