import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Button, MenuItem, Select, FormControl, InputLabel, Alert } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";

export default function PackageStatus() {
  const [driverID, setDriverID] = useState("");
  const [location, setLocation] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageStatus, setPackageStatus] = useState("");
  const [message, setMessage] = useState(null);

  const statuses = ["Pending", "Out for Delivery", "Delivered", "Delayed", "Returned to Sender"];
  const locations = ["Houston", "Los Angeles", "New York", "Chicago", "Miami", "Dallas", "Seattle", "Denver", "Atlanta", "San Francisco"];

  const handleUpdateStatus = () => {
    if (!driverID) return setMessage({ type: "error", text: "⚠ Please enter your Driver ID." });
    if (!location) return setMessage({ type: "error", text: "⚠ Please select your location." });
    if (!trackingNumber) return setMessage({ type: "error", text: "⚠ Please enter a tracking number." });
    if (!packageStatus) return setMessage({ type: "error", text: "⚠ Please select a status." });

    setMessage({ type: "success", text: `✅ Package ${trackingNumber} status updated to: ${packageStatus} by Driver ${driverID} at ${location}` });
    setDriverID(""); 
    setLocation(""); 
    setTrackingNumber(""); 
    setPackageStatus("");
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        📦 Update Package Status
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Drivers must enter their ID and location before updating package status.
      </Typography>

      <Paper elevation={3} style={{ padding: "30px", borderRadius: "12px", backgroundColor: "#FFF", maxWidth: "400px", margin: "0 auto" }}>
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
          Update Status
        </Button>

        {/* Success/Error Message */}
        {message && <Alert severity={message.type} style={{ marginTop: "20px", backgroundColor: message.type === "error" ? "#FFCDD2" : "#E8F5E9", color: message.type === "error" ? "#B71C1C" : "#1B5E20" }}>{message.text}</Alert>}
      </Paper>
    </Container>
  );
}
