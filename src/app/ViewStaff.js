import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, InputAdornment } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

export default function ViewStaffActivity() {
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleViewActivity = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!employeeId.trim()) return setError("⚠ Please enter the employee ID.");
    if (!firstName.trim()) return setError("⚠ Please enter the first name.");
    if (!lastName.trim()) return setError("⚠ Please enter the last name.");

    try {
      setSuccessMessage("✅ Viewing staff activity...");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>👥 View Staff Activity</Typography>
        <Typography variant="body2" color="textSecondary">Enter employee details to view activity.</Typography>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}

        <TextField
          fullWidth
          label="Employee ID"
          name="employeeId"
          inputProps={{ maxLength: 6 }}
          onChange={(e) => setEmployeeId(e.target.value)}
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon sx={{ color: '#D32F2F' }} />
              </InputAdornment>
            )
          }}
        />
        
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: '#D32F2F' }} />
              </InputAdornment>
            )
          }}
        />
        
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#D32F2F' }} />
              </InputAdornment>
            )
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, p: 2, backgroundColor: "#D32F2F", color: "#FFF" }}
          onClick={handleViewActivity}
        >
          🔍 VIEW STAFF ACTIVITY
        </Button>
      </Paper>
    </Container>
  );
}