import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, Link } from "@mui/material";

export default function CustLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetMessage, setResetMessage] = useState(null);
  const [isResetMode, setIsResetMode] = useState(false); // Track reset mode

  const handleLogin = async () => {
    setError(null);
    setResetMessage(null);

    if (!email) return setError("⚠ Please enter your email.");
    if (!password) return setError("⚠ Please enter your password.");

    try {
      const response = await fetch("https://your-api-url.com/customer-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      alert("Login successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = () => {
    setIsResetMode(true); // Switch to reset mode
    setError(null);
    setResetMessage(null);
  };

  const handleResetPassword = () => {
    if (!email) {
      setError("⚠ Please enter your email to receive the reset link.");
      return;
    }

    setError(null);
    setResetMessage("📩 Password reset instructions have been sent to your email.");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}>
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          style={{
            padding: "40px",
            borderRadius: "12px",
            backgroundColor: "#FFF",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#333" }}>
          📦 Customer Login
          </Typography>

          <Typography variant="body2" color="textSecondary" style={{ marginBottom: "20px" }}>
            {isResetMode ? "Enter your email to reset your password." : "Please enter your credentials to continue."}
          </Typography>

          {error && <Alert severity="error" style={{ marginBottom: "15px", backgroundColor: "#FFCDD2", color: "#B71C1C" }}>{error}</Alert>}
          {resetMessage && <Alert severity="success" style={{ marginBottom: "15px", backgroundColor: "#E8F5E9", color: "#1B5E20" }}>{resetMessage}</Alert>}

          {/* EMAIL FIELD (Always Visible) */}
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            variant="outlined" 
            margin="normal" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            InputProps={{ style: { backgroundColor: "#FFF", borderRadius: "8px" } }} 
          />

          {/* PASSWORD & LOGIN BUTTON - HIDDEN IN RESET MODE */}
          {!isResetMode && (
            <>
              <TextField 
                fullWidth 
                label="Password" 
                type="password" 
                variant="outlined" 
                margin="normal" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                InputProps={{ style: { backgroundColor: "#FFF", borderRadius: "8px" } }} 
              />

              <Button 
                fullWidth 
                variant="contained" 
                style={{ 
                  marginTop: "20px", 
                  padding: "12px 0", 
                  borderRadius: "8px", 
                  fontSize: "16px", 
                  fontWeight: "bold",
                  backgroundColor: "#D32F2F", 
                  color: "#FFF"
                }} 
                onClick={handleLogin}
              >
                LOGIN
              </Button>

              {/* Forgot Password Link */}
              <Typography variant="body2" style={{ marginTop: "15px" }}>
                <Link href="#" onClick={handleForgotPassword} style={{ fontSize: "14px", color: "#B71C1C" }}>
                  Forgot Password?
                </Link>
              </Typography>
            </>
          )}

          {/* RESET PASSWORD BUTTON - ONLY VISIBLE IN RESET MODE */}
          {isResetMode && (
            <Button 
              fullWidth 
              variant="contained" 
              style={{ 
                marginTop: "20px", 
                padding: "12px 0", 
                borderRadius: "8px", 
                fontSize: "16px", 
                fontWeight: "bold",
                backgroundColor: "#D32F2F", 
                color: "#FFF"
              }} 
              onClick={handleResetPassword}
            >
              SEND RESET LINK
            </Button>
          )}

          {/* Reset Password Mode Message */}
          {isResetMode && (
            <Typography variant="body2" style={{ marginTop: "15px", color: "#B71C1C" }}>
              📩 Check your email for password reset instructions.
            </Typography>
          )}

          {/* Customer Support Email */}
          <Typography variant="body2" style={{ marginTop: "20px", color: "#888" }}>
            Need help? Contact us at <Link href="mailto:support@yourcompany.com" style={{ fontWeight: "bold", color: "#D32F2F" }}>support@yourcompany.com</Link>
          </Typography>

         {/* SIGN UP LINK (DIRECTS TO CUSTOMER SIGN-UP) */}
{!isResetMode && (
  <Typography variant="body2" style={{ marginTop: "20px", color: "#666", textAlign: "center" }}>
    Don't have an account?{" "}
    <Button 
      color="inherit" 
      sx={{ color: '#D32F2F' }}
      onClick={(event) => { 
        event.preventDefault();  // ✅ Prevents unwanted page refresh
        console.log("Sign Up button clicked!");  // ✅ Debugging message
        window.location.href = "/CustSignup";  // ✅ Redirects correctly
      }}
    >
      Sign Up
    </Button>
  </Typography>
)}

        </Paper>
      </Container>
    </div>
  );
}
