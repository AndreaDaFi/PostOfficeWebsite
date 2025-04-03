"use client"

import { useState, useEffect, useContext } from "react"
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress,
  Box,
  Divider,
  Card,
  CardContent,
  Chip,
} from "@mui/material"
import InventoryIcon from "@mui/icons-material/Inventory"
import StoreIcon from "@mui/icons-material/Store"
import AddBoxIcon from "@mui/icons-material/AddBox"
import CategoryIcon from "@mui/icons-material/Category"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import WarningIcon from "@mui/icons-material/Warning"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { AuthContext } from "../context/AuthContext"

export default function ReStock() {
  const { user } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [selectedItemId, setSelectedItemId] = useState("")
  const [stockToAdd, setStockToAdd] = useState("")
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [lowStockItems, setLowStockItems] = useState([])

  // Fetch store items for employee's post office
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`https://apipost.vercel.app/api/ViewStore?po_id=${user.po_id}`)
        const data = await response.json()
        if (data.success) {
          setItems(data.data)
          // Find items with low stock (less than 10 units)
          const lowStock = data.data.filter((item) => item.stock < 10)
          setLowStockItems(lowStock)
        } else {
          setError("Failed to fetch store items.")
        }
      } catch (err) {
        setError("Error fetching items.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (user?.po_id) fetchItems()
  }, [user?.po_id])

  // Update selected item details when selection changes
  useEffect(() => {
    if (selectedItemId) {
      const item = items.find((item) => item.item_id === selectedItemId)
      setSelectedItem(item)
    } else {
      setSelectedItem(null)
    }
  }, [selectedItemId, items])

  const handleUpdateStock = async () => {
    setError(null)
    setSuccessMessage(null)

    if (!selectedItemId || !stockToAdd) {
      return setError("⚠ Please select an item and enter the quantity to add.")
    }

    if (isNaN(stockToAdd) || Number(stockToAdd) <= 0) {
      return setError("⚠ Quantity to add must be a positive number.")
    }

    // Calculate the new total stock by adding to the current stock
    const newTotalStock = selectedItem.stock + Number(stockToAdd)

    try {
      const response = await fetch("https://apipost.vercel.app/api/UpdateStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: selectedItemId,
          newStock: newTotalStock, // Send the calculated total
          po_id: user.po_id,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      setSuccessMessage(`✅ Added ${stockToAdd} units to ${selectedItem.item_name} successfully!`)

      // Update the local state to reflect the change
      setItems((prevItems) =>
        prevItems.map((item) => (item.item_id === selectedItemId ? { ...item, stock: newTotalStock } : item)),
      )

      // Update low stock items
      setLowStockItems((prevItems) => {
        const updatedItems = items.map((item) =>
          item.item_id === selectedItemId ? { ...item, stock: newTotalStock } : item,
        )
        return updatedItems.filter((item) => item.stock < 10)
      })

      // Clear form fields
      setSelectedItemId("")
      setStockToAdd("")
      setSelectedItem(null)
    } catch (err) {
      setError("❌ " + err.message)
    }
  }

  const getStockStatusColor = (stock) => {
    if (stock <= 5) return "#D32F2F" // Dark red for critical
    if (stock < 10) return "#FF5252" // Medium red for warning
    return "#FF8A80" // Light red for good
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* Header with gradient background */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(211, 47, 47, 0.15)",
          },
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
            <InventoryIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Inventory Restock
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                Update stock levels for items in your post office location
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              height: "100%",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <StoreIcon sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }} />
                <Typography variant="h6" color="text.secondary">
                  Total Items
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="#D32F2F">
                {loading ? <CircularProgress size={24} /> : items.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              height: "100%",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <WarningIcon sx={{ color: "#FF5252", mr: 1.5, fontSize: 24 }} />
                <Typography variant="h6" color="text.secondary">
                  Low Stock Items
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="#FF5252">
                {loading ? <CircularProgress size={24} /> : lowStockItems.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              borderRadius: 2,
              height: "100%",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CategoryIcon sx={{ color: "#FF5252", mr: 1.5, fontSize: 24 }} />
                <Typography variant="h6" color="text.secondary">
                  Categories
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold" color="#FF5252">
                {loading ? <CircularProgress size={24} /> : new Set(items.map((item) => item.item_category)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress size={50} sx={{ color: "#D32F2F" }} />
        </Box>
      ) : error && !items.length ? (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {/* Left Column - Item Selection and Low Stock Items */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#B71C1C",
                  color: "white",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <StoreIcon sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Select Item to Restock
                </Typography>
              </Box>

              <Box sx={{ p: 3 }}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Select Item</InputLabel>
                  <Select
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ddd",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D32F2F",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D32F2F",
                      },
                    }}
                  >
                    {items.map((item) => (
                      <MenuItem key={item.item_id} value={item.item_id}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <StoreIcon sx={{ mr: 1, color: getStockStatusColor(item.stock) }} />
                            <Typography>{item.item_name}</Typography>
                          </Box>
                          <Chip
                            label={`${item.stock} in stock`}
                            size="small"
                            sx={{
                              bgcolor: "#FFEBEE",
                              color: getStockStatusColor(item.stock),
                              ml: 1,
                            }}
                          />
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedItem && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: "#f9f9f9", borderRadius: 2, border: "1px solid #e0e0e0" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2, color: "#333" }}>
                      Selected Item Details
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <StoreIcon sx={{ color: "#D32F2F", mr: 1, fontSize: 20 }} />
                          <Typography variant="body1" fontWeight="medium">
                            {selectedItem.item_name}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CategoryIcon sx={{ color: "#666", mr: 1, fontSize: 18 }} />
                          <Typography variant="body2">{selectedItem.item_category}</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <AttachMoneyIcon sx={{ color: "#666", mr: 1, fontSize: 18 }} />
                          <Typography variant="body2">${selectedItem.item_price}</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <Typography variant="subtitle2">Current Stock:</Typography>
                          <Chip
                            label={`${selectedItem.stock} units`}
                            sx={{
                              bgcolor: "#FFEBEE",
                              color: getStockStatusColor(selectedItem.stock),
                              fontWeight: "bold",
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Low Stock Items Section */}
                {lowStockItems.length > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 2, color: "#FF5252", display: "flex", alignItems: "center" }}
                    >
                      <WarningIcon sx={{ mr: 1, fontSize: 20 }} />
                      Low Stock Items
                    </Typography>

                    <Box sx={{ maxHeight: 200, overflowY: "auto", pr: 1 }}>
                      {lowStockItems.map((item) => (
                        <Box
                          key={item.item_id}
                          sx={{
                            p: 1.5,
                            mb: 1,
                            borderRadius: 1,
                            bgcolor: "#FFEBEE",
                            border: "1px solid #FFCDD2",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": {
                              bgcolor: "#FFCDD2",
                            },
                          }}
                          onClick={() => setSelectedItemId(item.item_id)}
                        >
                          <Typography variant="body2" fontWeight="medium">
                            {item.item_name}
                          </Typography>
                          <Chip
                            label={`${item.stock} left`}
                            size="small"
                            sx={{
                              bgcolor: "white",
                              color: getStockStatusColor(item.stock),
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Update Stock Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#B71C1C",
                  color: "white",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AddBoxIcon sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Update Inventory
                </Typography>
              </Box>

              <Box sx={{ p: 3 }}>
                {/* Instructions */}
                <Box sx={{ mb: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 2, border: "1px solid #e0e0e0" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
                    How to update stock:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: "#555" }}>
                    1. Select an item from the dropdown menu on the left
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: "#555" }}>
                    2. Enter the quantity you want to add to the current stock
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    3. Click "Update Stock" to save the changes
                  </Typography>
                </Box>

                {/* Form */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "medium", color: "#333" }}>
                    Enter Quantity to Add
                  </Typography>

                  <TextField
                    fullWidth
                    label="Quantity to Add"
                    type="number"
                    value={stockToAdd}
                    onChange={(e) => setStockToAdd(e.target.value)}
                    disabled={!selectedItemId}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D32F2F",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D32F2F",
                        },
                      },
                    }}
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    helperText="Enter the number of units you want to add to the current stock"
                  />

                  <Typography variant="body2" sx={{ color: "#666", fontStyle: "italic" }}>
                    Enter the new total quantity that will be available in stock.
                  </Typography>
                </Box>

                {/* Messages */}
                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      bgcolor: "#FFEBEE",
                      border: "1px solid #FFCDD2",
                    }}
                  >
                    {error}
                  </Alert>
                )}

                {successMessage && (
                  <Alert
                    severity="success"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      bgcolor: "#FFEBEE",
                      border: "1px solid #FFCDD2",
                    }}
                    icon={<CheckCircleIcon fontSize="inherit" sx={{ color: "#D32F2F" }} />}
                  >
                    {successMessage}
                  </Alert>
                )}

                {/* Update Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    bgcolor: "#D32F2F",
                    color: "#fff",
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#B71C1C",
                    },
                    "&:disabled": {
                      bgcolor: "#f5f5f5",
                      color: "#bdbdbd",
                    },
                  }}
                  onClick={handleUpdateStock}
                  disabled={!selectedItemId || !stockToAdd || Number(stockToAdd) <= 0}
                  startIcon={<AddBoxIcon />}
                >
                  Update Stock
                </Button>

                {/* Additional Info */}
                {selectedItem && (
                  <Box sx={{ mt: 4, p: 2, bgcolor: "#FFEBEE", borderRadius: 2, border: "1px solid #FFCDD2" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1, color: "#D32F2F" }}>
                      Inventory Update Preview
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ color: "#D32F2F" }}>
                        Current Stock: <strong>{selectedItem.stock} units</strong>
                      </Typography>
                      {stockToAdd && (
                        <Typography variant="body2" sx={{ color: "#D32F2F" }}>
                          Adding: <strong>{stockToAdd} units</strong>
                        </Typography>
                      )}
                    </Box>
                    {stockToAdd && Number(stockToAdd) > 0 && (
                      <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ color: "#D32F2F" }}>
                          New Total: <strong>{selectedItem.stock + Number(stockToAdd)} units</strong>
                        </Typography>
                        <Chip
                          label="Increase"
                          size="small"
                          sx={{
                            ml: 1,
                            bgcolor: "#FFEBEE",
                            color: "#D32F2F",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

