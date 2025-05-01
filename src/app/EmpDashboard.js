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
      if (!user?.po_id || !(isManager() || isClerk())) return

      try {
        const res = await fetch(`https://final-po-api.vercel.app/api/getManagerNotifications?po_id=${user.po_id}`)
        const data = await res.json()
        console.log("Messages response:", data)

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
  }, [user, isManager, isClerk])

  const dismissLowStockMessages = async () => {
    if (!user?.po_id) return

    try {
      const response = await fetch(`https://final-po-api.vercel.app/api/markManagerNotificationsRead`, {
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
    <Box
      sx={{
        minHeight: "100vh",
        background: "white",
        pt: 4,
        pb: 8,
        position: "relative",
      }}
    >
      <Container maxWidth="md">
        {/* Header with logo */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#B71C1C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <PackageIcon sx={{ fontSize: 40 }} />
            CougarPost
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#666",
              letterSpacing: "1px",
            }}
          >
            Your Reliable Postal Service
          </Typography>
        </Box>

        {/* Low Stock Alert Icon */}
        {(isManager() || isClerk()) && managerMessages.length > 0 && (
          <Box sx={{ position: "absolute", top: 20, right: 20 }}>
            <Tooltip title="Low Stock Alerts">
              <IconButton
                onClick={() => setShowLowStockAlert(true)}
                sx={{
                  bgcolor: "rgba(255, 0, 0, 0.1)",
                  color: "#B71C1C",
                  "&:hover": {
                    bgcolor: "rgba(255, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 8px rgba(255, 0, 0, 0.2)",
                }}
              >
                <Badge
                  badgeContent={managerMessages.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "#B71C1C",
                      color: "white",
                      fontWeight: "bold",
                    },
                  }}
                  max={99}
                >
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
            elevation={8}
            sx={{
              borderRadius: "50%",
              p: 1.5,
              mb: 3,
              background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
              boxShadow: "0 15px 30px rgba(183, 28, 28, 0.3)",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: -5,
                left: -5,
                right: -5,
                bottom: -5,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(211,47,47,0.2) 0%, rgba(183,28,28,0.2) 100%)",
                zIndex: -1,
                filter: "blur(10px)",
              },
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "white",
                color: "#B71C1C",
                fontSize: "2.5rem",
                fontWeight: "bold",
                boxShadow: "inset 0 4px 8px rgba(0,0,0,0.1)",
                border: "4px solid rgba(255,255,255,0.8)",
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
              background: "linear-gradient(135deg, #B71C1C 0%, #D32F2F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
              textShadow: "0 2px 10px rgba(183,28,28,0.1)",
              letterSpacing: "0.5px",
            }}
          >
            {greeting}, {userName}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "medium",
              color: "#B71C1C",
              mb: 2,
              letterSpacing: "0.5px",
            }}
          >
            {getRoleGreeting()}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              py: 1.5,
              px: 3,
              borderRadius: 30,
              bgcolor: "rgba(255, 0, 0, 0.08)",
              border: "1px solid rgba(255, 0, 0, 0.15)",
              boxShadow: "0 4px 12px rgba(255, 0, 0, 0.1)",
            }}
          >
            <ClockIcon sx={{ mr: 1.5, color: "#B71C1C" }} />
            <Typography
              variant="body1"
              sx={{
                color: "#B71C1C",
                fontWeight: "medium",
                letterSpacing: "0.5px",
              }}
            >
              {currentTime} •{" "}
              {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
            </Typography>
          </Box>
        </Box>

        <Card
          elevation={10}
          sx={{
            borderRadius: 8,
            mb: 4,
            overflow: "visible",
            position: "relative",
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "linear-gradient(90deg, #B71C1C, #D32F2F)",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
                  boxShadow: "0 6px 12px rgba(255, 0, 0, 0.2)",
                  mr: 2,
                }}
              >
                <TruckIcon sx={{ fontSize: 28, color: "white" }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  letterSpacing: "0.5px",
                }}
              >
                Welcome back
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                mb: 3,
                lineHeight: 1.8,
                color: "#555",
                letterSpacing: "0.3px",
              }}
            >
              At CougarPost, we acknowledge that it's people like you that keep the business running. Keep up the good
              work!
            </Typography>

            {/* Low Stock Alert Card */}
            {(isManager() || isClerk()) && showLowStockAlert && managerMessages.length > 0 && (
              <Card
                elevation={4}
                sx={{
                  mt: 4,
                  p: 0,
                  borderRadius: 4,
                  border: "1px solid rgba(255, 0, 0, 0.2)",
                  bgcolor: "rgba(255, 0, 0, 0.03)",
                  overflow: "hidden",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { boxShadow: "0 0 0 0 rgba(255, 0, 0, 0.2)" },
                    "70%": { boxShadow: "0 0 0 10px rgba(255, 0, 0, 0)" },
                    "100%": { boxShadow: "0 0 0 0 rgba(255, 0, 0, 0)" },
                  },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "5px",
                      height: "100%",
                      background: "linear-gradient(to bottom, #B71C1C, #D32F2F)",
                    },
                    pl: 4,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <WarningIcon sx={{ color: "#B71C1C", mr: 2, fontSize: 28 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#B71C1C",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Low Stock Alert
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: "#555",
                      pl: 5,
                    }}
                  >
                    You have {managerMessages.length} item{managerMessages.length !== 1 ? "s" : ""} that{" "}
                    {managerMessages.length !== 1 ? "are" : "is"} running low on stock. Please review inventory levels.
                  </Typography>

                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={dismissLowStockMessages}
                      sx={{
                        fontWeight: "bold",
                        px: 4,
                        py: 1.5,
                        borderRadius: 30,
                        background: "linear-gradient(135deg, #D32F2F, #B71C1C)",
                        boxShadow: "0 6px 12px rgba(183, 28, 28, 0.3)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #B71C1C, #8B0000)",
                          boxShadow: "0 8px 16px rgba(183, 28, 28, 0.4)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                        textTransform: "none",
                        fontSize: "1rem",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Dismiss Low Stock Alerts
                    </Button>
                  </Box>
                </Box>
              </Card>
            )}
          </CardContent>
        </Card>

        {user && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<LogoutIcon />}
              onClick={logout}
              sx={{
                color: "#B71C1C",
                borderColor: "#B71C1C",
                "&:hover": {
                  borderColor: "#8B0000",
                  backgroundColor: "rgba(183, 28, 28, 0.05)",
                  transform: "translateY(-2px)",
                },
                borderRadius: 30,
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(183, 28, 28, 0.1)",
                transition: "all 0.3s ease",
                textTransform: "none",
                fontSize: "1rem",
                letterSpacing: "0.5px",
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

