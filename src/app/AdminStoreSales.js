"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../context/AuthContext";
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
  CircularProgress,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  const [packageType, setPackageType] = useState("Any"); // Track the selected package type
  const [tabValue, setTabValue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [status, setStatus] = useState("Any");
  const [insured, setInsured] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [origin, setOrigin] = useState("Any");
  const [destination, setDestination] = useState("Any");
  const [postOffices, setPostOffices] = useState([]);
  const [selectedPO, setSelectedPO] = useState("Any");
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

  // Update the color scheme to include more subtle colors and improve the box styling
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

  // Update the container style to add more breathing room and allow wider content
  const containerStyle = {
    marginTop: "24px",
    marginBottom: "24px",
    width: "100%",
    padding: "0 16px",
    maxWidth: "1800px", // 1.5x wider than standard (1200px)
    margin: "0 auto", // Center the container
  };

  // Improve the Paper component styling for filters
  const filterPaperStyle = {
    padding: "20px",
    marginBottom: "24px",
    borderRadius: "12px",
    backgroundColor: colors.white,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    border: `1px solid ${colors.cardBorder}`,
  };

  // Enhance the card styling for stats cards
  const statsCardStyle = {
    borderRadius: "12px",
    height: "100%",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  };

  // Enhance the chart card styling
  const chartCardStyle = {
    marginBottom: "24px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
  };

  // Enhance the table paper styling - make it wider than other elements
  const tablePaperStyle = {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "100%",
  };

  // Update the header cell style
  const headerCellStyle = {
    backgroundColor: colors.primary,
    color: colors.white,
    fontWeight: "bold",
    padding: "14px 10px",
    fontSize: "0.9rem",
    textAlign: "center",
    borderBottom: `2px solid ${colors.primary}`,
  };

  // Regular cell style
  const cellStyle = {
    padding: "10px 8px",
    fontSize: "0.9rem",
    textAlign: "center",
    borderBottom: `1px solid ${colors.mediumGray}`,
  };

  // Status cell with color coding
  const getStatusStyle = (status) => {
    let color = colors.text;

    if (status.toLowerCase().includes("delivered")) {
      color = colors.success; // Green for delivered
    } else if (status.toLowerCase().includes("Missing")) {
      color = colors.warning; // Orange for processing
    }

    return {
      ...cellStyle,
      color: color,
      fontWeight: "bold",
    };
  };

  // Yes/No cell with color coding
  const getBooleanStyle = (value) => ({
    ...cellStyle,
    color: value === "1" ? colors.success : colors.darkGray,
    fontWeight: value === "1" ? "bold" : "normal",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `https://apipost.vercel.app/api/AdminStoreSales`,
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
        console.error("Error fetching items for sale:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [user?.po_id]); // Refetch when `po_id` changes

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchPostOffices = async () => {
      try {
        const response = await fetch(
          "https://apipost.vercel.app/api/getPostOfficeLocations"
        ); // Your API endpoint
        const result = await response.json();

        if (result.success) {
          // Store the post offices as an array of objects
          setPostOffices(result.data); // If you're storing it in state as an array of objects
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

    if (packageType !== "any") {
      filtered = filtered.filter(
        (item) => item.type.toLowerCase() === packageType.toLowerCase()
      );
    }
    if (selectedPO !== "Any") {
      filtered = filtered.filter((item) => item.po_id === parseInt(selectedPO, 10)); // Ensure matching types
    }

    if (origin !== "Any") {
      filtered = filtered.filter((item) => item.origin_state === origin);
    }
    if (destination !== "Any") {
      filtered = filtered.filter(
        (item) => item.destination_state === destination
      );
    }

    if (status === "Delivered") {
      filtered = filtered.filter((item) => item.status === "Delivered");
    }
    if (status === "Missing") {
      filtered = filtered.filter((item) => item.status === "Missing");
    }
    if (insured) {
      filtered = filtered.filter((item) => item.purchased_insurance === "1");
    }
    if (fastDelivery) {
      filtered = filtered.filter((item) => item.fast_delivery === "1");
    }

    setFilteredItems(filtered);

    const total = filtered.reduce(
      (acc, item) => acc + Number.parseFloat(item.total_amount),
      0
    );
    setTotalSales(total);
    setTotalPackages(filtered.length);

    // Process data for charts
    processChartData(filtered);
  };

  const processChartData = (data) => {
    // For package type distribution
    const typeCount = {};

    data.forEach((item) => {
      const type = item.type.toLowerCase();
      if (!typeCount[type]) {
        typeCount[type] = 0;
      }
      typeCount[type] += 1;
    });

    const chartData = Object.entries(typeCount).map(([name, value]) => ({
      name,
      packages: value,
      amount: data
        .filter((item) => item.type.toLowerCase() === name)
        .reduce((sum, item) => sum + Number.parseFloat(item.total_amount), 0),
    }));

    setChartData(chartData);
  };

  useEffect(() => {
    filterByDateRangeAndType(); // Recalculate the filtered items whenever the date range changes
  }, [
    startDate,
    endDate,
    packageType,
    items,
    status,
    insured,
    fastDelivery,
    origin,
    destination,
    selectedPO
  ]); // Make sure to track 'delivered' in the useEffect dependency array

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Table styles
  const tableContainerStyle = {
    overflowX: "auto",
    width: "100%",
    maxWidth: "100%",
  };

  const tableStyle = {
    minWidth: 750,
    width: "100%",
  };

  const getRowStyle = (index) => ({
    backgroundColor: index % 2 === 0 ? colors.lightGray : colors.white,
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: colors.mediumGray,
    },
  });

  return (
    <Container maxWidth={false} style={containerStyle}>
      <Typography
        variant="h4"
        style={{
          fontWeight: "bold",
          color: colors.primary,
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
        Packages in the system
      </Typography>

      <Paper elevation={0} style={filterPaperStyle}>
        <Typography
          variant="h6"
          style={{
            marginBottom: "16px",
            color: colors.secondary,
            fontWeight: "600",
          }}
        >
          Filter Packages
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Package Type</InputLabel>
              <Select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
              >
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value="box">Box</MenuItem>
                <MenuItem value="envelope">Envelope</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Package Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value="Delivered">Only delivered packages</MenuItem>
                <MenuItem value="Missing">Only Missing packages</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Insurance</InputLabel>
              <Select
                value={insured}
                onChange={(e) => setInsured(e.target.value)}
              >
                <MenuItem value={false}>Not insured</MenuItem>
                <MenuItem value={true}>Insured</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Delivery</InputLabel>
              <Select
                value={fastDelivery}
                onChange={(e) => setFastDelivery(e.target.value)}
              >
                <MenuItem value={false}>Normal Delivery</MenuItem>
                <MenuItem value={true}>Fast Delivery</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Origin State</InputLabel>
              <Select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
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
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>destination State</InputLabel>
              <Select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
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

          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Post Office</InputLabel>
              <Select
                value={selectedPO}
                onChange={(e) => setSelectedPO(e.target.value)}
              >
                <MenuItem value="Any">Any</MenuItem>
                {postOffices.map((po) => (
                  <MenuItem key={po.po_id} value={po.po_id}>
                    {`${po.street}, ${po.city_name}, ${po.state_name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} style={{ marginBottom: "24px" }}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} style={statsCardStyle}>
            <CardContent
              style={{
                padding: "0",
              }}
            >
              <Box
                style={{
                  backgroundColor: colors.primary,
                  padding: "16px",
                  borderBottom: `1px solid ${colors.cardBorder}`,
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: colors.white,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  TOTAL PACKAGES
                </Typography>
              </Box>
              <Box
                style={{
                  padding: "24px 16px",
                  textAlign: "center",
                  backgroundColor: colors.white,
                }}
              >
                <Typography
                  variant="h3"
                  style={{
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {totalPackages}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} style={statsCardStyle}>
            <CardContent
              style={{
                padding: "0",
              }}
            >
              <Box
                style={{
                  backgroundColor: colors.secondary,
                  padding: "16px",
                  borderBottom: `1px solid ${colors.cardBorder}`,
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: colors.white,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  TOTAL SALES
                </Typography>
              </Box>
              <Box
                style={{
                  padding: "24px 16px",
                  textAlign: "center",
                  backgroundColor: colors.white,
                }}
              >
                <Typography
                  variant="h3"
                  style={{
                    fontWeight: "700",
                    color: colors.secondary,
                  }}
                >
                  ${totalSales.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Card elevation={0} style={chartCardStyle}>
        <CardContent style={{ padding: "0" }}>
          <Box
            style={{
              backgroundColor: colors.headerBg,
              padding: "16px",
              borderBottom: `1px solid ${colors.cardBorder}`,
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontWeight: "600",
                color: colors.secondary,
                textAlign: "center",
              }}
            >
              Package Analytics
            </Typography>
          </Box>
          <Box style={{ padding: "20px" }}>
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={colors.mediumGray}
                  />
                  <XAxis dataKey="name" tick={{ fill: colors.text }} />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke={colors.primary}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke={colors.secondary}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.98)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      border: "none",
                      padding: "10px",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "16px" }} />
                  <Bar
                    yAxisId="left"
                    dataKey="packages"
                    name="Packages"
                    fill={colors.primary}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="amount"
                    name="Amount ($)"
                    fill={colors.secondary}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Box>
        </CardContent>
      </Card>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress style={{ color: colors.primary }} />
        </Box>
      ) : error ? (
        <Box
          display="flex"
          justifyContent="center"
          my={4}
          p={3}
          bgcolor="#FFEBEE"
          borderRadius="8px"
        >
          <Typography
            variant="body1"
            style={{ color: colors.primary, fontWeight: "bold" }}
          >
            {error}
          </Typography>
        </Box>
      ) : (
        // Make the Package Details section wider than the rest of the content
        <div
          style={{
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "95%",
              maxWidth: "2200px", // Make the table wider than the rest of the content
            }}
          >
            <Paper elevation={0} style={tablePaperStyle}>
              <Box
                style={{
                  backgroundColor: colors.headerBg,
                  padding: "16px",
                  borderBottom: `1px solid ${colors.cardBorder}`,
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: "600",
                    color: colors.primary,
                    textAlign: "center",
                  }}
                >
                  Package Details
                </Typography>
              </Box>
              {/* Table with improved styling */}
              <TableContainer style={tableContainerStyle}>
                <Table style={tableStyle}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={headerCellStyle}>ID</TableCell>
                      <TableCell style={headerCellStyle}>TYPE</TableCell>
                      <TableCell style={headerCellStyle}>WEIGHT</TableCell>
                      <TableCell style={headerCellStyle}>SIZE</TableCell>
                      <TableCell style={headerCellStyle}>STATUS</TableCell>
                      <TableCell style={headerCellStyle}>ORDER DATE</TableCell>
                      <TableCell style={headerCellStyle}>DELIVERY</TableCell>
                      <TableCell style={headerCellStyle}>ORIGIN</TableCell>
                      <TableCell style={headerCellStyle}>DESTINATION</TableCell>
                      <TableCell style={headerCellStyle}>
                        PURCHASED INSURANCE
                      </TableCell>
                      <TableCell style={headerCellStyle}>
                        FAST DELIVERY
                      </TableCell>
                      <TableCell style={headerCellStyle}>FRAGILE</TableCell>
                      <TableCell style={headerCellStyle}>
                        TRANSACTION TOTAL
                      </TableCell>
                      <TableCell style={headerCellStyle}>TAX</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, index) => (
                        <TableRow key={index} hover style={getRowStyle(index)}>
                          <TableCell style={cellStyle}>
                            {item.tracking_number}
                          </TableCell>
                          <TableCell style={cellStyle}>{item.type}</TableCell>
                          <TableCell style={cellStyle}>
                            {item.weight ? item.weight : "N/A"}
                          </TableCell>
                          <TableCell style={cellStyle}>
                            {item.size
                              ? item.size === "s"
                                ? "Small"
                                : item.size === "m"
                                ? "Medium"
                                : item.size === "l"
                                ? "Large"
                                : "N/A"
                              : "N/A"}
                          </TableCell>
                          <TableCell style={getStatusStyle(item.status)}>
                            {item.status}
                          </TableCell>
                          <TableCell style={cellStyle}>
                            {new Date(item.transaction_date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell style={cellStyle}>
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
                          <TableCell style={cellStyle}>
                            {item.origin_state}
                          </TableCell>
                          <TableCell style={cellStyle}>
                            {item.destination_state}
                          </TableCell>
                          <TableCell
                            style={getBooleanStyle(item.purchased_insurance)}
                          >
                            {item.purchased_insurance === "1" ? "Yes" : "No"}
                          </TableCell>
                          <TableCell
                            style={getBooleanStyle(item.fast_delivery)}
                          >
                            {item.fast_delivery === "1" ? "Yes" : "No"}
                          </TableCell>
                          <TableCell style={getBooleanStyle(item.fragile)}>
                            {item.fragile === "1" ? "Yes" : "No"}
                          </TableCell>
                          <TableCell
                            style={{ ...cellStyle, fontWeight: "bold" }}
                          >
                            ${item.total_amount}
                          </TableCell>
                          <TableCell style={cellStyle}>
                            ${item.total_tax}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={14}
                          style={{
                            textAlign: "center",
                            padding: "24px",
                            color: colors.primary,
                          }}
                        >
                          ❌ No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      )}
    </Container>
  );
}
