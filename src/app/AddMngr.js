"use client"

import { useState, useEffect } from "react"
import {
  Container,
  TextField,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material"
import BadgeIcon from "@mui/icons-material/Badge"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import HomeIcon from "@mui/icons-material/Home"
import LockIcon from "@mui/icons-material/Lock"
import ContactMailIcon from "@mui/icons-material/ContactMail"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import BusinessIcon from "@mui/icons-material/Business"
import LocationOnIcon from "@mui/icons-material/LocationOn"

export default function AddManager() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    salary: "",
    hire_date: "",
    ssn: "",
    role: "Manager",
    postOfficeID: "",
    street: "",
    streetLine2: "",
    aptNumber: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    password: "",
    securityCode: "",
    securityQuestion: "",
    securityAnswer: "",
  })

  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [hireDateError, setHireDateError] = useState(null);
  const [birthdateError, setBirthdateError] = useState(null);
  const [completed, setCompleted] = useState({
    0: false, // Personal Info
    1: false, // Address
    2: false, // Contact & Security
  })

  // Define form sections/steps
  const steps = [
    {
      label: "Personal Information",
      icon: <BadgeIcon />,
      fields: ["firstName", "lastName", "birthdate", "salary", "hire_date", "ssn", "postOfficeID"],
    },
    {
      label: "Address Information",
      icon: <HomeIcon />,
      fields: ["street", "streetLine2", "aptNumber", "city", "state", "zipCode"],
    },
    {
      label: "Contact & Security",
      icon: <LockIcon />,
      fields: ["email", "phone", "password", "securityCode", "securityQuestion", "securityAnswer"],
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Update completion status for the current step
    if (name === "hire_date") {
      if (!hire_date_valid(value)) {
        setHireDateError("Hire date cannot be in the future");
      } else {
        setHireDateError(null);
      }
    }
    if (name === "birthdate") {
      if (!birthdateValid(value)) {
        setBirthdateError("Must be at least 18 years old and a valid date");
      } else {
        setBirthdateError(null);
      }
    }
    updateStepCompletion()
  }

  const updateStepCompletion = () => {
    const currentStepFields = steps[activeStep].fields
    const isStepComplete = currentStepFields.every((field) => {
      // Skip optional fields
      if (field === "streetLine2" || field === "aptNumber") return true
      if (field === "birthdate" && birthdateError) return false
      if (field === "hire_date" && hireDateError) return false;
      return formData[field] && formData[field].trim() !== ""
    })

    setCompleted((prev) => ({
      ...prev,
      [activeStep]: isStepComplete,
    }))
  }

  // Check step completion on form data change
  useEffect(() => {
    updateStepCompletion()
  }, [formData, birthdateError, hireDateError])

  const birthdateValid = (birthdate) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD format
    if (!datePattern.test(birthdate)) return false

    const [year, month, day] = birthdate.split("-").map(Number)

    // Check if the year, month, and day are valid integers
    if (year < 1900 || year > new Date().getFullYear() - 18 || month < 1 || month > 12 || day < 1 || day > 31) {
      return false
    }

    const birthDateObj = new Date(year, month - 1, day)
    const currentDate = new Date()

    // Ensure birthdate is not in the future
    if (birthDateObj > currentDate) return false

    // Calculate age
  const age = currentDate.getFullYear() - birthDateObj.getFullYear()
  const monthDiff = currentDate.getMonth() - birthDateObj.getMonth()
  
  // Adjust age if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDateObj.getDate())) {
    if (age - 1 < 18) return false
  } else if (age < 18) {
    return false
  }

    return true
  }
  const hire_date_valid = (hire_date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!datePattern.test(hire_date)) return false;
  
    const [year, month, day] = hire_date.split("-").map(Number);
    
    if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison
    const hireDate = new Date(year, month - 1, day);
    
    // Return true only if hire date is today or in the past
    return hireDate <= today;
  };
  

  const validateForm = () => {
    if (birthdateError)
      return "⚠ " + birthdateError;
    if (hireDateError)
      return "⚠ " + hireDateError;
    if (!formData.firstName.trim() || formData.firstName.length > 20) return "⚠ First Name must be up to 20 characters."
    if (!formData.lastName.trim() || formData.lastName.length > 30) return "⚠ Last Name must be up to 30 characters."
    if (!formData.birthdate || !/^\d{4}-\d{2}-\d{2}$/.test(formData.birthdate))
      return "⚠ Birthdate must be in YYYY-MM-DD format."
    if (!formData.hire_date || !/^\d{4}-\d{2}-\d{2}$/.test(formData.hire_date))
      return "⚠ Hire Date must be in YYYY-MM-DD format."
    if (!formData.salary || isNaN(formData.salary)) return "⚠ Salary must be a valid decimal number."
    if (!formData.ssn.trim() || formData.ssn.length !== 9 || isNaN(formData.ssn))
      return "⚠ SSN must be exactly 9 digits."
    if (!formData.postOfficeID.trim() || isNaN(formData.postOfficeID)) return "⚠ Post Office ID must be a valid number."
    if (!formData.street.trim() || formData.street.length > 45) return "⚠ Street address must be up to 45 characters."
    if (formData.streetLine2.length > 45) return "⚠ Street Address Line 2 must be up to 45 characters."
    if (!formData.city.trim() || formData.city.length > 45) return "⚠ City must be up to 45 characters."
    if (!formData.state) return "⚠ Please select a state."
    if (!formData.zipCode.trim() || formData.zipCode.length !== 5 || isNaN(formData.zipCode))
      return "⚠ Zip Code must be exactly 5 digits."
    if (!formData.email.trim() || !formData.email.includes("@")) return "⚠ Invalid email format."
    if (!formData.phone.trim() || formData.phone.length !== 10 || isNaN(formData.phone))
      return "⚠ Phone number must be exactly 10 digits."
    if (!formData.password.trim() || formData.password.length > 10) return "⚠ Password must be up to 10 characters."
    if (!formData.securityQuestion) return "⚠ Please select a security question."
    if (!formData.securityAnswer.trim() || formData.securityAnswer.length > 10)
      return "⚠ Security answer must be up to 10 characters."
    return null
  }

  const handleAddStaff = async () => {
    setError(null)
    setSuccessMessage(null)
    setLoading(true)

    const errorMsg = validateForm()
    if (errorMsg) {
      setLoading(false)
      return setError(errorMsg)
    }

    try {
      const response = await fetch("https://vercel-api-post-office-seven.vercel.app/api/addManager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      //check error
      if (!response.ok) {
        const errorData = await response.json() // Parse error details from backend
        throw new Error(errorData.error || response.statusText)
      }

      //const data = await response.json()

      setSuccessMessage("🎉 Manager added successfully!")
    } catch (err) {
      if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
        setError("Network error or server issue. Please check your connection.")
      } else if (err.message.includes("502")) {
        setError("Server error: Bad Gateway. Please try again later.")
      } else if (err.message.includes("404")) {
        setError("Resource not found. Please check the API endpoint.")
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // List of U.S. states for the dropdown
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

  // Navigation functions
  const handleNext = () => {
    if (activeStep < steps.length - 1 && completed[activeStep]) {
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleStepClick = (step) => {
    setActiveStep(step)
  }

  // Render the current step's form fields
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
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
                helperText="Up to 20 characters"
                InputProps={{
                  startAdornment: <BadgeIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 30 }}
                helperText="Up to 30 characters"
                InputProps={{
                  startAdornment: <BadgeIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
                
                helperText={birthdateError || "YYYY-MM-DD format"}
                error={!!birthdateError}
                InputProps={{
                  startAdornment: <CalendarMonthIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hire Date"
                name="hire_date"
                value={formData.hire_date}
                onChange={handleChange}
                required
                error={!!hireDateError}
                helperText={hireDateError || "YYYY-MM-DD format"}
                InputProps={{
                  startAdornment: <CalendarMonthIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                helperText="Decimal number"
                inputProps={{ min: 0 }}
                InputProps={{
                  startAdornment: <AttachMoneyIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SSN"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 9 }}
                helperText="Exactly 9 digits"
                InputProps={{
                  startAdornment: <BadgeIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Post Office ID"
                name="postOfficeID"
                value={formData.postOfficeID}
                onChange={handleChange}
                required
                type="number"
                inputProps={{ min: 1 }}
                helperText="Enter the Post Office ID number"
                InputProps={{
                  startAdornment: <BusinessIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters"
                InputProps={{
                  startAdornment: <HomeIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address Line 2"
                name="streetLine2"
                value={formData.streetLine2}
                onChange={handleChange}
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters (optional)"
                InputProps={{
                  startAdornment: <HomeIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apartment Number"
                name="aptNumber"
                value={formData.aptNumber}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
                helperText="Optional"
                InputProps={{
                  startAdornment: <HomeIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters"
                InputProps={{
                  startAdornment: <LocationOnIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ddd",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D32F2F",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D32F2F",
                    },
                  }}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {stateNames[state]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 5 }}
                helperText="Exactly 5 digits"
                InputProps={{
                  startAdornment: <LocationOnIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                helperText="Valid email format"
                InputProps={{
                  startAdornment: <ContactMailIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 10, pattern: "[0-9]*" }}
                helperText="Exactly 10 digits"
                InputProps={{
                  startAdornment: <ContactMailIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Security Code"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters"
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 10 }}
                helperText="Up to 10 characters"
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Security Question</InputLabel>
                <Select
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ddd",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D32F2F",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D32F2F",
                    },
                  }}
                >
                  <MenuItem value="What is your pets name">What is your pet's name?</MenuItem>
                  <MenuItem value="What is your mothers maiden name">What is your mother's maiden name?</MenuItem>
                  <MenuItem value="What is your favorite book">What is your favorite book?</MenuItem>
                </Select>
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
                helperText="Up to 10 characters"
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
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
            </Grid>
          </Grid>
        )
      default:
        return null
    }
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
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
                'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" fill="%23D32F2F"/%3E%3C/svg\')',
            }}
          ></Box>
          {/* Title and subtitle */}
          <Box>
            <h1 style={{ margin: 0, fontSize: "2.5rem", fontWeight: 600 }}>Add New Manager</h1>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 400 }}>
              Fill in the information below to create a new manager account.
            </p>
          </Box>
        </Box>
        {/* Stepper Navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            bgcolor: "#f5f5f5",
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={step.label}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                opacity: completed[index] ? 0.6 : 1,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              onClick={() => handleStepClick(index)}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: activeStep === index ? "#D32F2F" : "#bdbdbd",
                  color: "white",
                  mr: 1,
                }}
              >
                {step.icon}
              </Box>
              <Typography variant="body2" fontWeight={activeStep === index ? "bold" : "normal"}>
                {step.label}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Form Content */}
        <Box p={3}>
          {renderStepContent(activeStep)}
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success" align="center" sx={{ mt: 2 }}>
              {successMessage}
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" color="error">
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="error" onClick={handleAddStaff} disabled={loading}>
                {loading ? "Adding..." : "Add Manager"}
              </Button>
            ) : (
              <Button variant="contained" color="error" onClick={handleNext} disabled={loading || !completed[activeStep]}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

