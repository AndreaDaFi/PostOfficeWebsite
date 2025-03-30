import React, { useState, useContext, useEffect } from "react";
import { Container, Button, Typography, Paper, Alert, CircularProgress, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

export default function ViewStaffActivity() {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [statusUpdate, setStatusUpdate] = useState(""); 
  const [employeeRole, setEmployeeRole] = useState(""); 
  const [specificEmployee, setSpecificEmployee] = useState(""); 
  const [employeesList, setEmployeesList] = useState([]); // List of employees fetched dynamically
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [totalRows, setTotalRows] = useState(0); 
  const [filteredRows, setFilteredRows] = useState(0); 
  const [isLoading, setIsLoading] = useState(false); 

  // Fetch employees dynamically based on manager's po_id
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch(`https://apipost.vercel.app/api/employees?po_id=${user?.po_id}`);
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployeesList(data.employees || []);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchEmployees();
  }, [user?.po_id]);

  const handleViewActivity = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      const response = await fetch('https://apipost.vercel.app/api/staffActivity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          po_id: user?.po_id,
          startDate,
          endDate,
          statusUpdate,
          employeeRole,
          specificEmployee,
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setData(data.data);
      setTotalRows(data.totalRows);
      setFilteredData(data.data);
      setFilteredRows(data.data.length);
      setSuccessMessage("Data fetched successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>👥 View Staff Activity</Typography>
        <Typography variant="body2" color="textSecondary">Enter filters to view staff activity.</Typography>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}

        <label>Start Date:</label>
<input 
  type="text" 
  value={startDate} 
  onChange={(e) => setStartDate(e.target.value)} 
  placeholder="YYYY-MM-DD"
/>
        <br />
        <label>End Date:</label>
<input 
  type="text" 
  value={startDate} 
  onChange={(e) => setStartDate(e.target.value)} 
  placeholder="YYYY-MM-DD"
/>
        <br />

        {/* Dropdown for Status Update */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Status Update</InputLabel>
          <Select value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Transit">In Transit</MenuItem>
            <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
            <MenuItem value="Missing">Missing</MenuItem>
          </Select>
        </FormControl>

        {/* Dropdown for Employee Role */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Employee Role</InputLabel>
          <Select value={employeeRole} onChange={(e) => setEmployeeRole(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Driver">Driver</MenuItem>
            <MenuItem value="Clerk">Clerk</MenuItem>
          </Select>
        </FormControl>

        {/* Dropdown for Specific Employee */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Specific Employee</InputLabel>
          <Select value={specificEmployee} onChange={(e) => setSpecificEmployee(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {employeesList.map((employee) => (
              <MenuItem key={employee.id} value={employee.first_name}>
                {employee.first_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Buttons */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleViewActivity}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : '🔍 VIEW STAFF ACTIVITY'}
        </Button>

        {/* Display Results */}
        <Typography variant="body1">
          Total Rows: {totalRows}
        </Typography>
        <Typography variant="body1">
          Filtered Rows: {filteredRows}
        </Typography>
      </Paper>
    </Container>
  );
}
