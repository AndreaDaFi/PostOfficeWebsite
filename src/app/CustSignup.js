import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, Link, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function CustSignin() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    streetAddress: "",
    addressLine2: "",
    cityID: "",
    stateID: "",
    zipCode: "",
    email: "",
    password: "",
    phone: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || formData.firstName.length > 20) return "⚠ First Name must be up to 20 characters.";
    if (!formData.lastName.trim() || formData.lastName.length > 30) return "⚠ Last Name must be up to 30 characters.";
    if (!formData.birthdate) return "⚠ Birthdate is required.";
    if (!formData.streetAddress.trim() || formData.streetAddress.length > 50) return "⚠ Street Address must be up to 50 characters.";
    if (formData.addressLine2.length > 50) return "⚠ Address Line 2 must be up to 50 characters.";
    if (!formData.cityID.trim() || formData.cityID.length !== 2) return "⚠ City ID must be exactly 2 characters.";
    if (!formData.stateID.trim() || formData.stateID.length !== 2) return "⚠ State ID must be exactly 2 characters.";
    if (!formData.zipCode.trim() || formData.zipCode.length !== 5) return "⚠ Zip Code must be exactly 5 digits.";
    if (!formData.email.trim() || formData.email.length > 320) return "⚠ Email must be up to 320 characters.";
    if (!formData.password.trim() || formData.password.length > 10) return "⚠ Password must be up to 10 characters.";
    if (!formData.phone.trim() || formData.phone.length !== 10) return "⚠ Phone number must be exactly 10 digits.";
    if (!formData.securityQuestion) return "⚠ Please select a security question.";
    if (!formData.securityAnswer.trim() || formData.securityAnswer.length > 10) return "⚠ Security answer must be up to 10 characters.";
    return null;
  };

  const handleSignup = async () => {
    setError(null);
    setSuccessMessage(null);

    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);

    try {
      const response = await fetch("https://your-api-url.com/customer-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      padding: "20px",
      
    }}>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "30px", borderRadius: "12px", textAlign: "center" }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>📦 Customer Sign-Up</Typography>
          <Typography variant="body2" color="textSecondary">Create an account to continue.</Typography>

          {error && <Alert severity="error" style={{ marginTop: "15px" }}>{error}</Alert>}
          {successMessage && <Alert severity="success" style={{ marginTop: "15px" }}>{successMessage}</Alert>}

          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <TextField fullWidth label="First Name" name="firstName" onChange={handleChange} required 
                inputProps={{ maxLength: 20 }} helperText="Up to 20 characters" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Last Name" name="lastName" onChange={handleChange} required 
                inputProps={{ maxLength: 30 }} helperText="Up to 30 characters" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="date" label="Birthdate" name="birthdate" onChange={handleChange} required 
                InputLabelProps={{ shrink: true }} helperText="YYYY-MM-DD format" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Street Address" name="streetAddress" onChange={handleChange} required 
                inputProps={{ maxLength: 50 }} helperText="Up to 50 characters" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address Line 2 (Apt, Suite, etc.)" name="addressLine2" onChange={handleChange} 
                inputProps={{ maxLength: 50 }} helperText="Optional, up to 50 characters" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="City ID" name="cityID" onChange={handleChange} required 
                inputProps={{ maxLength: 2 }} helperText="Exactly 2 characters" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="State ID" name="stateID" onChange={handleChange} required 
                inputProps={{ maxLength: 2 }} helperText="Exactly 2 characters" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Zip Code" name="zipCode" onChange={handleChange} required 
                inputProps={{ maxLength: 5 }} helperText="Exactly 5 digits" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} required 
                inputProps={{ maxLength: 320 }} helperText="Up to 320 characters" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone Number" name="phone" type="tel" onChange={handleChange} required 
                inputProps={{ maxLength: 10 }} helperText="Exactly 10 digits" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} required 
                inputProps={{ maxLength: 10 }} helperText="Up to 10 characters" />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Security Question</InputLabel>
                <Select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange}>
                  <MenuItem value="What is your pet’s name?">What is your pet’s name?</MenuItem>
                  <MenuItem value="What is your mother's maiden name?">What is your mother's maiden name?</MenuItem>
                  <MenuItem value="What is your favorite book?">What is your favorite book?</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Security Answer" name="securityAnswer" onChange={handleChange} required 
                inputProps={{ maxLength: 10 }} helperText="Up to 10 characters" />
            </Grid>
          </Grid>

          <Button fullWidth variant="contained" color="primary" style={{ marginTop: "20px", padding: "12px" }} onClick={handleSignup}>
            SIGN UP
          </Button>

          <Typography variant="body2" style={{ marginTop: "15px" }}>
            Already have an account? <Link href="/cust-login">Sign In</Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}
