"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Typography,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/WarningAmberRounded";
import WarningIcon from "@mui/icons-material/Warning";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Modal from "../../components/Modal";

export default function RemoveStoreItem() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const [message, setMessage] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchStaff = async () => {
      const mngr_id = user?.employees_id; // Get the manager's ID
      if (!mngr_id) {
        setError("Missing manager ID");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://final-po-api.vercel.app/api/MngrViewStaff?mngr_id=${mngr_id}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (Array.isArray(data.data) && data.data.length > 0) {
          setItems(data.data);
        } else {
          console.error("⚠ API returned an empty array:", data);
          setError("No staff members found");
        }
      } catch (err) {
        console.error("Error fetching staff:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [user]);

  const handleChange = (event) => {
    setSelectedItem(event.target.value); // Set the selected item ID
    setMessage(null); // Clear any previous messages
  };

  const openConfirmDialog = () => {
    if (!selectedItem) {
      setMessage({
        type: "error",
        text: "⚠ You must select an item to remove.",
      });
      return;
    }
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  // Update the handleRemoveItem function to fix the API payload format
  const handleRemoveItem = async () => {
    closeConfirmDialog();

    try {
      console.log("Item to delete: ", selectedItem);

      // Fix the API payload format - the API expects "selectedItem" as the key
      const response = await fetch(
        "https://final-po-api.vercel.app/api/FireStaff",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selectedItem }), // Changed from item_id to selectedItem
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Item deletion failed");

      // Remove the item from the local state to update the UI
      setItems(items.filter((item) => item.item_id !== selectedItem));

      // Find the name of the removed item for the success message
      const removedItemName =
        items.find((item) => item.item_id === selectedItem)?.item_name ||
        "Item";

      setSelectedItem(""); // Clear the selected item
      setMessage({
        type: "success",
        text: ` "${removedItemName}" has been successfully removed from the store.`,
      });

      closeConfirmDialog();
      window.location.reload(); // Reload the page to reflect changes
    } catch (err) {
      setMessage({ type: "error", text: `❌ ${err.message}` });
    }
  };

  // Find the selected item details
  const selectedItemDetails = items.find(
    (item) => item.item_id === selectedItem
  );

  // Format price with dollar sign and two decimal places
  const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
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
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <DeleteIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Fire a staff member
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                Please notify the affected staff member before continuing.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#D32F2F"
            gutterBottom
          >
            Select a staff member to fire
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress sx={{ color: "#D32F2F" }} />
          </Box>
        ) : error ? (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              bgcolor: "#FFEBEE",
              border: "1px solid #FFCDD2",
              py: 2,
            }}
          >
            {error}
          </Alert>
        ) : items.length === 0 ? (
          <Alert
            severity="info"
            sx={{
              mb: 3,
              borderRadius: 2,
              py: 2,
            }}
          >
            No employees available.
          </Alert>
        ) : (
          <>
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel>Select Employee</InputLabel>
              <Select
                value={selectedItem}
                onChange={handleChange}
                label="Select Item"
                sx={{
                  borderRadius: 1.5,
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
                  <MenuItem key={item.id} value={item.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        {item.name}, {item.role}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Selected Item Details */}
            {selectedItemDetails && (
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  bgcolor: "#FFEBEE",
                  borderRadius: 2,
                  border: "1px solid #FFCDD2",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Item to be removed:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="medium">
                      {selectedItemDetails.item_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Category: {selectedItemDetails.item_category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current Stock: {selectedItemDetails.stock} units
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Item ID: {selectedItemDetails.item_id}
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight="bold" color="#D32F2F">
                    {formatPrice(selectedItemDetails.item_price)}
                  </Typography>
                </Box>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <WarningIcon sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }} />
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                color="#D32F2F"
              >
                Warning: This action cannot be undone
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={openModal}
              startIcon={<DeleteIcon />}
              disabled={!selectedItem}
              sx={{
                bgcolor: "#D32F2F",
                color: "#FFF",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: 1.5,
                "&:hover": {
                  bgcolor: "#B71C1C",
                },
                "&:disabled": {
                  bgcolor: "#f5f5f5",
                  color: "#bdbdbd",
                },
              }}
            >
              Remove Item
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
          </>
        )}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ bgcolor: "#FFEBEE", color: "#B71C1C" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WarningIcon sx={{ mr: 1 }} />
            Confirm Item Removal
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove{" "}
            <strong>{selectedItemDetails?.item_name}</strong> from the store
            inventory? This action cannot be undone.
          </DialogContentText>
          {selectedItemDetails && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Item: <strong>{selectedItemDetails.item_name}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {selectedItemDetails.item_category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {formatPrice(selectedItemDetails.item_price)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Stock: {selectedItemDetails.stock} units
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={closeConfirmDialog}
            variant="outlined"
            sx={{
              color: "#666",
              borderColor: "#ccc",
              "&:hover": {
                borderColor: "#999",
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemoveItem}
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{
              bgcolor: "#D32F2F",
              "&:hover": {
                bgcolor: "#B71C1C",
              },
            }}
            autoFocus
          >
            Remove Item
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={handleRemoveItem} // Pass the delete function to confirm action
      />
    </Container>
  );
}
