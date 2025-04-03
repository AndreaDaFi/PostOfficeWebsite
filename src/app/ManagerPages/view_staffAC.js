"use client"
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Chip,
  Divider,
  LinearProgress,
} from "@mui/material"
import BadgeIcon from "@mui/icons-material/Badge"
import WorkIcon from "@mui/icons-material/Work"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"

export default function ViewStaffActivity() {
  // Employee Data (Fetched from another page)
  const selectedStaff = {
    id: "EMP12345",
    name: "John Doe",
    postOffice: "CougarPost - Houston",
    hours: { Monday: 8, Tuesday: 7, Wednesday: 6, Thursday: 9, Friday: 5, Saturday: 4, Sunday: 3 },
    packages: { Monday: 10, Tuesday: 12, Wednesday: 9, Thursday: 15, Friday: 11, Saturday: 8, Sunday: 6 },
  }

  // Calculate totals
  const totalHours = Object.values(selectedStaff.hours).reduce((a, b) => a + b, 0)
  const totalPackages = Object.values(selectedStaff.packages).reduce((a, b) => a + b, 0)

  // Calculate max values for visualization
  const maxHours = Math.max(...Object.values(selectedStaff.hours))
  const maxPackages = Math.max(...Object.values(selectedStaff.packages))

  // Calculate averages
  const avgHoursPerDay = totalHours / 7
  const avgPackagesPerDay = totalPackages / 7

  // Calculate efficiency (packages per hour)
  const efficiency = totalPackages / totalHours

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* Header with gradient background */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
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
          <Box sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}>
            <BadgeIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Staff Activity Report
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                Viewing work hours and managed packages for: <strong>{selectedStaff.name}</strong>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AccessTimeIcon sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }} />
              <Typography variant="h6" color="text.secondary">
                Total Hours
              </Typography>
            </Box>
            <Typography variant="h3" fontWeight="bold" color="#D32F2F">
              {totalHours}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Average: {avgHoursPerDay.toFixed(1)} hours/day
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocalShippingIcon sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }} />
              <Typography variant="h6" color="text.secondary">
                Total Packages
              </Typography>
            </Box>
            <Typography variant="h3" fontWeight="bold" color="#D32F2F">
              {totalPackages}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Average: {avgPackagesPerDay.toFixed(1)} packages/day
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TrendingUpIcon sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }} />
              <Typography variant="h6" color="text.secondary">
                Efficiency
              </Typography>
            </Box>
            <Typography variant="h3" fontWeight="bold" color="#D32F2F">
              {efficiency.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Packages processed per hour
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <WorkIcon sx={{ color: "#D32F2F", mr: 1.5, fontSize: 24 }} />
              <Typography variant="h6" color="text.secondary">
                Post Office
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">
              {selectedStaff.postOffice}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Employee ID: {selectedStaff.id}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Employee Info */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
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
          <BadgeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Employee Information
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Post Office</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <BadgeIcon sx={{ color: "#D32F2F", mr: 1.5 }} />
                    <Typography variant="body1" fontWeight="medium">
                      {selectedStaff.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <WorkIcon sx={{ color: "#D32F2F", mr: 1.5 }} />
                    <Typography variant="body1">{selectedStaff.postOffice}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={selectedStaff.id}
                    sx={{
                      bgcolor: "#FFEBEE",
                      color: "#D32F2F",
                      fontWeight: "medium",
                      border: "1px solid #FFCDD2",
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container spacing={4}>
        {/* Hours Worked Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: "100%",
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
                Hours Worked Per Day
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              {Object.entries(selectedStaff.hours).map(([day, hours]) => (
                <Box key={day} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {day}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {hours} hours
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(hours / maxHours) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      bgcolor: "#FFEBEE",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#D32F2F",
                      },
                    }}
                  />
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Hours:
                </Typography>
                <Chip
                  label={`${totalHours} hours`}
                  sx={{
                    bgcolor: "#FFEBEE",
                    color: "#D32F2F",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Packages Processed Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: "100%",
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
                Packages Processed Per Day
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              {Object.entries(selectedStaff.packages).map(([day, packages]) => (
                <Box key={day} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {day}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {packages} packages
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(packages / maxPackages) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      bgcolor: "#FFEBEE",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#D32F2F",
                      },
                    }}
                  />
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Packages:
                </Typography>
                <Chip
                  label={`${totalPackages} packages`}
                  sx={{
                    bgcolor: "#FFEBEE",
                    color: "#D32F2F",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Weekly Overview */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mt: 4,
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
          <CalendarTodayIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Weekly Overview
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Day</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Hours Worked</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Packages Processed</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Efficiency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(selectedStaff.hours).map(([day, hours]) => {
                const packages = selectedStaff.packages[day]
                const dailyEfficiency = packages / hours

                return (
                  <TableRow key={day} hover>
                    <TableCell>
                      <Typography fontWeight="medium">{day}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon sx={{ color: "#D32F2F", mr: 1, fontSize: 18 }} />
                        <Typography>{hours} hours</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocalShippingIcon sx={{ color: "#D32F2F", mr: 1, fontSize: 18 }} />
                        <Typography>{packages} packages</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${dailyEfficiency.toFixed(1)} pkg/hr`}
                        size="small"
                        sx={{
                          bgcolor: dailyEfficiency > efficiency ? "#E8F5E9" : "#FFEBEE",
                          color: dailyEfficiency > efficiency ? "#2E7D32" : "#D32F2F",
                          fontWeight: "medium",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}

