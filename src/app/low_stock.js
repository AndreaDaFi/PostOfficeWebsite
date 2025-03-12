import React from "react";
import { Container, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function LowStockPage() {
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <Paper elevation={3} style={{ padding: "40px", borderRadius: "12px", textAlign: "center", backgroundColor: "#ffebee" }}>
        <Typography variant="h3" style={{ fontWeight: "bold", color: "#d32f2f" }}>
          ⚠ Low Stock
        </Typography>
        <Typography variant="h6" style={{ marginTop: "20px", color: "#d32f2f" }}>
          Please update your store immediately.
        </Typography>
        <Button component={Link} to="/ReStock" variant="contained" style={{ marginTop: "30px", backgroundColor: "#d32f2f", color: "white", padding: "12px 20px", fontSize: "16px" }}>
          Update Stock
        </Button>
      </Paper>
    </Container>
  );
}
