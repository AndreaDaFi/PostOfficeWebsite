import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, MenuItem, Select, InputAdornment } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SearchIcon from '@mui/icons-material/Search';
import BadgeIcon from '@mui/icons-material/Badge';

export default function UpdatePackageStatus() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const statusOptions = [
    "Pending",
    "In Transit",
    "Out for Delivery",
    "Delivered",
    "Returned",
    "missing"
  ];

  const handleUpdateStatus = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!trackingNumber.trim()) return setError("⚠ Please enter the tracking number.");
    if (!employeeId.trim()) return setError("⚠ Please enter the employee ID.");
    if (!status.trim()) return setError("⚠ Please select a package status.");

    try {
      setSuccessMessage("✅ Package status updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <LocalShippingIcon sx={{ fontSize: 50, color: "#D32F2F", mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>📦 Update Package Status</Typography>
        <Typography variant="body2" color="textSecondary">Enter tracking number and select a status.</Typography>

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
        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
          Employee ID must be exactly 6 characters, required field
        </Typography>

        <TextField
          fullWidth
          label="Tracking Number"
          name="trackingNumber"
          inputProps={{ maxLength: 10 }}
          onChange={(e) => setTrackingNumber(e.target.value)}
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#D32F2F' }} />
              </InputAdornment>
            )
          }}
        />
        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
          Tracking Number must be exactly 10 characters, required field
        </Typography>

        <Select
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          displayEmpty
          sx={{ mt: 2 }}
        >
          <MenuItem value="" disabled>Select Package Status</MenuItem>
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
          Package status selection is required
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, p: 2, backgroundColor: "#D32F2F", color: "#FFF" }}
          onClick={handleUpdateStatus}
        >
           UPDATE STATUS & DETAILS
        </Button>
      </Paper>
    </Container>
  );
}
