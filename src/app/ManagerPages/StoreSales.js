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
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ViewStore() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]); // Holds API data
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(""); // Start date for filtering
  const [endDate, setEndDate] = useState(""); // End date for filtering
  const [totalSales, setTotalSales] = useState(0); // Holds the total sales amount
  const [totalPackages, setTotalPackages] = useState(0); // Holds the total number of packages
  const [filteredItems, setFilteredItems] = useState([]);
  const [packageType, setPackageType] = useState("any"); // Track the selected package type

  useEffect(() => {
    const fetchItems = async () => {
      const po_id = user?.po_id; // Get the manager's ID
      try {
        const response = await fetch(
          ` https://apipost.vercel.app/api/StoreSales?po_id=${po_id}`,
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

  const filterByDateRangeAndType = () => {
    let filtered = items;

    // Apply date range filter
    filtered = filtered.filter((item) => {
      const transactionDate = new Date(item.transaction_date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      return (
        (!startDate || transactionDate >= start) &&
        (!endDate || transactionDate <= end)
      );
    });

    // Apply package type filter
    if (packageType !== "any") {
      filtered = filtered.filter(
        (item) => item.type.toLowerCase() === packageType.toLowerCase()
      );
    }

    setFilteredItems(filtered);

    // Calculate total sales and total packages
    const total = filtered.reduce(
      (acc, item) => acc + parseFloat(item.total_amount),
      0
    );
    setTotalSales(total);
    setTotalPackages(filtered.length);
  };

  useEffect(() => {
    filterByDateRangeAndType(); // Recalculate the filtered items whenever the date range changes
  }, [startDate, endDate, packageType, items]);

  return (
    <Container
      style={{
        marginTop: "20px",
        textAlign: "center",
        width: "100%", // Ensure the container takes up the full available width
        marginLeft: "auto", // Center the container
        marginRight: "auto", // Center the container
      }}
    >
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", color: "#D32F2F", marginBottom: "20px" }}
      >
        Packages in the system
      </Typography>
      <Typography
        variant="body1"
        style={{ color: "#555", marginBottom: "20px" }}
      >
        view individual package data, statistics, and more. Change the filters
        to view more specific data.
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        {/* Date Range Filter */}
        <Box style={{ marginRight: "20px", flex: 1 }}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
        <Box style={{ marginRight: "20px", flex: 1 }}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>

        {/* Package Type Filter */}
        <Box style={{ flex: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Package Type</InputLabel>
            <Select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              label="Package Type"
            >
              <MenuItem value="any">Any</MenuItem>
              <MenuItem value="box">Box</MenuItem>
              <MenuItem value="envelope">Envelope</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between" // This will spread the two boxes apart
        alignItems="center"
        style={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#FFF",
          border: "2px solid #D32F2F", // Red border
          marginBottom: "20px",
          width: "auto", // Ensures the Box fits the content
          maxWidth: "500px", // Optional max-width for responsive design
          margin: "0 auto", // Center it horizontally
        }}
      >
        {/* Total Sales Box */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#FFF",
            border: "2px solid #D32F2F", // Red border
            marginRight: "10px", // Add space between boxes
          }}
        >
          <Typography
            variant="h6"
            style={{
              color: "#D32F2F", // Red color for the text
              fontWeight: "bold",
            }}
          >
            TOTAL SALES: ${totalSales.toFixed(2)}
          </Typography>
        </Box>

        {/* Amount of Packages Box */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#FFF",
            border: "2px solid #D32F2F", // Red border
          }}
        >
          <Typography
            variant="h6"
            style={{
              color: "#D32F2F", // Red color for the text
              fontWeight: "bold",
            }}
          >
            AMOUNT OF PACKAGES: {totalPackages}
          </Typography>
        </Box>
      </Box>

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
          elevation={3}
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          {/* Added a div with horizontal scroll */}
          <div>
            <TableContainer style={{ width: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#D32F2F" }}>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "120px",
                      }}
                    >
                      TRACKING NUMBER
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "100px",
                      }}
                    >
                      TYPE
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "80px",
                      }}
                    >
                      WEIGHT
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "80px",
                      }}
                    >
                      SIZE
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "120px",
                      }}
                    >
                      STATUS
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "120px",
                      }}
                    >
                      DATE OF ORDER
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "150px",
                      }}
                    >
                      ORIGIN STATE
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "150px",
                      }}
                    >
                      ORIGIN CITY
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "150px",
                      }}
                    >
                      DESTINATION STATE
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "150px",
                      }}
                    >
                      DESTINATION CITY
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "150px",
                      }}
                    >
                      PURCHASED INSURANCE
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "120px",
                      }}
                    >
                      FAST DELIVERY
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "120px",
                      }}
                    >
                      FRAGILE
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "120px",
                      }}
                    >
                      TOTAL AMOUNT
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#FFF",
                        fontWeight: "bold",
                        minWidth: "120px",
                      }}
                    >
                      TOTAL TAX
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{item.tracking_number}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.weight}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          {new Date(item.transaction_date).toLocaleDateString(
                            "en-US",
                            { year: "2-digit", month: "short", day: "2-digit" }
                          )}
                        </TableCell>
                        <TableCell>{item.origin_state}</TableCell>
                        <TableCell>{item.origin_city}</TableCell>
                        <TableCell>{item.destination_state}</TableCell>
                        <TableCell>{item.destination_city}</TableCell>
                        <TableCell>
                          {item.purchased_insurance === "1" ? "YES" : "NO"}
                        </TableCell>
                        <TableCell>
                          {item.fast_delivery === "1" ? "YES" : "NO"}
                        </TableCell>
                        <TableCell>
                          {item.fragile === "1" ? "YES" : "NO"}
                        </TableCell>
                        <TableCell>${item.total_amount}</TableCell>
                        <TableCell>${item.total_tax}</TableCell>
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
          </div>
        </Paper>
      )}
    </Container>
  );
}
