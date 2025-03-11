import React, { useState } from "react";
import { Container, Typography, Grid, Paper, TextField, Button, MenuItem, Select, InputLabel, FormControl, Alert, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export default function AddStaff() {
  const postOffices = [
    "CougarPost - Houston", "CougarPost - Los Angeles", "CougarPost - New York", "CougarPost - Chicago",
    "CougarPost - Miami", "CougarPost - Dallas", "CougarPost - Seattle", "CougarPost - Denver",
    "CougarPost - Atlanta", "CougarPost - San Francisco"
  ];

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", 
    "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", 
    "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", 
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const jobTitles = [
    { label: "Driver", icon: <LocalShippingIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> },
    { label: "Clerk", icon: <AttachMoneyIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> },
    { label: "Manager", icon: <SupervisorAccountIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> }
  ];

  const [staffData, staffPoData] = useState({
    fname: "",
    lname: "",
    roleName: "",
    zip: "",
    email: "",
    phone: "",
    salary: "",
    birthday: "",
    streetAddress: "",
    ssn: "",
    jobTitle: "",
    assignedPostOffice: "",
    state: "",
    city: ""
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Validate input fields
  const validatefname = (value) => value.length <= 20;
  const validatelname = (value) => value.length <= 30;
  const validateZipCode = (value) => /^[0-9]{5}$/.test(value);
  const validatephone = (value) => /^[0-9]{10}$/.test(value);
  const validatessn = (value) => /^[0-9]{9}$/.test(value);
  const validatesalary = (value) => {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && parsedValue > 0;
  };
  const validateStreetAddress = (value) => value.length <= 45;
  const validateemail = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  const validateCity = (value) => value.length <= 30;
  const validateState = (value) => value.length > 0;

  const handleSubmit = () => {
    setError(null);
    const { fname, lname, zip, email, phone, salary, birthday, streetAddress, ssn, jobTitle, assignedPostOffice, state, city } = staffData;
    if (
      !validatefname(fname) ||
      !validatelname(lname) ||
      !validateZipCode(zip) ||
      !validatephone(phone) ||
      !validatessn(ssn) ||
      validatesalary(salary) ||
      !validateStreetAddress(streetAddress) ||
      !validateemail(email) ||
      !validateCity(city) ||
      !validateState(state) ||
      !fname ||
      !lname ||
      !zip ||
      !email ||
      !phone ||
      !salary ||
      !birthday ||
      !streetAddress ||
      !ssn ||
      !jobTitle ||
      !assignedPostOffice ||
      !state ||
      !city
    ) {
      setError("⚠ Please fill in all required fields correctly.");
      return;
    }

    handleAddStaff();
  };

  const handleAddStaff = () => {
    setError(null);
    setSuccessMessage(null);

    console.log("New Staff Added:", staffData);
    setSuccessMessage(`🎉 Staff member ${staffData.fname} ${staffData.lname} added as ${staffData.jobTitle} at ${staffData.assignedPostOffice}!`);

    staffPoData({
      fname: "",
      lname: "",
      roleName: "",
      zip: "",
      email: "",
      phone: "",
      salary: "",
      birthday: "",
      streetAddress: "",
      ssn: "",
      jobTitle: "",
      assignedPostOffice: "",
      state: "",
      city: ""
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
        <Grid container spacing={2} justifyContent="center">
          {/* Row of inputs */}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="First Name"
                name="First Name"
                variant="outlined"
                value={staffData.fname}
                onChange={(e) => staffPoData({ ...staffData, fname: e.target.value })}
                error={!validatefname(staffData.fname)}
                helperText="Only up to 20 characters allowed."
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Last Name"
                name="Last Name"
                variant="outlined"
                value={staffData.lname}
                onChange={(e) => staffPoData({ ...staffData, lname: e.target.value })}
                error={!validatelname(staffData.lname)}
                helperText="Only up to 30 characters allowed."
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="SSN"
                name="SSN"
                variant="outlined"
                value={staffData.ssn}
                onChange={(e) => staffPoData({ ...staffData, ssn: e.target.value })}
                error={!validatessn(staffData.ssn)}
                helperText="Only up to 9 characters allowed."
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Birthdate"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={staffData.birthday}
                onChange={(e) => staffPoData({ ...staffData, birthday: e.target.value })}
              />
            </Grid>
          </Grid>
          {/* Row of inputs */}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Street Address"
                name="Street Address"
                variant="outlined"
                value={staffData.streetAddress}
                onChange={(e) => staffPoData({ ...staffData, streetAddress: e.target.value })}
                error={!validateStreetAddress(staffData.streetAddress)}
                helperText="Only up to 45 characters allowed."
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Zip Code"
                name="Zip Code"
                variant="outlined"
                value={staffData.zip}
                onChange={(e) => staffPoData({ ...staffData, zip: e.target.value })}
                error={!validateZipCode(staffData.zip)}
                helperText="Enter a valid zip code (5 digits)."
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="City"
                name="City"
                variant="outlined"
                value={staffData.city}
                onChange={(e) => staffPoData({ ...staffData, city: e.target.value })}
                error={!validateCity(staffData.city)}
                helperText="Only up to 30 characters allowed."
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select value={staffData.state} onChange={(e) => staffPoData({ ...staffData, state: e.target.value })}>
                  {states.map((state, index) => (
                    <MenuItem key={index} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Job Title and Post Office */}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Job Title</InputLabel>
                <Select value={staffData.jobTitle} onChange={(e) => staffPoData({ ...staffData, jobTitle: e.target.value })}>
                  {jobTitles.map((job, index) => (
                    <MenuItem key={index} value={job.label}>
                      {job.icon} {job.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Assign to Post Office</InputLabel>
                <Select value={staffData.assignedPostOffice} onChange={(e) => staffPoData({ ...staffData, assignedPostOffice: e.target.value })}>
                  {postOffices.map((office, index) => (
                    <MenuItem key={index} value={office}>
                      <BusinessIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> {office}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        {error && <Alert severity="error" style={{ marginTop: "15px", backgroundColor: "#FFCDD2", color: "#B71C1C" }}>{error}</Alert>}
        {successMessage && <Alert severity="success" style={{ marginTop: "15px", backgroundColor: "#E8F5E9", color: "#1B5E20" }}>{successMessage}</Alert>}

        <Button variant="contained" style={{ marginTop: "20px", padding: "12px 20px", borderRadius: "8px", backgroundColor: "#D32F2F", color: "#FFF" }} onClick={handleSubmit}>
          ➕ Add Staff Member
        </Button>
      </Paper>
    </Container>
  );
}
