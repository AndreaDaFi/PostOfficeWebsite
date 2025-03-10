import React, { useState } from "react";
import { Container, Typography, Grid, Paper, TextField, Button, MenuItem, Select, InputLabel, FormControl, Alert } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function ReStock() {
  // List of available store items
  const storeItems = [
    "Packing Tape (Clear, Reinforced, Branded)",
    "Bubble Wrap (For fragile items)",
    "Packing Peanuts & Foam Sheets",
    "Shrink Wrap & Stretch Wrap",
    '"Fragile" Stickers & Labels',
    "Standard Envelopes (Letter-size, Legal-size)",
    "Padded Envelopes (Bubble mailers)",
    "Tyvek Envelopes (Water-resistant)",
    "Pre-stamped Envelopes",
    "Document Mailers (Rigid)",
    "Small Box (6x6x6)",
    "Medium Box (12x12x12)",
    "Large Box (18x18x18)",
    "Extra Large Box (24x24x24)"
  ];

  const [selectedItem, setSelectedItem] = useState("");
  const [newStock, setNewStock] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleUpdateStock = () => {
    setError(null);
    setSuccessMessage(null);

    if (!selectedItem || !newStock) {
      setError("⚠ Please select an item and enter the new stock quantity.");
      return;
    }

    if (isNaN(newStock) || newStock <= 0) {
      setError("⚠ Stock quantity must be a positive number.");
      return;
    }

    // Simulating a stock update (Replace this with an API request)
    console.log("Stock Updated:", { selectedItem, newStock });

    setSuccessMessage(`✅ Stock updated for ${selectedItem}: ${newStock} items available.`);
    setSelectedItem("");
    setNewStock("");
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🏪 Update Store Stock
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "30px" }}>
        Clerks can update stock levels for store items available in CougarPost locations.
      </Typography>

      {/* Update Stock Form */}
      <Paper style={{ padding: "20px", marginBottom: "20px", borderRadius: "10px", backgroundColor: "#fff" }} elevation={4}>
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
          <InventoryIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
          Update Item Stock
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Item</InputLabel>
              <Select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
                {storeItems.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <StoreIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="New Stock Quantity" 
              type="number" 
              variant="outlined" 
              value={newStock} 
              onChange={(e) => setNewStock(e.target.value)} 
            />
          </Grid>
        </Grid>

        {/* Error Message */}
        {error && (
          <Alert severity="error" style={{ marginTop: "15px", backgroundColor: "#FFCDD2", color: "#B71C1C" }}>
            {error}
          </Alert>
        )}

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" style={{ marginTop: "15px", backgroundColor: "#E8F5E9", color: "#1B5E20" }}>
            {successMessage}
          </Alert>
        )}

        {/* Update Stock Button */}
        <Button 
          variant="contained"
          style={{ marginTop: "20px", padding: "12px 20px", borderRadius: "8px", backgroundColor: "#D32F2F", color: "#FFF" }}
          onClick={handleUpdateStock}
        >
          <AddBoxIcon style={{ marginRight: "10px" }} />
          Update Stock
        </Button>
      </Paper>
    </Container>
  );
}
