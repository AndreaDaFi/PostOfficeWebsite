import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, TextField, Button, Box, List, ListItem, ListItemText, Divider, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function PackageDetails() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load packages from localStorage
    const storedPackages = JSON.parse(localStorage.getItem("packages")) || [];
    setPackageData(storedPackages);
  }, []);

  const handleSearch = () => {
    setError(null);
    const foundPackage = packageData?.find(pkg => pkg.trackingNumber === trackingNumber);

    if (!foundPackage) {
      setError("⚠ Tracking number not found.");
      return;
    }

    setPackageData([foundPackage]); // Display only the searched package
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        📦 Package Tracking History
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Enter your tracking number to view the full history of your package.
      </Typography>

      <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px", backgroundColor: "#FFF", maxWidth: "500px", margin: "0 auto" }}>
        <LocalShippingIcon style={{ fontSize: "50px", color: "#D32F2F", marginBottom: "15px" }} />

        {/* Tracking Number Input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Enter Tracking Number"
          placeholder="🔍 123456789"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> }}
          style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
        />

        {/* Search Button */}
        <Button
          fullWidth
          variant="contained"
          style={{ backgroundColor: "#D32F2F", color: "#FFF", padding: "12px", fontSize: "16px", fontWeight: "bold", borderRadius: "8px" }}
          onClick={handleSearch}
        >
          <SearchIcon style={{ marginRight: "8px" }} />
          Track Package
        </Button>

        {error && (
          <Alert severity="error" style={{ marginTop: "20px", backgroundColor: "#FFCDD2", color: "#B71C1C" }}>
            {error}
          </Alert>
        )}
      </Paper>

      {/* Package Tracking Details */}
      {packageData && packageData.length > 0 && (
        <Box mt={4}>
          {packageData.map((pkg, index) => (
            <Paper key={index} elevation={3} style={{ padding: "20px", borderRadius: "12px", backgroundColor: "#FFF", marginBottom: "20px" }}>
              <Typography variant="h5" style={{ fontWeight: "bold", color: "#D32F2F" }}>
                Tracking Number: {pkg.trackingNumber}
              </Typography>
              <Typography variant="h6" style={{ marginTop: "10px", color: "#333" }}>
                Status: {pkg.status}
              </Typography>
              <Typography variant="body1" style={{ marginTop: "10px", color: "#555" }}>
                Last Updated: {pkg.deliveryDate}
              </Typography>

              {/* Tracking History */}
              <List style={{ marginTop: "20px" }}>
                <ListItem>
                  <ListItemText primary="📍 Package Created" secondary="Tracking number assigned." />
                </ListItem>
                <Divider />

                {pkg.details && (
                  <>
                    <ListItem>
                      <ListItemText primary="🚛 Driver Update" secondary={pkg.details} />
                    </ListItem>
                    <Divider />
                  </>
                )}

                <ListItem>
                  <ListItemText primary="📦 Current Status" secondary={pkg.status} />
                </ListItem>
              </List>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}
