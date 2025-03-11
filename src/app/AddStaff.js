import React, { useState } from "react";
import { Container, Typography, Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, Box } from "@mui/material";

export default function AddStaff() {
  const [staffData, setStaffData] = useState({
    fname: "",
    lname: "",
    zip: "",
    email: "",
    phone: "",
    salary: "",
    birthday: "",
    streetAddress: "",
    ssn: "",
    roleName: "",
    assignedPostOffice: "",
    state: "",
    city: "",
    username: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
    securityCode: ""
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Validation Functions
  const validatefname = (value) => value.length <= 20;
  const validatelname = (value) => value.length <= 30;
  const validateZipCode = (value) => /^[0-9]{5}$/.test(value);
  const validatephone = (value) => /^[0-9]{10}$/.test(value);
  const validatessn = (value) => /^[0-9]{9}$/.test(value);
  const validatesalary = (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0;
  const validateStreetAddress = (value) => value.length <= 45;
  const validateemail = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  const validateCity = (value) => value.length <= 30;
  const validateState = (value) => value.length > 0;
  const validateUsername = (value) => value.length >= 6;
  const validatePassword = (value) => value.length >= 8 && value.length <= 45;
  const validateSecurityCode = (value) => /^[0-9]{6}$/.test(value);
  const validatePostOfficeId = (value) => /^[0-9]{6}$/.test(value);

  // Handle submit
  const handleSubmit = () => {
    setError(null);
    const { fname, lname, zip, email, phone, salary, birthday, streetAddress, ssn, roleName, assignedPostOffice, state, city, username, password, securityQuestion, securityAnswer, securityCode } = staffData;

    // Check validation
    if (
      !validatefname(fname) ||
      !validatelname(lname) ||
      !validateZipCode(zip) ||
      !validatephone(phone) ||
      !validatessn(ssn) ||
      !validatesalary(salary) ||
      !validateStreetAddress(streetAddress) ||
      !validateemail(email) ||
      !validateCity(city) ||
      !validateState(state) ||
      !validateUsername(username) ||
      !validatePassword(password) ||
      !validateSecurityCode(securityCode) ||
      !validatePostOfficeId(assignedPostOffice) ||
      !securityQuestion ||
      !securityAnswer ||
      !fname ||
      !lname ||
      !zip ||
      !email ||
      !phone ||
      !salary ||
      !birthday ||
      !streetAddress ||
      !ssn ||
      !roleName ||
      !state ||
      !city
    ) {
      setError("⚠ Please fill in all required fields correctly.");
      return;
    }

    handleAddStaff();
  };

  // Add Staff Function
  const handleAddStaff = () => {
    setError(null);
    setSuccessMessage(null);

    console.log("New Staff Added:", staffData);
    setSuccessMessage(`🎉 Staff member ${staffData.fname} ${staffData.lname} added as ${staffData.roleName} with Post Office ID ${staffData.assignedPostOffice}!`);

    setStaffData({
      fname: "",
      lname: "",
      zip: "",
      email: "",
      phone: "",
      salary: "",
      birthday: "",
      streetAddress: "",
      ssn: "",
      roleName: "",
      assignedPostOffice: "",
      state: "",
      city: "",
      username: "",
      password: "",
      securityQuestion: "",
      securityAnswer: "",
      securityCode: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData({
      ...staffData,
      [name]: value
    });
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🏢 Add New Staff Member
      </Typography>

      <Box sx={{ marginBottom: '20px' }} />

      <Paper style={{ padding: "20px", marginBottom: "20px", borderRadius: "10px", backgroundColor: "#fff" }} elevation={4}>
        <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>👤 New Hire Info</Typography>
        <Box sx={{ marginBottom: '40px' }} />
        <Grid container spacing={2} justifyContent="center">

          {/* Row of inputs */}
          <Grid container spacing={2} item xs={12}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="fname"
                variant="outlined"
                value={staffData.fname}
                onChange={handleChange}
                error={!validatefname(staffData.fname)}
                helperText="Only up to 20 characters allowed."
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lname"
                variant="outlined"
                value={staffData.lname}
                onChange={handleChange}
                error={!validatelname(staffData.lname)}
                helperText="Only up to 30 characters allowed."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="SSN"
                name="ssn"
                variant="outlined"
                value={staffData.ssn}
                onChange={handleChange}
                error={!validatessn(staffData.ssn)}
                helperText="Only up to 9 characters allowed."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Birthdate"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={staffData.birthday}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Row of inputs */}
          <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="streetAddress"
                variant="outlined"
                value={staffData.streetAddress}
                onChange={handleChange}
                error={!validateStreetAddress(staffData.streetAddress)}
                helperText="Only up to 45 characters allowed."
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zip"
                variant="outlined"
                value={staffData.zip}
                onChange={handleChange}
                error={!validateZipCode(staffData.zip)}
                helperText="Enter a valid zip code (5 digits)."
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                variant="outlined"
                value={staffData.city}
                onChange={handleChange}
                error={!validateCity(staffData.city)}
                helperText="Only up to 30 characters allowed."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Post Office ID"
                name="assignedPostOffice"
                variant="outlined"
                value={staffData.assignedPostOffice}
                onChange={handleChange}
                error={!validatePostOfficeId(staffData.assignedPostOffice)}
                helperText="Enter a valid 6-digit Post Office ID."
              />
            </Grid>
          </Grid>

          {/* Security Details */}
          <Grid container spacing={2} item xs={12}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                value={staffData.username}
                onChange={handleChange}
                error={!validateUsername(staffData.username)}
                helperText="Username must be at least 6 characters."
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                value={staffData.password}
                onChange={handleChange}
                error={!validatePassword(staffData.password)}
                helperText="Password must be between 8 and 45 characters."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Security Question</InputLabel>
                <Select
                  name="securityQuestion"
                  value={staffData.securityQuestion}
                  onChange={handleChange}
                >
                  <MenuItem value="What is your pet’s name?">What is your pet’s name?</MenuItem>
                  <MenuItem value="What is your mother's maiden name?">What is your mother's maiden name?</MenuItem>
                  <MenuItem value="What is your favorite book?">What is your favorite book?</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Security Answer"
                name="securityAnswer"
                value={staffData.securityAnswer}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
                helperText="Up to 10 characters"
              />
            </Grid>
          </Grid>
        </Grid>

          {error && <Alert severity="error" style={{ marginTop: "15px", backgroundColor: "#FFCDD2", color: "#B71C1C" }}>{error}</Alert>}
          {successMessage && <Alert severity="success" style={{ marginTop: "15px", backgroundColor: "#E8F5E9", color: "#1B5E20" }}>{successMessage}</Alert>}

          <Button
            variant="contained"
            style={{ marginTop: "20px", padding: "12px 20px", borderRadius: "8px", backgroundColor: "#D32F2F", color: "#FFF" }}
            onClick={handleSubmit}
          >
            ➕ Add Staff Member
          </Button>
        </Paper>
      </Container>
    );
}
