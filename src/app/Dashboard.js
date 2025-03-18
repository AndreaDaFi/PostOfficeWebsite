import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Container, Paper, Typography, Button } from "@mui/material";

export default function Dashboard() {
  const { user, logout, isCustomer } = useContext(AuthContext);
  const navigate = useNavigate();

  if(isCustomer()){
    console.log("this is a customer logged in rn");
  }

  if (!user) {
    navigate("/cust-login");
    return null;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          style={{
            padding: "50px",
            width: "400px",
            backgroundColor: "#FFF",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#333" }}>
            📦 Welcome, {user.email}!
          </Typography>

          <Typography variant="body2" color="textSecondary" style={{ marginBottom: "20px" }}>
            Explore your options below.
          </Typography>

          {/* View My Packages */}
          <Button
            fullWidth
            variant="contained"
            style={{
              marginTop: "15px",
              padding: "12px 0",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#1976D2",
              color: "#FFF",
            }}
            onClick={() => navigate("/MyPackages")}
          >
            📦 View My Packages
          </Button>

          {/* Visit Store */}
          <Button
            fullWidth
            variant="contained"
            style={{
              marginTop: "15px",
              padding: "12px 0",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#388E3C",
              color: "#FFF",
            }}
            onClick={() => navigate("/store")}
          >
            🛒 Visit Store
          </Button>

          {/* Logout Button */}
          <Button
            fullWidth
            variant="contained"
            style={{
              marginTop: "15px",
              padding: "12px 0",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#D32F2F",
              color: "#FFF",
            }}
            onClick={logout}
          >
            🚪 Logout
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
