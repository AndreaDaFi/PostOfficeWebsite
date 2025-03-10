import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function ViewStaff() {
  // Sample list of staff members
  const staffMembers = [
    { name: "John Doe", role: "Driver", postOffice: "CougarPost - Houston", email: "john.doe@example.com", phone: "(713) 555-1234" },
    { name: "Emily Smith", role: "Cashier", postOffice: "CougarPost - Los Angeles", email: "emily.smith@example.com", phone: "(310) 555-5678" },
    { name: "Michael Johnson", role: "Customer Service Representative", postOffice: "CougarPost - New York", email: "michael.j@example.com", phone: "(212) 555-8765" },
    { name: "Sophia Davis", role: "Supervisor", postOffice: "CougarPost - Chicago", email: "sophia.davis@example.com", phone: "(312) 555-4321" },
    { name: "Daniel Martinez", role: "Driver", postOffice: "CougarPost - Miami", email: "daniel.m@example.com", phone: "(305) 555-6789" },
    { name: "Olivia Wilson", role: "Cashier", postOffice: "CougarPost - Dallas", email: "olivia.w@example.com", phone: "(214) 555-3456" },
    { name: "James Brown", role: "Customer Service Representative", postOffice: "CougarPost - Seattle", email: "james.b@example.com", phone: "(206) 555-9876" },
    { name: "Emma Thompson", role: "Supervisor", postOffice: "CougarPost - Denver", email: "emma.t@example.com", phone: "(720) 555-1234" },
    { name: "Liam Anderson", role: "Driver", postOffice: "CougarPost - Atlanta", email: "liam.a@example.com", phone: "(404) 555-4321" },
    { name: "Isabella White", role: "Cashier", postOffice: "CougarPost - San Francisco", email: "isabella.w@example.com", phone: "(415) 555-5678" }
  ];

  const [search, setSearch] = useState("");

  // Filter staff members based on search input
  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.role.toLowerCase().includes(search.toLowerCase()) ||
      staff.postOffice.toLowerCase().includes(search.toLowerCase()) ||
      staff.email.toLowerCase().includes(search.toLowerCase()) ||
      staff.phone.includes(search)
  );

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        👥 View All Staff Members
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Admins can view all CougarPost staff members and their assigned locations.
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="🔍 Search by name, role, post office, or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
        }}
        style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
      />

      {/* Staff List */}
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fff" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D32F2F" }}>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>👤 Name</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>💼 Role</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>🏤 Post Office</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>📧 Email</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>📞 Phone</TableCell>
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
                    <TableCell>
                      <BusinessIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                      {staff.postOffice}
                    </TableCell>
                    <TableCell>
                      <EmailIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                      {staff.email}
                    </TableCell>
                    <TableCell>
                      <PhoneIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                      {staff.phone}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: "center", color: "#B71C1C" }}>
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
