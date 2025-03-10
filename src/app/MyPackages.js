import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Card, CardContent, CardActions, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneIcon from "@mui/icons-material/Done";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

// Mock Package Data
const mockPackages = [
  { id: 1, trackingNumber: "123456", status: "Shipped", deliveryDate: "2025-03-15" },
  { id: 2, trackingNumber: "654321", status: "In Transit", deliveryDate: "2025-03-18" },
  { id: 3, trackingNumber: "789012", status: "Delivered", deliveryDate: "2025-03-05" },
  { id: 4, trackingNumber: "456789", status: "Out for Delivery", deliveryDate: "2025-03-20" },
  { id: 5, trackingNumber: "987654", status: "Processing", deliveryDate: "Pending" },
];

const MyPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    setPackages(mockPackages);
  }, []);

  return (
    <Container sx={{ my: 5 }}>
      {/* Title */}
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "#D32F2F", mb: 3, textAlign: "center" }}>
        📦 Your Packages
      </Typography>

      {/* No Packages Message */}
      {packages.length === 0 && (
        <Box textAlign="center" sx={{ my: 5 }}>
          <Typography variant="h5" color="textSecondary">
            You have no packages to display.
          </Typography>
        </Box>
      )}

      {/* Packages Grid */}
      <Grid container spacing={3}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.15)",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  📌 Tracking: {pkg.trackingNumber}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <TrackChangesIcon sx={{ verticalAlign: "middle", mr: 1, color: "#D32F2F" }} />
                  Status:{" "}
                  <span style={{ fontWeight: "bold", color: pkg.status === "Delivered" ? "#388E3C" : "#D32F2F" }}>
                    {pkg.status}
                  </span>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  📅 Estimated Delivery:{" "}
                  <span style={{ fontWeight: "bold" }}>{pkg.deliveryDate}</span>
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                <Button
                  component={Link}
                  to={`/TrackPackage?tracking=${pkg.trackingNumber}`}
                  variant="contained"
                  sx={{
                    backgroundColor: "#D32F2F",
                    color: "#FFF",
                    "&:hover": { backgroundColor: "#B71C1C" },
                  }}
                  startIcon={<LocalShippingIcon />}
                >
                  Track Package
                </Button>

                <Button
                  component={Link}
                  to={`/PackageDetails?tracking=${pkg.trackingNumber}`}
                  variant="outlined"
                  sx={{ color: "#D32F2F", borderColor: "#D32F2F", "&:hover": { backgroundColor: "#FFEBEE" } }}
                  startIcon={<DoneIcon />}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyPackages;
