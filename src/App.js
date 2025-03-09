import React from "react";
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

const packages = [
  { id: "PKG001", sender: "John Doe", receiver: "Alice", status: "Delivered" },
  { id: "PKG002", sender: "Mary", receiver: "Bob", status: "In Transit" },
  { id: "PKG003", sender: "Carlos", receiver: "David", status: "Pending" }
];

export default function PostOfficeDashboard() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        📦 Post Office Dashboard
      </Typography>

      <Button variant="contained" color="primary">
        Add New Package
      </Button>

      <Paper style={{ marginTop: 20, padding: 20 }}>
        <Typography variant="h6" gutterBottom>Package Status</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Tracking ID</b></TableCell>
              <TableCell><b>Sender</b></TableCell>
              <TableCell><b>Receiver</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell>{pkg.id}</TableCell>
                <TableCell>{pkg.sender}</TableCell>
                <TableCell>{pkg.receiver}</TableCell>
                <TableCell>{pkg.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}