import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, TextField, Button, Box, List, ListItem, ListItemText, Divider, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HistoryIcon from "@mui/icons-material/History";
import DoneIcon from "@mui/icons-material/Done";

export default function PackageDetails() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageInfo, setPackageInfo] = useState(null);
  const [error, setError] = useState(null);

  // 🚛 Mock data (would be replaced with API call in a real system)
  const mockPackageData = [
    {
      trackingNumber: "123456",
      status: "Shipped",
      estimatedDelivery: "2025-03-15",
      history: [
        { location: "Houston, TX", timestamp: "2025-03-10 08:00 AM", status: "Package Received" },
        { location: "Dallas, TX", timestamp: "2025-03-12 02:30 PM", status: "In Transit" },
        { location: "Denver, CO", timestamp: "2025-03-14 10:15 AM", status: "Out for Delivery" },
      ],
      lastUpdate: "Houston Distribution Center",
      driverNote: "Left warehouse at 08:00 AM.",
    },
    {
      trackingNumber: "654321",
      status: "In Transit",
      estimatedDelivery: "2025-03-18",
      history: [
        { location: "Miami, FL", timestamp: "2025-03-11 09:30 AM", status: "Package Received" },
        { location: "Atlanta, GA", timestamp: "2025-03-13 01:45 PM", status: "In Transit" },
      ],
      lastUpdate: "Atlanta Distribution Center",
      driverNote: "Expected to arrive in 2 days.",
    },
  ];

  // 🔄 Load package data from localStorage (Driver updates)
  useEffect(() => {
    const storedPackages = JSON.parse(localStorage.getItem("packages")) || [];
    mockPackageData.forEach((pkg) => storedPackages.push(pkg));
    setPackageInfo(storedPackages);
  }, []);

  // 🔍 Search for package
  const handleSearch = () => {
    setError(null);
    const foundPackage = packageInfo?.find((pkg) => pkg.trackingNumber === trackingNumber);

    if (!foundPackage) {
      setError("⚠ Tracking number not found.");
      return;
    }

    setPackageInfo([foundPackage]); // Show only the searched package
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        📦 Package Tracking Details
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Enter your tracking number to view its journey.
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
      {packageInfo && packageInfo.length > 0 && (
        <Box mt={4}>
          {packageInfo.map((pkg, index) => (
            <Paper key={index} elevation={3} style={{ padding: "20px", borderRadius: "12px", backgroundColor: "#FFF", marginBottom: "20px" }}>
              <Typography variant="h5" style={{ fontWeight: "bold", color: "#D32F2F" }}>
                Tracking Number: {pkg.trackingNumber}
              </Typography>
              <Typography variant="h6" style={{ marginTop: "10px", color: "#333" }}>
                Status: {pkg.status}
              </Typography>
              <Typography variant="body1" style={{ marginTop: "10px", color: "#555" }}>
                📅 Estimated Delivery: {pkg.estimatedDelivery}
              </Typography>
              <Typography variant="body2" style={{ marginTop: "5px", color: "#777" }}>
                Last Update: {pkg.lastUpdate}
              </Typography>

              {/* Driver Note */}
              {pkg.driverNote && (
                <Typography variant="body2" style={{ marginTop: "10px", fontStyle: "italic", color: "#555" }}>
                  📝 Driver Note: {pkg.driverNote}
                </Typography>
              )}

              {/* Tracking History */}
              <List style={{ marginTop: "20px" }}>
                <ListItem>
                  <ListItemText primary="📍 Package Created" secondary="Tracking number assigned." />
                </ListItem>
                <Divider />

                {pkg.history.map((event, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem>
                      <HistoryIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
                      <ListItemText primary={event.status} secondary={`${event.location} - ${event.timestamp}`} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}

                <ListItem>
                  <DoneIcon style={{ marginRight: "10px", color: "#388E3C" }} />
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
