import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Button, MenuItem, Select, FormControl, InputLabel, Alert } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function AddStoreItem() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState(null);

  const categories = [
    "Packing Supplies",
    "Envelopes & Mailers",
    "Boxes & Sizes",
    
  ];

  const handleAddItem = () => {
    if (!itemName) return setMessage({ type: "error", text: "⚠ Please enter the item name." });
    if (!category) return setMessage({ type: "error", text: "⚠ Please select a category." });
    if (!price) return setMessage({ type: "error", text: "⚠ Please enter the price." });
    if (!quantity) return setMessage({ type: "error", text: "⚠ Please enter the quantity." });

    setMessage({ type: "success", text: `✅ Item "${itemName}" added successfully!` });
    setItemName("");
    setCategory("");
    setPrice("");
    setQuantity("");
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🛒 Add New Store Item
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Managers can add new items to the post office store.
      </Typography>

      <Paper elevation={3} style={{ padding: "30px", borderRadius: "12px", backgroundColor: "#FFF", maxWidth: "400px", margin: "0 auto" }}>
        <AddShoppingCartIcon style={{ fontSize: "50px", color: "#D32F2F", marginBottom: "15px" }} />

        {/* Item Name Input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Item Name"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          InputProps={{ startAdornment: <InventoryIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> }}
          style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
        />

        {/* Select Category */}
        <FormControl fullWidth variant="outlined" style={{ marginBottom: "20px" }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Price ($)"
          placeholder="Enter price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          InputProps={{ startAdornment: <AttachMoneyIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> }}
          style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
        />

        {/* Quantity Input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Stock Quantity"
          placeholder="Enter quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputProps={{ startAdornment: <InventoryIcon style={{ marginRight: "10px", color: "#D32F2F" }} /> }}
          style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
        />

        {/* Add Item Button */}
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
          onClick={handleAddItem}
        >
          ➕ Add Item
        </Button>

        {/* Success/Error Message */}
        {message && <Alert severity={message.type} style={{ marginTop: "20px", backgroundColor: message.type === "error" ? "#FFCDD2" : "#E8F5E9", color: message.type === "error" ? "#B71C1C" : "#1B5E20" }}>{message.text}</Alert>}
      </Paper>
    </Container>
  );
}
