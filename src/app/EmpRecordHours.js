"use client"

import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext" // Assuming AuthContext is defined elsewhere
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  IconButton,
  ThemeProvider,
  createTheme,
  Chip,
} from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SendIcon from "@mui/icons-material/Send"
import CloseIcon from "@mui/icons-material/Close"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import HourglassTopIcon from "@mui/icons-material/HourglassTop"
import EventAvailableIcon from "@mui/icons-material/EventAvailable"

// Create a custom theme with red as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F", // Match the red used in other components
      light: "#EF5350",
      dark: "#B71C1C",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#D32F2F", // Changed to red to match theme
    },
    success: {
      main: "#D32F2F", // Changed to red to match theme
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
    },
    subtitle2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          boxShadow: "0 4px 8px rgba(211, 47, 47, 0.3)",
          "&:hover": {
            boxShadow: "0 6px 12px rgba(211, 47, 47, 0.4)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

const EmpRecordHours = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  const [hours, setHours] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const { user } = useContext(AuthContext) // Fetching user object from AuthContext

  useEffect(() => {
    if (!user?.employees_id || !user?.po_id) {
      setError("Missing employee ID or post office ID.")
      setLoading(false)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!hours) {
      setError("Please enter hours worked.")
      return
    }

    setLoading(true)
    setError(null)

    const data = {
      date: today, // Use today's date automatically
      hours,
      employees_id: user.employees_id,
      po_id: user.po_id,
    }

    try {
      const response = await fetch("https://apipost.vercel.app/api/empHours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Failed to record hours")

      setSuccessMessage("Hours recorded successfully!")
      // Reset hours field after successful submission
      setHours("")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSuccessMessage(null)
  }

  // Format today's date for display
  const formattedDate = new Date(today).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 8px 24px rgba(211, 47, 47, 0.1)",
            "&:hover": {
              boxShadow: "0 12px 28px rgba(211, 47, 47, 0.15)",
            },
          }}
        >
          {/* Header with gradient background and SVG pattern */}
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
            <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <AccessTimeIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Record Today's Hours
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
                Enter work hours for payroll and tracking
              </Typography>
            </Box>
          </Box>

          {/* Form content */}
          <Box sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              {/* Today's Date Display */}
              <Box
                mb={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  p: 2,
                  bgcolor: "rgba(211, 47, 47, 0.08)",
                  borderRadius: 2,
                  border: "1px solid rgba(211, 47, 47, 0.2)",
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <EventAvailableIcon sx={{ color: "#D32F2F", mr: 1, fontSize: 24 }} />
                  <Typography variant="subtitle1" fontWeight="bold" color="#D32F2F">
                    Today's Date
                  </Typography>
                </Box>
                <Chip
                  label={formattedDate}
                  sx={{
                    bgcolor: "white",
                    color: "#D32F2F",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    py: 2,
                    border: "1px solid rgba(211, 47, 47, 0.3)",
                  }}
                  icon={<CalendarTodayIcon style={{ color: "#D32F2F" }} />}
                />
                <Typography variant="caption" color="text.secondary" mt={1}>
                  Hours will be recorded for today's date
                </Typography>
              </Box>

              <Box mb={4}>
                <Box display="flex" alignItems="center" mb={1}>
                  <HourglassTopIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle2" color="primary">
                    Hours Worked Today
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Enter hours worked"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  required
                  inputProps={{ min: 0, max: 24, step: 0.5 }}
                  size="small"
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#D32F2F",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#D32F2F",
                      },
                    },
                  }}
                />
              </Box>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 2,
                    mb: 3,
                    borderRadius: 2,
                    bgcolor: "#FFEBEE",
                    border: "1px solid #FFCDD2",
                  }}
                  action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setError(null)}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading || !user?.employees_id || !user?.po_id}
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  mt: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              >
                {loading ? "Processing..." : "Record Today's Hours"}
              </Button>
            </form>
          </Box>
        </Paper>

        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
            sx={{
              width: "100%",
              bgcolor: "#D32F2F",
              "& .MuiAlert-icon": {
                color: "white",
              },
            }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  )
}

export default EmpRecordHours

