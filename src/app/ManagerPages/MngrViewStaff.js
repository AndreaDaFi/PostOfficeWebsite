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
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";

export default function ViewStaff() {
  const { user } = useContext(AuthContext);
  const [staffMembers, setStaffMembers] = useState([]); // ✅ Holds API data
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchStaff = async () => {
      const mngr_id = user?.employees_id; // Get the manager's ID
      try {
        const response = await fetch(`https://vercel-api-powebapp.vercel.app/api/MngrViewStaff?mngr_id=${mngr_id}`, {
          method: "GET", // Use GET method instead of POST
        });
    
        const data = await response.json();
        console.log("Fetched Data:", data);
    
        if (Array.isArray(data.data) && data.data.length > 0) {
          setStaffMembers(data.data); // Update state with API response
        } else {
          console.error("⚠ API returned an empty array:", data);
        }
      } catch (err) {
        console.error("❌ Error fetching staff:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // ✅ Filter staff members based on search input
  const filteredStaff = staffMembers.filter((staff) =>
    `${staff.name} ${staff.id} ${staff.locationId || "N/A"} ${staff.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}>
        View All Staff Members
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name, ID, location ID, or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "#D32F2F" }} />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
      />

      {loading ? (
        <CircularProgress style={{ color: "#D32F2F", marginTop: "20px" }} />
      ) : error ? (
        <Typography variant="body2" style={{ color: "#D32F2F", fontWeight: "bold" }}>
          ❌ {error}
        </Typography>
      ) : (
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fff" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#D32F2F" }}>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>Employee ID</TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>Role</TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>email</TableCell>
                  <TableCell style={{ color: "#FFF", fontWeight: "bold" }}>phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        {staff.name}
                      </TableCell>
                      <TableCell>
                        {staff.id}
                      </TableCell>
                      <TableCell>
                        {staff.role}
                      </TableCell>
                      <TableCell>
                        {staff.email}
                      </TableCell>
                      <TableCell>
                        {staff.phone}
                      </TableCell>
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
