"use client"

import { useState, useEffect, useContext } from "react"
import {AuthContext} from "../context/AuthContext"
import { Container, Typography, Box, Card, CardContent, Avatar, Paper, Button } from "@mui/material"
import {
  AccessTime as ClockIcon,
  Email as MailIcon,
  HelpOutline as HelpIcon,
  LocalShipping as TruckIcon,
  LocationOn as MapPinIcon,
  Inventory as PackageIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"

const EmpDashboard = () => {
  const { user, logout, isAdmin, isManager, isDriver, isClerk } = useContext(AuthContext)
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [animation, setAnimation] = useState(false)

  // Get user name from context or use default
  const userName = user ? user.name || user.email?.split("@")[0] || "User" : "User"

  useEffect(() => {
    // Set appropriate greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    // Update time
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    // Trigger animation after component mounts
    setAnimation(true)

    return () => clearInterval(interval)
  }, [])

  const handleEmailSupport = () => {
    window.location.href = "mailto:support@cougarpost.com?subject=CougarPost Support Request"
  }

  // Get role-specific greeting
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
        background: "white", // Changed from gradient to white
        pt: 4,
        pb: 8,
      }}
    >
      {/* Help Button - Fixed Position */}
      <Box
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          startIcon={<HelpIcon />}
          onClick={handleEmailSupport}
          sx={{
            bgcolor: "#ff0000",
            "&:hover": {
              bgcolor: "#cc0000",
            },
            borderRadius: 28,
            px: 3,
            py: 1.5,
            boxShadow: "0 4px 12px rgba(255, 0, 0, 0.3)",
          }}
        >
          Get Help
        </Button>
      </Box>

      <Container maxWidth="md">
        {/* Logo and Branding */}
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

          <Typography
            variant="h5"
            sx={{
              fontWeight: "medium",
              color: "#ff0000",
              mb: 2,
            }}
          >
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
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#ff0000",
                }}
              >
                Welcome to CougarPost
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 3, lineHeight: 1.6 }}>
            This dashboard is designed to streamline your postal operations, whether you're handling shipments, tracking deliveries, or managing mailing services. Easily access the tools you need to stay organized and efficient.
            </Typography>

            <Box
              sx={{
                p: 3,
                bgcolor: "rgba(255, 0, 0, 0.05)",
                borderRadius: 4,
                border: "1px solid rgba(255, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <MapPinIcon sx={{ fontSize: 24, color: "#ff0000", mr: 2, flexShrink: 0 }} />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
              At CougarPost, we know that efficiency drives success. Stay ahead, keep things moving, and make every delivery count. Your work keeps the world connected let’s make it seamless together.
              </Typography>
            </Box>

            {/* Email Support Section */}
            <Box
              sx={{
                p: 3,
                bgcolor: "rgba(255, 0, 0, 0.05)", // Changed from darker red to lighter
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 } }}>
                <MailIcon sx={{ fontSize: 24, color: "#ff0000", mr: 2, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  Need assistance with your postal services? Contact us.
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={handleEmailSupport}
                sx={{
                  bgcolor: "#ff0000",
                  "&:hover": {
                    bgcolor: "#cc0000",
                  },
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                }}
              >
                Email Support
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Logout Button */}
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

        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            p: 3,
            borderRadius: 4,
            bgcolor: "rgba(255, 0, 0, 0.05)",
          }}
        >
          <Typography variant="body2" sx={{ color: "#ff0000" }}>
            © {new Date().getFullYear()} CougarPost • All rights reserved
          </Typography>
          <Typography
            variant="body2"
            component="a"
            onClick={handleEmailSupport}
            sx={{
              color: "#ff0000",
              mt: 1,
              display: "inline-block",
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "#cc0000",
              },
            }}
          >
            support@cougarpost.com
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default EmpDashboard

