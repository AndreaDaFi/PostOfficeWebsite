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
    securityQuestion: "",
    securityCode: "",
    securityAnswer: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'birthdate') {
      // Validate or format the date here if needed
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        // Date is valid, proceed with setting state
        setFormData({ ...formData, [name]: value });
      } else {
        // Handle invalid date
        setError('Invalid date format. Please use YYYY-MM-DD.');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const validateForm = () => {
    if (!formData.firstName.trim() || formData.firstName.length > 20) return "⚠ First Name must be up to 20 characters.";
    if (!formData.lastName.trim() || formData.lastName.length > 30) return "⚠ Last Name must be up to 30 characters.";
    if (!formData.birthdate || !/^\d{4}-\d{2}-\d{2}$/.test(formData.birthdate)) return "⚠ Birthdate must be in YYYY-MM-DD format.";
    if (!formData.salary || isNaN(formData.salary)) return "⚠ Salary must be a valid decimal number.";
    if (!formData.ssn.trim() || formData.ssn.length !== 9 || isNaN(formData.ssn)) return "⚠ SSN must be exactly 9 digits.";
    if (!formData.postOfficeID.trim() || formData.postOfficeID.length !== 1 || isNaN(formData.postOfficeID)) return "⚠ Post Office ID must be exactly 1 digit.";
    if (!formData.street.trim() || formData.street.length > 45) return "⚠ Street address must be up to 45 characters.";
    if (formData.streetLine2.length > 45) return "⚠ Street Address Line 2 must be up to 45 characters.";
    if (!formData.city.trim() || formData.city.length > 45) return "⚠ City must be up to 45 characters.";
    if (!formData.state) return "⚠ Please select a state.";
    if (!formData.zipCode.trim() || formData.zipCode.length !== 5 || isNaN(formData.zipCode)) return "⚠ Zip Code must be exactly 5 digits.";
    if (!formData.email.trim() || !formData.email.includes('@')) return "⚠ Invalid email format.";
    if (!formData.phone.trim() || formData.phone.length !== 10 || isNaN(formData.phone)) return "⚠ Phone number must be exactly 10 digits.";
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
      const response = await fetch('/api/addManager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      
      //checking here
      
      
      if (!response.ok) throw new Error(response.statusText);
  
      //const data = await response.json();
  
      setSuccessMessage("🎉 Staff member created successfully!");
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Network error or server issue. Please check your connection.');
      } else if (err.message.includes('502')) {
        setError('Server error: Bad Gateway. Please try again later.');
      } else if (err.message.includes('404')) {
        setError('Resource not found. Please check the API endpoint.');
      } else {
        setError(err.message);
      }
    }
    
  };
  
  

  // List of U.S. states for the dropdown
  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "tx", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    }}>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "30px", borderRadius: "12px", textAlign: "center" }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>👨‍💼 Add New Manager</Typography>
          <Typography variant="body2" color="textSecondary">Add a new manager to the system.</Typography>

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
  <TextField fullWidth label="Birthdate" name="birthdate" onChange={handleChange} required 
    inputProps={{ maxLength: 10 }} helperText="YYYY-MM-DD format" />
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
                  <MenuItem value="Driver">Manager</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
  <TextField
    fullWidth
    label="Post Office ID"
    name="postOfficeID"
    onChange={handleChange}
    required
    inputProps={{ maxLength: 1, pattern: "[0-9]" }} // Limit to one digit
    helperText="Exactly 1 digit"
  />
</Grid>


            {/* Address Fields */}
            <Grid item xs={12}>
              <TextField fullWidth label="Street Address" name="street" onChange={handleChange} required 
                inputProps={{ maxLength: 45 }} helperText="Up to 45 characters" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Street Address Line 2" name="streetLine2" onChange={handleChange} 
                inputProps={{ maxLength: 45 }} helperText="Up to 45 characters (optional)" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Apartment Number" name="aptNumber" onChange={handleChange} 
                inputProps={{ maxLength: 10 }} helperText="Optional" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="City" name="city" onChange={handleChange} required 
                inputProps={{ maxLength: 45 }} helperText="Up to 45 characters" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>State</InputLabel>
                <Select name="state" value={formData.state} onChange={handleChange}>
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Zip Code" name="zipCode" onChange={handleChange} required 
                inputProps={{ maxLength: 5 }} helperText="Exactly 5 digits" />
            </Grid>

            {/* Security & Password Fields */}
          
            <Grid item xs={12}>
              <TextField fullWidth label="Security Code" name="securityCode" onChange={handleChange} required 
                inputProps={{ maxLength: 45 }} helperText="Up to 45 characters" />
            </Grid>
            <Grid item xs={12}>
  <TextField fullWidth label="Email" name="email" onChange={handleChange} required 
    helperText="Valid email format" />
</Grid>
<Grid item xs={12}>
  <TextField fullWidth label="Phone Number" name="phone" onChange={handleChange} required 
    inputProps={{ maxLength: 10, pattern: "[0-9]*" }} helperText="Exactly 10 digits" />
</Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} required 
                inputProps={{ maxLength: 10 }} helperText="Up to 10 characters" />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Security Question</InputLabel>
                <Select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange}>
                  <MenuItem value="What is your pets name">What is your pets name</MenuItem>
                  <MenuItem value="What is your mothers maiden name">What is your mothers maiden name</MenuItem>
                  <MenuItem value="What is your favorite book">What is your favorite book</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Security Answer" name="securityAnswer" onChange={handleChange} required 
                inputProps={{ maxLength: 10 }} helperText="Up to 10 characters" />
            </Grid>
          </Grid>

          <Button fullWidth variant="contained" color="error" style={{ marginTop: "20px", padding: "12px" }} onClick={handleAddStaff}>
            ADD Manager
          </Button>

        </Paper>
      </Container>
    </div>
  );
}