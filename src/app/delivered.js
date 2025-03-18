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
        const response = await fetch("https://vercel-api-powebapp.vercel.app/api/getDeliveredPackages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customer_id: user.customers_id }),
        })

        const data = await response.json()
        console.log("📦 Delivered Packages Response:", data)

        if (!response.ok) throw new Error(data.error || "Failed to fetch delivered packages.")

        setPackages(data.packages || [])
      } catch (err) {
        setError("❌ " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDeliveredPackages()
  }, [user])

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
        <Typography variant="h4" fontWeight="bold" color="error.main">
          Welcome to your delivered packages
        </Typography>
      </Box>

      {/* Wide package container */}
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
              bgcolor: "error.main",
              color: "error.contrastText",
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
                <CircularProgress size={40} />
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
                          <LocalShipping sx={{ color: "error.main", fontSize: 20 }} />
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

