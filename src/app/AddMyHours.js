import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, Grid } from "@mui/material";

export default function AddMyHours() {
  const [formData, setFormData] = useState({
    workDate: new Date().toISOString().split("T")[0], // Set current date as default
    hoursWorked: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Assuming you have the employee's ID in the session or some global state
  const employeeId = "12345"; // Replace with actual method to get employee ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.hoursWorked || isNaN(formData.hoursWorked)) return "⚠ Hours worked must be a valid number.";
    if (formData.hoursWorked < 0 || formData.hoursWorked > 24) return "⚠ Hours worked must be between 0 and 24.";
    return null;
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccessMessage(null);

    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);

    // Add employeeId to the data before sending
    const dataToSend = { ...formData, employeeId };

    try {
      const response = await fetch("https://vercel-api-post-office-seven.vercel.app/api/add-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to submit hours.");

      setSuccessMessage("🎉 Hours submitted successfully!");
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
          <Typography variant="h5" style={{ fontWeight: "bold" }}>⏰ Add My Work Hours</Typography>
          <Typography variant="body2" color="textSecondary">Enter the hours you've worked on a specific date.</Typography>

          {error && <Alert severity="error" style={{ marginTop: "15px" }}>{error}</Alert>}
          {successMessage && <Alert severity="success" style={{ marginTop: "15px" }}>{successMessage}</Alert>}

          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date Worked"
                name="workDate"
                onChange={handleChange}
                value={formData.workDate}
                required
                InputLabelProps={{ shrink: true }}
                helperText="Select the date you worked"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hours Worked"
                name="hoursWorked"
                onChange={handleChange}
                value={formData.hoursWorked}
                required
                type="number"
                inputProps={{ min: 0, max: 24 }}
                helperText="Enter the number of hours worked (0 - 24)"
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", padding: "12px" }}
            onClick={handleSubmit}
          >
            Submit Hours
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
