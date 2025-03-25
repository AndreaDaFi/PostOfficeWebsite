import React, { useState, useEffect, useContext } from "react";
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
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AuthContext } from "../context/AuthContext";

export default function ReStock() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [newStock, setNewStock] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch store items for employee's post office
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `https://vercel-api-powebapp.vercel.app/api/ViewStore?po_id=${user.po_id}`
        );
        const data = await response.json();
        if (data.success) {
          setItems(data.data);
        } else {
          setError("Failed to fetch store items.");
        }
      } catch (err) {
        setError("Error fetching items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.po_id) fetchItems();
  }, [user?.po_id]);

  const handleUpdateStock = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!selectedItemId || !newStock) {
      return setError("⚠ Please select an item and enter the stock quantity.");
    }

    if (isNaN(newStock) || newStock <= 0) {
      return setError("⚠ stock quantity must be a positive number.");
    }

    try {
      const response = await fetch(
        "https://vercel-api-powebapp.vercel.app/api/UpdateStock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_id: selectedItemId,
            newStock: Number(newStock),
            po_id: user.po_id,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setSuccessMessage("✅ Stock updated successfully.");
      setSelectedItemId("");
      setNewStock("");
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#D32F2F", mb: 2 }}>
        🏪 Update Store Stock
      </Typography>
      <Typography variant="body1" sx={{ color: "#555", mb: 4 }}>
        Clerks can update stock levels for items in their assigned location.
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>
          <InventoryIcon sx={{ verticalAlign: "middle", mr: 1, color: "#D32F2F" }} />
          Update Item Stock
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Item</InputLabel>
                  <Select
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                  >
                    {items.map((item) => (
                      <MenuItem key={item.item_id} value={item.item_id}>
                        <StoreIcon sx={{ mr: 1, color: "#D32F2F" }} />
                        {item.item_name} — ({item.stock} in stock)
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
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                />
              </Grid>
            </Grid>

            {error && (
              <Alert severity="error" sx={{ mt: 2, backgroundColor: "#FFCDD2", color: "#B71C1C" }}>
                {error}
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success" sx={{ mt: 2, backgroundColor: "#E8F5E9", color: "#1B5E20" }}>
                {successMessage}
              </Alert>
            )}

            <Button
              variant="contained"
              sx={{ mt: 3, bgcolor: "#D32F2F", color: "#fff", px: 3 }}
              onClick={handleUpdateStock}
            >
              <AddBoxIcon sx={{ mr: 1 }} />
              Update Stock
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}
