"use client";

import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Container,
  Paper,
  Badge,
  LinearProgress,
} from "@mui/material";
import {
  LocalShipping,
  ShoppingCart,
  Person,
  Logout,
  ArrowForward,
  AddBox,
} from "@mui/icons-material";

export default function Dashboard() {
  const { user, logout, isCustomer } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  // State for controlling the notification
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      if (!user?.customers_id) {
        return;
      }

      try {
        const response = await fetch(
          "https://apipost.vercel.app/api/getCustomerPackages",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customer_id: user.customers_id,
            }),
          }
        );

        const data = await response.json();
        console.log("📦 Packages response:", data);

        if (response.ok) {
          setPackages(data.packages || []);
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, [user]);

  // Fetch messages and handle unread notifications
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.customers_id) return;

      try {
        const res = await fetch(
          `https://apipost.vercel.app/api/CustomerMessages?customerId=${user.customers_id}`
        );
        const data = await res.json();
        console.log("📬 Messages response:", data);
        console.log("there are ", data.messages.length, " messages");

        if (data.success && data.messages) {
          setUnreadMessages(data.messages);
          if (data.messages.length > 0) {
            setShowNotification(true);
          }
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [user]);

  const clearMessages = async () => {
    if (!user?.customers_id) return;

    try {
      // Use the existing API endpoint structure
      const response = await fetch(`https://apipost.vercel.app/api/mark-read`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: user.customers_id }),
      });

      setShowNotification(false);
    } catch (err) {
      console.error("Failed to mark messages as read:", err);
    }
  };

  if (!user) {
    navigate("/cust-login");
    return null;
  }

  return (
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh", py: { xs: 2, sm: 4 } }}>
      <Container maxWidth="lg">
        {loading ? (
          <LinearProgress color="error" sx={{ mb: { xs: 2, sm: 4 } }} />
        ) : (
          <Box sx={{ height: 4, mb: { xs: 2, sm: 4 } }} /> // Spacer with same height
        )}

        {/* Welcome Banner - Styled to match the image */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 4 },
            borderRadius: { xs: 2, sm: 3 },
            background: "#d32f2f", // Solid red background to match image
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Logo at the top - removed */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Logo removed */}
          </Box>

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 2,
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 60, sm: 70 },
                  height: { xs: 60, sm: 70 },
                  bgcolor: "rgba(255,255,255,0.2)",
                  fontSize: { xs: "1.5rem", sm: "1.8rem" },
                  border: "3px solid white",
                }}
              >
                {user.email ? user.email.charAt(0).toUpperCase() : "A"}
              </Avatar>
              <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
                  }}
                >
                  Welcome, {user.email.split("@")[0]}!
                </Typography>
                <Typography variant="subtitle1">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              sx={{
                mb: 2,
                maxWidth: "100%",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Thank you for using our package delivery service. We hope you have
              an excellent experience.
            </Typography>
          </Box>
        </Paper>

        {/*package notifications*/}
        {showNotification && unreadMessages && (
          <Paper
            style={{ padding: "20px", maxWidth: "775px", margin: "0 auto" }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                color: "#333333",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                width: "100%",
                position: "relative",
                border: "none",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(to right, #d32f2f, #f44336)",
                }}
              />
              <div style={{ textAlign: "center", marginBottom: "25px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#fef8f8",
                    marginBottom: "15px",
                  }}
                >
                  <LocalShipping
                    style={{ fontSize: "30px", color: "#d32f2f" }}
                  />
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    marginBottom: "10px",
                    color: "#d32f2f",
                    letterSpacing: "0.5px",
                  }}
                >
                  MESSAGES
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    marginBottom: "20px",
                    color: "#555555",
                    maxWidth: "80%",
                    margin: "0 auto",
                  }}
                >
                  You have {unreadMessages.length} delivered package
                  notifications.
                </div>
                <div>
                  {/* Message List */}
                  {unreadMessages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        textAlign: "left",
                        backgroundColor: "#fafafa",
                        padding: "15px 20px",
                        borderRadius: "8px",
                        marginBottom: "12px",
                        fontSize: "15px",
                        border: "1px solid #f0f0f0",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <div style={{ marginTop: "2px" }}>
                        <LocalShipping
                          style={{ fontSize: "20px", color: "#d32f2f" }}
                        />
                      </div>
                      <div>
                        Your package from {msg.origin_state || "Unknown"} has
                        arrived at{" "}
                        {msg.destination_address || "your destination"}.
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dismiss button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={() => {
                      clearMessages();
                    }}
                    style={{
                      backgroundColor: "#f5f5f5",
                      color: "#555555",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.5px",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e0e0e0")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f5f5f5")
                    }
                  >
                    DISMISS
                  </button>
                </div>
              </div>
            </div>
          </Paper>
        )}

        {/* Main Actions */}
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            mb: { xs: 2, sm: 3 },
            pl: 1,
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          Quick Actions
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ mb: { xs: 2, sm: 4 } }}
        >
          {/* View My Packages */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: { xs: 2, sm: 3 },
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-8px)" },
                  boxShadow: {
                    xs: "0 4px 20px rgba(0,0,0,0.1)",
                    sm: "0 12px 28px rgba(0,0,0,0.15)",
                  },
                },
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 6,
                  bgcolor: "#d32f2f",
                }}
              />
              <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: "#ffebee",
                      color: "#d32f2f",
                      mr: 2,
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                    }}
                  >
                    <LocalShipping sx={{ fontSize: { xs: 24, sm: 28 } }} />
                  </Avatar>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                  >
                    My Packages
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Track and manage your current packages. View status updates
                  and delivery information.
                </Typography>
                <Box
                  sx={{
                    mb: 3,
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: "#f9f9f9",
                    borderRadius: { xs: 1, sm: 2 },
                    border: "1px dashed #ddd",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="text.secondary"
                    gutterBottom
                  >
                    Active Packages: {packages.length}
                  </Typography>
                  {packages.length > 0 ? (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      {packages.slice(0, 2).map((pkg, index) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Badge color="error" variant="dot">
                            <LocalShipping fontSize="small" color="action" />
                          </Badge>
                          <Typography variant="body2" noWrap>
                            {pkg.tracking_number} - {pkg.status}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No active packages found
                    </Typography>
                  )}
                </Box>
              </CardContent>
              <CardActions sx={{ p: { xs: 2, sm: 3, md: 4 }, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => navigate("/MyPackages")}
                  sx={{
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                    borderRadius: { xs: 1, sm: 2 },
                    boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                  }}
                  endIcon={<ArrowForward />}
                >
                  VIEW MY PACKAGES
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Visit Store */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: { xs: 2, sm: 3 },
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-8px)" },
                  boxShadow: {
                    xs: "0 4px 20px rgba(0,0,0,0.1)",
                    sm: "0 12px 28px rgba(0,0,0,0.15)",
                  },
                },
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 6,
                  bgcolor: "#d32f2f",
                }}
              />
              <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: "#ffebee",
                      color: "#d32f2f",
                      mr: 2,
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                    }}
                  >
                    <ShoppingCart sx={{ fontSize: { xs: 24, sm: 28 } }} />
                  </Avatar>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                  >
                    Store
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Browse and purchase shipping supplies. Find everything you
                  need for packaging and shipping.
                </Typography>
                <Box
                  sx={{
                    mb: 3,
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: "#f9f9f9",
                    borderRadius: { xs: 1, sm: 2 },
                    border: "1px dashed #ddd",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="text.secondary"
                    gutterBottom
                  >
                    Available Products
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ShoppingCart fontSize="small" color="action" />
                    <Typography variant="body2">
                      Boxes, envelopes, tapes and more
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ p: { xs: 2, sm: 3, md: 4 }, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => navigate("/ask-store-location")}
                  sx={{
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                    borderRadius: { xs: 1, sm: 2 },
                    boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                  }}
                  endIcon={<ArrowForward />}
                >
                  VISIT STORE
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Account */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: { xs: 2, sm: 3 },
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-8px)" },
                  boxShadow: {
                    xs: "0 4px 20px rgba(0,0,0,0.1)",
                    sm: "0 12px 28px rgba(0,0,0,0.15)",
                  },
                },
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 6,
                  bgcolor: "#d32f2f",
                }}
              />
              <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: "#ffebee",
                      color: "#d32f2f",
                      mr: 2,
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                    }}
                  >
                    <Person sx={{ fontSize: { xs: 24, sm: 28 } }} />
                  </Avatar>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                  >
                    My Account
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Manage your account settings and preferences. Update your
                  profile or sign out.
                </Typography>
                <Box
                  sx={{
                    mb: 3,
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: "#f9f9f9",
                    borderRadius: { xs: 1, sm: 2 },
                    border: "1px dashed #ddd",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="text.secondary"
                    gutterBottom
                  >
                    Account Information
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Person fontSize="small" color="action" />
                    <Typography variant="body2" noWrap>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => navigate("/CustomerInfo")}
                  sx={{
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                    borderRadius: { xs: 1, sm: 2 },
                    boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                  }}
                  endIcon={<ArrowForward />}
                >
                  MY INFORMATION
                </Button>
              </CardContent>
              <CardActions sx={{ p: { xs: 2, sm: 3, md: 4 }, pt: 0 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  size="large"
                  onClick={logout}
                  sx={{
                    fontWeight: "bold",
                    py: { xs: 1, sm: 1.5 },
                    borderRadius: { xs: 1, sm: 2 },
                  }}
                  endIcon={<Logout />}
                >
                  LOGOUT
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* New Package Section */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 4 },
            borderRadius: { xs: 2, sm: 3 },
            background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
            border: "1px solid #eee",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
            >
              Need to ship a package?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create a new shipment quickly and get the best available rates.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<AddBox />}
            onClick={() => navigate("/CustAddPackage")}
            sx={{
              fontWeight: "bold",
              py: { xs: 1, sm: 1.5 },
              px: { xs: 2, sm: 3 },
              borderRadius: { xs: 1, sm: 2 },
              boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
              alignSelf: { xs: "stretch", md: "center" },
            }}
          >
            SHIP A NEW PACKAGE
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
