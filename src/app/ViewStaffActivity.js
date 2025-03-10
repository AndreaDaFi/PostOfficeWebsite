import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export default function ViewStaffActivity() {
  // Sample list of staff at this Post Office location
  const [staffActivity, setStaffActivity] = useState([
    { name: "John Doe", role: "Driver", clockIn: "8:00 AM", clockOut: "", status: "Present" },
    { name: "Emily Smith", role: "Cashier", clockIn: "8:30 AM", clockOut: "", status: "Present" },
    { name: "Michael Johnson", role: "Customer Service", clockIn: "", clockOut: "", status: "Absent" },
    { name: "Sophia Davis", role: "Supervisor", clockIn: "7:45 AM", clockOut: "3:00 PM", status: "Completed Shift" },
    { name: "Daniel Martinez", role: "Driver", clockIn: "9:00 AM", clockOut: "", status: "Present" },
    { name: "Olivia Wilson", role: "Cashier", clockIn: "8:15 AM", clockOut: "", status: "Present" }
  ]);

  const [search, setSearch] = useState("");

  // Filter staff based on search input
  const filteredStaff = staffActivity.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.role.toLowerCase().includes(search.toLowerCase()) ||
      staff.status.toLowerCase().includes(search.toLowerCase())
  );

  // Function to manually clock in staff
  const handleClockIn = (index) => {
    setStaffActivity((prev) =>
      prev.map((staff, i) =>
        i === index ? { ...staff, clockIn: new Date().toLocaleTimeString(), status: "Present" } : staff
      )
    );
  };

  // Function to manually clock out staff
  const handleClockOut = (index) => {
    setStaffActivity((prev) =>
      prev.map((staff, i) =>
        i === index ? { ...staff, clockOut: new Date().toLocaleTimeString(), status: "Completed Shift" } : staff
      )
    );
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        ⏰ Staff Activity & Clock-In/Out
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Managers can track staff activity for their assigned Post Office location.
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="🔍 Search by name, role, or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
        }}
        style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
      />

      {/* Staff Activity List */}
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fff" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D32F2F" }}>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>👤 Name</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>💼 Role</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>⏰ Clock In</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>⏳ Clock Out</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>✅ Status</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>🕒 Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <BadgeIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                      {staff.name}
                    </TableCell>
                    <TableCell>
                      <WorkIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                      {staff.role}
                    </TableCell>
                    <TableCell>{staff.clockIn || "—"}</TableCell>
                    <TableCell>{staff.clockOut || "—"}</TableCell>
                    <TableCell>{staff.status}</TableCell>
                    <TableCell>
                      {!staff.clockIn && (
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#388E3C", color: "#FFF", marginRight: "10px" }}
                          onClick={() => handleClockIn(index)}
                        >
                          <DoneIcon style={{ marginRight: "5px" }} />
                          Clock In
                        </Button>
                      )}
                      {staff.clockIn && !staff.clockOut && (
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#D32F2F", color: "#FFF" }}
                          onClick={() => handleClockOut(index)}
                        >
                          <CloseIcon style={{ marginRight: "5px" }} />
                          Clock Out
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center", color: "#B71C1C" }}>
                    ❌ No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
