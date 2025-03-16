import React, { useState } from "react";
import { Container, Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";

export default function AddPO() {
  const [poData, setPoData] = useState({
    state: "",
    city: "",
    address: "",
    zip: ""
  });

  const [message, setMessage] = useState(null);

  const handleAddLocation = async () => {
    setMessage(null);

    const { state, city, address, zip } = poData;
    if (!state || !city || !address || !zip) {
      return setMessage({ type: "error", text: "⚠ Please fill in all fields." });
    }

    try {
      const response = await fetch("https://vercel-api-powebapp.vercel.app/api/addPostOffice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(poData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add post office");
      }

      setMessage({ type: "success", text: "✅ Post Office added successfully!" });
      setPoData({ state: "", city: "", address: "", zip: "" });
    } catch (error) {
      setMessage({ type: "error", text: `❌ Error: ${error.message}` });
    }
  };

  const states = [
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"
  ];

  const stateNames = {
    al: "Alabama", ak: "Alaska", az: "Arizona", ar: "Arkansas", ca: "California", co: "Colorado", ct: "Connecticut", de: "Delaware", fl: "Florida", ga: "Georgia", hi: "Hawaii", id: "Idaho", il: "Illinois", in: "Indiana", ia: "Iowa", ks: "Kansas", ky: "Kentucky", la: "Louisiana", me: "Maine", md: "Maryland", ma: "Massachusetts", mi: "Michigan", mn: "Minnesota", ms: "Mississippi", mo: "Missouri", mt: "Montana", ne: "Nebraska", nv: "Nevada", nh: "New Hampshire", nj: "New Jersey", nm: "New Mexico", ny: "New York", nc: "North Carolina", nd: "North Dakota", oh: "Ohio", ok: "Oklahoma", or: "Oregon", pa: "Pennsylvania", ri: "Rhode Island", sc: "South Carolina", sd: "South Dakota", tn: "Tennessee", tx: "Texas", ut: "Utah", vt: "Vermont", va: "Virginia", wa: "Washington", wv: "West Virginia", wi: "Wisconsin", wy: "Wyoming"
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🏤 Add New CougarPost Location
      </Typography>

      {message && <Alert severity={message.type} style={{ marginBottom: "20px" }}>{message.text}</Alert>}

      <Paper style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#FFF" }} elevation={4}>
        <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "15px" }}>
          <AddLocationIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
          Add a New Post Office
        </Typography>

        <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel>State</InputLabel>
    <Select
      value={poData.state}
      onChange={(e) => setPoData({ ...poData, state: e.target.value })}
      label="State"
    >
      {Object.entries(stateNames).map(([abbreviation, name]) => (
        <MenuItem key={abbreviation} value={abbreviation}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="City" variant="outlined" value={poData.city} onChange={(e) => setPoData({ ...poData, city: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Address" variant="outlined" value={poData.address} onChange={(e) => setPoData({ ...poData, address: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Zip Code" variant="outlined" value={poData.zip} onChange={(e) => setPoData({ ...poData, zip: e.target.value })} />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          style={{ marginTop: "20px", backgroundColor: "#D32F2F", color: "#FFF" }}
          onClick={handleAddLocation}
        >
           Add Post Office
        </Button>
      </Paper>
    </Container>
  );
}
