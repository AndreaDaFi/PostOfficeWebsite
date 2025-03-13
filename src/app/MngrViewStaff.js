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
  InputAdornment,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function ViewStaff() {
  // Sample list of staff members
  const staffMembers = [
    {
      id: "EMP001",
      name: "John Doe",
      locationId: "LOC100",
      performance: "Excellent",
    },
    {
      id: "EMP002",
      name: "Emily Smith",
      locationId: "LOC200",
      performance: "Good",
    },
    {
      id: "EMP003",
      name: "Michael Johnson",
      locationId: "LOC300",
      performance: "Average",
    },
    // Add more staff members as needed
  ];

  const [search, setSearch] = useState("");

  // Filter staff members based on search input
  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.id.toLowerCase().includes(search.toLowerCase()) ||
      staff.locationId.toLowerCase().includes(search.toLowerCase()) ||
      staff.performance.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}
      >
        👥 View Staff Members
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Admins can view all CougarPost staff members and their performance.
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="🔍 Search by name, ID, location ID, or performance..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "#D32F2F" }} />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
      />

      {/* Staff List */}
      <Paper
        elevation={3}
        style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fff" }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D32F2F" }}>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>
                  👤 Name
                </TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>
                  🆔 Employee ID
                </TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>
                  📍 Location ID
                </TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>
                  📈 Performance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <BadgeIcon
                        style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }}
                      />
                      {staff.name}
                    </TableCell>
                    <TableCell>
                      <WorkIcon
                        style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }}
                      />
                      {staff.id}
                    </TableCell>
                    <TableCell>
                      <BusinessIcon
                        style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }}
                      />
                      {staff.locationId}
                    </TableCell>
                    <TableCell>
                      <AssessmentIcon
                        style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }}
                      />
                      {staff.performance}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: "center", color: "#B71C1C" }}>
                     No results found.
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
