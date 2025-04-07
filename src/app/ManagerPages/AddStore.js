"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
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
  Box,
} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import InventoryIcon from "@mui/icons-material/Inventory"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import CategoryIcon from "@mui/icons-material/Category"

export default function AddStoreItem() {
  const { user } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    price: "",
    quantity: "",
  })

  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const categories = ["Packing Supplies", "Envelopes & Mailers", "Boxes & Sizes"]

  const validateData = () => {
    if (!formData.itemName) return "⚠ Please enter item name."
    if (formData.itemName.trim().length > 45) return "⚠ Item's name has to be less than 45 characters"
    if (!formData.category) return "⚠ Please select a category"
    if (!formData.price || formData.price <= 0 || isNaN(formData.price)) return "⚠ Please enter valid price"
    const quantity = Number.parseInt(formData.quantity, 10)
    if (!quantity || isNaN(quantity) || quantity <= 0 || quantity.toString() != formData.quantity)
      return "⚠ Please enter valid quantity (positive integers only)"

    return null
  }

  const handleAddItem = async () => {
    const errorMsg = validateData()
    if (errorMsg) return setMessage({ type: "error", text: errorMsg })

    try {
      const po_id = user?.po_id
      // adds this id to the data that needs to be passed to the api
      const newItem = {
        ...formData, // the actual employee data collected
        po_id: po_id,
      }
      console.log("Form Data:", newItem)
      const response = await fetch("https://apipost.vercel.app/api/AddStore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Item creation failed")

      setMessage({ type: "success", text: "Item added successfully" })

      setFormData({
        itemName: "",
        category: "",
        price: "",
        quantity: "",
      })
    } catch (err) {
      setMessage({ type: "error", text: err.message })
    }
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      {/* Header with gradient background */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
            color: "white",
            p: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fillOpacity="1" fillRule="evenodd"/%3E%3C/svg%3E\')',
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}>
            <AddShoppingCartIcon sx={{ fontSize: 32, mr: 2 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Add a New Store Item
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                Update the item options available in your post office and initialize stock
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "#FFF",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#D32F2F", mb: 3 }}>
          New Item Entry Form
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
            startAdornment: <InventoryIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
            },
          }}
        />

        {/* Select Category */}
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
            startAdornment={<CategoryIcon sx={{ mr: 1.5, color: "#D32F2F" }} />}
            sx={{
              borderRadius: 1.5,
            }}
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
          helperText="Has to be a number (integer or decimal)"
          InputProps={{
            startAdornment: <AttachMoneyIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
            },
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
          helperText="Has to be an integer"
          InputProps={{
            startAdornment: <InventoryIcon sx={{ mr: 1.5, color: "#D32F2F" }} />,
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
            },
          }}
        />

        {/* Add Item Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#B71C1C",
            color: "#FFF",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: 1.5,
            "&:hover": {
              bgcolor: "#8B0000",
            },
          }}
          onClick={handleAddItem}
          startIcon={<AddShoppingCartIcon />}
        >
          Add Item
        </Button>

        {/* Success/Error Message */}
        {message && (
          <Alert
            severity={message.type}
            sx={{
              mt: 3,
              bgcolor: message.type === "error" ? "#FFEBEE" : "#E8F5E9",
              color: message.type === "error" ? "#B71C1C" : "#1B5E20",
              borderRadius: 1.5,
            }}
          >
            {message.text}
          </Alert>
        )}
      </Paper>
    </Container>
  )
}

