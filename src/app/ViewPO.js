"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  CircularProgress,
  InputAdornment,
  Card,
  Fade,
  Tooltip,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material"
import BusinessIcon from "@mui/icons-material/Business"
import SearchIcon from "@mui/icons-material/Search"
import MailIcon from "@mui/icons-material/Mail"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LocationOffIcon from "@mui/icons-material/LocationOff"
import RefreshIcon from "@mui/icons-material/Refresh"
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice"

export default function ViewPO() {
  const theme = useTheme()
  const [postOffices, setPostOffices] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPostOffices = async () => {
    try {
      setRefreshing(true)
      const response = await fetch("https://vercel-api-powebapp.vercel.app/api/getPostOfficeLocations")
      const result = await response.json()

      if (result.success) {
        setPostOffices(result.data)
        setError(null)
      } else {
        setError("Failed to load post office data.")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchPostOffices()
  }, [])

  // Filter post offices based on search input
  const filteredPostOffices = postOffices.filter(
    (po) =>
      po.city_name.toLowerCase().includes(search.toLowerCase()) ||
      po.state_name.toLowerCase().includes(search.toLowerCase()) ||
      po.street.toLowerCase().includes(search.toLowerCase()),
  )

  // Custom color palette
  const colors = {
    primary: "#D32F2F",
    primaryLight: "#FFEBEE",
    primaryDark: "#B71C1C",
    secondary: "#F44336",
    accent: "#FF5252",
    background: "#FFFFFF",
    surface: "#F5F5F5",
    text: "#212121",
    textSecondary: "#757575",
    divider: "#EEEEEE",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
  }

  // Styles
  const styles = {
    pageContainer: {
      marginTop: "40px",
      marginBottom: "40px",
      maxWidth: "1200px",
    },
    headerSection: {
      textAlign: "center",
      marginBottom: "40px",
      position: "relative",
    },
    headerIcon: {
      backgroundColor: colors.primary,
      color: "white",
      padding: "16px",
      borderRadius: "50%",
      display: "inline-flex",
      marginBottom: "20px",
      boxShadow: `0 4px 20px ${alpha(colors.primary, 0.3)}`,
    },
    title: {
      fontWeight: 700,
      color: colors.primary,
      marginBottom: "12px",
      letterSpacing: "-0.5px",
    },
    subtitle: {
      color: colors.textSecondary,
      maxWidth: "600px",
      margin: "0 auto 32px auto",
      lineHeight: 1.6,
    },
    searchContainer: {
      marginBottom: "32px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    searchBar: {
      backgroundColor: colors.background,
      borderRadius: "12px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        },
        "&.Mui-focused": {
          boxShadow: `0 4px 20px ${alpha(colors.primary, 0.2)}`,
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(colors.primary, 0.2),
      },
      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: colors.primary,
      },
    },
    card: {
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
      border: `1px solid ${alpha(colors.primary, 0.1)}`,
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 12px 48px rgba(0,0,0,0.16)",
      },
    },
    cardHeader: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      padding: "20px 24px",
      color: "white",
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
    refreshButton: {
      color: "white",
      backgroundColor: alpha("#fff", 0.2),
      "&:hover": {
        backgroundColor: alpha("#fff", 0.3),
      },
    },
    tableContainer: {
      padding: "0",
    },
    tableHeader: {
      backgroundColor: colors.background,
      "& th": {
        color: colors.primaryDark,
        fontWeight: 600,
        fontSize: "14px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        padding: "16px 24px",
        borderBottom: `2px solid ${alpha(colors.primary, 0.2)}`,
      },
    },
    tableRow: {
      transition: "all 0.2s ease",
      "&:nth-of-type(odd)": {
        backgroundColor: alpha(colors.surface, 0.5),
      },
      "&:hover": {
        backgroundColor: alpha(colors.primaryLight, 0.5),
      },
    },
    tableCell: {
      padding: "16px 24px",
      borderBottom: `1px solid ${colors.divider}`,
    },
    iconContainer: {
      backgroundColor: alpha(colors.primary, 0.1),
      padding: "10px",
      borderRadius: "12px",
      marginRight: "12px",
      display: "inline-flex",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: alpha(colors.primary, 0.2),
        transform: "translateY(-2px)",
      },
    },
    poName: {
      fontWeight: 500,
      color: colors.text,
    },
    cityChip: {
      backgroundColor: alpha(colors.primary, 0.1),
      color: colors.primaryDark,
      fontWeight: 500,
      borderRadius: "8px",
      padding: "4px 12px",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: alpha(colors.primary, 0.2),
        boxShadow: `0 2px 8px ${alpha(colors.primary, 0.2)}`,
      },
    },
    locationIcon: {
      fontSize: "18px",
      color: colors.primary,
      marginRight: "8px",
      verticalAlign: "middle",
    },
    emptyState: {
      textAlign: "center",
      padding: "48px 24px",
      color: colors.textSecondary,
    },
    emptyStateIcon: {
      fontSize: "48px",
      color: alpha(colors.primary, 0.5),
      marginBottom: "16px",
    },
    loadingContainer: {
      padding: "48px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    loadingText: {
      marginTop: "16px",
      color: colors.textSecondary,
    },
    footer: {
      textAlign: "center",
      marginTop: "32px",
      color: colors.textSecondary,
      fontSize: "14px",
    },
    statsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "24px",
      marginBottom: "32px",
    },
    statCard: {
      padding: "24px",
      borderRadius: "12px",
      backgroundColor: colors.background,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      width: "180px",
      textAlign: "center",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
      },
    },
    statIcon: {
      backgroundColor: alpha(colors.primary, 0.1),
      color: colors.primary,
      padding: "12px",
      borderRadius: "12px",
      marginBottom: "12px",
      display: "inline-flex",
    },
    statValue: {
      fontSize: "28px",
      fontWeight: 700,
      color: colors.text,
      marginBottom: "4px",
    },
    statLabel: {
      color: colors.textSecondary,
      fontSize: "14px",
    },
  }

  // Calculate stats
  const totalPostOffices = postOffices.length
  const uniqueStates = new Set(postOffices.map((po) => po.state_name)).size
  const uniqueCities = new Set(postOffices.map((po) => po.city_name)).size

  return (
    <Container style={styles.pageContainer}>
      <Box style={styles.headerSection}>
        <Box style={styles.headerIcon}>
          <LocalPostOfficeIcon style={{ fontSize: "32px" }} />
        </Box>
        <Typography variant="h3" style={styles.title}>
          CougarPost Locations
        </Typography>
        <Typography variant="body1" style={styles.subtitle}>
          View all CougarPost locations and their assigned details in one convenient dashboard. Search, filter, and find
          the information you need quickly.
        </Typography>
      </Box>

      {!loading && !error && (
        <Fade in={true} timeout={800}>
          <Box style={styles.statsContainer}>
            <Paper style={styles.statCard}>
              <Box style={styles.statIcon}>
                <BusinessIcon />
              </Box>
              <Typography style={styles.statValue}>{totalPostOffices}</Typography>
              <Typography style={styles.statLabel}>Post Offices</Typography>
            </Paper>
            <Paper style={styles.statCard}>
              <Box style={styles.statIcon}>
                <LocationOnIcon />
              </Box>
              <Typography style={styles.statValue}>{uniqueStates}</Typography>
              <Typography style={styles.statLabel}>States</Typography>
            </Paper>
            <Paper style={styles.statCard}>
              <Box style={styles.statIcon}>
                <MailIcon />
              </Box>
              <Typography style={styles.statValue}>{uniqueCities}</Typography>
              <Typography style={styles.statLabel}>Cities</Typography>
            </Paper>
          </Box>
        </Fade>
      )}

      <Box style={styles.searchContainer}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by city, state, or street address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: colors.primary }} />
              </InputAdornment>
            ),
          }}
          style={styles.searchBar}
        />
      </Box>

      <Card style={styles.card}>
        <Box style={styles.cardHeader}>
          <Box style={styles.cardTitle}>
            <BusinessIcon />
            <Typography variant="h6" style={{ fontWeight: 600, margin: 0 }}>
              Post Office Locations
            </Typography>
          </Box>
          <Tooltip title="Refresh data">
            <IconButton style={styles.refreshButton} onClick={fetchPostOffices} disabled={refreshing}>
              <RefreshIcon
                style={{
                  animation: refreshing ? "spin 1s linear infinite" : "none",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        {loading ? (
          <Box style={styles.loadingContainer}>
            <CircularProgress style={{ color: colors.primary }} />
            <Typography style={styles.loadingText}>Loading post office locations...</Typography>
          </Box>
        ) : error ? (
          <Box style={styles.emptyState}>
            <Typography color="error" variant="h6">
              {error}
            </Typography>
            <Typography style={{ marginTop: "8px" }}>
              Please try refreshing the page or check your connection.
            </Typography>
          </Box>
        ) : (
          <TableContainer style={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow style={styles.tableHeader}>
                  <TableCell>Post Office</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Street</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPostOffices.length > 0 ? (
                  filteredPostOffices.map((po, index) => (
                    <TableRow key={index} style={styles.tableRow}>
                      <TableCell style={styles.tableCell}>
                        <Box display="flex" alignItems="center">
                          <Box style={styles.iconContainer}>
                            <BusinessIcon style={{ fontSize: "20px", color: colors.primary }} />
                          </Box>
                          <Typography style={styles.poName}>
                            {po.po_id} - {po.city_name} Post Office
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell style={styles.tableCell}>
                        <Chip label={po.city_name} style={styles.cityChip} size="small" />
                      </TableCell>
                      <TableCell style={styles.tableCell}>{po.state_name}</TableCell>
                      <TableCell style={styles.tableCell}>
                        <Box display="flex" alignItems="center">
                          <LocationOnIcon style={styles.locationIcon} />
                          <Typography>{po.street}</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} style={styles.emptyState}>
                      <LocationOffIcon style={styles.emptyStateIcon} />
                      <Typography variant="h6" style={{ marginBottom: "8px", color: colors.text }}>
                        No results found
                      </Typography>
                      <Typography>No post offices match your search for "{search}"</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      <Box style={styles.footer}>
        <Typography style={{ marginBottom: "8px" }}>© {new Date().getFullYear()} CougarPost Administration</Typography>
        <Typography variant="caption" style={{ opacity: 0.7 }}>
          Displaying {filteredPostOffices.length} of {postOffices.length} post office locations
        </Typography>
      </Box>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  )
}

