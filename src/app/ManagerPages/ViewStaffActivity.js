import React, { useState, useContext, useEffect } from "react";
import { Container, TextField, Button, Typography, Paper, Alert, InputAdornment, CircularProgress } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from "../../context/AuthContext";

export default function ViewStaffActivity() {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [startDate, setStartDate] = useState(""); // Start date for filtering
  const [endDate, setEndDate] = useState(""); // End date for filtering
  const [statusUpdate, setStatusUpdate] = useState(""); // Filter by status update
  const [employeeRole, setEmployeeRole] = useState(""); // Filter by employee role
  const [specificEmployee, setSpecificEmployee] = useState(""); // Filter by specific employee
  const [data, setData] = useState([]); // Holds API data
  const [filteredData, setFilteredData] = useState([]); // Holds filtered data
  const [totalRows, setTotalRows] = useState(0); // Total number of rows
  const [filteredRows, setFilteredRows] = useState(0); // Number of rows 
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    setStartDate(formattedDate);
  };

  const handleEndDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    setEndDate(formattedDate);
  };

  const handleViewActivity = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      const response = await fetch(' https://apipost.vercel.app/api/staffActivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          po_id: user?.po_id, // Pass the po_id of the current manager
          startDate,
          endDate,
          statusUpdate,
          employeeRole,
          specificEmployee
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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

  const handleFilter = () => {
    const filtered = data.filter(item => {
      const dateCondition = (!startDate || item.status_update_datetime >= startDate) && (!endDate || item.status_update_datetime <= endDate);
      const statusCondition = !statusUpdate || item.updated_status === statusUpdate;
      const roleCondition = !employeeRole || item.role === employeeRole;
      const employeeCondition = !specificEmployee || item.first_name === specificEmployee;
      return dateCondition && statusCondition && roleCondition && employeeCondition;
    });
    setFilteredData(filtered);
    setFilteredRows(filtered.length);
  };

  useEffect(() => {
    handleFilter(); // Recalculate the filtered items whenever the filters change
  }, [startDate, endDate, statusUpdate, employeeRole, specificEmployee, data]);

  return (
    <Container maxWidth="sm" sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>👥 View Staff Activity</Typography>
        <Typography variant="body2" color="textSecondary">Enter filters to view staff activity.</Typography>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}

        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <br />
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
        <br />
        <TextField
          fullWidth
          label="Status Update"
          name="statusUpdate"
          onChange={(e) => setStatusUpdate(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Employee Role"
          name="employeeRole"
          onChange={(e) => setEmployeeRole(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Specific Employee"
          name="specificEmployee"
          onChange={(e) => setSpecificEmployee(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, p: 2, backgroundColor: "#D32F2F", color: "#FFF" }}
          onClick={handleViewActivity}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : '🔍 VIEW STAFF ACTIVITY'}
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, p: 2, backgroundColor: "#D32F2F", color: "#FFF" }}
          onClick={handleFilter}
        >
          FILTER DATA
        </Button>

        <div>
          <Typography variant="body1">
            Total Rows: {totalRows}
          </Typography>
          <Typography variant="body1">
            Filtered Rows: {filteredRows}
          </Typography>
          <Typography variant="body1">
            Percentage: {totalRows > 0 ? (filteredRows / totalRows) * 100 : 0}%
          </Typography>
        </div>

        <div>
          {filteredData.map(item => (
            <div key={item.my_row_id}>
              <Typography variant="body1">
                Employee Name: {item.first_name}<br />
                Employee Role: {item.role}<br />
                Date of Update: {item.status_update_datetime}<br />
                Previous Status: {item.previoust_status}<br />
                Updated Status: {item.updated_status}<br />
                Package Type: {item.type}<br />
                Destination Address: {item.destinationAddress}<br />
                Origin Address: {item.originAddress}
              </Typography>
            </div>
          ))}
        </div>
      </Paper>
    </Container>
  );
}
