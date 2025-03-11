import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function AddStaff() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    salary: "",
    hire_date: new Date().toISOString().split("T")[0], // Set current date as default
    ssn: "",
    role: "",
    postOfficeID: "",
    password: "",
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
    if (!formData.salary || isNaN(formData.salary)) return "⚠ Salary must be a valid decimal number.";
    if (!formData.ssn.trim() || formData.ssn.length !== 9 || isNaN(formData.ssn)) return "⚠ SSN must be exactly 9 digits.";
    if (!formData.postOfficeID.trim() || formData.postOfficeID.length !== 6 || isNaN(formData.postOfficeID)) return "⚠ Post Office ID must be exactly 6 digits.";
    if (!formData.role) return "⚠ Please select a role.";
    if (!formData.password.trim() || formData.password.length > 10) return "⚠ Password must be up to 10 characters.";
    if (!formData.securityQuestion) return "⚠ Please select a security question.";
    if (!formData.securityAnswer.trim() || formData.securityAnswer.length > 10) return "⚠ Security answer must be up to 10 characters.";
    return null;
  };

  const handleAddStaff = async () => {
    setError(null);
    setSuccessMessage(null);

    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);

    try {
      const response = await fetch("https://your-api-url.com/add-staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Staff creation failed");

      setSuccessMessage("🎉 Staff member created successfully!");
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
          <Typography variant="h5" style={{ fontWeight: "bold" }}>👨‍💼 Add New Staff</Typography>
          <Typography variant="body2" color="textSecondary">Add a new staff member to the system.</Typography>

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
              <TextField fullWidth type="number" label="Salary" name="salary" onChange={handleChange} required 
                helperText="Decimal number" inputProps={{ min: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth value={formData.hire_date} type="date" label="Hire Date" name="hire_date" disabled 
                InputLabelProps={{ shrink: true }} helperText="Current date" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="SSN" name="ssn" onChange={handleChange} required 
                inputProps={{ maxLength: 9 }} helperText="Exactly 9 digits" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={formData.role} onChange={handleChange}>
                  <MenuItem value="Driver">Driver</MenuItem>
                  <MenuItem value="Clerk">Clerk</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Post Office ID" name="postOfficeID" onChange={handleChange} required 
                inputProps={{ maxLength: 6 }} helperText="Exactly 6 digits" />
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

          <Button fullWidth variant="contained" color="primary" style={{ marginTop: "20px", padding: "12px" }} onClick={handleAddStaff}>
            ADD STAFF
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
