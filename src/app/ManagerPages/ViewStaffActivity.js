import React, { useState, useContext, useEffect } from "react";
import { Container, Button, Typography, Paper, Alert, CircularProgress, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

export default function ViewStaffActivity() {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [employeeRole, setEmployeeRole] = useState(""); 
  const [specificEmployee, setSpecificEmployee] = useState(""); 
  const [employeesList, setEmployeesList] = useState([]); 
  const [allData, setAllData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [totalRows, setTotalRows] = useState(0); 
  const [filteredRows, setFilteredRows] = useState(0); 
  const [allHoursData, setAllHoursData] = useState([]);
  const [filteredHoursData, setFilteredHoursData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data on component mount
  useEffect(() => {
    async function fetchData() {
      if (!user?.po_id) {
        setError("No post office ID found for this user");
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`https://apipost.vercel.app/api/staffActivity?po_id=${user?.po_id}`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        
        setAllData(result.data || []);
        setTotalRows(result.totalRows || 0);
        setAllHoursData(result.hoursData || []);
        setEmployeesList(result.employees || []);
        
        // Initialize filtered data with all data
        setFilteredData(result.data || []);
        setFilteredRows((result.data || []).length);
        setFilteredHoursData(result.hoursData || []);
        
        if ((result.data || []).length === 0) {
          setSuccessMessage("No records found in the database.");
        }
      } catch (err) {
        console.error("Error in API call:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [user?.po_id]);

  // Apply filters whenever filter values change
  useEffect(() => {
    applyFilters();
  }, [startDate, endDate, employeeRole, specificEmployee, allData, allHoursData]);

  // Filter function
  const applyFilters = () => {
    // Filter package data
    let filtered = [...allData];
    
    if (startDate) {
      const startDateTime = new Date(startDate);
      filtered = filtered.filter(item => new Date(item.status_update_datetime) >= startDateTime);
    }
    
    if (endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999); // Set to end of day
      filtered = filtered.filter(item => new Date(item.status_update_datetime) <= endDateTime);
    }
    
    if (employeeRole) {
      filtered = filtered.filter(item => item.role === employeeRole);
    }
    
    if (specificEmployee) {
      filtered = filtered.filter(item => item.first_name === specificEmployee);
    }
    
    setFilteredData(filtered);
    setFilteredRows(filtered.length);
    
    // Filter hours data
    let filteredHours = [...allHoursData];
    
    if (startDate) {
      const startDateTime = new Date(startDate);
      filteredHours = filteredHours.filter(item => new Date(item.date) >= startDateTime);
    }
    
    if (endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999);
      filteredHours = filteredHours.filter(item => new Date(item.date) <= endDateTime);
    }
    
    if (employeeRole) {
      filteredHours = filteredHours.filter(item => item.role === employeeRole);
    }
    
    if (specificEmployee) {
      filteredHours = filteredHours.filter(item => item.first_name === specificEmployee);
    }
    
    setFilteredHoursData(filteredHours);
  };

  // Calculate total hours worked
  const totalHoursWorked = filteredHoursData.reduce((total, employee) => 
    total + (parseFloat(employee.total_hours) || 0), 0);
    
  // Calculate total package updates
  const totalPackageUpdates = filteredHoursData.reduce((total, employee) => total + employee.package_updates, 0);

  return (
    <Container maxWidth="lg" sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>View Staff Activity</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Apply filters to view staff activity.</Typography>

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
        <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
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

        {/* Display Results */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <CircularProgress size={40} />
            <Typography variant="body1" sx={{ mt: 2 }}>Loading staff activity data...</Typography>
          </div>
        ) : (
          <>
            <div style={{ marginTop: '20px' }}>
              <Typography variant="body1">
                Total Records in Database: {totalRows}
              </Typography>
              <Typography variant="body1">
                Records Matching Filters: {filteredRows}
              </Typography>
              <Typography variant="body1">
                Total Package Updates: {totalPackageUpdates}
              </Typography>
              <Typography variant="body1">
                Total Hours Worked: {totalHoursWorked}
              </Typography>
            </div>

            {/* Display Hours Worked Summary */}
            {filteredHoursData.length > 0 ? (
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Hours Worked Summary</Typography>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Employee</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Role</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Hours Worked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHoursData.map((employee, index) => (
                        <tr key={index}>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.first_name || 'N/A'}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.role || 'N/A'}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            {employee.date ? new Date(employee.date).toLocaleDateString() : 'N/A'}
                          </td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.total_hours || 0}</td>
                        </tr>
                      ))}
                      <tr style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
                        <td colSpan="3" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Total Hours:</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalHoursWorked}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <Typography variant="body1" sx={{ mt: 2 }}>No hours data found matching your criteria.</Typography>
            )}

            {/* Display Filtered Employee Data */}
            {filteredData.length > 0 ? (
              <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                <Typography variant="h6">Package Status Updates</Typography>
                <div style={{ overflowX: 'auto' }}>
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
                      <tr style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
                        <td colSpan="5" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Total Updates:</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{filteredData.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <Typography variant="body1" sx={{ mt: 2 }}>No package status updates found matching your criteria.</Typography>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
}
