"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Avatar,
  Divider,
} from "@mui/material"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import BadgeIcon from "@mui/icons-material/Badge"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import HomeIcon from "@mui/icons-material/Home"
import LockIcon from "@mui/icons-material/Lock"
import ContactMailIcon from "@mui/icons-material/ContactMail"

export default function AddStaff() {
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    salary: "",
    hire_date: new Date().toISOString().split("T")[0], // Set current date as default
    ssn: "",
    role: "",
    email: "",
    phone: "",
    street: "",
    streetLine2: "",
    aptNumber: "",
    city: "",
    state: "",
    zipCode: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
  })

  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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

  const validateForm = () => {
    if (!formData.firstName.trim() || formData.firstName.length > 20) return "⚠ First Name must be up to 20 characters."
    if (!formData.lastName.trim() || formData.lastName.length > 30) return "⚠ Last Name must be up to 30 characters."
    if (!formData.birthdate) return "⚠ Birthdate is required."
    if (!birthdateValid(formData.birthdate)) return "⚠ You must be over 18 and Use YYYY-MM-DD format."
    if (!formData.salary || isNaN(formData.salary)) return "⚠ Salary must be a valid decimal number."
    if (!formData.ssn.trim() || formData.ssn.length !== 9 || isNaN(formData.ssn))
      return "⚠ SSN must be exactly 9 digits."
    if (!formData.role) return "⚠ Please select a role."
    if (!formData.street.trim() || formData.street.length > 45) return "⚠ Street address must be up to 45 characters."
    if (formData.streetLine2.length > 45) return "⚠ Street Address Line 2 must be up to 45 characters."
    if (!formData.city.trim() || formData.city.length > 45) return "⚠ City must be up to 45 characters."
    if (!formData.state) return "⚠ Please select a state."
    if (!formData.zipCode.trim() || formData.zipCode.length !== 5 || isNaN(formData.zipCode))
      return "⚠ Zip Code must be exactly 5 digits."
    if (!formData.password.trim() || formData.password.length > 10) return "⚠ Password must be up to 10 characters."
    if (!formData.securityQuestion) return "⚠ Please select a security question."
    if (!formData.securityAnswer.trim() || formData.securityAnswer.length > 10)
      return "⚠ Security answer must be up to 10 characters."
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return "⚠ Please enter a valid email address."
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      return "⚠ Please enter a valid phone number (10 digits)."
    return null
  }

  const handleAddStaff = async () => {
    setError(null)
    setSuccessMessage(null)

    const errorMsg = validateForm()
    if (errorMsg) return setError(errorMsg)

    try {
      // gets the employees_id of the manager that's currently logged in
      const mngrID = user?.employees_id
      const po_id = user?.po_id
      // adds this id to the data that needs to be passed to the api
      const newStaffData = {
        ...formData, // the actual employee data collected
        mngr_id: mngrID, // pass the current manager's id to the api
        po_id: po_id,
      }

      const response = await fetch("https://apipost.vercel.app/api/AddStaff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaffData),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Staff creation failed")

      setSuccessMessage("🎉 Staff member created successfully!")
    } catch (err) {
      setError(err.message)
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
                'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fillOpacity="1" fillRule="evenodd"/%3E%3C/svg%3E\')',
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}>
            <PersonAddIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Add New Staff
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                Create a new employee account
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Staff Summary Card */}
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
              <PersonAddIcon fontSize="large" />
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Staff Registration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fill out the form below to add a new staff member
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Error and Success Messages */}
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
      {successMessage && (
        <Alert
          severity="success"
          sx={{
            mb: 3,
            borderRadius: 2,
            bgcolor: "#E8F5E9",
            border: "1px solid #C8E6C9",
          }}
        >
          {successMessage}
        </Alert>
      )}

      {/* Main Form */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        }}
      >
        {/* Personal Information Section */}
        <Box
          sx={{
            bgcolor: "#B71C1C",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <BadgeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Personal Information
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 20 }}
                helperText="Up to 20 characters"
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
                onChange={handleChange}
                required
                inputProps={{ maxLength: 30 }}
                helperText="Up to 30 characters"
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
                onChange={handleChange}
                required
                value={formData.birthdate}
                helperText="Enter date in YYYY-MM-DD format"
                inputProps={{ maxLength: 10 }}
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
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  sx={{
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D32F2F",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D32F2F",
                    },
                  }}
                >
                  <MenuItem value="Driver">Driver</MenuItem>
                  <MenuItem value="Clerk">Clerk</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Employment Information Section */}
        <Box
          sx={{
            bgcolor: "#B71C1C",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <AttachMoneyIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Employment Information
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Salary"
                name="salary"
                onChange={handleChange}
                required
                helperText="Decimal number"
                inputProps={{ min: 0 }}
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
                onChange={handleChange}
                required
                inputProps={{ maxLength: 9 }}
                helperText="Exactly 9 digits"
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
        </Box>

        <Divider />

        {/* Address Section */}
        <Box
          sx={{
            bgcolor: "#B71C1C",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <HomeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Address Information
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="street"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters"
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
                label="Street Address Line 2"
                name="streetLine2"
                onChange={handleChange}
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters (optional)"
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
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
                helperText="Optional"
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
                onChange={handleChange}
                required
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters"
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
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth required>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  sx={{
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
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 5 }}
                helperText="Exactly 5 digits"
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
        </Box>

        <Divider />

        {/* Contact Information Section */}
        <Box
          sx={{
            bgcolor: "#B71C1C",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ContactMailIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Contact Information
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 50 }}
                helperText="Valid email address"
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
                label="Phone"
                name="phone"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 10 }}
                helperText="10 digits (e.g., 1234567890)"
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
        </Box>

        <Divider />

        {/* Security Section */}
        <Box
          sx={{
            bgcolor: "#B71C1C",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <LockIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Security Information
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 10 }}
                helperText="Up to 10 characters"
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
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D32F2F",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D32F2F",
                    },
                  }}
                >
                  <MenuItem value="What is your pet's name?">What is your pet's name?</MenuItem>
                  <MenuItem value="What is your mother's maiden name?">What is your mother's maiden name?</MenuItem>
                  <MenuItem value="What is your favorite book?">What is your favorite book?</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Security Answer"
                name="securityAnswer"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 10 }}
                helperText="Up to 10 characters"
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
        </Box>

        {/* Submit Button */}
        <Box sx={{ p: 3, bgcolor: "#f5f5f5" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              py: 1.5,
              bgcolor: "#D32F2F",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#B71C1C",
              },
              boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
            }}
            onClick={handleAddStaff}
          >
            ADD STAFF MEMBER
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

