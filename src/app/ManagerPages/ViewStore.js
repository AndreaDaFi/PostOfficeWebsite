import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ViewStore() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]); // Holds API data
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const po_id = user?.po_id; // Get the manager's ID
      try {
        const response = await fetch(
          `https://vercel-api-powebapp.vercel.app/api/ViewStore?po_id=${po_id}`,
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

  // Filter items based on the search input
  const filteredItems = items.filter((item) =>
    `${item.item_name} ${item.item_price} ${item.stock} ${item.item_category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}
      >
        All items currently for sale
      </Typography>
      <Typography
        variant="body1"
        style={{ color: "#555", marginBottom: "20px" }}
      >
        The following shows all items currently available for sale at your post office location. If you'd like to alter
        this selection, please visit "add items to store" or "remove items from store"
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name, price, stock, or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "#D32F2F" }} />
            </InputAdornment>
          ),
        }}
        style={{
          marginBottom: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      />

      {loading ? (
        <CircularProgress style={{ color: "#D32F2F", marginTop: "20px" }} />
      ) : error ? (
        <Typography
          variant="body2"
          style={{ color: "#D32F2F", fontWeight: "bold" }}
        >
          ❌ {error}
        </Typography>
      ) : (
        <Paper
          elevation={5}
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#D32F2F" }}>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>
                    NAME
                  </TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>
                    PRICE
                  </TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>
                    STOCK
                  </TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>
                    CATEGORY
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>{item.item_price}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.item_category}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      style={{ textAlign: "center", color: "#B71C1C" }}
                    >
                      ❌ No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}
