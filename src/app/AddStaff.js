import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, TextField, Button, Typography, Paper, Alert, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function AddStaff() {
  const { user } = useContext(AuthContext);
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
    postOfficeID: "",
    street: "",
    streetLine2: "",
    aptNumber: "",
    city: "",
    state: "",
    zipCode: "",
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
    if (!formData.street.trim() || formData.street.length > 45) return "⚠ Street address must be up to 45 characters.";
    if (formData.streetLine2.length > 45) return "⚠ Street Address Line 2 must be up to 45 characters.";
    if (!formData.city.trim() || formData.city.length > 45) return "⚠ City must be up to 45 characters.";
    if (!formData.state) return "⚠ Please select a state.";
    if (!formData.zipCode.trim() || formData.zipCode.length !== 5 || isNaN(formData.zipCode)) return "⚠ Zip Code must be exactly 5 digits.";
    if (!formData.password.trim() || formData.password.length > 10) return "⚠ Password must be up to 10 characters.";
    if (!formData.securityQuestion) return "⚠ Please select a security question.";
    if (!formData.securityAnswer.trim() || formData.securityAnswer.length > 10) return "⚠ Security answer must be up to 10 characters.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return "⚠ Please enter a valid email address.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) return "⚠ Please enter a valid phone number (10 digits).";
    return null;
  };

  const handleAddStaff = async () => {
    setError(null);
    setSuccessMessage(null);

    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);

    try {
      // gets the employees_id of the manager that's currently logged in
      const mngrID = user?.employees_id;
      const po_id = user?.po_id;
      // adds this id to the data that needs to be passed to the api
      const newStaffData = {
        ...formData, // the actual employee data collected
        mngr_id: mngrID, // pass the current manager's id to the api
        po_id: po_id,
      };

      const response = await fetch("http://localhost:3001/api/AddStaff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaffData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Staff creation failed");

      setSuccessMessage("🎉 Staff member created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // List of U.S. states for the dropdown
  const states = [
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"
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
          <Typography variant="h5" style={{ fontWeight: "bold" }}>👨‍💼 Add New Staff Member</Typography>
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
              <TextField
                fullWidth
                type="date"
                label="Birthdate"
                name="birthdate"
                onChange={handleChange}
                required
                value={formData.birthdate}
                InputLabelProps={{ shrink: true }}
                helperText="YYYY-MM-DD format"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
    fullWidth
    type="date"
    label="Hire Date"
    name="hire_date"
    value={formData.hire_date} // This is set to the default current date
    disabled
    InputLabelProps={{ shrink: true }}
    helperText="Current date"
  />
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

            {/* Email and Phone Fields */}
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" onChange={handleChange} required 
                inputProps={{ maxLength: 50 }} helperText="Valid email address" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" name="phone" onChange={handleChange} required 
                inputProps={{ maxLength: 10 }} helperText="10 digits (e.g., 1234567890)" />
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
