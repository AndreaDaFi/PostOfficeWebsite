import React, { useState } from "react";
import { Container, Typography, Grid, Paper, TextField, Button, MenuItem, Select, InputLabel, FormControl, Alert } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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

  const jobTitles = [
    { label: "Driver", icon: <LocalShippingIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> },
    { label: "Cashier", icon: <AttachMoneyIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> },
    { label: "Customer Service Representative", icon: <SupportAgentIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> },
    { label: "Supervisor", icon: <SupervisorAccountIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> }
  ];

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [assignedPostOffice, setAssignedPostOffice] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddStaff = () => {
    setError(null);
    setSuccessMessage(null);

    if (!name || !lastName || !email || !phone || !jobTitle || !assignedPostOffice) {
      setError("⚠ Please fill in all fields.");
      return;
    }

    if (name.length > 20) {
      setError("⚠ Name must be 20 characters or less.");
      return;
    }

    if (lastName.length > 30) {
      setError("⚠ Last Name must be 30 characters or less.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("⚠ Phone number must be exactly 10 digits.");
      return;
    }

    console.log("New Staff Added:", { name, lastName, email, phone, jobTitle, assignedPostOffice });
    setSuccessMessage(`🎉 Staff member ${name} ${lastName} added as ${jobTitle} at ${assignedPostOffice}!`);
    setName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setJobTitle("");
    setAssignedPostOffice("");
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🏢 Add New Staff Member
      </Typography>
      
      <Paper style={{ padding: "20px", marginBottom: "20px", borderRadius: "10px", backgroundColor: "#fff" }} elevation={4}>
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
          <PersonAddIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
          Add a New Staff Member
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name " variant="outlined" value={name} onChange={(e) => setName(e.target.value)} helperText="Only up to 20 characters allowed." />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name " variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} helperText="Only up to 30 characters allowed." />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" type="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number " type="tel" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} helperText="Must be exactly 10 digits." />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Job Title</InputLabel>
              <Select value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
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
              <Select value={assignedPostOffice} onChange={(e) => setAssignedPostOffice(e.target.value)}>
                {postOffices.map((office, index) => (
                  <MenuItem key={index} value={office}>
                    <BusinessIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> {office}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {error && <Alert severity="error" style={{ marginTop: "15px", backgroundColor: "#FFCDD2", color: "#B71C1C" }}>{error}</Alert>}
        {successMessage && <Alert severity="success" style={{ marginTop: "15px", backgroundColor: "#E8F5E9", color: "#1B5E20" }}>{successMessage}</Alert>}

        <Button variant="contained" style={{ marginTop: "20px", padding: "12px 20px", borderRadius: "8px", backgroundColor: "#D32F2F", color: "#FFF" }} onClick={handleAddStaff}>
          ➕ Add Staff Member
        </Button>
      </Paper>
    </Container>
  );
}
