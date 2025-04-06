import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ArrowForwardIcon from "@mui/icons-material/RefreshRounded";
import {
  Container,
  Switch,
  CardContent,
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Card,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export default function ViewPO() {
  const { user } = useContext(AuthContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(""); // Start date for filtering
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Any"); // Status for filtering
  const [origin, setOrigin] = useState("Any"); // Origin for filtering
  const [totalSales, setTotalSales] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [destination, setDestination] = useState("Any"); // Destination for filtering
  const [category, setCategory] = useState("Any"); // Category for filterin
  const [itemsForSale, setItemsForSale] = useState([]); // State to hold items for sale
  const [selectedItem, setSelectedItem] = useState("Any"); // State to hold selected item for sale
  const [removedItems, setRemovedItems] = useState([]); // State to hold removed items
  const [isForSaleSelected, setIsForSaleSelected] = useState(true); // State to hold selected item for sale
  const [bestCust, setBestCust] = useState(null);
  const [groupedItems, setGroupedItems] = useState({}); // State to hold grouped items for pie chart
  const [salesPieData, setSalesPieData] = useState([]); // State to hold sales pie chart data
  const [amountPieData, setAmountPieData] = useState([]); // State to hold amount pie chart data
  const states = [
    "al",
    "ak",
    "az",
    "ar",
    "ca",
    "co",
    "ct",
    "de",
    "fl",
    "ga",
    "hi",
    "id",
    "il",
    "in",
    "ia",
    "ks",
    "ky",
    "la",
    "me",
    "md",
    "ma",
    "mi",
    "mn",
    "ms",
    "mo",
    "mt",
    "ne",
    "nv",
    "nh",
    "nj",
    "nm",
    "ny",
    "nc",
    "nd",
    "oh",
    "ok",
    "or",
    "pa",
    "ri",
    "sc",
    "sd",
    "tn",
    "tx",
    "ut",
    "vt",
    "va",
    "wa",
    "wv",
    "wi",
    "wy",
  ];

  const stateNames = {
    al: "Alabama",
    ak: "Alaska",
    az: "Arizona",
    ar: "Arkansas",
    ca: "California",
    co: "Colorado",
    ct: "Connecticut",
    de: "Delaware",
    fl: "Florida",
    ga: "Georgia",
    hi: "Hawaii",
    id: "Idaho",
    il: "Illinois",
    in: "Indiana",
    ia: "Iowa",
    ks: "Kansas",
    ky: "Kentucky",
    la: "Louisiana",
    me: "Maine",
    md: "Maryland",
    ma: "Massachusetts",
    mi: "Michigan",
    mn: "Minnesota",
    ms: "Mississippi",
    mo: "Missouri",
    mt: "Montana",
    ne: "Nebraska",
    nv: "Nevada",
    nh: "New Hampshire",
    nj: "New Jersey",
    nm: "New Mexico",
    ny: "New York",
    nc: "North Carolina",
    nd: "North Dakota",
    oh: "Ohio",
    ok: "Oklahoma",
    or: "Oregon",
    pa: "Pennsylvania",
    ri: "Rhode Island",
    sc: "South Carolina",
    sd: "South Dakota",
    tn: "Tennessee",
    tx: "Texas",
    ut: "Utah",
    vt: "Vermont",
    va: "Virginia",
    wa: "Washington",
    wv: "West Virginia",
    wi: "Wisconsin",
    wy: "Wyoming",
  };

  const colors = {
    primary: "#D32F2F", // Red
    secondary: "#424242", // Dark Gray
    text: "#333333",
    lightGray: "#f5f5f5",
    mediumGray: "#e0e0e0",
    darkGray: "#757575",
    success: "#2E7D32", // Green
    warning: "#FF9800", // Orange
    white: "#ffffff",
    cardBorder: "#e0e0e0",
    cardShadow: "rgba(0, 0, 0, 0.1)",
    headerBg: "#f8f8f8",
  };
  const filterPaperStyle = {
    padding: "20px",
    marginBottom: "24px",
    borderRadius: "12px",
    backgroundColor: colors.white,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    border: `1px solid ${colors.cardBorder}`,
  };

  useEffect(() => {
    const fetchItems = async () => {
      const po_id = user?.po_id; // Get the manager's ID
      try {
        const response = await fetch(
          `https://apipost.vercel.app/api/ViewStore?po_id=${po_id}`,
          {
            method: "GET", // Use GET method
          }
        );

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (Array.isArray(data.data) && data.data.length > 0) {
          setItemsForSale(data.data); // Update state with API response
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
  }, [user?.po_id]);

  useEffect(() => {
    const fetchItems = async () => {
      const po_id = user?.po_id; // Get the manager's ID
      try {
        const response = await fetch(
          `https://apipost.vercel.app/api/ViewStoreTwo?po_id=${po_id}`,
          {
            method: "GET", // Use GET method
          }
        );

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (Array.isArray(data.data) && data.data.length > 0) {
          setRemovedItems(data.data); // Update state with API response
        } else {
          console.error("⚠ API returned an empty array:", data);
        }
      } catch (err) {
        console.error("❌ Error fetching removed items for sale:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [user?.po_id]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchPostOffices = async () => {
      try {
        const poID = user?.po_id; // Assuming you have the po_id in your user object
        const response = await fetch(
          `https://apipost.vercel.app/api/ViewOnlineStore?po_id=${poID}`
        ); // Your API endpoint
        const result = await response.json();

        if (result.success) {
          setItems(result.data); // Set the fetched data to state
          console.log("Fetched data:", result.data); // Log the fetched data
        } else {
          setError("Failed to load store sale data.");
        }
      } catch (error) {
        setError(error.message); // Set error if fetch fails
      } finally {
        setLoading(false); // Set loading to false when data is fetched or error occurs
      }
    };

    fetchPostOffices();
  }, []);

  const filterByDateRangeAndType = () => {
    let filtered = items;

    // Apply date range filter
    filtered = filtered.filter((item) => {
      const transactionDate = new Date(item.transaction_date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (
        (!start || transactionDate >= start) && (!end || transactionDate <= end)
      );
    });

    if (destination !== "Any") {
      filtered = filtered.filter(
        (item) => item.destination_state === destination
      );
    }

    if (selectedItem !== "Any") {
      filtered = filtered.filter((item) => item.item_id === selectedItem);
    }

    if (isForSaleSelected) {
      filtered = filtered.filter((item) => item.stock > -1);
    } else {
      filtered = filtered.filter((item) => item.stock === -1);
    }

    if (category !== "Any") {
      filtered = filtered.filter((item) => item.item_category === category);
    }

    if (status === "Delivered") {
      filtered = filtered.filter((item) => item.status === "Delivered");
    }
    if (status === "Missing") {
      filtered = filtered.filter((item) => item.status === "Missing");
    }
    filtered.sort((a, b) => {
      const amountA = Number.parseFloat(a.item_amount_purchased);
      const amountB = Number.parseFloat(b.item_amount_purchased);
      return amountB - amountA; // For descending order
      // return amountA - amountB; // For ascending order (lowest first)
    });

    setFilteredItems(filtered);

    const total_sales = filtered.reduce(
      (acc, item) => acc + (Number.parseFloat(item.item_amount_purchased) * Number.parseFloat(item.item_price)),
      0
    );
    setTotalSales(total_sales);
    
    const total_amount = filtered.reduce(
      (acc, item) => acc + Number.parseInt(item.item_amount_purchased),
      0
    );
    setTotalAmount(total_amount);

    const best_cust = filtered.reduce((acc, item) => {
      if (item.email && item.email !== "") {
        return item.email;
      } else {
        return acc;
      }
    }, null);
    setBestCust(best_cust);

    setGroupedItems(groupItemsByName(filtered)); // Group items by name
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D50032"];

  useEffect(() => {
    filterByDateRangeAndType(); // Recalculate the filtered items whenever the date range changes
  }, [
    startDate,
    endDate,
    items,
    status,
    destination,
    category,
    selectedItem,
    isForSaleSelected,
  ]); // Make sure to track 'delivered' in the useEffect dependency array

  useEffect(() => {
    if (groupedItems) {
      setSalesPieData(getSalesPieData(groupedItems)); // Get sales pie chart data
      setAmountPieData(getAmountPieData(groupedItems)); // Get amount pie chart data
    }
  }, [groupedItems]); // Recalculate pie chart data whenever groupedItems changes

  const handleChangeForSale = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleSwitchChange = (e) => {
    setIsForSaleSelected(e.target.checked); // toggle the state when the switch is flipped
  };

  const groupItemsByName = (stuff) => {
    const groupedItems = stuff.reduce((acc, item) => {
      if (!acc[item.item_name]) {
        acc[item.item_name] = { totalSales: 0, totalAmount: 0 };
      }
      acc[item.item_name].totalSales +=
        item.item_amount_purchased * item.item_price;
      acc[item.item_name].totalAmount += item.item_amount_purchased;
      return acc;
    }, {});
    return groupedItems;
  };

  const getSalesPieData = (groupedItems) => {
    return Object.keys(groupedItems).map((itemName) => ({
      name: itemName,
      value: groupedItems[itemName].totalSales,
    }));
  };

  const getAmountPieData = (groupedItems) => {
    return Object.keys(groupedItems).map((itemName) => ({
      name: itemName,
      value: groupedItems[itemName].totalAmount,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
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
            textAlign: "center",
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
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Online Store Sales report
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
              View and analyze the performance of items in your online store,
              all in one page.
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={0} style={filterPaperStyle}>
        <Typography
          variant="h6"
          style={{
            marginBottom: "24px",
            color: colors.secondary,
            fontWeight: "600",
            fontSize: "1.25rem",
          }}
        >
          Filter Packages
        </Typography>
        <Grid container spacing={3} alignItems="center">
          {/* Start Date */}
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              variant="outlined"
              style={{ borderRadius: "4px" }}
            />
          </Grid>

          {/* End Date */}
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              variant="outlined"
              style={{ borderRadius: "4px" }}
            />
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
                style={{ borderRadius: "4px" }}
              >
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value="Boxes & Sizes">Boxes & Sizes</MenuItem>
                <MenuItem value="Packing Supplies">Packing Supplies</MenuItem>
                <MenuItem value="Envelopes & Mailers">
                  Envelopes & Mailers
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Item Selection and Switch */}
          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={isForSaleSelected}
                  onChange={handleSwitchChange}
                  name="itemToggle"
                  color="default"
                  size="medium"
                  sx={{
                    "& .MuiSwitch-thumb": {
                      backgroundColor: isForSaleSelected
                        ? "#D50032"
                        : "#B0BEC5", // Red for active, gray for inactive
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: isForSaleSelected
                        ? "#D50032"
                        : "#B0BEC5",
                      borderRadius: "50px",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      transform: "translateX(16px)",
                      color: "#fff", // White thumb when checked
                    },
                    "& .MuiSwitch-switchBase": {
                      padding: 5,
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography>
                    {isForSaleSelected
                      ? "Items on sale"
                      : "Items not currently on sale"}
                  </Typography>
                </Box>
              }
              style={{ marginTop: "16px" }}
            />
          </Grid>

          {/* Item Selection */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Destination State</InputLabel>
              <Select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{ borderRadius: "4px" }}
              >
                <MenuItem value="Any">Any</MenuItem>
                {states.map((stateId) => (
                  <MenuItem key={stateId} value={stateId}>
                    {stateNames[stateId]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Package Status */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Package Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ borderRadius: "4px" }}
              >
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value="Delivered">Only delivered packages</MenuItem>
                <MenuItem value="Missing">Only missing packages</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Select Item</InputLabel>
              <Select
                value={selectedItem} // Ensure value is bound to selectedItem state
                onChange={handleChangeForSale}
                label="Select Item"
                style={{ borderRadius: "4px" }}
                sx={{
                  boxShadow: isForSaleSelected
                    ? "0 0 10px rgba(213, 0, 50, 0.75)"
                    : "none",
                  "&.Mui-focused": {
                    borderColor: isForSaleSelected ? "#D50032" : "#B0BEC5",
                  },
                }}
              >
                <MenuItem value="Any">Any</MenuItem>
                {(isForSaleSelected ? itemsForSale : removedItems).map(
                  (item) => (
                    <MenuItem key={item.item_id} value={item.item_id}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Typography>{item.item_name}</Typography>
                      </Box>
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Card>
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            {/* Sales Card */}
            <Box sx={{ flex: 1, borderRight: "2px solid #e0e0e0", pr: 2 }}>
              <Typography variant="h6" color="text.secondary">
                Total Sales
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#D32F2F"
                sx={{ fontSize: "2rem" }}
              >
                ${totalSales.toFixed(2)}
              </Typography>
              {salesPieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={salesPieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label
                    >
                      {salesPieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  No data available to Display.
                </Typography>
              )}
            </Box>

            {/* Quantity Sold Card */}
            <Box sx={{ flex: 1, pl: 2 }}>
              <Typography variant="h6" color="text.secondary">
                Quantity Sold
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#D32F2F"
                sx={{ fontSize: "2rem" }}
              >
                {totalAmount}
              </Typography>
              {amountPieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={amountPieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label
                    >
                      {amountPieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  No data available to display.
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Best Customer Display */}
      <Card sx={{ mt: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                Best Customer
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#D32F2F"
                sx={{ fontSize: "2rem" }}
              >
                {bestCust ? bestCust : "No customer available"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* items sold List */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            py: 8,
          }}
        >
          <CircularProgress sx={{ color: "#D32F2F", mb: 2 }} />
          <Typography variant="h6" color="textSecondary">
            Loading sales data...
          </Typography>
        </Box>
      ) : error ? (
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
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "100%",
            height: "auto", // Changed from 100% to auto
          }}
        >
          <TableContainer
            sx={{
              overflowX: "auto",
              width: "100%",
              maxWidth: "100%",
              overflowY: "hidden", // This prevents vertical scrolling
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Amount purchased
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Customer Email
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Status of Order
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Order Date
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Delivery Date
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Destination State
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#D32F2F",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFCDD2",
                    }}
                  >
                    Destination City
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        "&:nth-of-type(odd)": {
                          bgcolor: "#fafafa",
                        },
                        "&:hover": {
                          bgcolor: "#FFEBEE",
                        },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>{item.item_category}</TableCell>
                      <TableCell>${item.item_price}</TableCell>
                      <TableCell>{item.item_amount_purchased}</TableCell>
                      <TableCell>
                        ${item.item_amount_purchased * item.item_price}
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        {new Date(item.transaction_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {item.delivery_date
                          ? new Date(item.delivery_date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell>{item.destination_state}</TableCell>
                      <TableCell>{item.destination_city}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <SearchIcon
                          sx={{ color: "#D32F2F", fontSize: 40, mb: 1 }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ color: "#D32F2F", fontWeight: "medium" }}
                        >
                          No results found
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Try adjusting your search terms
                        </Typography>
                      </Box>
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
