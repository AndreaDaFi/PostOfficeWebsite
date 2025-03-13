import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import SearchIcon from "@mui/icons-material/Search";

export default function ViewPO() {
  // Sample list of Post Office locations
  const postOffices = [
    { name: "CougarPost - Houston", city: "Houston", state: "TX", manager: "John Doe" },
    { name: "CougarPost - Los Angeles", city: "Los Angeles", state: "CA", manager: "Emily Smith" },
    { name: "CougarPost - New York", city: "New York", state: "NY", manager: "Michael Johnson" },
    { name: "CougarPost - Chicago", city: "Chicago", state: "IL", manager: "Sophia Davis" },
    { name: "CougarPost - Miami", city: "Miami", state: "FL", manager: "Daniel Martinez" },
    { name: "CougarPost - Dallas", city: "Dallas", state: "TX", manager: "Olivia Wilson" },
    { name: "CougarPost - Seattle", city: "Seattle", state: "WA", manager: "James Brown" },
    { name: "CougarPost - Denver", city: "Denver", state: "CO", manager: "Emma Thompson" },
    { name: "CougarPost - Atlanta", city: "Atlanta", state: "GA", manager: "Liam Anderson" },
    { name: "CougarPost - San Francisco", city: "San Francisco", state: "CA", manager: "Isabella White" }
  ];

  const [search, setSearch] = useState("");

  // Filter post offices based on search input
  const filteredPostOffices = postOffices.filter(
    (po) =>
      po.name.toLowerCase().includes(search.toLowerCase()) ||
      po.city.toLowerCase().includes(search.toLowerCase()) ||
      po.state.toLowerCase().includes(search.toLowerCase()) ||
      po.manager.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🏢 View All Post Offices
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Admins can view all CougarPost locations and their assigned managers.
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="🔍 Search by name, city, state, or manager..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
        }}
        style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
      />

      {/* Post Office List */}
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fff" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D32F2F" }}>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>🏤 Post Office</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>📍 City</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>🗺 State</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>👨‍💼 Manager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPostOffices.length > 0 ? (
                filteredPostOffices.map((po, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <BusinessIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                      {po.name}
                    </TableCell>
                    <TableCell>{po.city}</TableCell>
                    <TableCell>{po.state}</TableCell>
                    <TableCell>{po.manager}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: "center", color: "#B71C1C" }}>
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
