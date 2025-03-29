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
        const response = await fetch("https://apipost.vercel.app/api/viewstaff-admin")
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
        console.error("❌ Error fetching staff:", err)
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

  // Custom styling with all red theme
  const styles = {
    container: {
      marginTop: "40px",
      marginBottom: "40px",
      maxWidth: "1200px",
    },
    header: {
      marginBottom: "32px",
      textAlign: "center",
    },
    title: {
      fontWeight: "700",
      color: "#D32F2F",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
    },
    subtitle: {
      color: "#757575",
      maxWidth: "700px",
      margin: "0 auto",
    },
    searchContainer: {
      marginBottom: "24px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "16px",
      alignItems: "center",
    },
    searchField: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#D32F2F",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#D32F2F",
        },
      },
    },
    filterContainer: {
      display: "flex",
      gap: "16px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    filterSelect: {
      minWidth: "150px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#D32F2F",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#D32F2F",
        },
      },
    },
    statsContainer: {
      marginBottom: "24px",
      display: "flex",
      gap: "16px",
      overflowX: "auto",
      padding: "4px",
      "&::-webkit-scrollbar": {
        height: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(211, 47, 47, 0.3)",
        borderRadius: "3px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: "3px",
      },
    },
    statCard: {
      flex: "1 0 auto",
      width: "180px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      backgroundColor: "#fff",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      },
    },
    statIcon: {
      backgroundColor: "rgba(211, 47, 47, 0.1)",
      color: "#D32F2F",
      padding: "12px",
      borderRadius: "50%",
      marginBottom: "12px",
      display: "inline-flex",
    },
    statValue: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#D32F2F",
      marginBottom: "4px",
    },
    statLabel: {
      color: "#757575",
      fontSize: "14px",
    },
    mainCard: {
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    },
    cardHeader: {
      backgroundColor: "#D32F2F",
      color: "white",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardTitle: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      "& svg": {
        fontSize: "24px",
      },
    },
    tableContainer: {
      padding: "0",
    },
    tableHeader: {
      backgroundColor: "#f5f5f5",
      "& th": {
        color: "#D32F2F",
        fontWeight: "600",
        padding: "16px 24px",
      },
    },
    tableRow: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#fafafa",
      },
      "&:hover": {
        backgroundColor: "rgba(211, 47, 47, 0.05)",
      },
    },
    tableCell: {
      padding: "16px 24px",
    },
    roleChip: {
      fontWeight: "500",
      padding: "4px 8px",
      borderRadius: "4px",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      backgroundColor: "rgba(211, 47, 47, 0.1)",
      color: "#D32F2F",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px 20px",
    },
    emptyStateIcon: {
      fontSize: "48px",
      color: "rgba(211, 47, 47, 0.5)",
      marginBottom: "16px",
    },
    footer: {
      marginTop: "24px",
      textAlign: "center",
      color: "#757575",
      fontSize: "14px",
    },
  }

  // Create stat cards
  const renderStatCards = () => {
    return (
      <Box style={styles.statsContainer}>
        {/* Total Staff Card */}
        <Card style={styles.statCard}>
          <CardContent style={{ textAlign: "center", padding: "20px" }}>
            <Box style={styles.statIcon} display="inline-flex">
              <PersonIcon />
            </Box>
            <Typography style={styles.statValue}>{staffMembers.length}</Typography>
            <Typography style={styles.statLabel}>Total Staff</Typography>
          </CardContent>
        </Card>

        {/* Locations Card */}
        <Card style={styles.statCard}>
          <CardContent style={{ textAlign: "center", padding: "20px" }}>
            <Box style={styles.statIcon} display="inline-flex">
              <BusinessIcon />
            </Box>
            <Typography style={styles.statValue}>{uniqueLocations.length}</Typography>
            <Typography style={styles.statLabel}>Locations</Typography>
          </CardContent>
        </Card>

        {/* Role Cards */}
        {uniqueRoles.map((role) => (
          <Card key={role} style={styles.statCard}>
            <CardContent style={{ textAlign: "center", padding: "20px" }}>
              <Box style={styles.statIcon} display="inline-flex">
                {getRoleIcon(role)}
              </Box>
              <Typography style={styles.statValue}>{staffByRole[role] || 0}</Typography>
              <Typography style={styles.statLabel}>{role}s</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    )
  }

  return (
    <Container style={styles.container}>
      <Box style={styles.header}>
        <Typography variant="h4" style={styles.title}>
          <Badge badgeContent={staffMembers.length} color="error">
            <PersonIcon style={{ fontSize: "32px", color: "#D32F2F" }} />
          </Badge>
          Staff Directory
        </Typography>
        <Typography variant="body1" style={styles.subtitle}>
          View and manage all staff members across all locations. Use the filters and search to find specific employees.
        </Typography>
      </Box>

      {/* Stats cards in a single row */}
      {!loading && !error && (
        <Fade in={true} timeout={800}>
          {renderStatCards()}
        </Fade>
      )}

      {/* Search and filters */}
      <Box style={styles.searchContainer}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, ID, location, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#D32F2F" }} />
              </InputAdornment>
            ),
          }}
          style={styles.searchField}
        />
      </Box>

      <Box style={styles.filterContainer}>
        <FormControl style={styles.filterSelect}>
          <InputLabel>Filter by Role</InputLabel>
          <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} label="Filter by Role">
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

        <FormControl style={styles.filterSelect}>
          <InputLabel>Filter by Location</InputLabel>
          <Select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} label="Filter by Location">
            <MenuItem value="all">All Locations</MenuItem>
            {uniqueLocations.map((location) => (
              <MenuItem key={location} value={location}>
                <Box display="flex" alignItems="center" gap={1}>
                  <BusinessIcon style={{ color: "#D32F2F" }} />
                  {location}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Error alert */}
      {error && (
        <Alert severity="error" style={{ marginBottom: "24px" }}>
          {error}
        </Alert>
      )}

      {/* Main content */}
      <Card style={styles.mainCard}>
        <Box style={styles.cardHeader}>
          <Box style={styles.cardTitle}>
            <BadgeIcon />
            <Typography variant="h6" style={{ fontWeight: 600, margin: 0 }}>
              Staff Members
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Chip
              label={`${filteredStaff.length} of ${staffMembers.length} staff`}
              size="small"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                marginRight: "8px",
              }}
              icon={<InfoIcon style={{ color: "white" }} />}
            />
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={6}>
            <CircularProgress style={{ color: "#D32F2F" }} />
            <Typography style={{ marginTop: "16px", color: "#757575" }}>Loading staff members...</Typography>
          </Box>
        ) : (
          <TableContainer style={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow style={styles.tableHeader}>
                  <TableCell>Employee</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff, index) => (
                    <TableRow key={index} style={styles.tableRow}>
                      <TableCell style={styles.tableCell}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar style={{ backgroundColor: "#D32F2F" }}>{staff.name.charAt(0)}</Avatar>
                          <Typography fontWeight="500">{staff.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={styles.tableCell}>
                        <Chip size="small" label={staff.id} style={{ backgroundColor: "#f5f5f5", fontWeight: "500" }} />
                      </TableCell>
                      <TableCell style={styles.tableCell}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <BusinessIcon style={{ color: "#D32F2F" }} />
                          {staff.locationId || "N/A"}
                        </Box>
                      </TableCell>
                      <TableCell style={styles.tableCell}>
                        <Box style={styles.roleChip}>
                          {getRoleIcon(staff.role)}
                          {staff.role}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} style={styles.emptyState}>
                      <PersonIcon style={styles.emptyStateIcon} />
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
      </Card>

      <Box style={styles.footer}>
        <Typography>© {new Date().getFullYear()} CougarPost Administration</Typography>
        <Typography variant="caption" style={{ opacity: 0.7 }}>
          Staff data last updated: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Container>
  )
}

// Avatar component for compatibility
function Avatar({ children, style }) {
  return (
    <Box
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D32F2F",
        color: "white",
        fontWeight: "bold",
        ...style,
      }}
    >
      {children}
    </Box>
  )
}

