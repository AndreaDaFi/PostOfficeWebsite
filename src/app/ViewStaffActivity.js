import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export default function ViewStaffActivity() {
  // Sample list of staff at this Post Office location
  const [staffActivity, setStaffActivity] = useState([
    { name: "John Doe", role: "Driver", clockIn: "08:00 AM", clockOut: "", status: "Present", totalHours: "" },
    { name: "Emily Smith", role: "Cashier", clockIn: "08:30 AM", clockOut: "", status: "Present", totalHours: "" },
    { name: "Michael Johnson", role: "Customer Service", clockIn: "", clockOut: "", status: "Absent", totalHours: "" },
    { name: "Sophia Davis", role: "Supervisor", clockIn: "07:45 AM", clockOut: "03:00 PM", status: "Completed Shift", totalHours: "7h 15m" },
    { name: "Daniel Martinez", role: "Driver", clockIn: "09:00 AM", clockOut: "", status: "Present", totalHours: "" },
    { name: "Olivia Wilson", role: "Cashier", clockIn: "08:15 AM", clockOut: "", status: "Present", totalHours: "" },
  ]);

  const [search, setSearch] = useState("");

  // Function to manually clock in staff
  const handleClockIn = (index) => {
    setStaffActivity((prev) =>
      prev.map((staff, i) =>
        i === index
          ? { ...staff, clockIn: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), status: "Present" }
          : staff
      )
    );
  };

  // Function to calculate total work hours
  const calculateWorkHours = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return "N/A";

    const parseTime = (time) => {
      let [hours, minutes] = time.split(":");
      let period = time.slice(-2);
      hours = parseInt(hours);
      minutes = parseInt(minutes.slice(0, 2));

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      return hours * 60 + minutes; // Convert to minutes
    };

    let clockInMinutes = parseTime(clockIn);
    let clockOutMinutes = parseTime(clockOut);

    let diff = clockOutMinutes - clockInMinutes;
    let hoursWorked = Math.floor(diff / 60);
    let minutesWorked = diff % 60;

    return `${hoursWorked}h ${minutesWorked}m`;
  };

  // Function to manually clock out staff and calculate hours worked
  const handleClockOut = (index) => {
    setStaffActivity((prev) =>
      prev.map((staff, i) =>
        i === index
          ? {
              ...staff,
              clockOut: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              status: "Completed Shift",
              totalHours: calculateWorkHours(staff.clockIn, new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
            }
          : staff
      )
    );
  };

  // Filter staff based on search input
  const filteredStaff = staffActivity.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.role.toLowerCase().includes(search.toLowerCase()) ||
      staff.status.toLowerCase().includes(search.toLowerCase())
  );

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
          startAdornment: <SearchIcon style={{ marginRight: "10px", color: "#D32F2F" }} />,
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
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>🕒 Hours Worked</TableCell>
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
                    <TableCell>{staff.totalHours || "N/A"}</TableCell>
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
                  <TableCell colSpan={7} style={{ textAlign: "center", color: "#B71C1C" }}>
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
