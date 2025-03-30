"use client"

import { useEffect, useState, useContext } from "react"
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Card,
  CardContent,
  Chip,
  Divider,
  Container,
  Grid,
  alpha,
} from "@mui/material"
import { LocalShipping, Inventory2, LocalPostOffice, ErrorOutline } from "@mui/icons-material"
import { AuthContext } from "../context/AuthContext"

const ViewPOPackages = () => {
  const { user } = useContext(AuthContext)
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.po_id) {
        setError("❌ No post office ID found in your account.")
        setLoading(false)
        return
      }

      try {
        const res = await fetch("https://apipost.vercel.app/api/getPackagesByPostOffice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ po_id: user.po_id }),
        })

        const data = await res.json()
        if (!res.ok || !data.success) throw new Error(data.error || "Failed to load packages")

        setPackages(data.packages || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  // Function to get appropriate icon based on package type
  const getPackageIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "letter":
        return <LocalPostOffice sx={{ color: "#d32f2f" }} />
      case "parcel":
        return <Inventory2 sx={{ color: "#d32f2f" }} />
      default:
        return <LocalShipping sx={{ color: "#d32f2f" }} />
    }
  }

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success"
      case "in transit":
        return "info"
      case "processing":
        return "warning"
      default:
        return "default"
    }
  }

  const handlePackageClick = (trackingNumber) => {
    // Navigate to the PackageStatus page with the tracking number
    window.location.href = `/PackageStatus?tracking=${trackingNumber}`

    // If you're using React Router with useNavigate:
    // navigate(`/PackageStatus?tracking=${trackingNumber}`);

    // If you're using React Router with history:
    // history.push(`/PackageStatus?tracking=${trackingNumber}`);
  }

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mt: 3,
          borderRadius: 2,
          background: "linear-gradient(135deg, #fff 0%, #fff5f5 100%)",
          border: "1px solid #f5f5f5",
        }}
      >
        <Box display="flex" alignItems="center" mb={4}>
          <LocalShipping sx={{ fontSize: 40, color: "#d32f2f", mr: 2 }} />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#d32f2f",
              borderBottom: "3px solid #d32f2f",
              paddingBottom: 1,
            }}
          >
            Packages at Your Post Office
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress sx={{ color: "#d32f2f" }} size={60} />
          </Box>
        ) : error ? (
          <Alert
            severity="error"
            icon={<ErrorOutline fontSize="inherit" />}
            sx={{
              borderRadius: 2,
              fontSize: "1rem",
              backgroundColor: alpha("#d32f2f", 0.1),
              color: "#d32f2f",
              "& .MuiAlert-icon": {
                color: "#d32f2f",
              },
            }}
          >
            {error}
          </Alert>
        ) : packages.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              textAlign: "center",
              backgroundColor: alpha("#d32f2f", 0.05),
              borderRadius: 2,
            }}
          >
            <Inventory2 sx={{ fontSize: 60, color: alpha("#d32f2f", 0.6), mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No packages found for your post office.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {packages.map((pkg) => (
              <Grid item xs={12} md={6} key={pkg.tracking_number}>
                <Card
                  elevation={2}
                  onClick={() => handlePackageClick(pkg.tracking_number)}
                  sx={{
                    borderRadius: 2,
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 16px rgba(211, 47, 47, 0.2)",
                      cursor: "pointer", // Add cursor pointer to indicate it's clickable
                    },
                    overflow: "visible",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -15,
                      left: 20,
                      backgroundColor: "#d32f2f",
                      color: "white",
                      borderRadius: "4px",
                      px: 2,
                      py: 0.5,
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)",
                    }}
                  >
                    {pkg.type || "Package"}
                  </Box>
                  <CardContent sx={{ pt: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Box display="flex" alignItems="center">
                        {getPackageIcon(pkg.type)}
                        <Typography fontWeight="bold" fontSize="1.1rem" ml={1} color="#d32f2f">
                          {pkg.tracking_number}
                        </Typography>
                      </Box>
                      <Chip
                        label={pkg.status}
                        color={getStatusColor(pkg.status)}
                        size="small"
                        sx={{ fontWeight: "medium" }}
                      />
                    </Box>

                    <Divider sx={{ my: 2, borderColor: alpha("#d32f2f", 0.2) }} />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Receiver
                        </Typography>
                        <Typography fontWeight="medium">{pkg.receiver_name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Weight
                        </Typography>
                        <Typography fontWeight="medium">{pkg.weight} kg</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  )
}

export default ViewPOPackages

