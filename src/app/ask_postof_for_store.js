import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function LowStockPage() {
  const [selectedPostOffice, setSelectedPostOffice] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchPostOffices = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/CustAddPackage"
        ); // Your API endpoint
        const result = await response.json();

        if (result.success) {
          setPostOffices(result.data); // Set the fetched data to state
        } else {
          setError("Failed to load post office data.");
        }
      } catch (error) {
        setError(error.message); // Set error if fetch fails
      }
    };

    fetchPostOffices();
  }, []);

  const handlePostOfficeChange = (e) => {
    const selectedPoId = e.target.value;
    console.log("Selected Post Office ID:", selectedPoId);  // Debugging line
    setSelectedPostOffice(selectedPoId);  // Update state with selected post office ID
  };


  return (
    <Container maxWidth="sm" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={8} style={{ padding: "40px", borderRadius: "16px", textAlign: "center", backgroundColor: "#ffffff" }}>
        <Typography variant="h3" style={{ fontWeight: "bold", color: "#d32f2f", marginBottom: "15px" }}>
           Choose Your Store
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "25px", color: "#555" }}>
          Different locations will have different items available. Please select your Post Office location to see available items.
        </Typography>

        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Select Post Office"
            value={selectedPostOffice}
            onChange={handlePostOfficeChange}
          >
            {/* Show a loading message while postOffices is empty or undefined */}
            {postOffices.length === 0 ? (
              <MenuItem disabled>No Post Offices Available</MenuItem>
            ) : (
              postOffices.map((po) => (
                <MenuItem key={po.po_id} value={po.po_id}>
                  {po.address}
                </MenuItem>
              ))
            )}
          </TextField>
        </Grid>

        <Button
          component={Link}
          to={`/Store?selectedPostOffice=${selectedPostOffice}`}
          variant="contained"
          style={{ padding: "12px 30px", fontSize: "16px", backgroundColor: "#d32f2f", color: "#ffffff", borderRadius: "8px" }}
          disabled={!selectedPostOffice}
        >
          view Store
        </Button>
      </Paper>
    </Container>
  );
}