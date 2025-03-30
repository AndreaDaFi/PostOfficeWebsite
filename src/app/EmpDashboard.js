"use client"

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Paper,
  Button,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material"
import {
  AccessTime as ClockIcon,
  LocalShipping as TruckIcon,
  Inventory as PackageIcon,
  Logout as LogoutIcon,
  Warning as WarningIcon,
} from "@mui/icons-material"

const EmpDashboard = () => {
  const { user, logout, isAdmin, isManager, isDriver, isClerk } = useContext(AuthContext)
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [animation, setAnimation] = useState(false)
  const [managerMessages, setManagerMessages] = useState([])
  const [showLowStockAlert, setShowLowStockAlert] = useState(false)

  const userName = user ? user.name || user.email?.split("@")[0] || "User" : "User"

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    setAnimation(true)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchManagerMessages = async () => {
      if (!user?.po_id || !isManager()) return

      try {
        const res = await fetch(`https://apipost.vercel.app/api/getManagerNotifications?po_id=${user.po_id}`)
        const data = await res.json()
        console.log("📬 Messages response:", data)

        if (data.success && data.messages) {
          setManagerMessages(data.messages)
          if (data.messages.length > 0) {
            setShowLowStockAlert(true)
          }
        }
      } catch (err) {
        console.error("Error fetching manager messages:", err)
      }
    }

    fetchManagerMessages()

    // Poll for new messages every minute
    const messageInterval = setInterval(fetchManagerMessages, 60000)

    return () => clearInterval(messageInterval)
  }, [user])

  const dismissLowStockMessages = async () => {
    if (!user?.po_id) return

    try {
      const response = await fetch(`https://apipost.vercel.app/api/markManagerNotificationsRead`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ po_id: user.po_id }),
      })

      const data = await response.json()

      if (data.success) {
        setManagerMessages([])
        setShowLowStockAlert(false)
      }
    } catch (err) {
      console.error("Failed to mark messages as read:", err)
    }
  }

  const getRoleGreeting = () => {
    if (isAdmin()) return "Admin Dashboard"
    if (isManager()) return "Manager Dashboard"
    if (isDriver()) return "Driver Dashboard"
    if (isClerk()) return "Clerk Dashboard"
    return "Employee Dashboard"
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "white", pt: 4, pb: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#ff0000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <PackageIcon sx={{ fontSize: 40 }} />
            CougarPost
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666" }}>
            Your Reliable Postal Service
          </Typography>
        </Box>

        {/* Low Stock Alert Icon */}
        {isManager() && managerMessages.length > 0 && (
          <Box sx={{ position: "absolute", top: 20, right: 20 }}>
            <Tooltip title="Low Stock Alerts">
              <IconButton
                color="error"
                onClick={() => setShowLowStockAlert(true)}
                sx={{
                  bgcolor: "rgba(255, 0, 0, 0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 0, 0, 0.2)",
                  },
                }}
              >
                <Badge badgeContent={managerMessages.length} color="error" max={99}>
                  <WarningIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <Box
          className={animation ? "animate-fade-in" : ""}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 6,
            opacity: animation ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: "50%",
              p: 1.5,
              mb: 3,
              background: "linear-gradient(135deg, #ff5555 0%, #ff0000 100%)",
              boxShadow: "0 10px 20px rgba(255, 0, 0, 0.2)",
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "white",
                color: "#ff0000",
                fontSize: "2.5rem",
                fontWeight: "bold",
              }}
              alt={userName}
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Paper>

          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              background: "linear-gradient(135deg, #ff0000 0%, #ff5555 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            {greeting}, {userName}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "medium", color: "#ff0000", mb: 2 }}>
            {getRoleGreeting()}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              p: 1,
              borderRadius: 20,
              bgcolor: "rgba(255, 0, 0, 0.1)",
            }}
          >
            <ClockIcon sx={{ mr: 1, color: "#ff0000" }} />
            <Typography variant="body1" sx={{ color: "#ff0000", fontWeight: "medium" }}>
              {currentTime} •{" "}
              {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
            </Typography>
          </Box>
        </Box>

        <Card
          elevation={8}
          sx={{
            borderRadius: 8,
            mb: 4,
            overflow: "visible",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "linear-gradient(90deg, #ff0000, #ff5555)",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <TruckIcon sx={{ fontSize: 28, color: "#ff0000", mr: 1.5 }} />
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff0000" }}>
                Welcome back
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 3, lineHeight: 1.6 }}>
              At CougarPost, we acknowledge that it's people like you that keep the business running. Keep up the good
              work!
            </Typography>

            {/* Low Stock Alert Card */}
            {isManager() && showLowStockAlert && managerMessages.length > 0 && (
              <Card
                elevation={4}
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid #ffcccc",
                  bgcolor: "rgba(255, 0, 0, 0.05)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <WarningIcon sx={{ color: "#ff0000", mr: 2, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: "#ff0000", fontWeight: "bold" }}>
                    Low Stock Alert
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  You have {managerMessages.length} item{managerMessages.length !== 1 ? "s" : ""} that{" "}
                  {managerMessages.length !== 1 ? "are" : "is"} running low on stock. Please review inventory levels.
                </Typography>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={dismissLowStockMessages}
                    sx={{
                      fontWeight: "bold",
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #ff5555, #ff0000)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #cc0000, #990000)",
                      },
                    }}
                  >
                    Dismiss Low Stock Alerts
                  </Button>
                </Box>
              </Card>
            )}
          </CardContent>
        </Card>

        {user && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Button
              variant="outlined"
              color="error"
              size="large"
              startIcon={<LogoutIcon />}
              onClick={logout}
              sx={{
                color: "#ff0000",
                borderColor: "#ff0000",
                "&:hover": {
                  borderColor: "#cc0000",
                  backgroundColor: "rgba(255, 0, 0, 0.05)",
                },
                borderRadius: 4,
                px: 4,
                py: 1.5,
                fontWeight: "bold",
              }}
            >
              LOGOUT
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default EmpDashboard

