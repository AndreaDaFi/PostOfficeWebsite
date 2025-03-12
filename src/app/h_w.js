import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, Grid, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function ViewStaffActivity() {
  const [employeeId, setEmployeeId] = useState("");
  const [totalHours, setTotalHours] = useState(null);
  const [error, setError] = useState(null);

  const staffHours = {
    EMP101: [8, 7, 6, 9, 5, 4, 3],
    EMP102: [9, 8, 7, 6, 5, 4, 3],
    EMP103: [7, 6, 5, 9, 8, 7, 6],
  };

  const calculateTotalHours = () => {
    setError(null);
    if (!employeeId.trim()) {
      setError("⚠ Please enter an employee ID.");
      return;
    }
    if (!staffHours[employeeId]) {
      setError("⚠ Employee ID not found.");
      return;
    }
    const total = staffHours[employeeId].reduce((acc, hours) => acc + hours, 0);
    setTotalHours(total);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "12px", textAlign: "center" }}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>⏳ Hours Worked Report</Typography>
        <Typography variant="body2" color="textSecondary">Enter an employee ID to view total hours worked.</Typography>

        {error && <Alert severity="error" style={{ marginTop: "15px" }}>{error}</Alert>}
        {totalHours !== null && (
          <Alert severity="success" style={{ marginTop: "15px" }}>
            ✅ Total Hours Worked: {totalHours} hours
          </Alert>
        )}

        <TextField
          fullWidth
          label="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={{ marginTop: "20px" }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "20px", padding: "12px" }}
          onClick={calculateTotalHours}
        >
          🔍 View Hours Worked
        </Button>
      </Paper>
    </Container>
  );
}
