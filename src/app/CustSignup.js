import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, Link, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function CustSignin() {
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
  });

  const states = [
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"
  ];

  const stateNames = {
    al: "Alabama", ak: "Alaska", az: "Arizona", ar: "Arkansas", ca: "California", co: "Colorado", ct: "Connecticut", de: "Delaware", fl: "Florida", ga: "Georgia", hi: "Hawaii", id: "Idaho", il: "Illinois", in: "Indiana", ia: "Iowa", ks: "Kansas", ky: "Kentucky", la: "Louisiana", me: "Maine", md: "Maryland", ma: "Massachusetts", mi: "Michigan", mn: "Minnesota", ms: "Mississippi", mo: "Missouri", mt: "Montana", ne: "Nebraska", nv: "Nevada", nh: "New Hampshire", nj: "New Jersey", nm: "New Mexico", ny: "New York", nc: "North Carolina", nd: "North Dakota", oh: "Ohio", ok: "Oklahoma", or: "Oregon", pa: "Pennsylvania", ri: "Rhode Island", sc: "South Carolina", sd: "South Dakota", tn: "Tennessee", tx: "Texas", ut: "Utah", vt: "Vermont", va: "Virginia", wa: "Washington", wv: "West Virginia", wi: "Wisconsin", wy: "Wyoming"
  };

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const emailValid = (email) => {
    const emailStructure = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailStructure.test(email);
  };

  const birthdateValid = (birthdate) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!datePattern.test(birthdate)) return false;

    const [year, month, day] = birthdate.split('-').map(Number);

    // Check if the year, month, and day are valid integers
    if (year < 1900 || year > 2006 || month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    return true;
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || formData.firstName.length > 20) return "⚠ First Name must be up to 20 characters.";
    if (!formData.lastName.trim() || formData.lastName.length > 20) return "⚠ Last Name must be up to 20 characters.";
    if (!formData.birthdate) return "⚠ Birthdate is required.";
    if (!formData.streetAddress.trim() || formData.streetAddress.length > 45) return "⚠ Street Address must be up to 45 characters.";
    if (formData.streetAddress2.length > 45) return "⚠ Address Line 2 must be up to 45 characters.";
    if (formData.apt.length > 20) return "⚠ Apt/Suite must be up to 20 characters.";
    if (!formData.cityName.trim() || formData.cityName.length > 20) return "⚠ City Name must be up to 20 characters."; 
    if (!formData.stateID.trim() || formData.stateID.length !== 2) return "⚠ State ID must be exactly 2 characters.";
    if (!formData.zipCode.trim() || formData.zipCode.length !== 5) return "⚠ Zip Code must be exactly 5 digits.";
    if (!formData.email.trim() || formData.email.length > 45) return "⚠ Email must be up to 45 characters.";
    if (!emailValid(formData.email)) return "⚠ Email is not valid";
    if (!formData.password.trim() || formData.password.length > 45) return "⚠ Password must be up to 45 characters.";
    if (!formData.phone.trim() || formData.phone.length !== 10) return "⚠ Phone number must be exactly 10 digits.";
    if (!formData.securityQuestion) return "⚠ Please select a security question.";
    if (!formData.securityAnswer.trim() || formData.securityAnswer.length > 10) return "⚠ Security answer must be up to 10 characters.";
    if (!birthdateValid(formData.birthdate)) return "⚠ You must be over 18 and Use YYYY-MM-DD format.";
    return null;
  };

  const handleSignup = async () => {
    setError(null);
    setSuccessMessage(null);
  
    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);
  
    try {
      const response = await fetch("https://vercel-api-powebapp.vercel.app/api/custSignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Sign-up failed");
      }
  
      setSuccessMessage("🎉 Account created successfully! You can now log in.");
    } catch (err) {
      console.error("Request Error:", err); // Log the full error for debugging
      setError("An error occurred while processing your request. Details: " + err.message);
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
          <Typography variant="h5" style={{ fontWeight: "bold" }}>Customer Sign-Up</Typography>
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
                inputProps={{ maxLength: 20 }} helperText="Up to 20 characters" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Birthdate"
                name="birthdate"
                onChange={handleChange}
                required
                value={formData.birthdate}
                helperText="Enter date in YYYY-MM-DD format"
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Street Address" name="streetAddress" onChange={handleChange} required
                inputProps={{ maxLength: 45 }} helperText="Up to 45 characters" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address Line 2 (Apt, Suite, etc.)" name="addressLine2" onChange={handleChange}
                inputProps={{ maxLength: 45 }} helperText="Optional, up to 45 characters" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Apt/Suite" name="apt" onChange={handleChange}
                inputProps={{ maxLength: 20 }} helperText="Optional, up to 20 characters" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="City Name" name="cityName" onChange={handleChange} required
                inputProps={{ maxLength: 20 }} helperText="Up to 20 characters" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>State</InputLabel>
                <Select name="stateID" value={formData.stateID} onChange={handleChange}>
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {stateNames[state]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Zip Code" name="zipCode" onChange={handleChange} required
                inputProps={{ maxLength: 5 }} helperText="Exactly 5 digits" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} required
                inputProps={{ maxLength: 45 }} helperText="Up to 45 characters" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone Number" name="phone" type="tel" onChange={handleChange} required
                inputProps={{ maxLength: 10 }} helperText="Exactly 10 digits" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} required
                inputProps={{ maxLength: 45 }} helperText="Up to 45 characters" />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Security Question</InputLabel>
                <Select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange}>
                  <MenuItem value="Pet name">Pet name?</MenuItem>
                  <MenuItem value="Moms name">Mother name?</MenuItem>
                  <MenuItem value="Fav book">Favorite book?</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Security Answer" name="securityAnswer" onChange={handleChange} required
                inputProps={{ maxLength: 10 }} helperText="Up to 10 characters" />
            </Grid>
          </Grid>

          <Button fullWidth variant="contained" sx={{ marginTop: "20px", padding: "12px", backgroundColor: "#C8102E" }} onClick={handleSignup}>
            SIGN UP
          </Button>

          <Typography variant="body2" style={{ marginTop: "15px" }}>
            Already have an account? <Link href="/cust-login" style={{ color: "#C8102E" }}>Sign In</Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}
