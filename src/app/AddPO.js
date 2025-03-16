import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";

export default function AddPO() {
  const [poData, setPoData] = useState({
    state: "",
    city: "",
    address: "",
    zip: "",
  });

  const [postOffices, setPostOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPostOffices();
  }, []);

  const fetchPostOffices = async () => {
    try {
      const response = await fetch("https://vercel-api-powebapp.vercel.app/api/addPostOffice");
      const data = await response.json();
      if (data.success) {
        setPostOffices(data.data);
      } else {
        setError("Failed to load post offices.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLocation = async () => {
    setMessage(null);
    setError(null);

    if (!poData.state || !poData.city || !poData.address || !poData.zip) {
      setError("⚠ Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("https://vercel-api-powebapp.vercel.app/api/addPostOffice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(poData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ Post Office added successfully!");
        fetchPostOffices();
        setPoData({ state: "", city: "", address: "", zip: "" });
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("❌ Error adding post office: " + error.message);
    }
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🏤 Manage Post Offices
      </Typography>

      <Paper style={{ padding: "20px", marginBottom: "20px", borderRadius: "10px", backgroundColor: "#fff" }} elevation={4}>
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
          <AddLocationIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
          Add a New Post Office
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>State</InputLabel>
              <Select
                value={poData.state}
                onChange={(e) => setPoData({ ...poData, state: e.target.value })}
                label="State"
              >
                {["Texas", "California", "New York", "Illinois", "Florida"].map((stateName, index) => (
                  <MenuItem key={index} value={stateName}>
                    {stateName}
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

        {error && <Alert severity="error" style={{ marginTop: "10px" }}>{error}</Alert>}
        {message && <Alert severity="success" style={{ marginTop: "10px" }}>{message}</Alert>}

        <Button variant="contained" style={{ marginTop: "20px", backgroundColor: "#D32F2F", color: "#FFF" }} onClick={handleAddLocation}>
           Add Post Office
        </Button>
      </Paper>
    </Container>
  );
}
