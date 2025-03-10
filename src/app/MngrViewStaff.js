import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import TimerIcon from "@mui/icons-material/Timer";
import StoreIcon from "@mui/icons-material/Store";
import DownloadIcon from "@mui/icons-material/Download";

export default function ManagerDashboard() {
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  // Sample staff data
  const staffData = [
    { name: "John Doe", role: "Driver", location: "Houston", clockIn: "8:00 AM", clockOut: "5:00 PM", hoursWorked: 9, performance: "Good" },
    { name: "Emily Smith", role: "Cashier", location: "Los Angeles", clockIn: "9:00 AM", clockOut: "6:00 PM", hoursWorked: 9, performance: "Excellent" },
    { name: "Michael Johnson", role: "Customer Service", location: "New York", clockIn: "8:30 AM", clockOut: "4:30 PM", hoursWorked: 8, performance: "Satisfactory" },
    { name: "Sophia Davis", role: "Supervisor", location: "Chicago", clockIn: "7:45 AM", clockOut: "3:00 PM", hoursWorked: 7.25, performance: "Good" },
    { name: "Daniel Martinez", role: "Driver", location: "Miami", clockIn: "10:00 AM", clockOut: "6:00 PM", hoursWorked: 8, performance: "Excellent" },
    { name: "Olivia Wilson", role: "Cashier", location: "Dallas", clockIn: "8:15 AM", clockOut: "4:15 PM", hoursWorked: 8, performance: "Needs Improvement" },
    { name: "Liam Brown", role: "Customer Service", location: "Seattle", clockIn: "7:30 AM", clockOut: "3:30 PM", hoursWorked: 8, performance: "Good" },
    { name: "Emma Garcia", role: "Supervisor", location: "Denver", clockIn: "8:00 AM", clockOut: "5:00 PM", hoursWorked: 9, performance: "Excellent" }
  ];

  // Filter staff based on search input and location
  const filteredStaff = staffData.filter(
    (staff) =>
      (staff.name.toLowerCase().includes(search.toLowerCase()) ||
        staff.role.toLowerCase().includes(search.toLowerCase()) ||
        staff.performance.toLowerCase().includes(search.toLowerCase())) &&
      (filterLocation === "" || staff.location === filterLocation)
  );

  // Simulate downloading a report
  const handleDownloadReport = () => {
    alert("📥 Staff performance report downloaded successfully!");
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        📊 Staff Overview Dashboard
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        General Managers can track all staff, work hours, and performance.
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="🔍 Search by name, role, or performance..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
        }}
        style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
      />

      {/* Filter by Location */}
      <FormControl fullWidth variant="outlined" style={{ marginBottom: "20px" }}>
        <InputLabel>Filter by Location</InputLabel>
        <Select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} label="Filter by Location">
          <MenuItem value="">All Locations</MenuItem>
          {[...new Set(staffData.map((staff) => staff.location))].map((location, index) => (
            <MenuItem key={index} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Staff Table */}
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fff" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D32F2F" }}>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>👤 Name</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>💼 Role</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>🏢 Location</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>⏰ Clock In</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>⏳ Clock Out</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>⌛ Hours Worked</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>📈 Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>
                      <WorkIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                      {staff.role}
                    </TableCell>
                    <TableCell>
                      <StoreIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                      {staff.location}
                    </TableCell>
                    <TableCell>{staff.clockIn}</TableCell>
                    <TableCell>{staff.clockOut}</TableCell>
                    <TableCell>
                      <TimerIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                      {staff.hoursWorked} hrs
                    </TableCell>
                    <TableCell>{staff.performance}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center", color: "#B71C1C" }}>
                    ❌ No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Download Report Button */}
      <Button
        variant="contained"
        style={{ backgroundColor: "#D32F2F", color: "#FFF", marginTop: "20px", padding: "12px", fontWeight: "bold" }}
        onClick={handleDownloadReport}
      >
        <DownloadIcon style={{ marginRight: "8px" }} />
        Download Staff Report
      </Button>
    </Container>
  );
}
