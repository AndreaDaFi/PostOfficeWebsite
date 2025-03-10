import React, { useState } from "react";
import { Container, Typography, Grid, Paper, TextField, Button, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function AddPO() {
  // Default 10 Post Offices with names & built-in eStores
  const [locations, setLocations] = useState([
    { name: "CougarPost - Houston", state: "Texas", city: "Houston", address: "123 Main St" },
    { name: "CougarPost - Los Angeles", state: "California", city: "Los Angeles", address: "456 Sunset Blvd" },
    { name: "CougarPost - New York", state: "New York", city: "New York City", address: "789 Broadway Ave" },
    { name: "CougarPost - Chicago", state: "Illinois", city: "Chicago", address: "100 Lake Shore Dr" },
    { name: "CougarPost - Miami", state: "Florida", city: "Miami", address: "500 Ocean Dr" },
    { name: "CougarPost - Dallas", state: "Texas", city: "Dallas", address: "222 Lone Star Rd" },
    { name: "CougarPost - Seattle", state: "Washington", city: "Seattle", address: "900 Rainy St" },
    { name: "CougarPost - Denver", state: "Colorado", city: "Denver", address: "333 Mountain Ave" },
    { name: "CougarPost - Atlanta", state: "Georgia", city: "Atlanta", address: "777 Peach Tree Blvd" },
    { name: "CougarPost - San Francisco", state: "California", city: "San Francisco", address: "600 Golden Gate Ave" }
  ]);

  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  const handleAddLocation = () => {
    if (!name || !state || !city || !address) {
      setError("⚠ Please fill in all fields.");
      return;
    }

    const newLocation = { name, state, city, address };
    setLocations([...locations, newLocation]);
    setName("");
    setState("");
    setCity("");
    setAddress("");
    setError(null);
  };

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
            <TextField fullWidth label="Post Office Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="State" variant="outlined" value={state} onChange={(e) => setState(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="City" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
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
          ➕ Add CougarPost
        </Button>
      </Paper>

      {/* Existing Locations List with eStores */}
      {locations.map((location, index) => (
        <Paper key={index} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#FAFAFA", marginBottom: "20px" }} elevation={3}>
          <Typography variant="h5" style={{ fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
            📍 {location.name}
          </Typography>
          <Typography variant="body2" style={{ color: "#777", marginBottom: "10px" }}>
            {location.address}, {location.city}, {location.state}
          </Typography>

          {/* Expandable eStore Section */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#FFF3E0" }}>
              <Typography style={{ fontWeight: "bold", color: "#D32F2F" }}>
                <StorefrontIcon style={{ verticalAlign: "middle", marginRight: "10px" }} />
                View eStore at {location.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ShoppingCartIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
                  <ListItemText primary="Packing Tape" />
                </ListItem>
                <ListItem>
                  <ShoppingCartIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
                  <ListItemText primary="Bubble Wrap" />
                </ListItem>
                <ListItem>
                  <ShoppingCartIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
                  <ListItemText primary="Envelopes & Mailers" />
                </ListItem>
                <ListItem>
                  <ShoppingCartIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
                  <ListItemText primary="Boxes (Small, Medium, Large)" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Paper>
      ))}
    </Container>
  );
}

