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
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import HomeIcon from "@mui/icons-material/Home"
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import DoneIcon from "@mui/icons-material/Done"

export default function AddPO() {
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
          <Select name="state_id" value={poData.state_id} onChange={handleFieldChange} label="State">
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
          InputProps={{
            startAdornment: <LocationCityIcon sx={{ mr: 1, color: "text.secondary" }} />,
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
            startAdornment: <HomeIcon sx={{ mr: 1, color: "text.secondary" }} />,
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
          error={poData.zip !== "" && !/^\d{5}$/.test(poData.zip)}
          helperText={poData.zip !== "" && !/^\d{5}$/.test(poData.zip) ? "Zip code must be 5 digits" : ""}
          InputProps={{
            startAdornment: <MarkunreadMailboxIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        />
      ),
    },
  ]

  // Fetch states
  useEffect(() => {
    fetch("https://vercel-api-powebapp.vercel.app/api/state_id")
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

      // If this is the current active step, move to the next step
      if (stepIndex === activeStep && activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1)
      }
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

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
      setMessage({ type: "error", text: `Error: ${error.message}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#D32F2F",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocationOnIcon />
          <Typography variant="h6">Add New Post Office</Typography>
        </Box>

        {/* Progress Stepper */}
        <Box sx={{ p: 3, bgcolor: "#f8f8f8" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
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
          <Box sx={{ p: 3 }}>
            {/* Current Step Content */}
            <Box sx={{ mb: 3 }}>{steps[activeStep].component}</Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button variant="outlined" color="inherit" onClick={handleBack} disabled={activeStep === 0}>
                Back
              </Button>

              <Box>
                {activeStep < steps.length - 1 ? (
                  <Button variant="contained" color="error" onClick={handleNext} disabled={!completed[activeStep]}>
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleAddLocation}
                    disabled={!isFormComplete || loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                  >
                    {loading ? "Adding..." : "Add Post Office"}
                  </Button>
                )}
              </Box>
            </Box>

            {/* Form Summary */}
            <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #eee" }}>
              <Typography variant="subtitle2" gutterBottom>
                Form Progress:
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                {steps.map((step, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      minWidth: 150,
                      bgcolor: completed[index] ? "#f0f7f0" : "white",
                      borderColor: completed[index] ? "#4caf50" : "#e0e0e0",
                    }}
                  >
                    {completed[index] ? <CheckCircleIcon color="success" fontSize="small" /> : step.icon}
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {step.label}
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
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
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          // Success Message
          <Box sx={{ p: 4, textAlign: "center" }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Post Office Added Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The new location has been added to the CougarPost network.
            </Typography>

            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                p: 2,
                maxWidth: 400,
                mx: "auto",
                mt: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Location Details:
              </Typography>
              <Typography variant="body1">{poData.street}</Typography>
              <Typography variant="body1">
                {poData.city_name}, {poData.state_id.toUpperCase()} {poData.zip}
              </Typography>
            </Paper>
          </Box>
        )}
      </Paper>

      {/* Alert Messages */}
      {message && (
        <Alert
          severity={message.type}
          variant="filled"
          sx={{
            mb: 3,
            borderRadius: 1,
          }}
        >
          {message.text}
        </Alert>
      )}
    </Container>
  )
}

