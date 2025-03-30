import React, { useState, useContext, useEffect } from "react";
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
} from "@mui/material";

export default function RemoveStoreItem() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const { error, setError } = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");

  //get the items on sale to select one to remove
  useEffect(() => {
    const fetchItems = async () => {
      const po_id = user?.po_id; // Get the manager's ID
      try {
        const response = await fetch(
          ` https://apipost.vercel.app/api/ViewStore?po_id=${po_id}`,
          {
            method: "GET", // Use GET method
          }
        );

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (Array.isArray(data.data) && data.data.length > 0) {
          setItems(data.data); // Update state with API response
        } else {
          console.error("⚠ API returned an empty array:", data);
        }
      } catch (err) {
        console.error("❌ Error fetching items for sale:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [user?.po_id]); // Refetch when `po_id` changes

  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    setSelectedItem(event.target.value); // Set the selected item ID
    console.log("new selected item to delete is of id: ", selectedItem);
  };

  const handleRemoveItem = async () => {
    if (!selectedItem)
      return setMessage({ type: "error", text: "⚠ You must select an item." });
  
    try {
      console.log("item to delete: ", selectedItem);
      const response = await fetch("http://localhost:3001/api/RemoveItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedItem }), // Wrap selectedItem in an object
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.message || "item deletion failed");
  
      setSelectedItem(""); // Clear the selected item
      setMessage({ type: "success", text: "Item removed successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };
  

  return (
    <Container style={{ marginTop: "20px", textAlign: "left" }}>
      <Typography
        variant="h3"
        style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}
      >
        Remove an item from the store
      </Typography>
      <Typography
        variant="body1"
        style={{ color: "#555", marginBottom: "20px" }}
      >
        make an item unavailable to users moving forward. Any unfinished orders
        placed on this item won't be cancelled, but future orders won't be
        allowed.
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
          Select an item to remove:
        </Typography>

        {loading && (
          <Typography
          variant="body1"
          style={{ color: "#555", marginBottom: "20px" }}
        >
          Loading...
        </Typography>
        )}

        {/* Select Category */}
        <FormControl
          fullWidth
          variant="outlined"
          style={{ marginBottom: "20px" }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            name="Item to delete"
            value={selectedItem}
            onChange={handleChange}
            label="Item to delete"
          >
            {items.map((item) => (
              <MenuItem key={item.item_id} value={item.item_id}>
                {item.item_name}, of category {item.item_category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
          onClick={handleRemoveItem}
        >
          Remove item
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
