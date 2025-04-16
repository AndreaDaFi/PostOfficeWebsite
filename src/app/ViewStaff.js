"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  CircularProgress,
  Box,
  Chip,
  Card,
  CardContent,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Badge,
  Fade,
  useMediaQuery,
  useTheme,
  Paper,
  Avatar,
  Grid,
} from "@mui/material"
import {
  Business as BusinessIcon,
  Badge as BadgeIcon,
  Work as WorkIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Info as InfoIcon,
} from "@mui/icons-material"

export default function ViewStaff() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [staffMembers, setStaffMembers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [roleFilter, setRoleFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("https://vercel-api-post-office-seven.vercel.app/api/viewstaff-admin")
        const data = await response.json()

        if (Array.isArray(data.data) && data.data.length > 0) {
          // Filter out users with role "admin"
          const filteredData = data.data.filter((staff) => staff.role.toLowerCase() !== "admin")
          setStaffMembers(filteredData)
          setError(null)
        } else {
          console.error("⚠ API returned an empty array:", data)
          setError("No staff members found in the database.")
        }
      } catch (err) {
        console.error("Error fetching staff:", err)
        setError(err.message || "Failed to fetch staff data")
      } finally {
        setLoading(false)
      }
    }

    fetchStaff()
  }, [])

  // Get unique locations for filter
  const uniqueLocations = [...new Set(staffMembers.map((staff) => staff.locationId || "N/A"))]

  // Get unique roles for filter
  const uniqueRoles = [...new Set(staffMembers.map((staff) => staff.role))]

  // Apply filters
  const filteredStaff = staffMembers.filter((staff) => {
    // Search filter
    const matchesSearch = `${staff.name} ${staff.id} ${staff.locationId || "N/A"} ${staff.role}`
      .toLowerCase()
      .includes(search.toLowerCase())

    // Role filter
    const matchesRole = roleFilter === "all" || staff.role === roleFilter

    // Location filter
    const staffLocation = staff.locationId || "N/A"
    const matchesLocation = locationFilter === "all" || staffLocation === locationFilter

    return matchesSearch && matchesRole && matchesLocation
  })

  // Count staff by role
  const staffByRole = {}
  staffMembers.forEach((staff) => {
    staffByRole[staff.role] = (staffByRole[staff.role] || 0) + 1
  })

  // Count staff by location
  const staffByLocation = {}
  staffMembers.forEach((staff) => {
    const location = staff.locationId || "N/A"
    staffByLocation[location] = (staffByLocation[location] || 0) + 1
  })

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "manager":
        return <SupervisorAccountIcon />
      case "clerk":
        return <PersonIcon />
      case "driver":
        return <LocationOnIcon />
      case "sorter":
        return <WorkIcon />
      default:
        return <BadgeIcon />
    }
  }

  // Create stat cards
  const renderStatCards = () => {
    return (
      <Box sx={{ display: "flex", gap: 2, mb: 4, overflowX: "auto", py: 1, px: 0.5 }}>
        {/* Total Staff Card */}
        <Card
          sx={{
            flex: "1 0 auto",
            minWidth: 180,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center", p: 2.5 }}>
            <Box
              sx={{
                bgcolor: "rgba(211, 47, 47, 0.1)",
                color: "#D32F2F",
                p: 1.5,
                borderRadius: "50%",
                mb: 1.5,
                display: "inline-flex",
              }}
            >
              <PersonIcon />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#D32F2F", mb: 0.5 }}>
              {staffMembers.length}
            </Typography>
            <Typography variant="body2" sx={{ color: "#757575" }}>
              Total Staff
            </Typography>
          </CardContent>
        </Card>

        {/* Locations Card */}
        <Card
          sx={{
            flex: "1 0 auto",
            minWidth: 180,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center", p: 2.5 }}>
            <Box
              sx={{
                bgcolor: "rgba(211, 47, 47, 0.1)",
                color: "#D32F2F",
                p: 1.5,
                borderRadius: "50%",
                mb: 1.5,
                display: "inline-flex",
              }}
            >
              <BusinessIcon />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#D32F2F", mb: 0.5 }}>
              {uniqueLocations.length}
            </Typography>
            <Typography variant="body2" sx={{ color: "#757575" }}>
              Locations
            </Typography>
          </CardContent>
        </Card>

        {/* Role Cards */}
        {uniqueRoles.map((role) => (
          <Card
            key={role}
            sx={{
              flex: "1 0 auto",
              minWidth: 180,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 2.5 }}>
              <Box
                sx={{
                  bgcolor: "rgba(211, 47, 47, 0.1)",
                  color: "#D32F2F",
                  p: 1.5,
                  borderRadius: "50%",
                  mb: 1.5,
                  display: "inline-flex",
                }}
              >
                {getRoleIcon(role)}
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#D32F2F", mb: 0.5 }}>
                {staffByRole[role] || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: "#757575" }}>
                {role}s
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    )
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
            <Badge badgeContent={staffMembers.length} color="error" sx={{ mr: 2 }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Badge>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Staff Directory
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                View and manage all staff members across all locations
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Stats cards in a single row */}
      {!loading && !error && (
        <Fade in={true} timeout={800}>
          {renderStatCards()}
        </Fade>
      )}

      {/* Search and filters */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, ID, location, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#D32F2F" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
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
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Filter by Role</InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              label="Filter by Role"
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D32F2F",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D32F2F",
                },
              }}
            >
              <MenuItem value="all">All Roles</MenuItem>
              {uniqueRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getRoleIcon(role)}
                    {role}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Filter by Location</InputLabel>
            <Select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              label="Filter by Location"
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D32F2F",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D32F2F",
                },
              }}
            >
              <MenuItem value="all">All Locations</MenuItem>
              {uniqueLocations.map((location) => (
                <MenuItem key={location} value={location}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <BusinessIcon sx={{ color: "#D32F2F" }} />
                    {location}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Error alert */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            bgcolor: "#FFEBEE",
            border: "1px solid #FFCDD2",
          }}
        >
          {error}
        </Alert>
      )}

      {/* Main content */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            bgcolor: "#B71C1C",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <BadgeIcon />
            <Typography variant="h6" fontWeight="bold">
              Staff Members
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Chip
              label={`${filteredStaff.length} of ${staffMembers.length} staff`}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
              }}
              icon={<InfoIcon sx={{ color: "white !important" }} />}
            />
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={6}>
            <CircularProgress sx={{ color: "#D32F2F" }} />
            <Typography sx={{ mt: 2, color: "#757575" }}>Loading staff members...</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell sx={{ color: "#D32F2F", fontWeight: 600, py: 2, px: 3 }}>Employee</TableCell>
                  <TableCell sx={{ color: "#D32F2F", fontWeight: 600, py: 2, px: 3 }}>ID</TableCell>
                  <TableCell sx={{ color: "#D32F2F", fontWeight: 600, py: 2, px: 3 }}>Location</TableCell>
                  <TableCell sx={{ color: "#D32F2F", fontWeight: 600, py: 2, px: 3 }}>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": {
                          bgcolor: "#fafafa",
                        },
                        "&:hover": {
                          bgcolor: "rgba(211, 47, 47, 0.05)",
                        },
                      }}
                    >
                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: "#D32F2F" }}>{staff.name.charAt(0)}</Avatar>
                          <Typography fontWeight="500">{staff.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Chip size="small" label={staff.id} sx={{ bgcolor: "#f5f5f5", fontWeight: "500" }} />
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <BusinessIcon sx={{ color: "#D32F2F" }} />
                          {staff.locationId || "N/A"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.75,
                            bgcolor: "rgba(211, 47, 47, 0.1)",
                            color: "#D32F2F",
                            fontWeight: 500,
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          {getRoleIcon(staff.role)}
                          {staff.role}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: "center", py: 5 }}>
                      <PersonIcon sx={{ fontSize: 48, color: "rgba(211, 47, 47, 0.5)", mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        No staff members found
                      </Typography>
                      <Typography>
                        {search ? `No results match your search "${search}"` : "There are no staff members to display"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Box sx={{ mt: 3, textAlign: "center", color: "#757575" }}>
        <Typography>© {new Date().getFullYear()} CougarPost Administration</Typography>
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          Staff data last updated: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Container>
  )
}

