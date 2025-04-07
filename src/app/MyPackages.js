"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Alert,
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Tooltip,
} from "@mui/material";
import {
  LocalShipping,
  Person,
  Scale,
  Inventory2,
  ErrorOutline,
  ArrowForward,
} from "@mui/icons-material";

const MyPackages = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      if (!user?.customers_id) {
        setError("⚠ Missing customer ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3001/api/getCustomerPackages",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customer_id: user.customers_id,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok)
          throw new Error(data.error || "Failed to fetch packages");

        setPackages(data.packages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [user]);

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success";
      case "in transit":
        return "error"; // Changed from "info" to "error" to make it red
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  // Function to navigate to package history page
  const viewPackageHistory = (trackingNumber) => {
    navigate(`/TrackPackage?trackingNumber=${trackingNumber}`);
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={4}
    >
      {/* Welcome banner with gradient background */}
      <Paper
        elevation={2}
        sx={{
          width: { xs: "95%", sm: "95%", md: "95%" },
          maxWidth: "1200px",
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
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
          sx={{ p: 4, position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Typography variant="h4" fontWeight="bold" color="white">
            Welcome to your packages
          </Typography>
        </Box>
      </Paper>

      {/* Package container */}
      <Box
        sx={{
          width: { xs: "95%", sm: "95%", md: "95%" },
          maxWidth: "1200px",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "#B71C1C",
              color: "white",
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Inventory2 sx={{ fontSize: 24 }} />
            <Typography variant="h5" fontWeight="bold">
              My Packages
            </Typography>
          </Box>

          <Box p={3}>
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  "& .MuiAlert-message": { fontSize: "1rem" },
                }}
                icon={<ErrorOutline />}
              >
                {error}
              </Alert>
            )}
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress size={40} sx={{ color: "#D32F2F" }} />
              </Box>
            ) : packages.length === 0 ? (
              <Box textAlign="center" p={4}>
                <Typography
                  variant="body1"
                  fontSize="1rem"
                  color="text.secondary"
                >
                  🚫 No packages found.
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2.5}>
                {packages.map((pkg) => (
                  <Card
                    key={pkg.tracking_number}
                    variant="outlined"
                    sx={{
                      borderLeft: "5px solid #d32f2f",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => viewPackageHistory(pkg.tracking_number)}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1.5}
                          >
                            <Typography
                              variant="subtitle1"
                              fontSize="1.1rem"
                              fontWeight="bold"
                            >
                              Tracking Number: {pkg.tracking_number}
                            </Typography>
                            <Chip
                              label={pkg.status}
                              color={getStatusColor(pkg.status)}
                              size="medium"
                              sx={{ fontSize: "0.9rem" }}
                            />
                          </Box>
                          <Divider sx={{ borderWidth: 1 }} />
                        </Grid>
                        {pkg.weight && (
                          <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" alignItems="center" gap={1.2}>
                              <Scale sx={{ fontSize: 20 }} color="action" />
                              <Typography fontSize="1rem">
                                <strong>Weight:</strong> {pkg.weight} kg
                              </Typography>
                            </Box>
                          </Grid>
                        )}

                        <Grid item xs={12} sm={6} md={4}>
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Person sx={{ fontSize: 20 }} color="action" />
                            <Typography fontSize="1rem">
                              <strong>Receiver:</strong> {pkg.receiver_name}
                            </Typography>
                          </Box>
                        </Grid>


                        {pkg.type && <Grid item xs={12} md={4}>
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <LocalShipping
                              sx={{ fontSize: 20 }}
                              color="action"
                            />
                            <Typography fontSize="1rem">
                              <strong>Type:</strong> {pkg.type}
                            </Typography>
                          </Box>
                        </Grid>}
                        {!pkg.type && <Grid item xs={12} md={4}>
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <LocalShipping
                              sx={{ fontSize: 20 }}
                              color="action"
                            />
                            <Typography fontSize="1rem">
                              <strong>Type:</strong> Store Order
                            </Typography>
                          </Box>
                        </Grid>}
                        {!pkg.type && <Grid item xs={12} md={4}>
                          <Box display="flex" alignItems="center" gap={1.2}>
                            <Typography fontSize="1rem">
                              <strong>Order Summary:</strong> {pkg.store_order_items}
                            </Typography>
                          </Box>
                        </Grid>}

                        <Grid item xs={12}>
                          <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Tooltip title="View package history">
                              <Button
                                variant="text"
                                color="error"
                                size="small"
                                endIcon={<ArrowForward />}
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent card click event
                                  viewPackageHistory(pkg.tracking_number);
                                }}
                              >
                                View History
                              </Button>
                            </Tooltip>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MyPackages;
