"use client"

import { useContext, useEffect, useState } from "react"
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Alert,
  ThemeProvider,
  createTheme,
  Avatar,
  CardContent,
  Divider,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import PersonIcon from "@mui/icons-material/Person"
import { AuthContext } from "../context/AuthContext"

// Create a custom theme with red as primary color and darker text
const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
      light: "#ff6659",
      dark: "##000a12",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#263238",
      light: "#4f5b62",
      dark: "#000a12",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000.12", // Pure black for text
      secondary: "#000.12", // Very dark gray for secondary text
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 800,
      letterSpacing: "0.5px",
      color: "#000a12",
    },
    h5: {
      fontWeight: 800,
      letterSpacing: "0.5px",
      color: "#ffffff",
    },
    h6: {
      fontWeight: 700,
      letterSpacing: "0.25px",
      color: "#000a12",
    },
    body1: {
      color: "#000a12",
      fontWeight: 500,
    },
    body2: {
      color: "#000a12",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          padding: "10px 24px",
          borderRadius: 8,
        },
        contained: {
          boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#000000", // Pure black for input text
            fontWeight: 600, // Bolder text
            fontSize: "1rem",
          },
          "& .MuiInputLabel-root": {
            color: "#000000", // Black label
            fontWeight: 600, // Medium weight for labels
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#f9f9f9", // Light gray background for all fields
            transition: "all 0.3s",
            border: "1px solid #e0e0e0",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderColor: "#d32f2f",
            },
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
              boxShadow: "0 0 0 2px rgba(211, 47, 47, 0.2)",
              borderColor: "#d32f2f",
            },
            "&.Mui-disabled": {
              backgroundColor: "#f5f5f5", // Slightly darker background for disabled
              "& .MuiInputBase-input": {
                color: "#212121", // Dark gray for disabled text (still readable)
                opacity: 0.9,
              },
            },
          },
        },
      },
    },
  },
})

