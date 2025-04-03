"use client"

import { useState, useEffect } from "react"
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  Fade,
  CircularProgress,
  Divider,
  IconButton,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Person,
  Home,
  Email,
  Phone,
  Lock,
  CalendarToday,
  LocationCity,
  QuestionAnswer,
  Visibility,
  VisibilityOff,
  ArrowBack,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material"

export default function CustSignin() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [activeStep, setActiveStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    streetAddress: "",
    streetAddress2: "",
    apt: "",
    cityName: "",
    stateID: "",
    zipCode: "",
    email: "",
    password: "",
    phone: "",
    securityQuestion: "",
    securityAnswer: "",
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [termsAccepted, setTermsAccepted] = useState(false)

  const steps = ["Personal Information", "Address Details", "Account Setup", "Review & Submit"]

  const states = [
    "al",
    "ak",
    "az",
    "ar",
    "ca",
    "co",
    "ct",
    "de",
    "fl",
    "ga",
    "hi",
    "id",
    "il",
    "in",
    "ia",
    "ks",
    "ky",
    "la",
    "me",
    "md",
    "ma",
    "mi",
    "mn",
    "ms",
    "mo",
    "mt",
    "ne",
    "nv",
    "nh",
    "nj",
    "nm",
    "ny",
    "nc",
    "nd",
    "oh",
    "ok",
    "or",
    "pa",
    "ri",
    "sc",
    "sd",
    "tn",
    "tx",
    "ut",
    "vt",
    "va",
    "wa",
    "wv",
    "wi",
    "wy",
  ]

  const stateNames = {
    al: "Alabama",
    ak: "Alaska",
    az: "Arizona",
    ar: "Arkansas",
    ca: "California",
    co: "Colorado",
    ct: "Connecticut",
    de: "Delaware",
    fl: "Florida",
    ga: "Georgia",
    hi: "Hawaii",
    id: "Idaho",
    il: "Illinois",
    in: "Indiana",
    ia: "Iowa",
    ks: "Kansas",
    ky: "Kentucky",
    la: "Louisiana",
    me: "Maine",
    md: "Maryland",
    ma: "Massachusetts",
    mi: "Michigan",
    mn: "Minnesota",
    ms: "Mississippi",
    mo: "Missouri",
    mt: "Montana",
    ne: "Nebraska",
    nv: "Nevada",
    nh: "New Hampshire",
    nj: "New Jersey",
    nm: "New Mexico",
    ny: "New York",
    nc: "North Carolina",
    nd: "North Dakota",
    oh: "Ohio",
    ok: "Oklahoma",
    or: "Oregon",
    pa: "Pennsylvania",
    ri: "Rhode Island",
    sc: "South Carolina",
    sd: "South Dakota",
    tn: "Tennessee",
    tx: "Texas",
    ut: "Utah",
    vt: "Vermont",
    va: "Virginia",
    wa: "Washington",
    wv: "West Virginia",
    wi: "Wisconsin",
    wy: "Wyoming",
  }

  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    // Calculate password strength
    if (formData.password) {
      let strength = 0
      // Length check
      if (formData.password.length >= 8) strength += 1
      // Contains number
      if (/\d/.test(formData.password)) strength += 1
      // Contains lowercase
      if (/[a-z]/.test(formData.password)) strength += 1
      // Contains uppercase
      if (/[A-Z]/.test(formData.password)) strength += 1
      // Contains special char
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1

      setPasswordStrength(strength)
    } else {
      setPasswordStrength(0)
    }
  }, [formData.password])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear field-specific error when user types
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: null,
      })
    }
  }

  const emailValid = (email) => {
    const emailStructure = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailStructure.test(email)
  }

  const birthdateValid = (birthdate) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD format
    if (!datePattern.test(birthdate)) return false

    const [year, month, day] = birthdate.split("-").map(Number)

    // Check if the year, month, and day are valid integers
    if (year < 1900 || year > 2006 || month < 1 || month > 12 || day < 1 || day > 31) {
      return false
    }

    return true
  }

  const validateStep = (step) => {
    const newErrors = {}
    let isValid = true

    if (step === 0) {
      // Personal Information validation
      if (!formData.firstName.trim() || formData.firstName.length > 20) {
        newErrors.firstName = "First Name must be up to 20 characters"
        isValid = false
      }

      if (!formData.lastName.trim() || formData.lastName.length > 20) {
        newErrors.lastName = "Last Name must be up to 20 characters"
        isValid = false
      }

      if (!formData.birthdate) {
        newErrors.birthdate = "Birthdate is required"
        isValid = false
      } else if (!birthdateValid(formData.birthdate)) {
        newErrors.birthdate = "You must be over 18 and use YYYY-MM-DD format"
        isValid = false
      }
    } else if (step === 1) {
      // Address validation
      if (!formData.streetAddress.trim() || formData.streetAddress.length > 45) {
        newErrors.streetAddress = "Street Address must be up to 45 characters"
        isValid = false
      }

      if (formData.streetAddress2 && formData.streetAddress2.length > 45) {
        newErrors.streetAddress2 = "Address Line 2 must be up to 45 characters"
        isValid = false
      }

      if (formData.apt && formData.apt.length > 20) {
        newErrors.apt = "Apt/Suite must be up to 20 characters"
        isValid = false
      }

      if (!formData.cityName.trim() || formData.cityName.length > 20) {
        newErrors.cityName = "City Name must be up to 20 characters"
        isValid = false
      }

      if (!formData.stateID.trim()) {
        newErrors.stateID = "State selection is required"
        isValid = false
      }

      if (!formData.zipCode.trim() || formData.zipCode.length !== 5 || !/^\d{5}$/.test(formData.zipCode)) {
        newErrors.zipCode = "Zip Code must be exactly 5 digits"
        isValid = false
      }
    } else if (step === 2) {
      // Account validation
      if (!formData.email.trim() || formData.email.length > 45) {
        newErrors.email = "Email must be up to 45 characters"
        isValid = false
      } else if (!emailValid(formData.email)) {
        newErrors.email = "Email is not valid"
        isValid = false
      }

      if (!formData.phone.trim() || formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be exactly 10 digits"
        isValid = false
      }

      if (!formData.password.trim()) {
        newErrors.password = "Password is required"
        isValid = false
      } else if (formData.password.length > 45) {
        newErrors.password = "Password must be up to 45 characters"
        isValid = false
      } else if (passwordStrength < 3) {
        newErrors.password = "Password is too weak"
        isValid = false
      }

      if (!formData.securityQuestion) {
        newErrors.securityQuestion = "Security question is required"
        isValid = false
      }

      if (!formData.securityAnswer.trim() || formData.securityAnswer.length > 10) {
        newErrors.securityAnswer = "Security answer must be up to 10 characters"
        isValid = false
      }
    } else if (step === 3) {
      // Final validation
      if (!termsAccepted) {
        newErrors.terms = "You must accept the terms and conditions"
        isValid = false
      }
    }

    setFieldErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
    window.scrollTo(0, 0)
  }

  const validateForm = () => {
    // Validate all steps before submission
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        setActiveStep(i)
        return false
      }
    }
    return true
  }

  const handleSignup = async () => {
    setError(null)
    setSuccessMessage(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("https://apipost.vercel.app/api/custSignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Sign-up failed")
      }

      setSuccessMessage("🎉 Account created successfully! You can now log in.")
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        birthdate: "",
        streetAddress: "",
        streetAddress2: "",
        apt: "",
        cityName: "",
        stateID: "",
        zipCode: "",
        email: "",
        password: "",
        phone: "",
        securityQuestion: "",
        securityAnswer: "",
      })
      setActiveStep(0)
      setTermsAccepted(false)
    } catch (err) {
      console.error("Request Error:", err)
      setError("An error occurred while processing your request. Details: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#B71C1C",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#B71C1C",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#B71C1C",
    },
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
    },
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "#f44336" // Weak - Red
    if (passwordStrength <= 3) return "#ff9800" // Medium - Orange
    return "#4caf50" // Strong - Green
  }

  const renderPersonalInfoStep = () => (
    <Fade in={activeStep === 0} timeout={500}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 20 }}
            helperText={fieldErrors.firstName || "Up to 20 characters"}
            error={!!fieldErrors.firstName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 20 }}
            helperText={fieldErrors.lastName || "Up to 20 characters"}
            error={!!fieldErrors.lastName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
            helperText={fieldErrors.birthdate || "Enter date in YYYY-MM-DD format (must be 18+)"}
            error={!!fieldErrors.birthdate}
            inputProps={{ maxLength: 10 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>
      </Grid>
    </Fade>
  )

  const renderAddressStep = () => (
    <Fade in={activeStep === 1} timeout={500}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street Address"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 45 }}
            helperText={fieldErrors.streetAddress || "Up to 45 characters"}
            error={!!fieldErrors.streetAddress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Address Line 2 (Optional)"
            name="streetAddress2"
            value={formData.streetAddress2}
            onChange={handleChange}
            inputProps={{ maxLength: 45 }}
            helperText={fieldErrors.streetAddress2 || "Up to 45 characters"}
            error={!!fieldErrors.streetAddress2}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apt/Suite (Optional)"
            name="apt"
            value={formData.apt}
            onChange={handleChange}
            inputProps={{ maxLength: 20 }}
            helperText={fieldErrors.apt || "Up to 20 characters"}
            error={!!fieldErrors.apt}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="cityName"
            value={formData.cityName}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 20 }}
            helperText={fieldErrors.cityName || "Up to 20 characters"}
            error={!!fieldErrors.cityName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCity sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required error={!!fieldErrors.stateID} sx={inputStyle}>
            <InputLabel>State</InputLabel>
            <Select
              name="stateID"
              value={formData.stateID}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: fieldErrors.stateID ? "#d32f2f" : "#ddd",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B71C1C",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B71C1C",
                },
              }}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {stateNames[state]}
                </MenuItem>
              ))}
            </Select>
            {fieldErrors.stateID && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                {fieldErrors.stateID}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 5 }}
            helperText={fieldErrors.zipCode || "Exactly 5 digits"}
            error={!!fieldErrors.zipCode}
            sx={inputStyle}
          />
        </Grid>
      </Grid>
    </Fade>
  )

  const renderAccountStep = () => (
    <Fade in={activeStep === 2} timeout={500}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 45 }}
            helperText={fieldErrors.email || "Up to 45 characters"}
            error={!!fieldErrors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 10 }}
            helperText={fieldErrors.phone || "Exactly 10 digits"}
            error={!!fieldErrors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 45 }}
            helperText={
              fieldErrors.password ||
              (formData.password
                ? `Password strength: ${passwordStrength <= 1 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"}`
                : "Create a strong password with letters, numbers, and symbols")
            }
            error={!!fieldErrors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              ...inputStyle,
              "& .MuiFormHelperText-root": {
                color: formData.password && !fieldErrors.password ? getPasswordStrengthColor() : undefined,
              },
            }}
          />
          {formData.password && !fieldErrors.password && (
            <Box sx={{ mt: 1, mb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {[1, 2, 3, 4, 5].map((level) => (
                  <Box
                    key={level}
                    sx={{
                      height: "4px",
                      flex: 1,
                      borderRadius: "2px",
                      bgcolor: level <= passwordStrength ? getPasswordStrengthColor() : "#e0e0e0",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!fieldErrors.securityQuestion} sx={inputStyle}>
            <InputLabel>Security Question</InputLabel>
            <Select
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: fieldErrors.securityQuestion ? "#d32f2f" : "#ddd",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B71C1C",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B71C1C",
                },
              }}
            >
              <MenuItem value="Pet name">What is your pet's name?</MenuItem>
              <MenuItem value="Moms name">What is your mother's maiden name?</MenuItem>
              <MenuItem value="Fav book">What is your favorite book?</MenuItem>
            </Select>
            {fieldErrors.securityQuestion && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                {fieldErrors.securityQuestion}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Security Answer"
            name="securityAnswer"
            value={formData.securityAnswer}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 10 }}
            helperText={fieldErrors.securityAnswer || "Up to 10 characters"}
            error={!!fieldErrors.securityAnswer}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <QuestionAnswer sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
        </Grid>
      </Grid>
    </Fade>
  )

  const renderReviewStep = () => (
    <Fade in={activeStep === 3} timeout={500}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2, color: "#B71C1C" }}>
          Review Your Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#555" }}>
                Personal Information
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </Typography>
                <Typography variant="body2">
                  <strong>Birthdate:</strong> {formData.birthdate}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#555" }}>
                Contact Information
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <strong>Email:</strong> {formData.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {formData.phone}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#555" }}>
                Address
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">{formData.streetAddress}</Typography>
                {formData.streetAddress2 && <Typography variant="body2">{formData.streetAddress2}</Typography>}
                {formData.apt && <Typography variant="body2">Apt/Suite: {formData.apt}</Typography>}
                <Typography variant="body2">
                  {formData.cityName}, {formData.stateID.toUpperCase()} {formData.zipCode}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#555" }}>
                Security
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <strong>Security Question:</strong> {formData.securityQuestion}
                </Typography>
                <Typography variant="body2">
                  <strong>Password:</strong> ••••••••
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              sx={{
                color: "#B71C1C",
                "&.Mui-checked": {
                  color: "#B71C1C",
                },
              }}
            />
          }
          label={<Typography variant="body2">I agree to the Terms of Service and Privacy Policy</Typography>}
        />
        {fieldErrors.terms && (
          <Typography variant="caption" color="error" sx={{ display: "block", mt: 0.5 }}>
            {fieldErrors.terms}
          </Typography>
        )}
      </Box>
    </Fade>
  )

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPersonalInfoStep()
      case 1:
        return renderAddressStep()
      case 2:
        return renderAccountStep()
      case 3:
        return renderReviewStep()
      default:
        return null
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: "20px", sm: "30px" },
          borderRadius: "12px",
          width: "100%",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#333",
              mb: 1,
            }}
          >
            Customer Sign-Up
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              mb: 3,
            }}
          >
            Create an account to continue.
          </Typography>

          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? "vertical" : "horizontal"}
            sx={{
              mb: 3,
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#B71C1C",
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#B71C1C",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 1,
            }}
          >
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}
            icon={<CheckCircle fontSize="inherit" />}
          >
            {successMessage}
          </Alert>
        )}

        <Box sx={{ minHeight: "320px", mb: 3 }}>{renderStepContent(activeStep)}</Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            pt: 2,
            borderTop: "1px solid #eee",
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
            sx={{
              color: "#666",
              "&:hover": {
                backgroundColor: "rgba(183, 28, 28, 0.04)",
              },
            }}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSignup}
              disabled={isLoading}
              endIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <CheckCircle />}
              sx={{
                backgroundColor: "#B71C1C",
                "&:hover": {
                  backgroundColor: "#8B0000",
                },
                fontWeight: "500",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(183, 28, 28, 0.3)",
                minWidth: "120px",
              }}
            >
              {isLoading ? "Submitting" : "Submit"}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: "#B71C1C",
                "&:hover": {
                  backgroundColor: "#8B0000",
                },
                fontWeight: "500",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(183, 28, 28, 0.3)",
              }}
            >
              Next
            </Button>
          )}
        </Box>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link
              href="/cust-login"
              sx={{
                color: "#B71C1C",
                textDecoration: "none",
                fontWeight: "medium",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

