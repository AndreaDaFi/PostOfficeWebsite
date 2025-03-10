import React, { useState } from "react";
import { Container, Typography, Grid, Paper, TextField, Button, MenuItem, Select, InputLabel, FormControl, Alert } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessIcon from "@mui/icons-material/Business";

export default function AddMngr() {
  // List of Post Office locations (Admin assigns manager here)
  const postOffices = [
    "CougarPost - Houston",
    "CougarPost - Los Angeles",
    "CougarPost - New York",
    "CougarPost - Chicago",
    "CougarPost - Miami",
    "CougarPost - Dallas",
    "CougarPost - Seattle",
    "CougarPost - Denver",
    "CougarPost - Atlanta",
    "CougarPost - San Francisco"
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [assignedPostOffice, setAssignedPostOffice] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddManager = () => {
    setError(null);
    setSuccessMessage(null);

    if (!name || !email || !phone || !assignedPostOffice) {
      setError("⚠ Please fill in all fields.");
      return;
    }

    // Simulating adding a manager (You would replace this with an API request)
    console.log("New Manager Added:", { name, email, phone, assignedPostOffice });

    setSuccessMessage(`🎉 Manager ${name} added to ${assignedPostOffice}!`);
    setName("");
    setEmail("");
    setPhone("");
    setAssignedPostOffice("");
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🏤 Add New Post Office Manager
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "30px" }}>
        Assign a manager to oversee a CougarPost location.
      </Typography>

      {/* Add New Manager Form */}
      <Paper style={{ padding: "20px", marginBottom: "20px", borderRadius: "10px", backgroundColor: "#fff" }} elevation={4}>
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
          <PersonAddIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
          Add a New Manager
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Manager Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" type="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number" type="tel" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Assign to Post Office</InputLabel>
              <Select value={assignedPostOffice} onChange={(e) => setAssignedPostOffice(e.target.value)}>
                {postOffices.map((office, index) => (
                  <MenuItem key={index} value={office}>
                    <BusinessIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
                    {office}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Error Message */}
        {error && (
          <Alert severity="error" style={{ marginTop: "15px", backgroundColor: "#FFCDD2", color: "#B71C1C" }}>
            {error}
          </Alert>
        )}

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" style={{ marginTop: "15px", backgroundColor: "#E8F5E9", color: "#1B5E20" }}>
            {successMessage}
          </Alert>
        )}

        {/* Add Manager Button */}
        <Button 
          variant="contained"
          style={{ marginTop: "20px", padding: "12px 20px", borderRadius: "8px", backgroundColor: "#D32F2F", color: "#FFF" }}
          onClick={handleAddManager}
        >
          ➕ Add Manager
        </Button>
      </Paper>
    </Container>
  );
}
