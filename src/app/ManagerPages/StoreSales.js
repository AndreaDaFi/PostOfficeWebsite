"use client"

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
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
} from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function ViewStore() {
  const { user } = useContext(AuthContext)
  const [items, setItems] = useState([]) // Holds API data
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState("") // Start date for filtering
  const [endDate, setEndDate] = useState("") // End date for filtering
  const [totalSales, setTotalSales] = useState(0) // Holds the total sales amount
  const [totalPackages, setTotalPackages] = useState(0) // Holds the total number of packages
  const [filteredItems, setFilteredItems] = useState([])
  const [packageType, setPackageType] = useState("any") // Track the selected package type
  const [tabValue, setTabValue] = useState(0)
  const [chartData, setChartData] = useState([])

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
  }

  // Update the container style to add more breathing room and allow wider content
  const containerStyle = {
    marginTop: "24px",
    marginBottom: "24px",
    width: "100%",
    padding: "0 16px",
    maxWidth: "1800px", // 1.5x wider than standard (1200px)
    margin: "0 auto", // Center the container
  }

  // Improve the Paper component styling for filters
  const filterPaperStyle = {
    padding: "20px",
    marginBottom: "24px",
    borderRadius: "12px",
    backgroundColor: colors.white,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    border: `1px solid ${colors.cardBorder}`,
  }

  // Enhance the card styling for stats cards
  const statsCardStyle = {
    borderRadius: "12px",
    height: "100%",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  }

  // Enhance the chart card styling
  const chartCardStyle = {
    marginBottom: "24px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
  }

  // Enhance the table paper styling - make it wider than other elements
  const tablePaperStyle = {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "100%",
  }

  // Update the header cell style
  const headerCellStyle = {
    backgroundColor: colors.primary,
    color: colors.white,
    fontWeight: "bold",
    padding: "14px 10px",
    fontSize: "0.9rem",
    textAlign: "center",
    borderBottom: `2px solid ${colors.primary}`,
  }

  // Regular cell style
  const cellStyle = {
    padding: "10px 8px",
    fontSize: "0.9rem",
    textAlign: "center",
    borderBottom: `1px solid ${colors.mediumGray}`,
  }

  // Status cell with color coding
  const getStatusStyle = (status) => {
    let color = colors.text

    if (status.toLowerCase().includes("delivered")) {
      color = colors.success // Green for delivered
    } else if (status.toLowerCase().includes("transit")) {
      color = colors.secondary // Dark gray for in transit
    } else if (status.toLowerCase().includes("processing")) {
      color = colors.warning // Orange for processing
    }

    return {
      ...cellStyle,
      color: color,
      fontWeight: "bold",
    }
  }

  // Yes/No cell with color coding
  const getBooleanStyle = (value) => ({
    ...cellStyle,
    color: value === "1" ? colors.success : colors.darkGray,
    fontWeight: value === "1" ? "bold" : "normal",
  })

  useEffect(() => {
    const fetchItems = async () => {
      const po_id = user?.po_id // Get the manager's ID
      try {
        const response = await fetch(`https://apipost.vercel.app/api/StoreSales?po_id=${po_id}`, {
          method: "GET", // Use GET method
        })

        const data = await response.json()
        console.log("Fetched Data:", data)

        if (Array.isArray(data.data) && data.data.length > 0) {
          setItems(data.data) // Update state with API response
        } else {
          console.error("⚠ API returned an empty array:", data)
        }
      } catch (err) {
        console.error("❌ Error fetching items for sale:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [user?.po_id]) // Refetch when `po_id` changes

  const filterByDateRangeAndType = () => {
    let filtered = items

    // Apply date range filter
    filtered = filtered.filter((item) => {
      const transactionDate = new Date(item.transaction_date)
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null

      return (!start || transactionDate >= start) && (!end || transactionDate <= end)
    })

    // Apply package type filter
    if (packageType !== "any") {
      filtered = filtered.filter((item) => item.type.toLowerCase() === packageType.toLowerCase())
    }

    setFilteredItems(filtered)

    // Calculate total sales and total packages
    const total = filtered.reduce((acc, item) => acc + Number.parseFloat(item.total_amount), 0)
    setTotalSales(total)
    setTotalPackages(filtered.length)

    // Process data for charts
    processChartData(filtered)
  }

  const processChartData = (data) => {
    // For package type distribution
    const typeCount = {}

    data.forEach((item) => {
      const type = item.type.toLowerCase()
      if (!typeCount[type]) {
        typeCount[type] = 0
      }
      typeCount[type] += 1
    })

    const chartData = Object.entries(typeCount).map(([name, value]) => ({
      name,
      packages: value,
      amount: data
        .filter((item) => item.type.toLowerCase() === name)
        .reduce((sum, item) => sum + Number.parseFloat(item.total_amount), 0),
    }))

    setChartData(chartData)
  }

  useEffect(() => {
    filterByDateRangeAndType() // Recalculate the filtered items whenever the date range changes
  }, [startDate, endDate, packageType, items])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Table styles
  const tableContainerStyle = {
    overflowX: "auto",
    width: "100%",
    maxWidth: "100%",
  }

  const tableStyle = {
    minWidth: 750,
    width: "100%",
  }

  const getRowStyle = (index) => ({
    backgroundColor: index % 2 === 0 ? colors.lightGray : colors.white,
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: colors.mediumGray,
    },
  })

  return (
    <Container maxWidth={false} style={containerStyle}>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", color: colors.primary, marginBottom: "15px", textAlign: "center" }}
      >
        Packages in the system
      </Typography>

      {/* Filters Section */}
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
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              label="Start Date"
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
              label="End Date"
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
              <Select value={packageType} onChange={(e) => setPackageType(e.target.value)} label="Package Type">
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value="box">Box</MenuItem>
                <MenuItem value="envelope">Envelope</MenuItem>
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
                    color: colors.primary,
                  }}
                >
                  ${totalSales.toFixed(2)}
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
                    color: colors.secondary,
                  }}
                >
                  {totalPackages}
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
                color: colors.primary,
                textAlign: "center",
              }}
            >
              Package Analytics
            </Typography>
          </Box>
          <Box style={{ padding: "20px" }}>
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                  <XAxis dataKey="name" tick={{ fill: colors.text }} />
                  <YAxis yAxisId="left" orientation="left" stroke={colors.primary} />
                  <YAxis yAxisId="right" orientation="right" stroke={colors.secondary} />
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
                  <Bar yAxisId="left" dataKey="packages" name="Packages" fill={colors.primary} radius={[6, 6, 0, 0]} />
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
        <Box display="flex" justifyContent="center" my={4} p={3} bgcolor="#FFEBEE" borderRadius="8px">
          <Typography variant="body1" style={{ color: colors.primary, fontWeight: "bold" }}>
            ❌ {error}
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
                      <TableCell style={headerCellStyle}>INS</TableCell>
                      <TableCell style={headerCellStyle}>FAST</TableCell>
                      <TableCell style={headerCellStyle}>FRAG</TableCell>
                      <TableCell style={headerCellStyle}>AMOUNT</TableCell>
                      <TableCell style={headerCellStyle}>TAX</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, index) => (
                        <TableRow key={index} hover style={getRowStyle(index)}>
                          <TableCell style={cellStyle}>{item.tracking_number}</TableCell>
                          <TableCell style={cellStyle}>{item.type}</TableCell>
                          <TableCell style={cellStyle}>{item.weight ? item.weight : "N/A"}</TableCell>
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
                          <TableCell style={getStatusStyle(item.status)}>{item.status}</TableCell>
                          <TableCell style={cellStyle}>
                            {new Date(item.transaction_date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </TableCell>
                          <TableCell style={cellStyle}>
                            {item.delivery_date
                              ? new Date(item.delivery_date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </TableCell>
                          <TableCell style={cellStyle}>{item.origin_city}</TableCell>
                          <TableCell style={cellStyle}>{item.destination_city}</TableCell>
                          <TableCell style={getBooleanStyle(item.purchased_insurance)}>
                            {item.purchased_insurance === "1" ? "Yes" : "No"}
                          </TableCell>
                          <TableCell style={getBooleanStyle(item.fast_delivery)}>
                            {item.fast_delivery === "1" ? "Yes" : "No"}
                          </TableCell>
                          <TableCell style={getBooleanStyle(item.fragile)}>
                            {item.fragile === "1" ? "Yes" : "No"}
                          </TableCell>
                          <TableCell style={{ ...cellStyle, fontWeight: "bold" }}>${item.total_amount}</TableCell>
                          <TableCell style={cellStyle}>${item.total_tax}</TableCell>
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
  )
}

