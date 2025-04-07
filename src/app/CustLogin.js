"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link,
  Box,
  InputAdornment,
  IconButton,
  Fade,
} from "@mui/material"
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionIcon,
} from "@mui/icons-material"

export default function CustLogin() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [resetMessage, setResetMessage] = useState(null)
  const [isResetMode, setIsResetMode] = useState(false)
  const [isNewPassMode, setIsNewPassMode] = useState(false)
  const [tempUserData, setTempUserData] = useState([])
  const [secAnswer, setSecAnswer] = useState("")
  const [newPass, setNewPass] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setError(null)
    setResetMessage(null)
    setIsLoading(true)

    if (!email) {
      setIsLoading(false)
      return setError("⚠ Please enter your email.")
    }
    if (!password) {
      setIsLoading(false)
      return setError("⚠ Please enter your password.")
    }

    // Log email and password to the console
    console.log("Email:", email)
    console.log("Password:", password)

    try {
      const response = await fetch("https://apipost.vercel.app/api/custLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      const data = await response.json()

      const customer = {
        ...data.user,
        role: "Customer", //since a customer logged in, set role to "Customer
      }
      login(customer) // ✅ Save user in context

      alert("Login successful!")
      navigate("/dashboard") // ✅ Redirects to Dashboard
      window.location.reload()
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    setIsResetMode(true)
    setError(null)
    setResetMessage(null)
    setIsNewPassMode(false)
  }

  const handleContinue = () => {
    setIsResetMode(false)
    setError(null)
    setResetMessage(null)
    setIsNewPassMode(true)
  }

  const handleResetPassword = async () => {
    if (!email) {
      return setError("⚠ Please enter your email to receive the reset link.")
    }

    setIsLoading(true)

    try {
      const response = await fetch(`https://apipost.vercel.app/api/CustEmailExists?email=${email}`, {
        method: "GET",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "failure")
      }

      const userData = await response.json()
      setTempUserData(userData.user)

      if (userData.success === true) {
        alert("account exists with this email")
        handleContinue()
      } else {
        setError(userData.message)
      }
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleNewPass = async () => {
    if (!secAnswer) {
      return setError("⚠ Please enter your security answer.")
    }
    if (!newPass) {
      return setError("⚠ Please enter a new password.")
    }

    setIsLoading(true)

    try {
      const response = await fetch("https://apipost.vercel.app/api/CustNewPass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, secAnswer, newPass }),
      })

      const res = await response.json()

      if (res.success === true) {
        alert("Updated password successfully")
        window.location.reload()
      } else {
        setError(res.message)
        setIsLoading(false)
      }
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword)
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#FFF",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#B71C1C",
              mb: 2,
            }}
          >
            <PersonIcon sx={{ fontSize: 35, color: "white" }} />
          </Box>
        </Box>

        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 1,
          }}
        >
          {isNewPassMode ? "Reset Password" : isResetMode ? "Password Recovery" : "Customer Login"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mb: 3,
          }}
        >
          {isNewPassMode
            ? "Answer your security question to reset your password."
            : isResetMode
              ? "Enter your email to reset your password."
              : "Please enter your credentials to continue."}
        </Typography>

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

        {resetMessage && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 1,
            }}
          >
            {resetMessage}
          </Alert>
        )}

        {/* EMAIL FIELD - SHOWN IN LOGIN AND RESET MODE */}
        {!isNewPassMode && (
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#B71C1C" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B71C1C",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#B71C1C",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#B71C1C",
              },
            }}
          />
        )}

        {/* PASSWORD & LOGIN BUTTON - ONLY IN LOGIN MODE */}
        {!isResetMode && !isNewPassMode && (
          <Fade in={!isResetMode && !isNewPassMode} timeout={500}>
            <Box>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#B71C1C" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        sx={{
                          color: "#B71C1C",
                          "&:hover": {
                            bgcolor: "rgba(183, 28, 28, 0.04)",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
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
                }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                disabled={isLoading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: "#B71C1C",
                  "&:hover": {
                    bgcolor: "#8B0000",
                  },
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(183, 28, 28, 0.3)",
                }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              {/* Forgot Password Link */}
              <Typography variant="body2" sx={{ mt: 3 }}>
                <Link
                  component="button"
                  onClick={handleForgotPassword}
                  sx={{
                    fontSize: "0.9rem",
                    color: "#B71C1C",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
          </Fade>
        )}

        {/* RESET PASSWORD BUTTON - ONLY IN RESET MODE */}
        {isResetMode && !isNewPassMode && (
          <Fade in={isResetMode && !isNewPassMode} timeout={500}>
            <Box>
              <Button
                fullWidth
                variant="contained"
                onClick={handleResetPassword}
                disabled={isLoading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: "#B71C1C",
                  "&:hover": {
                    bgcolor: "#8B0000",
                  },
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(183, 28, 28, 0.3)",
                }}
              >
                {isLoading ? "Checking..." : "Continue"}
              </Button>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Link
                  component="button"
                  onClick={() => {
                    setIsResetMode(false)
                    setIsNewPassMode(false)
                  }}
                  sx={{
                    fontSize: "0.9rem",
                    color: "#B71C1C",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Back to Login
                </Link>
              </Box>
            </Box>
          </Fade>
        )}

        {/* NEW PASSWORD MODE */}
        {isNewPassMode && (
          <Fade in={isNewPassMode} timeout={500}>
            <Box>
              {tempUserData.security_question && (
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: "rgba(183, 28, 28, 0.05)",
                    borderRadius: 1,
                    border: "1px solid rgba(183, 28, 28, 0.1)",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: "medium", color: "#333" }}>
                    {tempUserData.security_question}
                  </Typography>
                </Box>
              )}

              {/* Security Answer Input */}
              <TextField
                fullWidth
                label="Security Answer"
                variant="outlined"
                margin="normal"
                value={secAnswer}
                onChange={(e) => setSecAnswer(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <QuestionIcon sx={{ color: "#B71C1C" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#B71C1C",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#B71C1C",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#B71C1C",
                  },
                }}
              />

              <TextField
                fullWidth
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#B71C1C" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleNewPasswordVisibility}
                        edge="end"
                        sx={{
                          color: "#B71C1C",
                          "&:hover": {
                            bgcolor: "rgba(183, 28, 28, 0.04)",
                          },
                        }}
                      >
                        {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
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
                }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleNewPass}
                disabled={isLoading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: "#B71C1C",
                  "&:hover": {
                    bgcolor: "#8B0000",
                  },
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(183, 28, 28, 0.3)",
                }}
              >
                {isLoading ? "Updating..." : "Reset Password"}
              </Button>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Link
                  component="button"
                  onClick={() => {
                    setIsResetMode(false)
                    setIsNewPassMode(false)
                  }}
                  sx={{
                    fontSize: "0.9rem",
                    color: "#B71C1C",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Back to Login
                </Link>
              </Box>
            </Box>
          </Fade>
        )}

        {/* SIGN UP LINK */}
        {!isResetMode && !isNewPassMode && (
          <Typography
            variant="body2"
            sx={{
              mt: 4,
              textAlign: "center",
              color: "#666",
            }}
          >
            Don't have an account?{" "}
            <Button
              color="inherit"
              onClick={() => navigate("/CustSignup")}
              sx={{
                color: "#B71C1C",
                fontWeight: "500",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(183, 28, 28, 0.04)",
                },
              }}
            >
              Sign Up
            </Button>
          </Typography>
        )}
      </Paper>
    </Container>
  )
}

