"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./../context/AuthContext";
import {
  Container,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";

export default function ViewStaffActivity() {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [specificEmployee, setSpecificEmployee] = useState("");
  const [employeesList, setEmployeesList] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [filteredRows, setFilteredRows] = useState(0);
  const [allHoursData, setAllHoursData] = useState([]);
  const [filteredHoursData, setFilteredHoursData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postOffices, setPostOffices] = useState([]); // State to hold post offices data
  const [selectedPO, setSelectedPO] = useState("Any");

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
      }
    };

    fetchPostOffices();
  }, []);

  // Fetch all data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://apipost.vercel.app/api/AdminStaffActivity`
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        setAllData(result.data || []);
        setTotalRows(result.totalRows || 0);
        setAllHoursData(result.hoursData || []);
        setEmployeesList(result.employees || []);

        // Initialize filtered data with all data
        setFilteredData(result.data || []);
        setFilteredRows((result.data || []).length);
        setFilteredHoursData(result.hoursData || []);

        if ((result.data || []).length === 0) {
          setSuccessMessage("No records found in the database.");
        }
      } catch (err) {
        console.error("Error in API call:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user?.po_id]);

  // Apply filters whenever filter values change
  useEffect(() => {
    applyFilters();
  }, [
    startDate,
    endDate,
    employeeRole,
    specificEmployee,
    allData,
    allHoursData,
    selectedPO
  ]);

  // Filter function
  const applyFilters = () => {
    // Filter package data
    let filtered = [...allData];

    if (startDate) {
      const startDateTime = new Date(startDate);
      filtered = filtered.filter(
        (item) => new Date(item.status_update_datetime) >= startDateTime
      );
    }

    if (endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999); // Set to end of day
      filtered = filtered.filter(
        (item) => new Date(item.status_update_datetime) <= endDateTime
      );
    }

    if (employeeRole) {
      filtered = filtered.filter((item) => item.role === employeeRole);
    }

    if (specificEmployee) {
      filtered = filtered.filter(
        (item) => item.first_name === specificEmployee
      );
    }

    if (selectedPO && selectedPO !== "Any") {
      filtered = filtered.filter((item) => item.po_id === selectedPO);
    }

    setFilteredData(filtered);
    setFilteredRows(filtered.length);

    // Filter hours data
    let filteredHours = [...allHoursData];

    if (startDate) {
      const startDateTime = new Date(startDate);
      filteredHours = filteredHours.filter(
        (item) => new Date(item.date) >= startDateTime
      );
    }

    if (endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999);
      filteredHours = filteredHours.filter(
        (item) => new Date(item.date) <= endDateTime
      );
    }

    if (employeeRole) {
      filteredHours = filteredHours.filter(
        (item) => item.role === employeeRole
      );
    }

    if (specificEmployee) {
      filteredHours = filteredHours.filter(
        (item) => item.first_name === specificEmployee
      );
    }

    if (selectedPO && selectedPO !== "Any") {
      filteredHours = filteredHours.filter((item) => item.po_id === selectedPO);
    }

    setFilteredHoursData(filteredHours);
  };

  // Calculate total hours worked
  const totalHoursWorked = filteredHoursData.reduce(
    (total, employee) => total + (Number.parseFloat(employee.total_hours) || 0),
    0
  );

  // Calculate total package updates
  const totalPackageUpdates = filteredData.length;

  // Reset all filters
  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setEmployeeRole("");
    setSpecificEmployee("");
    setSelectedPO("Any");
  };

  return (
    <Container
      maxWidth={false}
      sx={{ my: 4, px: 0, width: "100%", maxWidth: "100%" }}
    >
      {/* Header with gradient background */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
          mx: 0,
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
            <AssessmentIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Staff Activity Report
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                Track employee hours and package updates
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Error and Success Messages */}
      {error && (
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
      )}
      {successMessage && (
        <Alert
          severity="success"
          sx={{
            mb: 3,
            borderRadius: 2,
            bgcolor: "#E8F5E9",
            border: "1px solid #C8E6C9",
          }}
        >
          {successMessage}
        </Alert>
      )}

      {/* Filters Section */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 3,
          mx: 0,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FilterListIcon sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }} />
          <Typography variant="h6" fontWeight="bold">
            Filter Options
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Employee Role</InputLabel>
              <Select
                value={employeeRole}
                onChange={(e) => setEmployeeRole(e.target.value)}
                label="Employee Role"
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Driver">Driver</MenuItem>
                <MenuItem value="Clerk">Clerk</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Specific Employee</InputLabel>
              <Select
                value={specificEmployee}
                onChange={(e) => setSpecificEmployee(e.target.value)}
                label="Specific Employee"
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D32F2F",
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {employeesList.map((employee) => (
                  <MenuItem key={employee.id} value={employee.first_name}>
                    {employee.first_name}
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

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={resetFilters}
            sx={{
              color: "#D32F2F",
              borderColor: "#D32F2F",
              "&:hover": {
                borderColor: "#B71C1C",
                backgroundColor: "rgba(211, 47, 47, 0.04)",
              },
            }}
          >
            Reset Filters
          </Button>
        </Box>
      </Paper>

      {/* Loading State */}
      {isLoading ? (
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={50} sx={{ color: "#D32F2F", mb: 3 }} />
          <Typography variant="h6" color="textSecondary">
            Loading staff activity data...
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Summary Cards */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <PersonIcon
                      sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      Total Employees
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight="bold" color="#D32F2F">
                    {employeesList.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AccessTimeIcon
                      sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      Total Hours
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight="bold" color="#D32F2F">
                    {totalHoursWorked.toFixed(1)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <LocalShippingIcon
                      sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      Package Updates
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight="bold" color="#D32F2F">
                    {totalPackageUpdates}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <WorkIcon
                      sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      Efficiency
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight="bold" color="#D32F2F">
                    {totalHoursWorked > 0
                      ? (totalPackageUpdates / totalHoursWorked).toFixed(1)
                      : "0.0"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Updates per hour
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tables side by side */}
          <Grid container spacing={2}>
            {/* Hours Worked Table */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: "visible",
                  height: "100%",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#B71C1C",
                    color: "white",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Hours Worked Summary
                  </Typography>
                </Box>

                {filteredHoursData.length > 0 ? (
                  <TableContainer sx={{ overflow: "visible" }}>
                    <Table sx={{ width: "100%" }}>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                          <TableCell
                            sx={{ fontWeight: "bold", padding: "12px 8px" }}
                          >
                            Employee
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", padding: "12px 8px" }}
                          >
                            Role
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", padding: "12px 8px" }}
                          >
                            Date
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", padding: "12px 8px" }}
                          >
                            Hours
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredHoursData.map((employee, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:nth-of-type(odd)": {
                                bgcolor: "#fafafa",
                              },
                              "&:hover": {
                                bgcolor: "rgba(211, 47, 47, 0.05)",
                              },
                              height: "auto",
                            }}
                          >
                            <TableCell
                              sx={{
                                padding: "12px 8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <PersonIcon
                                  sx={{ color: "#D32F2F", mr: 1, fontSize: 20 }}
                                />
                                <Typography sx={{ fontWeight: "medium" }}>
                                  {employee.first_name || "N/A"}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "12px 8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Chip
                                label={employee.role || "N/A"}
                                size="medium"
                                sx={{
                                  bgcolor:
                                    employee.role === "Driver"
                                      ? "#FFEBEE"
                                      : "#E8F5E9",
                                  color:
                                    employee.role === "Driver"
                                      ? "#D32F2F"
                                      : "#2E7D32",
                                  fontWeight: "medium",
                                  fontSize: "1rem",
                                }}
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "12px 8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {employee.date
                                ? new Date(employee.date).toLocaleDateString()
                                : "N/A"}
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "12px 8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Typography fontWeight="medium">
                                {employee.total_hours || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow sx={{ bgcolor: "#f5f5f5", height: "60px" }}>
                          <TableCell
                            colSpan={3}
                            sx={{
                              textAlign: "right",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                            }}
                          >
                            Total Hours:
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              color: "#D32F2F",
                              fontSize: "1.2rem",
                            }}
                          >
                            {totalHoursWorked.toFixed(1)}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ p: 6, textAlign: "center" }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: "1.25rem" }}
                    >
                      No hours data found matching your criteria.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Package Updates Table */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: "visible",
                  height: "100%",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#B71C1C",
                    color: "white",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocalShippingIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Package Status Updates
                  </Typography>
                </Box>

                {filteredData.length > 0 ? (
                  <TableContainer sx={{ overflow: "visible" }}>
                    <Table sx={{ width: "100%" }}>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                          <TableCell
                            sx={{ fontWeight: "bold", padding: "12px 8px" }}
                          >
                            Employee
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", padding: "12px 8px" }}
                          >
                            Role
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", padding: "12px 8px" }}
                          >
                            Previous
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", padding: "12px 8px" }}
                          >
                            Updated
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", padding: "12px 8px" }}
                          >
                            Type
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((item, index) => (
                          <TableRow
                            key={item.my_row_id || index}
                            sx={{
                              "&:nth-of-type(odd)": {
                                bgcolor: "#fafafa",
                              },
                              "&:hover": {
                                bgcolor: "rgba(211, 47, 47, 0.05)",
                              },
                              height: "auto",
                            }}
                          >
                            <TableCell
                              sx={{
                                padding: "12px 8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <PersonIcon
                                  sx={{ color: "#D32F2F", mr: 1, fontSize: 20 }}
                                />
                                <Typography sx={{ fontWeight: "medium" }}>
                                  {item.first_name || "N/A"}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "12px 8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Chip
                                label={item.role || "N/A"}
                                size="medium"
                                sx={{
                                  bgcolor:
                                    item.role === "Driver"
                                      ? "#FFEBEE"
                                      : "#E8F5E9",
                                  color:
                                    item.role === "Driver"
                                      ? "#D32F2F"
                                      : "#2E7D32",
                                  fontWeight: "medium",
                                  fontSize: "1rem",
                                }}
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "12px 8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.previoust_status || "N/A"}
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "12px 8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Chip
                                label={item.updated_status || "N/A"}
                                size="medium"
                                sx={{
                                  bgcolor:
                                    item.updated_status === "delivered"
                                      ? "#E8F5E9"
                                      : item.updated_status === "in transit"
                                      ? "#FFEBEE"
                                      : "#FFF8E1",
                                  color:
                                    item.updated_status === "delivered"
                                      ? "#2E7D32"
                                      : item.updated_status === "in transit"
                                      ? "#D32F2F"
                                      : "#F57F17",
                                  fontWeight: "medium",
                                  fontSize: "1rem",
                                }}
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                padding: "12px 8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.type || "N/A"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow sx={{ bgcolor: "#f5f5f5", height: "60px" }}>
                          <TableCell
                            colSpan={4}
                            sx={{
                              textAlign: "right",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                            }}
                          >
                            Total Updates:
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              color: "#D32F2F",
                              fontSize: "1.2rem",
                            }}
                          >
                            {filteredData.length}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ p: 6, textAlign: "center" }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: "1.25rem" }}
                    >
                      No package updates found matching your criteria.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
