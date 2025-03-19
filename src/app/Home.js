"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip,
} from "@mui/material"
import {
  Mail,
  Home as HomeIcon,
  Search,
  AccessTime as ClockIcon,
  LocationOn as LocationIcon,
  Inbox,
  DirectionsCar as CarIcon,
  LocalShipping,
  Phone,
  Email,
  Star,
  CheckCircle,
} from "@mui/icons-material"
import Cougar from "../components/Cougar.png"

// Tab Panel component for the tracking section
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Define the primary red color to use throughout the site
  const primaryRed = "#D32F2F"
  const secondaryRed = "#B71C1C"
  const lightRed = "#FFCDD2"

  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ overflow: "hidden" }}>
        {/* Header Section */}
        <Box my={{ xs: 4, md: 6 }} sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              background: `linear-gradient(45deg, ${primaryRed} 30%, ${secondaryRed} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            Welcome to...
          </Typography>

          {/* Cougar Post logo */}
          <figure style={{ textAlign: "center", position: "relative", margin: "0 auto" }}>
            <Box
              sx={{
                position: "relative",
                maxWidth: { xs: "100%", sm: "90%", md: "600px" },
                margin: "0 auto",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  height: "10px",
                  background: `radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 80%)`,
                  borderRadius: "50%",
                  zIndex: -1,
                },
              }}
            >
              <img
                src={Cougar || "/placeholder.svg"}
                alt="Logo"
                className="hover-image"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                  transition: "transform 0.3s ease-in-out",
                  borderRadius: "8px",
                  boxShadow: "none"
                }}
              />
            </Box>
            <figcaption style={{ fontSize: "20px", color: "#555", marginTop: "30px" }}>
              Reference image:
              <a
                href="https://www.dreamstime.com/cougar-growling-close-up-mountain-lion-image220929865"
                style={{ color: primaryRed, marginLeft: "4px", fontWeight: "bold" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </figcaption>
          </figure>

          <style jsx>{`
          .hover-image:hover {
            transform: translateY(-15px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          }
          @media (max-width: 600px) {
            .hover-image:hover {
              transform: translateY(-10px);
            }
          }
        `}</style>

          <Box my={{ xs: 3, md: 5 }}>
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                fontWeight: 300,
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: 1.6,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                px: 2,
              }}
            >
              We provide the best postal services for all your needs
            </Typography>
            <Chip
              icon={<Star sx={{ color: "white !important" }} />}
              label="Trusted by thousands"
              sx={{
                mt: 2,
                backgroundColor: primaryRed,
                color: "white",
                fontWeight: "bold",
                "& .MuiChip-icon": {
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>

        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            background: `linear-gradient(135deg, ${primaryRed} 0%, ${secondaryRed} 100%)`,
            color: "white",
            p: { xs: 3, sm: 4, md: 8 },
            borderRadius: { xs: 3, md: 4 },
            mb: { xs: 6, md: 8 },
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
              opacity: 0.2,
            },
          }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.75rem" },
                  lineHeight: 1.2,
                }}
              >
                Your Reliable Postal Service Partner
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  mb: { xs: 3, md: 4 },
                  maxWidth: "90%",
                }}
              >
                Fast, secure, and reliable postal services for all your shipping needs. Track packages, find locations,
                and more with Cougar Post.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  component={Link}
                  to="/cust-signup"
                  sx={{
                    backgroundColor: "white",
                    color: primaryRed,
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    fontWeight: "bold",
                    px: { xs: 3, md: 4 },
                    py: { xs: 1, md: 1.5 },
                    borderRadius: 2,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size={isMobile ? "medium" : "large"}
                  component={Link}
                  to="/store"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": { borderColor: "white", backgroundColor: "rgba(255,255,255,0.1)" },
                    fontWeight: "bold",
                    px: { xs: 3, md: 4 },
                    py: { xs: 1, md: 1.5 },
                    borderRadius: 2,
                    borderWidth: 2,
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-mRo4EvFbp57hnrZTA7NwKUr4fCwOp4.png"
                alt="Friendly Delivery Service"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: { xs: 3, md: 4 },
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transform: { xs: "rotate(0deg)", md: "rotate(2deg)" },
                  border: { xs: "6px solid white", md: "8px solid white" },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Stats Section */}
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
            <Grid item xs={6} md={3}>
              <Card sx={{ textAlign: "center", py: { xs: 2, md: 3 }, boxShadow: 3, height: "100%" }}>
                <CardContent>
                  <Typography
                    variant={isMobile ? "h4" : "h3"}
                    sx={{
                      color: primaryRed,
                      fontWeight: "bold",
                      mb: 1,
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                    }}
                  >
                    5M+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Packages Delivered
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ textAlign: "center", py: { xs: 2, md: 3 }, boxShadow: 3, height: "100%" }}>
                <CardContent>
                  <Typography
                    variant={isMobile ? "h4" : "h3"}
                    sx={{
                      color: primaryRed,
                      fontWeight: "bold",
                      mb: 1,
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                    }}
                  >
                    98%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    On-time Delivery
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ textAlign: "center", py: { xs: 2, md: 3 }, boxShadow: 3, height: "100%" }}>
                <CardContent>
                  <Typography
                    variant={isMobile ? "h4" : "h3"}
                    sx={{
                      color: primaryRed,
                      fontWeight: "bold",
                      mb: 1,
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                    }}
                  >
                    1,200+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Locations
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ textAlign: "center", py: { xs: 2, md: 3 }, boxShadow: 3, height: "100%" }}>
                <CardContent>
                  <Typography
                    variant={isMobile ? "h4" : "h3"}
                    sx={{
                      color: primaryRed,
                      fontWeight: "bold",
                      mb: 1,
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                    }}
                  >
                    24/7
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customer Support
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Services Section */}
        <Box sx={{ my: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Chip
              label="OUR SERVICES"
              size="small"
              sx={{
                backgroundColor: lightRed,
                color: primaryRed,
                fontWeight: "bold",
                mb: 2,
              }}
            />
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                position: "relative",
                display: "inline-block",
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "60px", md: "80px" },
                  height: { xs: "3px", md: "4px" },
                  backgroundColor: primaryRed,
                  borderRadius: "2px",
                },
              }}
            >
              What We Offer
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                mt: 4,
                mb: 2,
                maxWidth: 700,
                mx: "auto",
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                px: 2,
              }}
            >
              Everything you need for your postal and shipping requirements
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: { xs: "translateY(-8px)", md: "translateY(-12px)" },
                    boxShadow: 6,
                    "& .service-icon": {
                      backgroundColor: primaryRed,
                      color: "white",
                      transform: "rotateY(180deg)",
                    },
                  },
                  borderRadius: { xs: 2, md: 3 },
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    height: { xs: "6px", md: "8px" },
                    width: "100%",
                    backgroundColor: primaryRed,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <CardContent sx={{ textAlign: "center", p: { xs: 3, md: 4 }, pt: { xs: 4, md: 5 } }}>
                  <Avatar
                    className="service-icon"
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      backgroundColor: lightRed,
                      color: primaryRed,
                      margin: "0 auto 20px",
                      transition: "all 0.5s ease",
                    }}
                  >
                    <Inbox sx={{ fontSize: { xs: 30, md: 40 } }} />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                  >
                    Package Shipping
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                    Send packages domestically and internationally with our reliable shipping services. We offer
                    competitive rates and fast delivery times.
                  </Typography>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/CustAddPackage"
                    sx={{
                      borderColor: primaryRed,
                      color: primaryRed,
                      "&:hover": {
                        backgroundColor: primaryRed,
                        color: "white",
                        borderColor: primaryRed,
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: { xs: "translateY(-8px)", md: "translateY(-12px)" },
                    boxShadow: 6,
                    "& .service-icon": {
                      backgroundColor: primaryRed,
                      color: "white",
                      transform: "rotateY(180deg)",
                    },
                  },
                  borderRadius: { xs: 2, md: 3 },
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    height: { xs: "6px", md: "8px" },
                    width: "100%",
                    backgroundColor: primaryRed,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <CardContent sx={{ textAlign: "center", p: { xs: 3, md: 4 }, pt: { xs: 4, md: 5 } }}>
                  <Avatar
                    className="service-icon"
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      backgroundColor: lightRed,
                      color: primaryRed,
                      margin: "0 auto 20px",
                      transition: "all 0.5s ease",
                    }}
                  >
                    <Mail sx={{ fontSize: { xs: 30, md: 40 } }} />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                  >
                    Mail Services
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                    From letters to postcards, we offer a variety of mail services to meet your needs. Reliable delivery
                    for all your correspondence.
                  </Typography>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/CustAddPackage"
                    sx={{
                      borderColor: primaryRed,
                      color: primaryRed,
                      "&:hover": {
                        backgroundColor: primaryRed,
                        color: "white",
                        borderColor: primaryRed,
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ mx: { xs: "auto", sm: 0 }, width: { xs: "100%", sm: "auto" } }}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: { xs: "translateY(-8px)", md: "translateY(-12px)" },
                    boxShadow: 6,
                    "& .service-icon": {
                      backgroundColor: primaryRed,
                      color: "white",
                      transform: "rotateY(180deg)",
                    },
                  },
                  borderRadius: { xs: 2, md: 3 },
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    height: { xs: "6px", md: "8px" },
                    width: "100%",
                    backgroundColor: primaryRed,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <CardContent sx={{ textAlign: "center", p: { xs: 3, md: 4 }, pt: { xs: 4, md: 5 } }}>
                  <Avatar
                    className="service-icon"
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      backgroundColor: lightRed,
                      color: primaryRed,
                      margin: "0 auto 20px",
                      transition: "all 0.5s ease",
                    }}
                  >
                    <LocationIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                  >
                    Post Office Locations
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                    Find the nearest post office location with our easy-to-use locator tool. Thousands of locations
                    nationwide to serve you.
                  </Typography>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/ViewPO"
                    sx={{
                      borderColor: primaryRed,
                      color: primaryRed,
                      "&:hover": {
                        backgroundColor: primaryRed,
                        color: "white",
                        borderColor: primaryRed,
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Track Package Section */}
        <Paper
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            my: { xs: 6, md: 10 },
            backgroundColor: "#f8f9fa",
            borderRadius: { xs: 3, md: 4 },
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: { xs: "100px", md: "150px" },
              height: { xs: "100px", md: "150px" },
              backgroundColor: lightRed,
              borderRadius: "0 0 0 100%",
              zIndex: 0,
            },
          }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6} sx={{ position: "relative", zIndex: 1 }}>
              <Chip
                label="PACKAGE TRACKING"
                size="small"
                sx={{
                  backgroundColor: lightRed,
                  color: primaryRed,
                  fontWeight: "bold",
                  mb: 2,
                }}
              />
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                }}
              >
                Track Your Package
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                paragraph
                sx={{
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                Enter your tracking number to get real-time updates on your package's location and delivery status. Our
                advanced tracking system provides accurate information at every step.
              </Typography>
              <Box sx={{ maxWidth: 800 }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    mb: 3,
                  }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant={isMobile ? "fullWidth" : "standard"}
                    sx={{
                      "& .MuiTab-root": {
                        fontWeight: "bold",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                      "& .Mui-selected": {
                        color: primaryRed,
                      },
                      "& .MuiTabs-indicator": {
                        backgroundColor: primaryRed,
                        height: 3,
                      },
                    }}
                  >
                    <Tab label="Track Package" />
                    <Tab label="Shipping Estimate" />
                  </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      backgroundColor: "white",
                      p: { xs: 2, md: 3 },
                      borderRadius: 2,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Enter tracking number"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <Box component="span" sx={{ color: "text.secondary", mr: 1 }}>
                            <LocalShipping fontSize="small" />
                          </Box>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      component={Link}
                      to="/TrackPackage"
                      sx={{
                        backgroundColor: primaryRed,
                        "&:hover": { backgroundColor: secondaryRed },
                        px: 3,
                        borderRadius: 2,
                        fontWeight: "bold",
                        minWidth: { xs: "100%", sm: "auto" },
                        mt: { xs: 1, sm: 0 },
                      }}
                      startIcon={<Search />}
                    >
                      Track
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      p: { xs: 2, md: 3 },
                      borderRadius: 2,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          placeholder="From ZIP code"
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          placeholder="To ZIP code"
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            flexDirection: { xs: "column", sm: "row" },
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Package weight (lbs)"
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                          <Button
                            variant="contained"
                            component={Link}
                            to="/PackageCheckOut"
                            sx={{
                              backgroundColor: primaryRed,
                              "&:hover": { backgroundColor: secondaryRed },
                              px: 3,
                              borderRadius: 2,
                              fontWeight: "bold",
                              minWidth: { xs: "100%", sm: "auto" },
                              mt: { xs: 1, sm: 0 },
                            }}
                            startIcon={<CarIcon />}
                          >
                            Calculate
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-cR7jG0TcT9tP7Kaa8IFZZrNGV1JrvH.png"
                alt="Package Tracking Service"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: { xs: 3, md: 4 },
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  transform: { xs: "none", md: "rotate(-3deg)" },
                  border: { xs: "6px solid white", md: "8px solid white" },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Find Location Section */}
        <Box sx={{ my: { xs: 6, md: 10 } }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="FIND US"
                size="small"
                sx={{
                  backgroundColor: lightRed,
                  color: primaryRed,
                  fontWeight: "bold",
                  mb: 2,
                }}
              />
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                }}
              >
                Find Your Nearest Post Office
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                paragraph
                sx={{
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                With thousands of locations nationwide, there's always a post office near you. Use our locator to find
                the closest one and get directions, hours, and available services.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  maxWidth: 400,
                  backgroundColor: "white",
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter ZIP code"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <Box component="span" sx={{ color: "text.secondary", mr: 1 }}>
                        <LocationIcon fontSize="small" />
                      </Box>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  component={Link}
                  to="/ViewPO"
                  sx={{
                    backgroundColor: primaryRed,
                    "&:hover": { backgroundColor: secondaryRed },
                    borderRadius: 2,
                    fontWeight: "bold",
                    minWidth: { xs: "100%", sm: "auto" },
                    mt: { xs: 1, sm: 0 },
                  }}
                >
                  Find
                </Button>
              </Box>
              <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Chip
                  icon={<CheckCircle sx={{ fontSize: "1rem !important" }} />}
                  label="Extended Hours"
                  size="small"
                  sx={{ backgroundColor: "#f0f0f0" }}
                />
                <Chip
                  icon={<CheckCircle sx={{ fontSize: "1rem !important" }} />}
                  label="Package Pickup"
                  size="small"
                  sx={{ backgroundColor: "#f0f0f0" }}
                />
                <Chip
                  icon={<CheckCircle sx={{ fontSize: "1rem !important" }} />}
                  label="Self-Service"
                  size="small"
                  sx={{ backgroundColor: "#f0f0f0" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-6rvZC1RM1LGXkTYjpWiLkpmPQl1HYA.png"
                alt="Door Delivery Service"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: { xs: 3, md: 4 },
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  transform: { xs: "none", md: "rotate(3deg)" },
                  border: { xs: "6px solid white", md: "8px solid white" },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box
        sx={{
          bgcolor: "#f8f9fa",
          py: { xs: 6, md: 8 },
          mt: { xs: 6, md: 10 },
          borderTop: `5px solid ${primaryRed}`,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e0e0e0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            opacity: 0.5,
          },
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Mail sx={{ color: primaryRed, mr: 1, fontSize: { xs: 24, md: 30 } }} />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: primaryRed,
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  COUGAR
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: primaryRed,
                      color: "white",
                      px: 1,
                      ml: 1,
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    POST
                  </Box>
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Your reliable postal service partner for all your shipping and mailing needs. We deliver packages and
                mail with care, speed, and reliability.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton size={isMobile ? "small" : "medium"} sx={{ color: primaryRed }}>
                  <Phone />
                </IconButton>
                <IconButton size={isMobile ? "small" : "medium"} sx={{ color: primaryRed }}>
                  <Email />
                </IconButton>
                <IconButton size={isMobile ? "small" : "medium"} sx={{ color: primaryRed }}>
                  <LocationIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                Quick Links
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters sx={{ pb: 1 }}>
                  <ListItemText
                    primary={
                      <Link to="/TrackPackage" style={{ textDecoration: "none", color: "inherit" }}>
                        Track Package
                      </Link>
                    }
                    primaryTypographyProps={{
                      sx: {
                        "&:hover": { color: primaryRed },
                        cursor: "pointer",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
                <ListItem disableGutters sx={{ pb: 1 }}>
                  <ListItemText
                    primary={
                      <Link to="/ViewPO" style={{ textDecoration: "none", color: "inherit" }}>
                        Find Locations
                      </Link>
                    }
                    primaryTypographyProps={{
                      sx: {
                        "&:hover": { color: primaryRed },
                        cursor: "pointer",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
                <ListItem disableGutters sx={{ pb: 1 }}>
                  <ListItemText
                    primary={
                      <Link to="/PackageCheckOut" style={{ textDecoration: "none", color: "inherit" }}>
                        Shipping Rates
                      </Link>
                    }
                    primaryTypographyProps={{
                      sx: {
                        "&:hover": { color: primaryRed },
                        cursor: "pointer",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
                <ListItem disableGutters sx={{ pb: 1 }}>
                  <ListItemText
                    primary={
                      <Link to="/CustAddPackage" style={{ textDecoration: "none", color: "inherit" }}>
                        Schedule Pickup
                      </Link>
                    }
                    primaryTypographyProps={{
                      sx: {
                        "&:hover": { color: primaryRed },
                        cursor: "pointer",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                Services
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters sx={{ pb: 1 }}>
                  <ListItemText
                    primary={
                      <Link to="/CustAddPackage" style={{ textDecoration: "none", color: "inherit" }}>
                        Domestic Shipping
                      </Link>
                    }
                    primaryTypographyProps={{
                      sx: {
                        "&:hover": { color: primaryRed },
                        cursor: "pointer",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
                <ListItem disableGutters sx={{ pb: 1 }}>
                  <ListItemText
                    primary={
                      <Link to="/CustAddPackage" style={{ textDecoration: "none", color: "inherit" }}>
                        International Shipping
                      </Link>
                    }
                    primaryTypographyProps={{
                      sx: {
                        "&:hover": { color: primaryRed },
                        cursor: "pointer",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
                <ListItem disableGutters sx={{ pb: 1 }}>
                  <ListItemText
                    primary={
                      <Link to="/CustAddPackage" style={{ textDecoration: "none", color: "inherit" }}>
                        Mail Services
                      </Link>
                    }
                    primaryTypographyProps={{
                      sx: {
                        "&:hover": { color: primaryRed },
                        cursor: "pointer",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
                <ListItem disableGutters sx={{ pb: 1 }}>
                  <ListItemText
                    primary={
                      <Link to="/store" style={{ textDecoration: "none", color: "inherit" }}>
                        Business Solutions
                      </Link>
                    }
                    primaryTypographyProps={{
                      sx: {
                        "&:hover": { color: primaryRed },
                        cursor: "pointer",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                Contact Us
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters sx={{ pb: 2 }}>
                  <ListItemIcon sx={{ minWidth: { xs: 30, md: 36 } }}>
                    <HomeIcon fontSize="small" sx={{ color: primaryRed }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="123 Postal Ave, City, State 12345"
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: "medium",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
                <ListItem disableGutters sx={{ pb: 2 }}>
                  <ListItemIcon sx={{ minWidth: { xs: 30, md: 36 } }}>
                    <Mail fontSize="small" sx={{ color: primaryRed }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="support@cougarpost.com"
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: "medium",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
                <ListItem disableGutters sx={{ pb: 2 }}>
                  <ListItemIcon sx={{ minWidth: { xs: 30, md: 36 } }}>
                    <ClockIcon fontSize="small" sx={{ color: primaryRed }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Mon-Fri: 8AM-6PM, Sat: 9AM-1PM"
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: "medium",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
                <ListItem disableGutters sx={{ pb: 2 }}>
                  <ListItemIcon sx={{ minWidth: { xs: 30, md: 36 } }}>
                    <Phone fontSize="small" sx={{ color: primaryRed }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="1-800-COUGAR-POST"
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: "medium",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      },
                    }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ my: { xs: 3, md: 4 } }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="textSecondary" align="center">
              © {new Date().getFullYear()} Cougar Post. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, md: 0 } }}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ cursor: "pointer", "&:hover": { color: primaryRed } }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ cursor: "pointer", "&:hover": { color: primaryRed } }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ cursor: "pointer", "&:hover": { color: primaryRed } }}
              >
                Sitemap
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Home

