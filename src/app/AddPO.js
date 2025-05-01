"use client"

import { useState, useEffect } from "react"
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Paper,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  Card,
  Fade,
  Grow,
  Zoom,
  alpha,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import HomeIcon from "@mui/icons-material/Home"
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import DoneIcon from "@mui/icons-material/Done"
import StorefrontIcon from "@mui/icons-material/Storefront"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt"

export default function AddPO() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Form data state
  const [poData, setPoData] = useState({
    state_id: "",
    city_name: "",
    street: "",
    zip: "",
  })

  // UI states
  const [states, setStates] = useState([])
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Step tracking
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({
    0: false, // State
    1: false, // City
    2: false, // Street
    3: false, // Zip
  })

  // Steps definition
  const steps = [
    {
      label: "Select State",
      field: "state_id",
      icon: <LocationOnIcon />,
      component: (
        <FormControl fullWidth variant="outlined">
          <InputLabel>State</InputLabel>
          <Select
            name="state_id"
            value={poData.state_id}
            onChange={handleFieldChange}
            label="State"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha("#D32F2F", 0.3),
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D32F2F",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D32F2F",
              },
            }}
          >
            {states.length > 0 ? (
              states.map((state, index) => (
                <MenuItem key={index} value={state.state_id}>
                  {state.state_id.toUpperCase()}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Loading states...</MenuItem>
            )}
          </Select>
        </FormControl>
      ),
    },
    {
      label: "Enter City",
      field: "city_name",
      icon: <LocationCityIcon />,
      component: (
        <TextField
          fullWidth
          label="City"
          name="city_name"
          variant="outlined"
          value={poData.city_name}
          onChange={handleFieldChange}
          placeholder="Enter city name"
          InputProps={{
            startAdornment: <LocationCityIcon sx={{ mr: 1, color: "#D32F2F" }} />,
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
      ),
    },
    {
      label: "Enter Street Address",
      field: "street",
      icon: <HomeIcon />,
      component: (
        <TextField
          fullWidth
          label="Street Address"
          name="street"
          variant="outlined"
          value={poData.street}
          onChange={handleFieldChange}
          placeholder="Enter full street address (e.g., 123 Main Street)"
          inputProps={{ maxLength: 100 }}
          InputProps={{
            startAdornment: <HomeIcon sx={{ mr: 1, color: "#D32F2F" }} />,
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
      ),
    },
    {
      label: "Enter Zip Code",
      field: "zip",
      icon: <MarkunreadMailboxIcon />,
      component: (
        <TextField
          fullWidth
          label="Zip Code"
          name="zip"
          variant="outlined"
          value={poData.zip}
          onChange={handleFieldChange}
          placeholder="5-digit zip code"
          error={poData.zip !== "" && !/^\d{5}$/.test(poData.zip)}
          helperText={poData.zip !== "" && !/^\d{5}$/.test(poData.zip) ? "Zip code must be 5 digits" : ""}
          InputProps={{
            startAdornment: <MarkunreadMailboxIcon sx={{ mr: 1, color: "#D32F2F" }} />,
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
      ),
    },
  ]

  // Fetch states
  useEffect(() => {
    fetch("https://final-po-api.vercel.app/api/state_id")
      .then((res) => res.json())
      .then((result) => {
        if (result.data) setStates(result.data)
      })
      .catch((err) => setMessage({ type: "error", text: "Error fetching states" }))
  }, [])

  // Handle field changes and update completion status
  function handleFieldChange(e) {
    const { name, value } = e.target
    setPoData((prev) => ({ ...prev, [name]: value }))

    // Find the step index for this field
    const stepIndex = steps.findIndex((step) => step.field === name)

    // Mark step as completed if it has a value
    if (value) {
      setCompleted((prev) => ({ ...prev, [stepIndex]: true }))
    } else {
      setCompleted((prev) => ({ ...prev, [stepIndex]: false }))
    }
  }

  // Handle moving to a specific step
  function handleStepClick(step) {
    setActiveStep(step)
  }

  // Handle next step
  function handleNext() {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  // Handle back step
  function handleBack() {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  // Check if all steps are completed
  const isFormComplete = Object.values(completed).every((value) => value)

  // Handle form submission
  const handleAddLocation = async () => {
    setMessage(null)
    setLoading(true)

    const { state_id, city_name, street, zip } = poData

    // Validation
    if (!state_id || !city_name || !street || !zip) {
      setLoading(false)
      return setMessage({ type: "error", text: "Please fill in all fields" })
    }

    if (!/^\d{5}$/.test(zip)) {
      setLoading(false)
      return setMessage({ type: "error", text: "Zip code must be 5 digits" })
    }

    try {
      // Make a real API call to your backend
      const response = await fetch("https://final-po-api.vercel.app/api/addPostOffice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poData),
      })

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add post office")
      }

      const result = await response.json()
      console.log("API Response:", result)

      setMessage({ type: "success", text: "Post Office added successfully!" })
      setFormSubmitted(true)

      setTimeout(() => {
        setPoData({ state_id: "", city_name: "", street: "", zip: "" })
        setFormSubmitted(false)
        setActiveStep(0)
        setCompleted({
          0: false,
          1: false,
          2: false,
          3: false,
        })
      }, 5000)
    } catch (error) {
      console.error("Error adding post office:", error)
      setMessage({ type: "error", text: `Error: ${error.message}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Enhanced Header Banner */}
      <Fade in={true} timeout={800}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            mb: 4,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 28px rgba(211, 47, 47, 0.2)",
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
            <Box
              sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                  p: 2,
                  borderRadius: "50%",
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <AddLocationAltIcon sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                Add New Post Office
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9, maxWidth: "700px", mx: "auto" }}>
                Create a new location in the CougarPost network
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Fade>

      <Fade in={true} timeout={1000}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            mb: 3,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            border: "1px solid rgba(211, 47, 47, 0.1)",
          }}
        >
          {/* Enhanced Header */}
          <Box
            sx={{
              background: "linear-gradient(90deg, #D32F2F 0%, #B71C1C 100%)",
              color: "white",
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <StorefrontIcon sx={{ fontSize: 28 }} />
            <Typography variant="h5" fontWeight="bold">
              Location Information
            </Typography>
          </Box>

          {/* Enhanced Progress Stepper */}
          <Box sx={{ p: 3, bgcolor: "#f8f8f8", borderBottom: "1px solid #eee" }}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel={!isMobile}
              orientation={isMobile ? "vertical" : "horizontal"}
              sx={{
                "& .MuiStepIcon-root": {
                  color: "#FFCDD2",
                  "&.Mui-active": {
                    color: "#D32F2F",
                  },
                  "&.Mui-completed": {
                    color: "#4CAF50",
                  },
                },
                "& .MuiStepLabel-label": {
                  fontWeight: "medium",
                  "&.Mui-active": {
                    fontWeight: "bold",
                    color: "#D32F2F",
                  },
                },
              }}
            >
              {steps.map((step, index) => (
                <Step
                  key={step.label}
                  completed={completed[index]}
                  onClick={() => handleStepClick(index)}
                  sx={{ cursor: "pointer" }}
                >
                  <StepLabel
                    StepIconProps={{
                      icon: completed[index] ? <DoneIcon /> : step.icon,
                    }}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Form Content */}
          {!formSubmitted ? (
            <Box sx={{ p: 4 }}>
              {/* Current Step Content with Animation */}
              <Zoom in={true} key={activeStep}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      color: "#D32F2F",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {steps[activeStep].icon}
                    {steps[activeStep].label}
                  </Typography>
                  {steps[activeStep].component}
                </Box>
              </Zoom>

              {/* Enhanced Navigation Buttons */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    borderColor: "#D32F2F",
                    color: "#D32F2F",
                    "&:hover": {
                      borderColor: "#B71C1C",
                      bgcolor: alpha("#D32F2F", 0.04),
                    },
                    "&.Mui-disabled": {
                      borderColor: alpha("#D32F2F", 0.3),
                    },
                  }}
                >
                  Back
                </Button>

                <Box>
                  {activeStep < steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={!completed[activeStep]}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        bgcolor: "#D32F2F",
                        "&:hover": {
                          bgcolor: "#B71C1C",
                        },
                        "&.Mui-disabled": {
                          bgcolor: alpha("#D32F2F", 0.3),
                          color: "white",
                        },
                        fontWeight: "bold",
                        px: 3,
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleAddLocation}
                      disabled={!isFormComplete || loading}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddLocationAltIcon />}
                      sx={{
                        bgcolor: "#D32F2F",
                        "&:hover": {
                          bgcolor: "#B71C1C",
                        },
                        "&.Mui-disabled": {
                          bgcolor: alpha("#D32F2F", 0.3),
                          color: "white",
                        },
                        fontWeight: "bold",
                        px: 3,
                      }}
                    >
                      {loading ? "Adding..." : "Add Post Office"}
                    </Button>
                  )}
                </Box>
              </Box>

              {/* Enhanced Form Summary */}
              <Box sx={{ mt: 5, pt: 3, borderTop: "1px solid #eee" }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <LocationOnIcon sx={{ color: "#D32F2F" }} />
                  Form Progress
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                  {steps.map((step, index) => (
                    <Grow in={true} key={index} timeout={(index + 1) * 300}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          minWidth: 180,
                          bgcolor: completed[index] ? alpha("#4caf50", 0.05) : "white",
                          borderColor: completed[index] ? "#4caf50" : "#e0e0e0",
                          borderWidth: completed[index] ? 2 : 1,
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: completed[index] ? "#4caf50" : alpha("#D32F2F", 0.1),
                            color: completed[index] ? "white" : "#D32F2F",
                            width: 40,
                            height: 40,
                          }}
                        >
                          {completed[index] ? <DoneIcon /> : step.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {step.label}
                          </Typography>
                          <Typography variant="body2" color={completed[index] ? "text.primary" : "text.secondary"}>
                            {poData[step.field] ? (
                              step.field === "state_id" ? (
                                poData[step.field].toUpperCase()
                              ) : (
                                poData[step.field]
                              )
                            ) : (
                              <Typography variant="body2" color="text.disabled">
                                Not completed
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                      </Card>
                    </Grow>
                  ))}
                </Box>
              </Box>
            </Box>
          ) : (
            // Enhanced Success Message
            <Zoom in={true}>
              <Box sx={{ p: 5, textAlign: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "#4caf50",
                    color: "white",
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    boxShadow: "0 8px 16px rgba(76, 175, 80, 0.3)",
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 50 }} />
                </Avatar>
                <Typography variant="h4" gutterBottom fontWeight="bold" color="#2E7D32">
                  Success!
                </Typography>
                <Typography variant="h6" gutterBottom color="#2E7D32">
                  Post Office Added Successfully
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500, mx: "auto", mb: 4 }}>
                  The new location has been added to the CougarPost network and is now available for operations.
                </Typography>

                <Paper
                  elevation={0}
                  variant="outlined"
                  sx={{
                    p: 3,
                    maxWidth: 450,
                    mx: "auto",
                    mt: 3,
                    borderRadius: 3,
                    bgcolor: alpha("#4caf50", 0.05),
                    borderColor: "#4caf50",
                    borderWidth: 2,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="#2E7D32">
                    Location Details:
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ textAlign: "left", pl: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Street:</strong> {poData.street}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>City:</strong> {poData.city_name}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>State:</strong> {poData.state_id.toUpperCase()}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Zip Code:</strong> {poData.zip}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Zoom>
          )}
        </Paper>
      </Fade>

      {/* Enhanced Alert Messages */}
      {message && (
        <Zoom in={true}>
          <Alert
            severity={message.type}
            variant="filled"
            sx={{
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              py: 1.5,
              fontSize: "1rem",
            }}
          >
            {message.text}
          </Alert>
        </Zoom>
      )}
    </Container>
  )
}

