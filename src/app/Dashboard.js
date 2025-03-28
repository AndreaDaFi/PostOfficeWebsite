"use client"

import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
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
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import {
  LocalShipping,
  ShoppingCart,
  Person,
  Logout,
  ArrowForward,
  AddBox,
  Notifications,
  Delete,
} from "@mui/icons-material"

// Set to false to use real API calls instead of test data
const TEST_MODE = false

export default function Dashboard() {
  const { user, logout, isCustomer } = useContext(AuthContext)
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [packages, setPackages] = useState([])
  const [messages, setMessages] = useState([])
  // State for controlling the notification
  const [showNotification, setShowNotification] = useState(false)
  // State for the debug dialog
  const [debugDialogOpen, setDebugDialogOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState("")
  // State for tracking API calls
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  // Create test messages for development/testing\
  const testMessages = [
    {
      id: "test-1",
      message: "Your package has been delivered",
      created_at: new Date().toISOString(),
      is_read: 0,
      tracking_number: "TEST123456",
      status: "Delivered",
      origin_state: "TX",
      destination_address: "123 Test St, Austin, TX 78701",
    },
    {
      id: "test-2",
      message: "Your package is out for delivery",
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      is_read: 0,
      tracking_number: "TEST789012",
      status: "Out for Delivery",
      origin_state: "CA",
      destination_address: "456 Demo Ave, Los Angeles, CA 90001",
    },
  ]

  // Force test messages in TEST_MODE
  useEffect(() => {
    if (TEST_MODE) {
      console.log("🧪 TEST MODE ENABLED - Forcing test notifications to appear")
      setMessages(testMessages)
      setShowNotification(true)
    }
  }, [])

  // Function to manually show test notifications
  const showTestNotifications = () => {
    console.log("🔔 Manually showing test notifications")
    setMessages(testMessages)
    setShowNotification(true)
  }

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    // Simulate loading
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchPackages = async () => {
      if (!user?.customers_id || TEST_MODE) {
        return
      }

      try {
        const response = await fetch("https://vercel-api-powebapp.vercel.app/api/getCustomerPackages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: user.customers_id,
          }),
        })

        const data = await response.json()
        console.log("📦 Packages response:", data)

        if (response.ok) {
          setPackages(data.packages || [])
        }
      } catch (err) {
        console.error("Error fetching packages:", err)
      }
    }

    fetchPackages()
  }, [user, TEST_MODE])

  // Fetch messages from the database
  useEffect(() => {
    // Skip API call in TEST_MODE
    if (TEST_MODE) {
      console.log("🧪 TEST MODE ENABLED - Skipping API call for messages")
      return
    }

    const fetchMessages = async () => {
      if (!user?.customers_id) {
        console.log("⚠️ No user ID available, skipping message fetch")
        return
      }

      try {
        console.log(`🔍 Fetching messages for user ID: ${user.customers_id}`)

        // Call the getCustomerMessages API directly
        const res = await fetch(
          `https://vercel-api-powebapp.vercel.app/api/getCustomerMessages?id=${user.customers_id}`,
        )

        console.log(`📡 API Response status: ${res.status}`)

        if (!res.ok) {
          throw new Error(`Failed to fetch messages: ${res.status}`)
        }

        const data = await res.json()
        console.log(`📊 API Response data:`, data)

        if (data.success) {
          const newMessages = data.messages || []
          console.log(`📨 Messages received: ${newMessages.length}`)

          setMessages(newMessages)

          // Only show notification if there are new messages
          if (newMessages.length > 0) {
            console.log("📢 Setting showNotification to true")
            setShowNotification(true)
          } else {
            console.log("🔕 No new messages to show")
          }
        } else {
          console.error("API returned error:", data.error)
        }
      } catch (err) {
        console.error("❌ Error fetching messages:", err)
      }
    }

    fetchMessages()
  }, [user, TEST_MODE])

  // Debug logging for messages and notification state
  useEffect(() => {
    console.log(`📊 Current messages state:`, messages)
    console.log(`🔔 showNotification: ${showNotification}`)
  }, [messages, showNotification])

  // Function to manually clear all messages from the database
  const manuallyDeleteAllMessages = async () => {
    if (apiCallInProgress) {
      console.log("⚠️ API call already in progress, skipping")
      return
    }

    try {
      if (!user?.customers_id) {
        setDebugInfo("⚠️ No user ID available")
        setDebugDialogOpen(true)
        return
      }

      setApiCallInProgress(true)
      setDebugInfo("🔄 Sending DELETE request to API...")
      setDebugDialogOpen(true)

      if (TEST_MODE) {
        // Simulate successful deletion in test mode
        setTimeout(() => {
          setDebugInfo(
            `TEST MODE: Simulated successful deletion
            Status: 200
            Success: true
            Message: Messages deleted (simulated).
            Deleted Count: ${messages.length}
            Remaining Count: 0`,
          )

          // Clear messages and hide notification
          setMessages([])
          setShowNotification(false)
          setApiCallInProgress(false)
        }, 1000)
        return
      }

      // Call the getCustomerMessages API directly with DELETE method
      const res = await fetch(`https://vercel-api-powebapp.vercel.app/api/getCustomerMessages/${user.customers_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json()

      const debugMessage = `
        Status: ${res.status}
        Success: ${data.success}
        Message: ${data.message}
        Deleted Count: ${data.deletedCount || "N/A"}
        Remaining Count: ${data.remainingCount || "N/A"}
        Error: ${data.error || "None"}
        
        Raw Response:
        ${JSON.stringify(data, null, 2)}
      `

      setDebugInfo(debugMessage)

      // Clear messages and hide notification
      setMessages([])
      setShowNotification(false)
    } catch (err) {
      setDebugInfo(`❌ Error: ${err.message}`)
    } finally {
      setApiCallInProgress(false)
    }
  }

  // Function to delete messages from the database
  const clearMessages = async () => {
    if (apiCallInProgress) {
      console.log("⚠️ API call already in progress, skipping")
      return
    }

    try {
      if (!user?.customers_id) {
        console.log("⚠️ No user ID available, skipping message deletion")
        return
      }

      setApiCallInProgress(true)
      console.log(`🗑️ Deleting messages for user ID: ${user.customers_id}`)

      if (TEST_MODE) {
        // Simulate successful deletion in test mode
        console.log("🧪 TEST MODE: Simulating successful deletion")
        setTimeout(() => {
          // Clear messages and hide notification
          setMessages([])
          setShowNotification(false)
          setApiCallInProgress(false)
        }, 500)
        return
      }

      // Call the getCustomerMessages API directly with DELETE method
      const res = await fetch(`https://vercel-api-powebapp.vercel.app/api/getCustomerMessages/${user.customers_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log(`📡 Delete API Response status: ${res.status}`)

      const data = await res.json()
      console.log(`📊 Delete API Response data:`, data)

      if (data.success) {
        console.log(`✅ Successfully deleted ${data.deletedCount || 0} messages from database`)

        // Clear messages and hide notification
        setMessages([])
        setShowNotification(false)
      } else {
        throw new Error(data.error || "Unknown error when deleting messages")
      }
    } catch (err) {
      console.error("❌ Failed to clear messages:", err)

      // Still hide the notification even if the API call fails
      setMessages([])
      setShowNotification(false)
    } finally {
      setApiCallInProgress(false)
    }
  }

  // Function to mark messages as read in the database
  const markMessagesAsRead = async () => {
    if (apiCallInProgress) {
      console.log("⚠️ API call already in progress, skipping")
      return
    }

    try {
      if (!user?.customers_id) {
        console.log("⚠️ No user ID available, skipping mark as read")
        return
      }

      setApiCallInProgress(true)
      console.log(`✏️ Marking messages as read for user ID: ${user.customers_id}`)

      if (TEST_MODE) {
        // Simulate successful marking as read in test mode
        console.log("🧪 TEST MODE: Simulating successful marking as read")
        setTimeout(() => {
          // Clear messages and hide notification
          setMessages([])
          setShowNotification(false)
          setApiCallInProgress(false)
        }, 500)
        return
      }

      // Process each message
      for (const msg of messages) {
        console.log(`📝 Marking message with tracking number ${msg.tracking_number} as read`)

        // Call the API to mark message as read
        const res = await fetch("https://vercel-api-powebapp.vercel.app/api/customer-messages", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: user.customers_id,
            tracking_number: msg.tracking_number,
          }),
        })

        console.log(`📡 Mark as read API Response status: ${res.status}`)

        const data = await res.json()
        console.log(`📊 Mark as read API Response data:`, data)

        if (!data.success) {
          throw new Error(data.error || "Unknown error when marking message as read")
        }
      }

      console.log("✅ Successfully marked all messages as read")

      // Clear messages and hide notification
      setMessages([])
      setShowNotification(false)
    } catch (err) {
      console.error("❌ Failed to mark messages as read:", err)

      // Still hide the notification even if the API call fails
      setMessages([])
      setShowNotification(false)
    } finally {
      setApiCallInProgress(false)
    }
  }

  // Replace the handleCloseNotification function with this:
  const handleCloseNotification = () => {
    markMessagesAsRead() // This will mark the messages as read in the database
  }

  if (!user) {
    navigate("/cust-login")
    return null
  }

  return (
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh", py: { xs: 2, sm: 4 } }}>
      {/* Debug Dialog */}
      <Dialog open={debugDialogOpen} onClose={() => setDebugDialogOpen(false)}>
        <DialogTitle>API Debug Information</DialogTitle>
        <DialogContent>
          <DialogContentText component="pre" sx={{ whiteSpace: "pre-wrap" }}>
            {debugInfo}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDebugDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* CENTERED NOTIFICATION */}
      {showNotification && messages.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent dark background
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff", // White background
              color: "#333333", // Dark text for contrast
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              maxWidth: "500px",
              width: "90%",
              position: "relative",
              animation: "fadeIn 0.3s ease-out",
              border: "none",
              overflow: "hidden",
            }}
          >
            {/* Decorative top border */}
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

            <button
              onClick={handleCloseNotification}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "#f5f5f5",
                border: "none",
                color: "#666666",
                fontSize: "16px",
                cursor: "pointer",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            >
              ×
            </button>

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
                <LocalShipping style={{ fontSize: "30px", color: "#d32f2f" }} />
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
                PACKAGE UPDATE
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
                You have {messages.length} new package {messages.length === 1 ? "update" : "updates"}.
              </div>

              {messages.map((msg, index) => (
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
                    <LocalShipping style={{ fontSize: "20px", color: "#d32f2f" }} />
                  </div>
                  <div>
                    Your package {msg.tracking_number && <strong>{msg.tracking_number}</strong>} from{" "}
                    <strong>{msg.origin_state || "Unknown"}</strong> has arrived at{" "}
                    <strong>{msg.destination_address || "your destination"}</strong>.
                    {msg.status && (
                      <div style={{ fontSize: "12px", color: "#d32f2f", marginTop: "4px" }}>Status: {msg.status}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                onClick={() => {
                  navigate("/MyPackages")
                  handleCloseNotification()
                }}
                style={{
                  backgroundColor: "#d32f2f",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#b71c1c"
                  e.currentTarget.style.boxShadow = "0 6px 14px rgba(211, 47, 47, 0.3)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#d32f2f"
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(211, 47, 47, 0.2)"
                }}
              >
                VIEW DETAILS
              </button>
              <button
                onClick={markMessagesAsRead}
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
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                disabled={apiCallInProgress}
              >
                {apiCallInProgress ? "PROCESSING..." : "DISMISS"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Notification Button */}
      <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 100 }}>
        <Tooltip title="Show Test Notifications">
          <IconButton
            onClick={showTestNotifications}
            sx={{
              bgcolor: "#d32f2f",
              color: "white",
              "&:hover": { bgcolor: "#b71c1c" },
              width: 56,
              height: 56,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <Notifications />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Debug Button */}
      <Box sx={{ position: "fixed", bottom: 20, left: 20, zIndex: 100 }}>
        <Tooltip title="Delete All Messages (Debug)">
          <IconButton
            onClick={manuallyDeleteAllMessages}
            sx={{
              bgcolor: "#333",
              color: "white",
              "&:hover": { bgcolor: "#555" },
              width: 56,
              height: 56,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
            disabled={apiCallInProgress}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>

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
                  Welcome, {user.email ? user.email.split("@")[0] : "User"}!
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
              Thank you for using our package delivery service. We hope you have an excellent experience.
            </Typography>
          </Box>
        </Paper>

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
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 4 } }}>
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
                  boxShadow: { xs: "0 4px 20px rgba(0,0,0,0.1)", sm: "0 12px 28px rgba(0,0,0,0.15)" },
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
                  <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                    My Packages
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Track and manage your current packages. View status updates and delivery information.
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
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                    Active Packages: {packages.length}
                  </Typography>
                  {packages.length > 0 ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      {packages.slice(0, 2).map((pkg, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                  boxShadow: { xs: "0 4px 20px rgba(0,0,0,0.1)", sm: "0 12px 28px rgba(0,0,0,0.15)" },
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
                  <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                    Store
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Browse and purchase shipping supplies. Find everything you need for packaging and shipping.
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
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                    Available Products
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ShoppingCart fontSize="small" color="action" />
                    <Typography variant="body2">Boxes, envelopes, tapes and more</Typography>
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
                  boxShadow: { xs: "0 4px 20px rgba(0,0,0,0.1)", sm: "0 12px 28px rgba(0,0,0,0.15)" },
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
                  <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                    My Account
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Manage your account settings and preferences. Update your profile or sign out.
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
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                    Account Information
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Person fontSize="small" color="action" />
                    <Typography variant="body2" noWrap>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
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
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
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

        {/* Show Test Notification Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={showTestNotifications}
            startIcon={<Notifications />}
            sx={{ fontWeight: "bold", py: 1.5, px: 4 }}
          >
            Show Test Notifications
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

