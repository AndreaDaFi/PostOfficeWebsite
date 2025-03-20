import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert, CircularProgress 
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";

export default function AddPO() {
  const [poData, setPoData] = useState({
    state_id: "",
    city_name: "",
    street: "",
    zip: ""
  });

  const [states, setStates] = useState([]); // Store state_id from API
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch state_id from API on component load
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://vercel-api-powebapp.vercel.app/api/state_id");
        const result = await response.json();

        if (response.ok) {
          console.log("🟢 State IDs Fetched:", result.data); // Debugging
          setStates(result.data);
        } else {
          throw new Error("Failed to fetch states");
        }
      } catch (error) {
        console.error("❌ Error fetching state IDs:", error);
        setMessage({ type: "error", text: "❌ Error fetching states" });
      }
    };
    fetchStates();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setPoData({ ...poData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleAddLocation = async () => {
    setMessage(null);
    setLoading(true);

    const { state_id, city_name, street, zip } = poData;
    if (!state_id || !city_name || !street || !zip) {
      setLoading(false);
      return setMessage({ type: "error", text: "⚠ Please fill in all fields" });
    }

    // Validate zip code (numeric & length)
    if (!/^\d{5}$/.test(zip)) {
      setLoading(false);
      return setMessage({ type: "error", text: "⚠ Zip code must be 5 digits" });
    }

    try {
      const response = await fetch("http://localhost:3000/api/addPostOffice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(poData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add post office");
      }

      setMessage({ type: "success", text: "✅ Post Office added successfully!" });
      setPoData({ state_id: "", city_name: "", street: "", zip: "" });

    } catch (error) {
      setMessage({ type: "error", text: `❌ Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: "30px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "10px" }}>
        🏤 Add New Post Office
      </Typography>
      <Typography variant="subtitle1" style={{ marginBottom: "20px", fontStyle: "italic", color: "#555" }}>
        Expand your network and keep logistics running smoothly.
      </Typography>

      {message && <Alert severity={message.type} style={{ marginBottom: "20px" }}>{message.text}</Alert>}

      <Paper style={{ padding: "25px", borderRadius: "10px", backgroundColor: "#FFF", maxWidth: "500px", margin: "0 auto" }} elevation={4}>
        <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "15px" }}>
          <AddLocationIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
          Enter Post Office Details
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>State</InputLabel>
              <Select
                name="state_id"
                value={poData.state_id}
                onChange={handleChange}
                label="State"
              >
                {states.length > 0 ? (
                  states.map((state, index) => (
                    <MenuItem key={index} value={state.state_id}>
                      {state.state_id.toUpperCase()} {/* Ensure uppercase display */}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading...</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="City" name="city_name" variant="outlined" value={poData.city_name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Street Address" name="street" variant="outlined" value={poData.street} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Zip Code" name="zip" variant="outlined" value={poData.zip} onChange={handleChange} />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          style={{ marginTop: "20px", backgroundColor: "#D32F2F", color: "#FFF", width: "100%" }}
          onClick={handleAddLocation}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "➕ Add Post Office"}
        </Button>
      </Paper>
    </Container>
  );
}
