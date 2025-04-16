"use client"

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Box, Typography, Paper, List, ListItem, ListItemText, Alert, CircularProgress } from "@mui/material"
import { LocalShipping, LocationOn, AccessTime } from "@mui/icons-material"

export default function DeliveredPackagesPage() {
  const { user } = useContext(AuthContext)
  const [packages, setPackages] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeliveredPackages = async () => {
      if (!user?.customers_id) {
        setError("⚠ You must be logged in to view delivered packages.")
        setLoading(false)
        return
      }

      try {
        const response = await fetch("https://vercel-api-post-office-seven.vercel.app/api/getDeliveredPackages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customer_id: user.customers_id }),
        })

        const data = await response.json()
        console.log("Delivered Packages Response:", data)

        if (!response.ok) throw new Error(data.error || "Failed to fetch delivered packages.")

        setPackages(data.packages || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDeliveredPackages()
  }, [user])

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center" py={4}>
      {/* Welcome banner with gradient background */}
      <Paper
        elevation={2}
        sx={{
          width: { xs: "95%", sm: "95%", md: "95%" },
          maxWidth: "1200px",
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
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
        <Box sx={{ p: 4, position: "relative", zIndex: 1, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" color="white">
            Welcome to your delivered packages
          </Typography>
        </Box>
      </Paper>

      {/* Package container */}
      <Box
        sx={{
          width: { xs: "95%", sm: "95%", md: "95%" },
          maxWidth: "1200px",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "#B71C1C",
              color: "white",
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <LocalShipping sx={{ fontSize: 24 }} />
            <Typography variant="h5" fontWeight="bold">
              Delivered Packages
            </Typography>
          </Box>

          <Box p={3}>
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  "& .MuiAlert-message": { fontSize: "1rem" },
                }}
              >
                {error}
              </Alert>
            )}

            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress size={40} sx={{ color: "#D32F2F" }} />
              </Box>
            ) : packages.length === 0 ? (
              <Box textAlign="center" p={4}>
                <Typography variant="body1" fontSize="1.1rem" color="text.secondary">
                  🚫 No delivered packages at this moment. Please check back later.
                </Typography>
              </Box>
            ) : (
              <List sx={{ width: "100%" }}>
                {packages.map((pkg, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      borderBottom: "1px solid #ddd",
                      py: 2.5,
                      px: 0,
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <LocalShipping sx={{ color: "#D32F2F", fontSize: 20 }} />
                          <Typography variant="subtitle1" fontSize="1.1rem" fontWeight="bold">
                            Package with tracking #{pkg.tracking_number} has been delivered
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ ml: 3 }}>
                          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                            <LocationOn sx={{ color: "action.active", fontSize: 18 }} />
                            <Typography variant="body2" fontSize="1rem">
                              <strong>Location:</strong> {pkg.destination_street}, {pkg.destination_city},{" "}
                              {pkg.destination_state}
                            </Typography>
                          </Box>
                          {pkg.time && pkg.date && (
                            <Box display="flex" alignItems="center" gap={1}>
                              <AccessTime sx={{ color: "action.active", fontSize: 18 }} />
                              <Typography variant="body2" fontSize="1rem">
                                <strong>Delivered at:</strong> {pkg.time} on {pkg.date}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      }
                      sx={{ margin: 0 }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

