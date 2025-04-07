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
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material"
import {
  LocalShipping,
  Inventory2,
  LocalPostOffice,
  ErrorOutline,
  Search,
  LocationOn,
  Person,
  Scale,
  Info,
  Speed,
  Refresh,
  Category,
  ArrowForward,
} from "@mui/icons-material"
import { AuthContext } from "../context/AuthContext"

const ViewPOPackages = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { user } = useContext(AuthContext)
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [fast, setFast] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [refreshing, setRefreshing] = useState(false)

  // Simple color palette with whites and reds
  const colors = {
    primary: "#D32F2F",
    primaryDark: "#B71C1C",
    primaryLight: "#FFCDD2",
    primaryLighter: "#FFEBEE",
    secondary: "#424242",
    accent: "#FF5252",
    white: "#FFFFFF",
    lightRed: "#FFEBEE", // Very light red instead of light gray
    mediumGray: "#E0E0E0",
    darkGray: "#757575",
    success: "#2E7D32",
    warning: "#FF9800",
  }

  const fetchData = async () => {
    if (!user?.po_id) {
      setError("❌ No post office ID found in your account.")
      setLoading(false)
      return
    }

    try {
      setRefreshing(true)
      const res = await fetch("https://apipost.vercel.app/api/getPackagesByPostOffice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ po_id: user.po_id }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to load packages")

      // Filter out delivered packages
      const nonDeliveredPackages = (data.packages || []).filter((pkg) => {
        return (pkg.status || "").toLowerCase() !== "delivered"
      })

      setPackages(nonDeliveredPackages)
      setFilteredPackages(nonDeliveredPackages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  const handleRefresh = () => {
    fetchData()
  }

  const FastSwitch = () => {
    setFast(!fast)
  }

  // Apply filters when search term or status filter changes
  useEffect(() => {
    let filtered = [...packages]

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((pkg) => pkg.status?.toLowerCase() === statusFilter.toLowerCase())
    }

    if (fast) {
      filtered = filtered.filter((pkg) => pkg.fast_delivery === "1")
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter((pkg) => {
        if (pkg.type === null && "store order".includes(search)) {
          return true
        }
        const trackingNumber = pkg.tracking_number ? pkg.tracking_number.toString() : ""
        const receiverName = pkg.receiver_name ? pkg.receiver_name.toLowerCase() : ""
        const type = pkg.type ? pkg.type.toLowerCase() : ""
        const originAddress = pkg.origin_address ? pkg.origin_address.toLowerCase() : ""
        const destinationAddress = pkg.destination_address ? pkg.destination_address.toLowerCase() : ""
        const originState = pkg.origin_state ? pkg.origin_state.toLowerCase() : ""
        const destinationState = pkg.destination_state ? pkg.destination_state.toLowerCase() : ""

        return (
          trackingNumber.includes(search) ||
          receiverName.includes(search) ||
          type.includes(search) ||
          originAddress.includes(search) ||
          destinationAddress.includes(search) ||
          originState.includes(search) ||
          destinationState.includes(search)
        )
      })
    }

    setFilteredPackages(filtered)
  }, [searchTerm, statusFilter, packages, fast])

  // Function to get appropriate icon based on package type
  const getPackageIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "letter":
        return <LocalPostOffice />
      case "parcel":
        return <Inventory2 />
      default:
        return <LocalShipping />
    }
  }

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in transit":
        return colors.primary // Red for in transit
      case "printed label":
        return colors.accent // Lighter red for printed label
      case "pending":
        return "#FF8A80" // Even lighter red for pending
      case "out for delivery":
        return colors.success // Green for out for delivery
      case "missing":
        return colors.warning // Orange for missing
      case "returned":
        return colors.secondary // Gray for returned
      default:
        return colors.primaryDark // Dark red for other statuses
    }
  }

  const handlePackageClick = (trackingNumber) => {
    // Navigate to the PackageStatus page with the tracking number
    window.location.href = `/PackageStatus?tracking=${trackingNumber}`
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4, pb: 4 }}>
      {/* Simple Header with pattern */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          mb: 4,
          border: `1px solid ${colors.mediumGray}`,
        }}
      >
        <Box
          sx={{
            bgcolor: colors.primary,
            color: colors.white,
            p: 3,
            position: "relative",
          }}
        >
          {/* Pattern overlay */}
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

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 2,
              position: "relative", // To appear above the pattern
              zIndex: 1,
            }}
          >
            <LocalShipping sx={{ fontSize: { xs: 32, sm: 40 } }} />
            <Box sx={{ textAlign: { xs: "center", sm: "left" }, width: "100%" }}>
              <Typography variant="h4" fontWeight="bold">
                Active Packages
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                View and manage packages at your post office location
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Simple Search and Filter Section */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "12px",
          border: `1px solid ${colors.mediumGray}`,
          bgcolor: colors.white,
        }}
      >
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search by tracking number, origin, destination, receiver name, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: colors.primary }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">Filter by Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Filter by Status"
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="in Transit">In Transit</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                <MenuItem value="Printed label">Printed label</MenuItem>
                <MenuItem value="Missing">Missing</MenuItem>
                <MenuItem value="Returned">Returned</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={fast}
                    onChange={FastSwitch}
                    name="itemToggle"
                    color="default"
                    size="medium"
                    sx={{
                      "& .MuiSwitch-thumb": {
                        backgroundColor: fast ? colors.primary : colors.darkGray,
                      },
                      "& .MuiSwitch-track": {
                        backgroundColor: fast ? colors.primary : colors.darkGray,
                        borderRadius: "50px",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        transform: "translateX(16px)",
                        color: "#fff",
                      },
                      "& .MuiSwitch-switchBase": {
                        padding: 5,
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Speed sx={{ color: fast ? colors.primary : colors.darkGray, fontSize: 18 }} />
                    <Typography sx={{ color: fast ? colors.primary : colors.secondary, fontWeight: fast ? 500 : 400 }}>
                      {fast ? "Fast Delivery Only" : "All Delivery Types"}
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mt: 3,
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Info fontSize="small" sx={{ color: colors.primary }} />
            {filteredPackages.length} {filteredPackages.length === 1 ? "package" : "packages"} found
          </Typography>
          <IconButton onClick={handleRefresh} disabled={refreshing} sx={{ color: colors.primary }}>
            <Refresh />
          </IconButton>
        </Box>
      </Paper>

      {/* Main Content with white and red styling */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            py: 8,
          }}
        >
          <CircularProgress sx={{ color: colors.primary, mb: 2 }} />
          <Typography variant="h6">Loading packages...</Typography>
        </Box>
      ) : error ? (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: "12px",
          }}
          icon={<ErrorOutline />}
        >
          {error}
        </Alert>
      ) : filteredPackages.length === 0 ? (
        <Paper
          elevation={2}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "12px",
            border: `1px solid ${colors.mediumGray}`,
            bgcolor: colors.white,
          }}
        >
          <Inventory2 sx={{ fontSize: 60, color: colors.primary, mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 1 }}>
            No Active Packages Found
          </Typography>
          <Typography variant="body1">
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
                elevation={2}
                onClick={() => handlePackageClick(pkg.tracking_number)}
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: `1px solid ${colors.mediumGray}`,
                  mb: 2,
                  bgcolor: colors.white,
                }}
              >
                {/* Status Badge - Simplified */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderBottom: `1px solid ${colors.mediumGray}`,
                    bgcolor: colors.primary,
                    color: colors.white,
                    position: "relative",
                  }}
                >
                  {/* Pattern overlay for card header */}
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

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative", zIndex: 1 }}>
                    {getPackageIcon(pkg.type)}
                    <Typography variant="subtitle1" fontWeight="medium">
                      {pkg.type || "Store Order"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, position: "relative", zIndex: 1 }}>
                    <Chip
                      label={pkg.status || "Unknown"}
                      sx={{
                        bgcolor: getStatusColor(pkg.status),
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                      size="small"
                    />
                    {pkg.fast_delivery === "1" && (
                      <Chip
                        icon={<Speed sx={{ color: `${colors.white} !important` }} />}
                        label="Fast"
                        sx={{
                          bgcolor: colors.primaryDark,
                          color: colors.white,
                          fontWeight: "bold",
                        }}
                        size="small"
                      />
                    )}
                  </Box>
                </Box>

                <CardContent sx={{ pt: 2, pb: 3, flexGrow: 1 }}>
                  {/* Tracking Number - Simplified */}
                  <Box sx={{ mb: 3, textAlign: "center" }}>
                    <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                      TRACKING NUMBER
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: colors.primary,
                        wordBreak: "break-word",
                      }}
                    >
                      {pkg.tracking_number}
                    </Typography>
                  </Box>

                  {/* Origin and Destination - With white background and red border */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                      ORIGIN
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        wordBreak: "break-word",
                        mb: 2,
                        p: 1.5,
                        bgcolor: colors.white,
                        borderRadius: "8px",
                        border: `1px solid ${colors.primaryLight}`,
                      }}
                    >
                      {pkg.origin_address || "Not specified"}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                      <ArrowForward sx={{ color: colors.primary }} />
                    </Box>

                    <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                      DESTINATION
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        wordBreak: "break-word",
                        p: 1.5,
                        bgcolor: colors.white,
                        borderRadius: "8px",
                        border: `1px solid ${colors.primaryLight}`,
                      }}
                    >
                      {pkg.destination_address || "Not specified"}
                    </Typography>
                  </Box>

                  {/* Package Contents/Items - With white background and red border */}
                  {pkg.store_order_items && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                        PACKAGE CONTENTS
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          wordBreak: "break-word",
                          p: 1.5,
                          bgcolor: colors.white,
                          borderRadius: "8px",
                          border: `1px solid ${colors.primaryLight}`,
                        }}
                      >
                        {pkg.store_order_items}
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  {/* Package Details - With white background and red accents */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1.5,
                          bgcolor: colors.white,
                          borderRadius: "8px",
                          border: `1px solid ${colors.primaryLight}`,
                        }}
                      >
                        <Person sx={{ color: colors.primary, mr: 1.5 }} />
                        <Box sx={{ minWidth: 0, width: "100%" }}>
                          <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>
                            Receiver
                          </Typography>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            {pkg.receiver_name || "Not specified"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1.5,
                          height: "100%",
                          bgcolor: colors.white,
                          borderRadius: "8px",
                          border: `1px solid ${colors.primaryLight}`,
                        }}
                      >
                        <Scale sx={{ color: colors.primary, mr: 1.5 }} />
                        <Box sx={{ minWidth: 0, width: "100%" }}>
                          <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>
                            Weight
                          </Typography>
                          <Typography noWrap>{pkg.weight ? `${pkg.weight} kg` : "N/A"}</Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1.5,
                          height: "100%",
                          bgcolor: colors.white,
                          borderRadius: "8px",
                          border: `1px solid ${colors.primaryLight}`,
                        }}
                      >
                        <Category sx={{ color: colors.primary, mr: 1.5 }} />
                        <Box sx={{ minWidth: 0, width: "100%" }}>
                          <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>
                            Package Type
                          </Typography>
                          <Typography noWrap>{pkg.type || "Store Order"}</Typography>
                        </Box>
                      </Box>
                    </Grid>

                    {pkg.destination_city && (
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 1.5,
                            bgcolor: colors.white,
                            borderRadius: "8px",
                            border: `1px solid ${colors.primaryLight}`,
                          }}
                        >
                          <LocationOn sx={{ color: colors.primary, mr: 1.5 }} />
                          <Box sx={{ minWidth: 0, width: "100%" }}>
                            <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>
                              Destination
                            </Typography>
                            <Typography sx={{ wordBreak: "break-word" }}>
                              {pkg.destination_city}, {pkg.destination_state}
                            </Typography>
                          </Box>
                        </Box>
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

