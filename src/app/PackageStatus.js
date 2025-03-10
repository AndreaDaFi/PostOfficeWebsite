import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, TextField, Button, MenuItem, Select, FormControl, InputLabel, Alert } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import BadgeIcon from "@mui/icons-material/Badge";

// Package Status & Locations
const statuses = ["Pending", "Out for Delivery", "Delivered", "Delayed", "Returned to Sender"];
const locations = ["Houston", "Los Angeles", "New York", "Chicago", "Miami", "Dallas", "Seattle", "Denver", "Atlanta", "San Francisco"];

export default function PackageStatus() {
  const [driverID, setDriverID] = useState("");
  const [location, setLocation] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageStatus, setPackageStatus] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState("");
  const [message, setMessage] = useState(null);
  const [packages, setPackages] = useState([]);

  // Load existing package data from local storage (for MyPackages.js)
  useEffect(() => {
    const storedPackages = JSON.parse(localStorage.getItem("packages")) || [];
    setPackages(storedPackages);
  }, []);

  const handleUpdateStatus = () => {
    if (!driverID) return setMessage({ type: "error", text: "⚠ Please enter your Driver ID." });
    if (!location) return setMessage({ type: "error", text: "⚠ Please select your location." });
    if (!trackingNumber) return setMessage({ type: "error", text: "⚠ Please enter a tracking number." });
    if (!packageStatus) return setMessage({ type: "error", text: "⚠ Please select a status." });
    if (!deliveryDetails) return setMessage({ type: "error", text: "⚠ Please enter delivery details." });

    // Find and update package
    const updatedPackages = packages.map(pkg =>
      pkg.trackingNumber === trackingNumber
        ? { ...pkg, status: packageStatus, details: deliveryDetails }
        : pkg
    );

    // Save updated package data
    localStorage.setItem("packages", JSON.stringify(updatedPackages));
    setPackages(updatedPackages);

    setMessage({
      type: "success",
      text: `✅ Package ${trackingNumber} status updated to: ${packageStatus} by Driver ${driverID} at ${location}`,
    });

    // Reset input fields
    setDriverID("");
    setLocation("");
    setTrackingNumber("");
    setPackageStatus("");
    setDeliveryDetails("");
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        📦 Update Package Status & Delivery Details
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Drivers must enter their ID and location before updating package status.
      </Typography>

      <Paper elevation={3} style={{ padding: "30px", borderRadius: "12px", backgroundColor: "#FFF", maxWidth: "500px", margin: "0 auto" }}>
        <LocalShippingIcon style={{ fontSize: "50px", color: "#D32F2F", marginBottom: "15px" }} />

        {/* Driver ID Input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Driver ID"
          placeholder="Enter your ID"
          value={driverID}
          onChange={(e) => setDriverID(e.target.value)}
          InputProps={{ startAdornment: <BadgeIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> }}
          style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
        />

        {/* Select Driver Location */}
        <FormControl fullWidth variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel>Location</InputLabel>
          <Select value={location} onChange={(e) => setLocation(e.target.value)} label="Location">
            {locations.map((loc, index) => (
              <MenuItem key={index} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

        {/* Select Package Status */}
        <FormControl fullWidth variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel>Status</InputLabel>
          <Select value={packageStatus} onChange={(e) => setPackageStatus(e.target.value)} label="Status">
            {statuses.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Delivery Details Input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Delivery Details"
          placeholder="e.g., Left at front door"
          multiline
          rows={3}
          value={deliveryDetails}
          onChange={(e) => setDeliveryDetails(e.target.value)}
          style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
        />

        {/* Update Button */}
        <Button
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "#D32F2F",
            color: "#FFF",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px"
          }}
          onClick={handleUpdateStatus}
        >
          <DoneIcon style={{ marginRight: "8px" }} />
          Update Status & Details
        </Button>

        {/* Success/Error Message */}
        {message && (
          <Alert severity={message.type} style={{ marginTop: "20px", backgroundColor: message.type === "error" ? "#FFCDD2" : "#E8F5E9", color: message.type === "error" ? "#B71C1C" : "#1B5E20" }}>
            {message.text}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
