"use client"

import { useEffect, useState, useCallback } from "react"
import { Container, Typography, Box, Alert, CircularProgress, Paper, Fade, Grow, Chip } from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import InventoryIcon from "@mui/icons-material/Inventory"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import InfoIcon from "@mui/icons-material/Info"

export default function PackageDetails() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingHistory, setTrackingHistory] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [noUpdates, setNoUpdates] = useState(false)

  // Get tracking number from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlTrackingNumber = params.get("trackingNumber")
    if (urlTrackingNumber) {
      setTrackingNumber(urlTrackingNumber)
    }
  }, [])

  const fetchTrackingData = useCallback(async () => {
    if (!trackingNumber) return

    setIsLoading(true)
    setError(null)
    setTrackingHistory([])
    setNoUpdates(false)

    try {
      const res = await fetch(`https://vercel-api-post-office-seven.vercel.app/api/tracking-history?trackingNumber=${trackingNumber}`)
      const data = await res.json()

      if (!data.success || data.history.length === 0) {
        // Check if it's a valid tracking number but no updates yet
        if (data.packageExists) {
          setNoUpdates(true)
        } else {
          setError("Your package has not been updated. Please come back later to see updates.")
        }
      } else {
        setTrackingHistory(data.history)
      }
    } catch (err) {
      console.error(err)
      setError("Your package has not been updated. Please come back later to see updates.")
    } finally {
      setIsLoading(false)
    }
  }, [trackingNumber])

  // Effect to auto-fetch tracking data when tracking number is set
  useEffect(() => {
    if (trackingNumber) {
      fetchTrackingData()
    }
  }, [trackingNumber, fetchTrackingData])

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          position: "relative",
          overflow: "hidden",
          borderRadius: "24px",
          background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
          boxShadow: "0 20px 40px rgba(211, 47, 47, 0.2)",
          p: 6,
          color: "white",
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
              'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fillOpacity="1" fillRule="evenodd"/%3E%3C/svg%3E\')',
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
              "& svg": {
                fontSize: 60,
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
              },
            }}
          >
            <LocalShippingIcon />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Track Your Package
          </Typography>

          {/* Display tracking number prominently in the middle */}
          {trackingNumber && (
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 500, opacity: 0.9 }}>
                Tracking Number:
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  mt: 1,
                  p: 2,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  display: "inline-block",
                }}
              >
                {trackingNumber}
              </Typography>
            </Box>
          )}

          {!trackingNumber && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                opacity: 0.9,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Please provide a tracking number in the URL to track your package
            </Typography>
          )}
        </Box>
      </Box>

      {/* Loading indicator */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress size={60} sx={{ color: "#D32F2F" }} />
        </Box>
      )}

      {/* Error message */}
      {error && (
        <Fade in={!!error}>
          <Alert
            severity="error"
            sx={{
              mt: 3,
              mb: 4,
              borderRadius: "12px",
              backgroundColor: "#FFF5F5",
              color: "#E53935",
              border: "1px solid rgba(229, 57, 53, 0.2)",
              "& .MuiAlert-icon": {
                color: "#E53935",
              },
            }}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* No updates message */}
      {noUpdates && (
        <Fade in={noUpdates}>
          <Paper
            elevation={0}
            sx={{
              mt: 3,
              mb: 4,
              p: 4,
              borderRadius: "16px",
              border: "1px solid rgba(255, 152, 0, 0.2)",
              backgroundColor: "rgba(255, 243, 224, 0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <InfoIcon
              sx={{
                fontSize: 60,
                color: "#FF9800",
                mb: 2,
                opacity: 0.8,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#E65100", mb: 1 }}>
              Lo sentimos
            </Typography>
            <Typography variant="body1" sx={{ color: "#555", mb: 2, maxWidth: "500px" }}>
              Su paquete no ha sido actualizado. Por favor vuelva más tarde para ver las actualizaciones.
            </Typography>
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: "8px",
                backgroundColor: "rgba(255, 152, 0, 0.1)",
                maxWidth: "450px",
              }}
            >
              <Typography variant="body2" sx={{ color: "#795548", fontStyle: "italic" }}>
                Los paquetes suelen actualizarse dentro de las 24-48 horas después de ser procesados. Si continúa sin
                ver actualizaciones después de este período, póngase en contacto con nuestro servicio de atención al
                cliente.
              </Typography>
            </Box>
          </Paper>
        </Fade>
      )}

      {/* Results */}
      {trackingHistory.length > 0 && (
        <Grow in={trackingHistory.length > 0} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                background: "#FAFAFA",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <InventoryIcon sx={{ color: "#D32F2F", mr: 1.5 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Package Status
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography variant="body2" sx={{ color: "#666", mr: 2 }}>
                  Current Status:
                </Typography>
                <Chip
                  label={trackingHistory[trackingHistory.length - 1].updated_status}
                  color="success"
                  size="small"
                  icon={<CheckCircleIcon />}
                  sx={{
                    fontWeight: 500,
                    borderRadius: "8px",
                    backgroundColor: "#E8F5E9",
                    color: "#2E7D32",
                    "& .MuiChip-icon": {
                      color: "#2E7D32",
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Timeline */}
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Tracking History
              </Typography>

              <Box sx={{ position: "relative" }}>
                {trackingHistory.map((entry, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      pl: 5,
                      pb: index < trackingHistory.length - 1 ? 5 : 0,
                    }}
                  >
                    {/* Timeline line */}
                    {index < trackingHistory.length - 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          left: "20px",
                          top: "30px",
                          bottom: 0,
                          width: "2px",
                          background: "linear-gradient(to bottom, #D32F2F 0%, #E57373 100%)",
                          zIndex: 1,
                        }}
                      />
                    )}

                    {/* Timeline dot */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: "10px",
                        top: "4px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          index === trackingHistory.length - 1
                            ? "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)"
                            : "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        zIndex: 2,
                      }}
                    >
                      <LocationOnIcon sx={{ fontSize: 14, color: "white" }} />
                    </Box>

                    {/* Content */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: "12px",
                        backgroundColor:
                          index === trackingHistory.length - 1 ? "rgba(76, 175, 80, 0.05)" : "rgba(0, 0, 0, 0.02)",
                        border: "1px solid",
                        borderColor:
                          index === trackingHistory.length - 1 ? "rgba(76, 175, 80, 0.1)" : "rgba(0, 0, 0, 0.05)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          backgroundColor:
                            index === trackingHistory.length - 1 ? "rgba(76, 175, 80, 0.08)" : "rgba(0, 0, 0, 0.03)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            backgroundColor: "rgba(0,0,0,0.05)",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                          }}
                        >
                          {new Date(entry.status_update_datetime).toLocaleString()}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            color: "#555",
                          }}
                        >
                          {entry.previous_status}
                        </Typography>
                        <ArrowRightAltIcon sx={{ mx: 1, color: "#999" }} />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: index === trackingHistory.length - 1 ? "#2E7D32" : "#333",
                          }}
                        >
                          {entry.updated_status}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grow>
      )}
    </Container>
  )
}

