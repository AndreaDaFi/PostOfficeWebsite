import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Alert, Link } from "@mui/material";

export default function CustLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetMessage, setResetMessage] = useState(null);
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate(); // For navigation instead of window.location.href

  const handleLogin = async () => {
    setError(null);
    setResetMessage(null);

    if (!email) return setError("⚠ Please enter your email.");
    if (!password) return setError("⚠ Please enter your password.");

    try {
      const response = await fetch("https://vercel-api-powebapp.vercel.app/api/EmployeeRLOGIN", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }

      alert("🎉 Login successful!");
      navigate("/dashboard"); // Use React Router for navigation

    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  const handleForgotPassword = () => {
    setIsResetMode(true);
    setError(null);
    setResetMessage(null);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("⚠ Please enter your email to receive the reset link.");
      return;
    }

    try {
      const response = await fetch("resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Reset failed");
      }

      setResetMessage("📩 Password reset instructions have been sent to your email.");

    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          style={{
            padding: "50px",
            width: "400px",
            backgroundColor: "#FFF",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#333" }}>
            📦 Employer Login
          </Typography>

          <Typography variant="body2" color="textSecondary" style={{ marginBottom: "20px" }}>
            {isResetMode ? "Enter your email to reset your password." : "Please enter your credentials to continue."}
          </Typography>

          {error && <Alert severity="error" style={{ marginBottom: "15px" }}>{error}</Alert>}
          {resetMessage && <Alert severity="success" style={{ marginBottom: "15px" }}>{resetMessage}</Alert>}

          {/* EMAIL FIELD */}
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            variant="outlined" 
            margin="normal" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
            <>
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
              <Typography variant="body2" style={{ marginTop: "15px", color: "#B71C1C" }}>
                📩 Check your email for password reset instructions.
              </Typography>
            </>
          )}

        
        </Paper>
      </Container>
    </div>
  );
}
