import React from "react";
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkIcon from "@mui/icons-material/Work";

export default function ViewStaffActivity() {
  // Employee Data (Fetched from another page)
  const selectedStaff = {
    id: "EMP12345",
    name: "John Doe",
    postOffice: "CougarPost - Houston",
    hours: { Monday: 8, Tuesday: 7, Wednesday: 6, Thursday: 9, Friday: 5, Saturday: 4, Sunday: 3 },
    packages: { Monday: 10, Tuesday: 12, Wednesday: 9, Thursday: 15, Friday: 11, Saturday: 8, Sunday: 6 }
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🕒 View Staff Activity
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Viewing work hours and managed packages for: <strong>{selectedStaff.name} (ID: {selectedStaff.id})</strong>
      </Typography>

      {/* Employee Info */}
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fff" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D32F2F" }}>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>👤 Name</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>🏤 Post Office</TableCell>
                <TableCell style={{ color: "#FFF", fontWeight: "bold" }}> Employer ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <BadgeIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                  {selectedStaff.name}
                </TableCell>
                <TableCell>
                  <WorkIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                  {selectedStaff.postOffice}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>{selectedStaff.id}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Hours Worked Section */}
      <Typography variant="h6" style={{ marginTop: "20px", fontWeight: "bold", color: "#D32F2F" }}>⏳ Hours Worked Per Day</Typography>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "10px", borderRadius: "10px", backgroundColor: "#fff" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D32F2F" }}>
                {Object.keys(selectedStaff.hours).map(day => (
                  <TableCell key={day} style={{ color: "#FFF", fontWeight: "bold", textAlign: "center" }}>{day}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {Object.values(selectedStaff.hours).map((hour, index) => (
                  <TableCell key={index} style={{ textAlign: "center" }}>{hour}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Total Hours Worked */}
      <Paper elevation={3} style={{ padding: "20px", marginTop: "10px", borderRadius: "10px", backgroundColor: "#fff" }}>
        <Typography variant="h6" style={{ color: "#D32F2F" }}>
          ⏳ Total Hours Worked: <strong>{Object.values(selectedStaff.hours).reduce((a, b) => a + b, 0)}</strong>
        </Typography>
      </Paper>

      {/* Packages Processed Section */}
      <Typography variant="h6" style={{ marginTop: "20px", fontWeight: "bold", color: "#D32F2F" }}>📦 Packages Processed Per Day</Typography>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "10px", borderRadius: "10px", backgroundColor: "#fff" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#D32F2F" }}>
                {Object.keys(selectedStaff.packages).map(day => (
                  <TableCell key={day} style={{ color: "#FFF", fontWeight: "bold", textAlign: "center" }}>{day}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {Object.values(selectedStaff.packages).map((pkg, index) => (
                  <TableCell key={index} style={{ textAlign: "center" }}>{pkg}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Total Packages Processed */}
      <Paper elevation={3} style={{ padding: "20px", marginTop: "10px", borderRadius: "10px", backgroundColor: "#fff" }}>
        <Typography variant="h6" style={{ color: "#D32F2F" }}>
          📦 Total Packages Processed: <strong>{Object.values(selectedStaff.packages).reduce((a, b) => a + b, 0)}</strong>
        </Typography>
      </Paper>
    </Container>
  );
}
