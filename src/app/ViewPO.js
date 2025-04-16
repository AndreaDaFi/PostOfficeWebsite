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
  CircularProgress,
  Alert,
  InputAdornment,
  Chip,
} from "@mui/material"
import BusinessIcon from "@mui/icons-material/Business"
import SearchIcon from "@mui/icons-material/Search"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PublicIcon from "@mui/icons-material/Public"
import HomeIcon from "@mui/icons-material/Home"

export default function ViewPO() {
  // State for holding fetched data, search term, loading and error
  const [postOffices, setPostOffices] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchPostOffices = async () => {
      try {
        const response = await fetch("https://vercel-api-post-office-seven.vercel.app/api/getPostOfficeLocations") // Your API endpoint
        const result = await response.json()

        if (result.success) {
          setPostOffices(result.data) // Set the fetched data to state
        } else {
          setError("Failed to load post office data.")
        }
      } catch (error) {
        setError(error.message) // Set error if fetch fails
      } finally {
        setLoading(false) // Set loading to false when data is fetched or error occurs
      }
    }

    fetchPostOffices()
  }, [])

  // Filter post offices based on search input
  const filteredPostOffices = postOffices.filter(
    (po) =>
      po.city_name.toLowerCase().includes(search.toLowerCase()) ||
      po.state_name.toLowerCase().includes(search.toLowerCase()) ||
      po.street.toLowerCase().includes(search.toLowerCase()),
  )

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
            textAlign: "center",
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
          <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <BusinessIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold">
              Post Office Locations
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
              View all CougarPost locations and their details
            </Typography>
            <Chip
              label={`${postOffices.length} Locations Available`}
              sx={{
                mt: 2,
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "medium",
              }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Search Bar */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by city, state, or street address..."
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
        <Typography variant="caption" color="textSecondary" sx={{ display: "block", mt: 1 }}>
          {filteredPostOffices.length} {filteredPostOffices.length === 1 ? "result" : "results"} found
        </Typography>
      </Paper>

      {/* Post Office List */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", py: 8 }}>
          <CircularProgress sx={{ color: "#D32F2F", mb: 2 }} />
          <Typography variant="h6" color="textSecondary">
            Loading post office locations...
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
        >
          {error}
        </Alert>
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "100%",
            height: "auto", // Changed from 100% to auto
          }}
        >
          <Box
            sx={{
              bgcolor: "#B71C1C",
              color: "white",
              p: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <BusinessIcon sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Post Office Directory
            </Typography>
          </Box>

          <TableContainer
            sx={{
              overflowX: "auto",
              width: "100%",
              maxWidth: "100%",
              overflowY: "hidden", // This prevents vertical scrolling
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BusinessIcon sx={{ mr: 1, fontSize: 20 }} />
                      Post Office
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
                      City
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PublicIcon sx={{ mr: 1, fontSize: 20 }} />
                      State
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HomeIcon sx={{ mr: 1, fontSize: 20 }} />
                      Street Address
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPostOffices.length > 0 ? (
                  filteredPostOffices.map((po, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        "&:nth-of-type(odd)": {
                          bgcolor: "#fafafa",
                        },
                        "&:hover": {
                          bgcolor: "#FFEBEE",
                        },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <BusinessIcon sx={{ color: "#D32F2F", mr: 1 }} />
                          <Typography fontWeight="medium">
                            {po.po_id} - {po.city_name} Post Office
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={po.city_name}
                          size="small"
                          sx={{
                            bgcolor: "#FFEBEE",
                            color: "#D32F2F",
                            fontWeight: "medium",
                          }}
                        />
                      </TableCell>
                      <TableCell>{po.state_name}</TableCell>
                      <TableCell>{po.street}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <SearchIcon sx={{ color: "#D32F2F", fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" sx={{ color: "#D32F2F", fontWeight: "medium" }}>
                          No results found
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Try adjusting your search terms
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderTop: "1px solid #e0e0e0", textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              Showing {filteredPostOffices.length} of {postOffices.length} post office locations
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  )
}

