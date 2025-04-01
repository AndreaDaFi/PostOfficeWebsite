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
  const [employeesList, setEmployeesList] = useState([]); 
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [totalRows, setTotalRows] = useState(0); 
  const [filteredRows, setFilteredRows] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch employees dynamically based on manager's po_id
  useEffect(() => {
    console.log("Current user:", user);
    console.log("PO_ID:", user?.po_id);
    async function fetchEmployees() {
      try {
        const response = await fetch(`https://apipost.vercel.app/api/staffActivity?po_id=${user?.po_id}`);
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        console.log("Employees data:", data);
        setEmployeesList(data.employees);
      } catch (err) {
        console.error("Error fetching employees:", err.message);
      }
    }
    if (user?.po_id) {
      fetchEmployees();
    } else {
      console.log("No valid po_id available");
    }
    
  }, [user?.po_id]);

  const handleViewActivity = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    setHasSearched(true);
    
    // Check if user has a po_id
    if (!user?.po_id) {
      setError("No post office ID found for this user");
      setIsLoading(false);
      return;
    }

    // Format dates for API if provided
    const formattedStartDate = startDate ? new Date(startDate).toISOString() : "";
    const formattedEndDate = endDate ? new Date(endDate).toISOString() : "";
    
    console.log("Sending request with params:", {
      po_id: user?.po_id,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      statusUpdate,
      employeeRole,
      specificEmployee,
    });

    try {
      const response = await fetch('https://apipost.vercel.app/api/staffActivity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          po_id: user?.po_id,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          statusUpdate,
          employeeRole,
          specificEmployee,
        }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      console.log("API Response:", result);
      
      setData(result.data || []);
      setTotalRows(result.totalRows || 0);
      setFilteredData(result.data || []);
      setFilteredRows((result.data || []).length);
      
      if ((result.data || []).length === 0) {
        setSuccessMessage("No records found matching your criteria.");
      } else {
        setSuccessMessage(`Found ${result.data.length} records!`);
      }
    } catch (err) {
      console.error("Error in API call:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>👥 View Staff Activity</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Enter filters to view staff activity.</Typography>

        {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mt: 2, mb: 2 }}>{successMessage}</Alert>}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Start Date:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>End Date:</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

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
        {hasSearched && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="body1">
              Total Records in Database: {totalRows}
            </Typography>
            <Typography variant="body1">
              Records Matching Filters: {filteredRows}
            </Typography>
          </div>
        )}

        {/* Display Filtered Employee Data */}
        {filteredData.length > 0 ? (
          <div style={{ marginTop: '20px', overflowX: 'auto' }}>
            <Typography variant="h6">Staff Activity Results</Typography>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Employee</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Role</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date/Time</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Previous Status</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Updated Status</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Package Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.my_row_id || index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.first_name || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.role || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {item.status_update_datetime ? new Date(item.status_update_datetime).toLocaleString() : 'N/A'}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.previoust_status || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.updated_status || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.type || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          hasSearched && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Typography variant="body1">No records found matching your criteria.</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Try adjusting your filters or check if there is data in the database for this post office.
              </Typography>
            </div>
          )
        )}
      </Paper>
    </Container>
  );
}
