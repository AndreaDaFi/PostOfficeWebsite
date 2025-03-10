import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, MenuItem, FormControlLabel, Checkbox, Alert, Grid } from "@mui/material";

export default function CustomerPackageEntry() {
  const [packageData, setPackageData] = useState({
    customerFirstName: "", customerLastName: "", customerPhone: "",
    customerStreet: "", customerApartment: "", customerCity: "", customerState: "", customerZip: "",
    receiverFirstName: "", receiverLastName: "", receiverStreet: "", receiverApartment: "", receiverCity: "", receiverState: "", receiverZip: "",
    serviceType: "", fragile: false, insurance: false, packageType: "", weight: "", dimensions: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData({ ...packageData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccessMessage(null);
    if (!packageData.customerFirstName || !packageData.customerLastName || !packageData.receiverFirstName || !packageData.receiverLastName || !packageData.customerStreet || !packageData.receiverStreet) {
      setError("⚠ Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("https://your-api-url.com/customer-add-package", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error adding package");

      setSuccessMessage("🎉 Package successfully registered! Your shipping label is ready.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#D32F2F" }}>
          📦 Enter a New Package
        </Typography>

        {error && <Alert severity="error" style={{ marginBottom: "10px" }}>{error}</Alert>}
        {successMessage && <Alert severity="success" style={{ marginBottom: "10px" }}>{successMessage}</Alert>}

        {/* Customer Info */}
        <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>👤 Customer Info</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField fullWidth label="First Name" name="customerFirstName" variant="outlined" value={packageData.customerFirstName} onChange={handleChange} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Last Name" name="customerLastName" variant="outlined" value={packageData.customerLastName} onChange={handleChange} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Phone Number" name="customerPhone" variant="outlined" value={packageData.customerPhone} onChange={handleChange} /></Grid>
        </Grid>

        {/* Address */}
        <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>🏡 Customer Address</Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}><TextField fullWidth label="Street Address" name="customerStreet" variant="outlined" value={packageData.customerStreet} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Apt #" name="customerApartment" variant="outlined" value={packageData.customerApartment} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="City" name="customerCity" variant="outlined" value={packageData.customerCity} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="State" name="customerState" variant="outlined" value={packageData.customerState} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Zip Code" name="customerZip" variant="outlined" value={packageData.customerZip} onChange={handleChange} /></Grid>
        </Grid>

        {/* Receiver Info */}
        <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>📍 Receiver</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField fullWidth label="First Name" name="receiverFirstName" variant="outlined" value={packageData.receiverFirstName} onChange={handleChange} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Last Name" name="receiverLastName" variant="outlined" value={packageData.receiverLastName} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField fullWidth label="Street Address" name="receiverStreet" variant="outlined" value={packageData.receiverStreet} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Apt #" name="receiverApartment" variant="outlined" value={packageData.receiverApartment} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="City" name="receiverCity" variant="outlined" value={packageData.receiverCity} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="State" name="receiverState" variant="outlined" value={packageData.receiverState} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Zip Code" name="receiverZip" variant="outlined" value={packageData.receiverZip} onChange={handleChange} /></Grid>
        </Grid>

        {/* Service Type */}
        <TextField select fullWidth label="Select Service Type" name="serviceType" variant="outlined" margin="normal" value={packageData.serviceType} onChange={handleChange}>
          <MenuItem value="Same-Day Delivery">Same-Day Delivery</MenuItem>
          <MenuItem value="Next-Day Delivery">Next-Day Delivery</MenuItem>
          <MenuItem value="Regular Delivery">Regular Delivery</MenuItem>
        </TextField>

        {/* Fragile & Insurance */}
        <Grid container spacing={2}>
          <Grid item xs={6}><FormControlLabel control={<Checkbox checked={packageData.fragile} onChange={handleChange} name="fragile" />} label="Fragile Item" /></Grid>
          <Grid item xs={6}><FormControlLabel control={<Checkbox checked={packageData.insurance} onChange={handleChange} name="insurance" />} label="Add Insurance" /></Grid>
        </Grid>

        {/* Package Type */}
        <TextField select fullWidth label="Package Type" name="packageType" variant="outlined" margin="normal" value={packageData.packageType} onChange={handleChange}>
          <MenuItem value="Envelope">Envelope</MenuItem>
          <MenuItem value="Box">Box</MenuItem>
        </TextField>

        {/* Weight & Dimensions (Only if Box) */}
        {packageData.packageType === "Box" && (
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField fullWidth label="Weight (lbs)" name="weight" variant="outlined" value={packageData.weight} onChange={handleChange} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Dimensions (L x W x H)" name="dimensions" variant="outlined" value={packageData.dimensions} onChange={handleChange} /></Grid>
          </Grid>
        )}

        {/* Submit Button */}
        <Button fullWidth variant="contained" color="primary" style={{ marginTop: "15px" }} onClick={handleSubmit}>
          📬 Generate Shipping Label
        </Button>
      </Paper>
    </Container>
  );
}
