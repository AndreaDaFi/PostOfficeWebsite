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
  Divider,
  Snackbar,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SendIcon from "@mui/icons-material/Send"
import CloseIcon from "@mui/icons-material/Close"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import HourglassTopIcon from "@mui/icons-material/HourglassTop"
import { red } from "@mui/material/colors"

// Create a custom theme with red as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: red[700], // Deep red
      light: red[500],
      dark: red[900],
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#ff3d00",
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
  const [date, setDate] = useState("")
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

    // Check date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!date || !dateRegex.test(date)) {
      setError("Please enter a valid date in YYYY-MM-DD format.")
      return
    }

    if (!hours) {
      setError("Please enter hours worked.")
      return
    }

    setLoading(true)
    setError(null)

    const data = {
      date,
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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            transition: "all 0.3s ease-in-out",
            background: "linear-gradient(to bottom, #ffffff, #fff5f5)",
            border: "1px solid rgba(211, 47, 47, 0.1)",
            boxShadow: "0 10px 30px rgba(211, 47, 47, 0.1)",
            "&:hover": {
              boxShadow: "0 15px 35px rgba(211, 47, 47, 0.15)",
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mb={3}
            sx={{
              background: "linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)",
              py: 2,
              borderRadius: 2,
              color: "white",
              boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" fontWeight="bold" align="center">
              Record Employee Hours
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 0.5, opacity: 0.9 }}>
              Enter work hours for payroll and tracking
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, borderColor: red[100] }} />

          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Box display="flex" alignItems="center" mb={1}>
                <CalendarTodayIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="subtitle2" color="primary">
                  Work Date (YYYY-MM-DD)
                </Typography>
              </Box>
              <TextField
                fullWidth
                type="text"
                placeholder="YYYY-MM-DD"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                size="small"
                helperText="Enter date in format: 2023-12-31"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: red[300],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: red[500],
                    },
                  },
                }}
              />
            </Box>

            <Box mb={4}>
              <Box display="flex" alignItems="center" mb={1}>
                <HourglassTopIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="subtitle2" color="primary">
                  Hours Worked
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: red[300],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: red[500],
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
                  border: "1px solid rgba(211, 47, 47, 0.2)",
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
              {loading ? "Processing..." : "Record Employee Hours"}
            </Button>
          </form>
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
              bgcolor: red[600],
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

