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
  Badge,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"
import {
  LocalShipping,
  Inventory2,
  LocalPostOffice,
  ErrorOutline,
  Search,
  FilterAlt,
  LocationOn,
  Person,
  Scale,
  CalendarToday,
} from "@mui/icons-material"
import { AuthContext } from "../context/AuthContext"

const ViewPOPackages = () => {
  const { user } = useContext(AuthContext)
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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

        // Filter out delivered packages
        const nonDeliveredPackages = (data.packages || []).filter((pkg) => pkg.status?.toLowerCase() !== "delivered")

        setPackages(nonDeliveredPackages)
        setFilteredPackages(nonDeliveredPackages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  // Apply filters when search term or status filter changes
  useEffect(() => {
    let filtered = [...packages]

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((pkg) => pkg.status?.toLowerCase() === statusFilter.toLowerCase())
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (pkg) =>
          pkg.tracking_number?.toLowerCase().includes(search) ||
          pkg.receiver_name?.toLowerCase().includes(search) ||
          pkg.type?.toLowerCase().includes(search),
      )
    }

    setFilteredPackages(filtered)
  }, [searchTerm, statusFilter, packages])

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
      case "in transit":
        return "#D32F2F" // Red for in transit
      case "processing":
        return "#FF5252" // Lighter red for processing
      case "pending":
        return "#FF8A80" // Even lighter red for pending
      default:
        return "#B71C1C" // Dark red for other statuses
    }
  }

  const handlePackageClick = (trackingNumber) => {
    // Navigate to the PackageStatus page with the tracking number
    window.location.href = `/PackageStatus?tracking=${trackingNumber}`
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
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
          <Box sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}>
            <LocalShipping sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Active Packages
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                View and manage packages at your post office location
              </Typography>
              <Badge
                badgeContent={packages.length}
                color="error"
                sx={{
                  mt: 1,
                  "& .MuiBadge-badge": {
                    bgcolor: "white",
                    color: "#D32F2F",
                    fontWeight: "bold",
                  },
                }}
              >
                <Chip
                  label="Active Packages"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: "medium",
                  }}
                />
              </Badge>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Search and Filter Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search by tracking number, receiver name, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#D32F2F" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FilterAlt sx={{ mr: 1, fontSize: 20 }} />
                  Filter by Status
                </Box>
              </InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Filter by Status"
                sx={{
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
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="in transit">In Transit</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="caption" color="textSecondary" sx={{ display: "block", mt: 1 }}>
          {filteredPackages.length} {filteredPackages.length === 1 ? "package" : "packages"} found
        </Typography>
      </Paper>

      {/* Main Content */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", py: 8 }}>
          <CircularProgress sx={{ color: "#D32F2F", mb: 2 }} />
          <Typography variant="h6" color="textSecondary">
            Loading packages...
          </Typography>
        </Box>
      ) : error ? (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            bgcolor: "#FFEBEE",
            border: "1px solid #FFCDD2",
          }}
          icon={<ErrorOutline />}
        >
          {error}
        </Alert>
      ) : filteredPackages.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 2,
            bgcolor: "#FFEBEE",
            border: "1px solid #FFCDD2",
          }}
        >
          <Inventory2 sx={{ fontSize: 60, color: "#D32F2F", opacity: 0.6, mb: 2 }} />
          <Typography variant="h5" sx={{ color: "#D32F2F", fontWeight: "medium", mb: 1 }}>
            No Active Packages Found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "There are no active packages at your post office location"}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredPackages.map((pkg) => (
            <Grid item xs={12} md={6} lg={4} key={pkg.tracking_number}>
              <Card
                elevation={3}
                onClick={() => handlePackageClick(pkg.tracking_number)}
                sx={{
                  borderRadius: 2,
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(211, 47, 47, 0.2)",
                    cursor: "pointer",
                  },
                  overflow: "visible",
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Status Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -12,
                    right: 16,
                    zIndex: 1,
                  }}
                >
                  <Chip
                    label={pkg.status || "Unknown"}
                    sx={{
                      bgcolor: getStatusColor(pkg.status),
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                  />
                </Box>

                {/* Package Type Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -12,
                    left: 16,
                    zIndex: 1,
                  }}
                >
                  <Chip
                    icon={getPackageIcon(pkg.type)}
                    label={pkg.type || "Package"}
                    sx={{
                      bgcolor: "#FFEBEE",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      "& .MuiChip-icon": {
                        color: "#D32F2F",
                      },
                    }}
                  />
                </Box>

                <CardContent sx={{ pt: 4, pb: 3, flexGrow: 1 }}>
                  {/* Tracking Number */}
                  <Box sx={{ mb: 2, mt: 1, textAlign: "center" }}>
                    <Typography variant="caption" color="textSecondary">
                      TRACKING NUMBER
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: "#D32F2F",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {pkg.tracking_number}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: alpha("#D32F2F", 0.2) }} />

                  {/* Package Details */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Person sx={{ color: "#D32F2F", mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" color="textSecondary">
                          Receiver
                        </Typography>
                      </Box>
                      <Typography fontWeight="medium" sx={{ ml: 4 }}>
                        {pkg.receiver_name || "Not specified"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Scale sx={{ color: "#D32F2F", mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" color="textSecondary">
                          Weight
                        </Typography>
                      </Box>
                      <Typography fontWeight="medium" sx={{ ml: 4 }}>
                        {pkg.weight ? `${pkg.weight} kg` : "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <CalendarToday sx={{ color: "#D32F2F", mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" color="textSecondary">
                          Status
                        </Typography>
                      </Box>
                      <Typography fontWeight="medium" sx={{ ml: 4 }}>
                        {pkg.status || "N/A"}
                      </Typography>
                    </Grid>

                    {pkg.destination_city && (
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <LocationOn sx={{ color: "#D32F2F", mr: 1, fontSize: 20 }} />
                          <Typography variant="body2" color="textSecondary">
                            Destination
                          </Typography>
                        </Box>
                        <Typography fontWeight="medium" sx={{ ml: 4 }}>
                          {pkg.destination_city}, {pkg.destination_state}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default ViewPOPackages

