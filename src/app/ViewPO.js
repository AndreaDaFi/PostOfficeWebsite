import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import SearchIcon from "@mui/icons-material/Search";

export default function ViewPO() {
  // State for holding fetched data, search term, loading and error
  const [postOffices, setPostOffices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchPostOffices = async () => {
      try {
        const response = await fetch('https://vercel-api-powebapp.vercel.app/api/getPostOfficeLocations'); // Your API endpoint
        const result = await response.json();

        if (result.success) {
          setPostOffices(result.data); // Set the fetched data to state
        } else {
          setError("Failed to load post office data.");
        }
      } catch (error) {
        setError(error.message); // Set error if fetch fails
      } finally {
        setLoading(false); // Set loading to false when data is fetched or error occurs
      }
    };

    fetchPostOffices();
  }, []);

  // Filter post offices based on search input
  const filteredPostOffices = postOffices.filter(
    (po) =>
      po.city_name.toLowerCase().includes(search.toLowerCase()) ||
      po.state_name.toLowerCase().includes(search.toLowerCase()) ||
      po.street.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        🏢 View All Post Offices
      </Typography>
      <Typography variant="body1" style={{ color: "#555", marginBottom: "20px" }}>
        Admins can view all CougarPost locations and their assigned managers.
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="🔍 Search by name, city, state, or manager..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon style={{ marginRight: "10px", color: "#D32F2F" }} />
        }}
        style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
      />

      {/* Post Office List */}
      {loading ? (
        <Typography>Loading post offices...</Typography>
      ) : error ? (
        <Typography style={{ color: "red" }}>{error}</Typography>
      ) : (
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fff" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#D32F2F" }}>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>🏤 Post Office</TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>📍 City</TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>🗺 State</TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>📍 Street</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPostOffices.length > 0 ? (
                  filteredPostOffices.map((po, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <BusinessIcon style={{ verticalAlign: "middle", marginRight: "10px", color: "#D32F2F" }} />
                        {po.po_id} - {po.city_name} Post Office
                      </TableCell>
                      <TableCell>{po.city_name}</TableCell>
                      <TableCell>{po.state_name}</TableCell>
                      <TableCell>{po.street}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: "center", color: "#B71C1C" }}>
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
