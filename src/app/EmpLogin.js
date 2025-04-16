"use client";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";

export default function CustLogin() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetMessage, setResetMessage] = useState(null);
  const [isResetMode, setIsResetMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // For navigation instead of window.location.href

  const handleLogin = async () => {
    setError(null);
    setResetMessage(null);
    setIsLoading(true);

    if (!email) {
      setIsLoading(false);
      return setError("⚠ Please enter your email.");
    }
    if (!password) {
      setIsLoading(false);
      return setError("⚠ Please enter your password.");
    }

    // Log email and password to the console
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch(
        "https://vercel-api-post-office-seven.vercel.app/api/EmployeeLOGIN",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }

      const data = await response.json();

      const employee = {
        ...data.user,
        role: data.user.role, //fetches the role attribute of the employee
      };
      login(employee);

      alert("Login successful!");
      navigate("/EmpDashboard"); // Use React Router for navigation
      window.location.reload();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setIsResetMode(true);
    setError(null);
    setResetMessage(null);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            <ShippingIcon sx={{ fontSize: 35, color: "white" }} />
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
          Employee Login
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mb: 3,
          }}
        >
          {isResetMode
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

        {/* EMAIL FIELD */}
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

        {/* PASSWORD & LOGIN BUTTON - HIDDEN IN RESET MODE */}
        {!isResetMode && (
          <Fade in={!isResetMode} timeout={500}>
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
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
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
            </Box>
          </Fade>
        )}
      </Paper>
    </Container>
  );
}
