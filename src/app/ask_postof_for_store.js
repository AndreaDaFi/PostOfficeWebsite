import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function LowStockPage() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetch("https://your-api-url.com/locations")
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Failed to fetch locations", err));
  }, []);

  return (
    <Container maxWidth="sm" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={8} style={{ padding: "40px", borderRadius: "16px", textAlign: "center", backgroundColor: "#ffffff" }}>
        <Typography variant="h3" style={{ fontWeight: "bold", color: "#d32f2f", marginBottom: "15px" }}>
           Choose Your Store
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "25px", color: "#555" }}>
          Select your Post Office location to see available items.
        </Typography>

        <FormControl fullWidth variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel style={{ color: "#d32f2f" }}>Select Location</InputLabel>
          <Select
            value={selectedLocation}
            label="Select Location"
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
            ))}
            <MenuItem value="testing1">Texas</MenuItem>
            <MenuItem value="testing2">California</MenuItem>
            <MenuItem value="testing3">New York</MenuItem>
          </Select>
        </FormControl>

        <Button
          component={Link}
          to={`/Store?location=${selectedLocation}`}
          variant="contained"
          style={{ padding: "12px 30px", fontSize: "16px", backgroundColor: "#d32f2f", color: "#ffffff", borderRadius: "8px" }}
          disabled={!selectedLocation}
        >
          🛒 Visit Store
        </Button>
      </Paper>
    </Container>
  );
}