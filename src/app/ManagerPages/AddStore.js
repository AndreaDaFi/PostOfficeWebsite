import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function AddStoreItem() {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const categories = [
    "Packing Supplies",
    "Envelopes & Mailers",
    "Boxes & Sizes",
  ];

  const validateData = () => {
    if (!formData.itemName) return "⚠ Please enter item name.";
    if (formData.itemName.trim().length > 45)
      return "⚠ item's name has to be less than 45 characters";
    if (!formData.category)
      return setMessage({ type: "error", text: "⚠ Please select a category" });
    if (!formData.price || formData.price <= 0 || isNaN(formData.price))
      return "⚠ Please enter valid price";
    const quantity = parseInt(formData.quantity, 10);
    if (
      !quantity ||
      isNaN(quantity) ||
      quantity <= 0 ||
      quantity.toString() != formData.quantity
    )
      return "⚠ Please enter valid quantity (positive integers only)";
  };

  const handleAddItem = async () => {
    const errorMsg = validateData();
    if (errorMsg) return setMessage({ type: "error", text: errorMsg });

    try {
      const po_id = user?.po_id;
      // adds this id to the data that needs to be passed to the api
      const newItem = {
        ...formData, // the actual employee data collected
        po_id: po_id,
      };
      console.log("Form Data:", newItem);
      const response = await fetch(
        "https://vercel-api-powebapp.vercel.app/api/AddStore",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "item creation failed");

      setFormData({
        itemName: "",
        category: "",
        price: "",
        quantity: "",
      });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "left" }}>
      <Typography
        variant="h3"
        style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}
      >
        Add a new store item
      </Typography>
      <Typography
        variant="body1"
        style={{ color: "#555", marginBottom: "20px" }}
      >
        update the item options available in your post office and initalize a
        stock for them
      </Typography>

      <Paper
        elevation={5}
        style={{
          padding: "20px",
          backgroundColor: "#FFF",
          maxWidth: "550px",
          marginLeft: "0",
        }}
      >
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}
        >
          new item entry form:
        </Typography>

        {/* Item Name Input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Item Name"
          placeholder="Enter item name"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          helperText="Up to 45 characters"
          InputProps={{
            startAdornment: (
              <InventoryIcon
                style={{ marginRight: "10px", color: "#D32F2F" }}
              />
            ),
          }}
          style={{
            marginBottom: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        />

        {/* Select Category */}
        <FormControl
          fullWidth
          variant="outlined"
          style={{ marginBottom: "20px" }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
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
          name="price"
          value={formData.price}
          onChange={handleChange}
          helperText="has to be a number (integer or decimal)"
          InputProps={{
            startAdornment: (
              <AttachMoneyIcon
                style={{ marginRight: "10px", color: "#D32F2F" }}
              />
            ),
          }}
          style={{
            marginBottom: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        />

        {/* Quantity Input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Stock Quantity"
          placeholder="Enter quantity"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          helperText="has to be an integer"
          InputProps={{
            startAdornment: (
              <InventoryIcon
                style={{ marginRight: "10px", color: "#D32F2F" }}
              />
            ),
          }}
          style={{
            marginBottom: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
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
            borderRadius: "8px",
          }}
          onClick={handleAddItem}
        >
          Add Item
        </Button>

        {/* Success/Error Message */}
        {message && (
          <Alert
            severity={message.type}
            style={{
              marginTop: "20px",
              backgroundColor: message.type === "error" ? "#FFCDD2" : "#E8F5E9",
              color: message.type === "error" ? "#B71C1C" : "#1B5E20",
            }}
          >
            {message.text}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