export default function CustomerInfo() {
  const { user } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [successMsg, setSuccessMsg] = useState("")
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (!user?.customers_id) return

    const fetchProfile = async () => {
      try {
        const res = await fetch("https://apipost.vercel.app/api/customer-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customer_id: user.customers_id }),
        })

        const data = await res.json()
        if (data.success) {
          setProfile(data.profile)
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const handleChange = (field, value) => {
    if (!profile) return
    if (field.startsWith("address.")) {
      const key = field.split(".")[1]
      setProfile((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }))
    } else {
      setProfile((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch("https://apipost.vercel.app/api/update-customer-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: user.customers_id, ...profile }),
      })

      const data = await res.json()
      if (data.success) {
        setSuccessMsg("Profile updated successfully!")
        setEditing(false)
        setTimeout(() => setSuccessMsg(""), 3000)
      }
    } catch (err) {
      console.error("Failed to update profile:", err)
    }
  }

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress color="primary" size={60} thickness={5} />
        </Box>
      </ThemeProvider>
    )
  }

  if (!profile) {
    return (
      <ThemeProvider theme={theme}>
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" fontWeight={600}>
            No profile data found.
          </Typography>
        </Box>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid #e0e0e0",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Header with title and edit button */}
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "white",
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "4px solid #9a0007",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "white",
                  color: "primary.main",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                  border: "2px solid #ffffff",
                }}
              >
                <PersonIcon sx={{ fontSize: 36 }} />
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, textShadow: "1px 1px 2px rgba(0,0,0,0.12)" }}>
                  MY INFORMATION
                </Typography>
              </Box>
            </Box>

            {/* Single edit/save button */}
            {!editing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditing(true)}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: 700,
                  px: 3,
                  py: 1.2,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.12)",
                  },
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.12)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleUpdate}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: 700,
                  px: 3,
                  py: 1.2,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.12)",
                  },
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.12)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Save
              </Button>
            )}
          </Box>

          {/* Success message */}
          {successMsg && (
            <Alert
              severity="success"
              sx={{
                m: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                border: "1px solid #c8e6c9",
                animation: "slideDown 0.5s ease-out",
                "& .MuiAlert-message": {
                  color: "#1b5e20",
                  fontWeight: "bold",
                  fontSize: "1rem",
                },
                "@keyframes slideDown": {
                  "0%": {
                    transform: "translateY(-20px)",
                    opacity: 0,
                  },
                  "100%": {
                    transform: "translateY(0)",
                    opacity: 1,
                  },
                },
              }}
            >
              {successMsg}
            </Alert>
          )}

          <CardContent sx={{ p: 4 }}>
            {/* Personal Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  pb: 1,
                  borderBottom: "2px solid #f0f0f0",
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                Personal Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    variant="outlined"
                    value={profile.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                    disabled={!editing}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontWeight: 600,
                        color: "#000000",
                        fontSize: "1.05rem",
                        padding: "14px 16px",
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 600,
                        color: "#000000",
                      },
                      "& .Mui-disabled .MuiInputBase-input": {
                        color: "#000000",
                        WebkitTextFillColor: "#000000",
                        opacity: 0.9,
                      },
                      "& .MuiOutlinedInput-root": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        backgroundColor: "#f9f9f9",
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    value={profile.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                    disabled={!editing}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontWeight: 600,
                        color: "#000000",
                        fontSize: "1.05rem",
                        padding: "14px 16px",
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 600,
                        color: "#000000",
                      },
                      "& .Mui-disabled .MuiInputBase-input": {
                        color: "#000000",
                        WebkitTextFillColor: "#000000",
                        opacity: 0.9,
                      },
                      "& .MuiOutlinedInput-root": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        backgroundColor: "#f9f9f9",
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3, borderColor: "#e0e0e0" }} />

            {/* Contact Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  pb: 1,
                  borderBottom: "2px solid #f0f0f0",
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    variant="outlined"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    disabled={!editing}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontWeight: 600,
                        color: "#000000",
                        fontSize: "1.05rem",
                        padding: "14px 16px",
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 600,
                        color: "#000000",
                      },
                      "& .Mui-disabled .MuiInputBase-input": {
                        color: "#000000",
                        WebkitTextFillColor: "#000000",
                        opacity: 0.9,
                      },
                      "& .MuiOutlinedInput-root": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        backgroundColor: "#f9f9f9",
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    fullWidth
                    variant="outlined"
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    disabled={!editing}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontWeight: 600,
                        color: "#000000",
                        fontSize: "1.05rem",
                        padding: "14px 16px",
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 600,
                        color: "#000000",
                      },
                      "& .Mui-disabled .MuiInputBase-input": {
                        color: "#000000",
                        WebkitTextFillColor: "#000000",
                        opacity: 0.9,
                      },
                      "& .MuiOutlinedInput-root": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        backgroundColor: "#f9f9f9",
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3, borderColor: "#e0e0e0" }} />

            {/* Address Information Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  pb: 1,
                  borderBottom: "2px solid #f0f0f0",
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                Address Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    value={profile.address.street}
                    onChange={(e) => handleChange("address.street", e.target.value)}
                    disabled={!editing}
                    sx={{
                      mb: 3,
                      "& .MuiInputBase-input": {
                        fontWeight: 600,
                        color: "#000000",
                        fontSize: "1.05rem",
                        padding: "14px 16px",
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 600,
                        color: "#000000",
                      },
                      "& .Mui-disabled .MuiInputBase-input": {
                        color: "#000000",
                        WebkitTextFillColor: "#000000",
                        opacity: 0.9,
                      },
                      "& .MuiOutlinedInput-root": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        backgroundColor: "#f9f9f9",
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="City"
                    fullWidth
                    variant="outlined"
                    value={profile.address.city}
                    onChange={(e) => handleChange("address.city", e.target.value)}
                    disabled={!editing}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontWeight: 600,
                        color: "#000000",
                        fontSize: "1.05rem",
                        padding: "14px 16px",
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 600,
                        color: "#000000",
                      },
                      "& .Mui-disabled .MuiInputBase-input": {
                        color: "#000000",
                        WebkitTextFillColor: "#000000",
                        opacity: 0.9,
                      },
                      "& .MuiOutlinedInput-root": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        backgroundColor: "#f9f9f9",
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="State"
                    fullWidth
                    variant="outlined"
                    value={profile.address.state}
                    onChange={(e) => handleChange("address.state", e.target.value)}
                    disabled={!editing}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontWeight: 600,
                        color: "#000000",
                        fontSize: "1.05rem",
                        padding: "14px 16px",
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 600,
                        color: "#000000",
                      },
                      "& .Mui-disabled .MuiInputBase-input": {
                        color: "#000000",
                        WebkitTextFillColor: "#000000",
                        opacity: 0.9,
                      },
                      "& .MuiOutlinedInput-root": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        backgroundColor: "#f9f9f9",
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="ZIP Code"
                    fullWidth
                    variant="outlined"
                    value={profile.address.zip}
                    onChange={(e) => handleChange("address.zip", e.target.value)}
                    disabled={!editing}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontWeight: 600,
                        color: "#000000",
                        fontSize: "1.05rem",
                        padding: "14px 16px",
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 600,
                        color: "#000000",
                      },
                      "& .Mui-disabled .MuiInputBase-input": {
                        color: "#000000",
                        WebkitTextFillColor: "#000000",
                        opacity: 0.9,
                      },
                      "& .MuiOutlinedInput-root": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        backgroundColor: "#f9f9f9",
                        "&.Mui-disabled": {
                          backgroundColor: "#f5f5f5",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

