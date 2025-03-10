import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, Link } from "@mui/material";

export default function CustSignin() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSignup = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() && !phone.trim()) return setError("⚠ Please enter your email or phone number.");
    if (!password) return setError("⚠ Please enter a password.");
    if (password.length < 6) return setError("⚠ Password must be at least 6 characters.");
    if (password !== confirmPassword) return setError("⚠ Passwords do not match!");

    try {
      const response = await fetch("https://your-api-url.com/customer-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Sign-up failed");

      setSuccessMessage("🎉 Account created successfully! You can now log in.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#F7F7F7"
    }}>
      <Container maxWidth="xs">
        <Paper elevation={3} style={{
          padding: "40px", borderRadius: "12px", backgroundColor: "#FFF",
          textAlign: "center", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
        }}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#333" }}>
            📦 Customer Sign-Up
          </Typography>

          <Typography variant="body2" color="textSecondary" style={{ marginBottom: "20px" }}>
            Create an account to continue.
          </Typography>

          {error && <Alert severity="error" style={{ marginBottom: "15px", backgroundColor: "#FFCDD2", color: "#B71C1C" }}>{error}</Alert>}
          {successMessage && <Alert severity="success" style={{ marginBottom: "15px", backgroundColor: "#E8F5E9", color: "#1B5E20" }}>{successMessage}</Alert>}

          {/* Email Input */}
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            variant="outlined" 
            margin="normal" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          {/* Phone Number Input (With Validation) */}
          <TextField 
            fullWidth 
            label="Phone Number" 
            type="tel" 
            variant="outlined" 
            margin="normal" 
            value={phone} 
            onChange={(e) => {
              const numericPhone = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
              setPhone(numericPhone);
            }} 
          />

          {/* Password Input */}
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            variant="outlined" 
            margin="normal" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          {/* Confirm Password Input */}
          <TextField 
            fullWidth 
            label="Confirm Password" 
            type="password" 
            variant="outlined" 
            margin="normal" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />

          {/* ✅ SIGN UP BUTTON (Fixed) */}
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
            onClick={handleSignup}
          >
            SIGN UP
          </Button>

          {/* Already Have an Account? - Sign In Link */}
          <Typography variant="body2" style={{ marginTop: "20px", color: "#666", textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/cust-login" style={{ fontWeight: "bold", color: "#D32F2F", textDecoration: "none" }}>
              Sign In
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}
