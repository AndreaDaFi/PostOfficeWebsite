import React, { useState } from "react";
import { Container, Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";

export default function AddPO() {
  // Default 10 Post Offices with names & built-in eStores
  const [locations, setLocations] = useState([
    { state: "Texas", city: "Houston", address: "123 Main St", zip: "77001" },
    { state: "California", city: "Los Angeles", address: "456 Sunset Blvd", zip: "12345" },
    { state: "New York", city: "New York City", address: "789 Broadway Ave", zip: "67891" },
    { state: "Illinois", city: "Chicago", address: "100 Lake Shore Dr", zip: "54321" },
    { state: "Florida", city: "Miami", address: "500 Ocean Dr", zip: "65432" },
    { state: "Texas", city: "Dallas", address: "222 Lone Star Rd", zip: "76543" },
    { state: "Washington", city: "Seattle", address: "900 Rainy St", zip: "87654" },
    { state: "Colorado", city: "Denver", address: "333 Mountain Ave", zip: "98765" },
    { state: "Georgia", city: "Atlanta", address: "777 Peach Tree Blvd", zip: "09876" },
    { state: "California", city: "San Francisco", address: "600 Golden Gate Ave", zip: "45678" }
  ]);

  const [poData, setPoData] = useState({
    state: "",
    city: "",
    address: "",
    address2: "",
    zip: ""
  });

  const [error, setError] = useState(null);

  const validatecity = (value) => value.length <= 45;
  const validateaddress = (value) => value.length <= 45;
  const validatezip = (value) => /^[0-9]{5}$/.test(value);

  const handleAddLocation = () => {
    const { state, city, address } = poData;
    if (!validateaddress(poData.address) ||
      !validatecity(poData.city) ||
      !validatezip(poData.zip) ||
      !state || !city || !address) {
      setError("⚠ Please fill in all required fields correctly.");
      return;
    }

    const newLocation = { ...poData };  // Copy poData and use it for the new location
    setLocations([...locations, newLocation]);
    setPoData({
      state: "",
      city: "",
      address: "",
      zip: ""
    });
    setError(null);
  };

  // List of all U.S. states for the dropdown
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
  ];

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🏤 CougarPost Locations
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "30px" }}>
        View and add new CougarPost locations. Each location has a built-in eStore for customer purchases.
      </Typography>

      {/* Add New Post Office Section */}
      <Paper style={{ padding: "20px", marginBottom: "20px", borderRadius: "10px", backgroundColor: "#fff" }} elevation={4}>
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
          <AddLocationIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
          Add a New CougarPost Location
        </Typography>

        {/* Input Fields */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>State</InputLabel>
              <Select
                value={poData.state}
                onChange={(e) => setPoData({ ...poData, state: e.target.value })}
                label="State"
              >
                {states.map((stateName, index) => (
                  <MenuItem key={index} value={stateName}>
                    {stateName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              value={poData.city}
              onChange={(e) => setPoData({ ...poData, city: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              value={poData.address}
              onChange={(e) => setPoData({ ...poData, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address2"
                variant="outlined"
                value={poData.address}
                onChange={(e) => setPoData({ ...poData, address2: e.target.value })}
         
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Zip Code"
              variant="outlined"
              value={poData.zip}
              onChange={(e) => setPoData({ ...poData, zip: e.target.value })}
            />
          </Grid>
        </Grid>

        {/* Error Message */}
        {error && (
          <Typography variant="body2" style={{ color: "#B71C1C", marginTop: "10px" }}>
            {error}
          </Typography>
        )}

        {/* Add Button */}
        <Button
          variant="contained"
          style={{ marginTop: "20px", padding: "12px 20px", borderRadius: "8px", backgroundColor: "#D32F2F", color: "#FFF" }}
          onClick={handleAddLocation}
        >
           Add CougarPost
        </Button>
      </Paper>

      {/* Existing Locations List with eStores */}
      {locations.map((location, index) => (
        <Paper key={index} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#FAFAFA", marginBottom: "20px" }} elevation={3}>
          <Typography variant="h5" style={{ fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
            📍 {location.name}
          </Typography>
          <Typography variant="body2" style={{ color: "#777", marginBottom: "10px" }}>
            {location.address}, {location.city}, {location.state}, {location.zip}
          </Typography>
        </Paper>
      ))}
    </Container>
  );
}
