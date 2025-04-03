"use client"

import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
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
  InputAdornment,
  CircularProgress,
  Box,
  Alert,
  Avatar,
  Chip,
  Divider,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import BadgeIcon from "@mui/icons-material/Badge"
import PersonIcon from "@mui/icons-material/Person"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import PersonOffIcon from "@mui/icons-material/PersonOff"
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"

export default function ViewStaff() {
  const { user } = useContext(AuthContext)
  const [staffMembers, setStaffMembers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStaff = async () => {
      const mngr_id = user?.employees_id // Get the manager's ID
      if (!mngr_id) {
        setError("Missing manager ID")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`https://apipost.vercel.app/api/MngrViewStaff?mngr_id=${mngr_id}`, {
          method: "GET",
        })

        const data = await response.json()
        console.log("Fetched Data:", data)

        if (Array.isArray(data.data) && data.data.length > 0) {
          setStaffMembers(data.data)
        } else {
          console.error("⚠ API returned an empty array:", data)
          setError("No staff members found")
        }
      } catch (err) {
        console.error("❌ Error fetching staff:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStaff()
  }, [user])

  // Filter staff members based on search input
  const filteredStaff = staffMembers.filter((staff) =>
    `${staff.name} ${staff.id} ${staff.role} ${staff.email} ${staff.phone}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  // Get role icon based on role name
  const getRoleIcon = (role) => {
    const roleLower = role.toLowerCase()
    if (roleLower.includes("manager")) {
      return <SupervisorAccountIcon sx={{ fontSize: 18, mr: 0.5 }} />
    } else if (roleLower.includes("driver")) {
      return <LocalShippingIcon sx={{ fontSize: 18, mr: 0.5 }} />
    } else if (roleLower.includes("clerk")) {
      return <SupportAgentIcon sx={{ fontSize: 18, mr: 0.5 }} />
    } else {
      return <BadgeIcon sx={{ fontSize: 18, mr: 0.5 }} />
    }
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
            <BadgeIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Staff Directory
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                View all staff members in your location
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  bgcolor: "rgba(255,255,255,0.2)",
                  py: 0.5,
                  px: 2,
                  borderRadius: 2,
                  width: "fit-content",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {staffMembers.length} {staffMembers.length === 1 ? "employee" : "employees"} found
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Search field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name, ID, role, email, or phone..."
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
          mb: 3,
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

      {!loading && !error && staffMembers.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              background: "linear-gradient(to right, #FFEBEE, #FFFFFF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "#B71C1C",
                  width: 56,
                  height: 56,
                  boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                }}
              >
                <BadgeIcon fontSize="large" />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Staff Directory
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your team members
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ textAlign: "center", minWidth: 100 }}>
                <Typography variant="h4" fontWeight="bold" color="#D32F2F">
                  {staffMembers.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Staff
                </Typography>
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <Box sx={{ textAlign: "center", minWidth: 100 }}>
                <Typography variant="h4" fontWeight="bold" color="#D32F2F">
                  {new Set(staffMembers.map((s) => s.role)).size}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Roles
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}

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
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={6}>
          <CircularProgress sx={{ color: "#D32F2F" }} />
          <Typography sx={{ mt: 2, color: "#757575" }}>Loading staff members...</Typography>
        </Box>
      ) : (
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
            }}
          >
            <PersonIcon sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Staff Members
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell sx={{ color: "#D32F2F", fontWeight: 600, py: 2 }}>Name</TableCell>
                  <TableCell sx={{ color: "#D32F2F", fontWeight: 600, py: 2 }}>Employee ID</TableCell>
                  <TableCell sx={{ color: "#D32F2F", fontWeight: 600, py: 2 }}>Role</TableCell>
                  <TableCell sx={{ color: "#D32F2F", fontWeight: 600, py: 2 }}>Email</TableCell>
                  <TableCell sx={{ color: "#D32F2F", fontWeight: 600, py: 2 }}>Phone</TableCell>
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
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: `hsl(0, ${70 + (index % 3) * 10}%, ${45 - (index % 4) * 5}%)`,
                              width: 45,
                              height: 45,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                            }}
                          >
                            {staff.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          <Typography fontWeight="medium">{staff.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          label={staff.id}
                          size="small"
                          sx={{
                            bgcolor: "#f5f5f5",
                            fontWeight: "500",
                            border: "1px solid #e0e0e0",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            bgcolor: "rgba(211, 47, 47, 0.1)",
                            color: "#D32F2F",
                            fontWeight: 500,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          {getRoleIcon(staff.role)}
                          <Typography sx={{ ml: 0.5 }}>{staff.role}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <EmailIcon sx={{ color: "#757575", mr: 1, fontSize: 18 }} />
                          <Typography>{staff.email}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PhoneIcon sx={{ color: "#757575", mr: 1, fontSize: 18 }} />
                          <Typography>{staff.phone}</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4 }}>
                        <Avatar
                          sx={{
                            bgcolor: "#FFCDD2",
                            color: "#B71C1C",
                            width: 60,
                            height: 60,
                            mb: 2,
                          }}
                        >
                          <PersonOffIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6" sx={{ color: "#B71C1C", fontWeight: "medium" }}>
                          No staff members found
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#757575", mt: 1 }}>
                          {search
                            ? `No results match your search "${search}"`
                            : "There are no staff members to display"}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  )
}

