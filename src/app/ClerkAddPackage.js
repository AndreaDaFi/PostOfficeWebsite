
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, MenuItem, FormControlLabel, Checkbox, Alert, Grid } from "@mui/material";

export default function CustomerPackageEntry() {
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState({
    customerID: "", receiverStreet: "", receiverApartment: "", receiverCity: "", receiverState: "", receiverZip: "",
    serviceType: "", fragile: false, insurance: false, packageType: "", weight: "", size: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData({ ...packageData, [name]: type === "checkbox" ? checked : value });
  };

  const weightOptions = [
    { label: "1 kg", value: 1, price: 5 },
    { label: "5 kg", value: 5, price: 15 },
    { label: "10 kg", value: 10, price: 25 },
    { label: "20 kg", value: 20, price: 40 },
    { label: "50 kg", value: 50, price: 75 },
  ];

  const sizeOptions = [
    { label: "Small (30x20x10 cm)", price: 5 },
    { label: "Medium (50x40x30 cm)", price: 10 },
    { label: "Large (80x60x40 cm)", price: 15 },
  ];

  const serviceOptions = [
    { label: "Same-Day Delivery", price: 20 },
    { label: "Next-Day Delivery", price: 10 },
    { label: "Regular Delivery", price: 0 },
  ];

  const calculateTotalPrice = () => {
    let basePrice = 0;
    if (packageData.packageType === "Envelope") {
      basePrice = 20;
    } else if (packageData.packageType === "Box") {
      const selectedWeight = weightOptions.find(w => w.value === parseFloat(packageData.weight));
      const selectedSize = sizeOptions.find(s => s.label === packageData.size);
      basePrice = (selectedWeight?.price || 0) + (selectedSize?.price || 0);
    }
    if (packageData.fragile) basePrice += 25;
    if (packageData.insurance) basePrice += 50;
    const selectedService = serviceOptions.find(s => s.label === packageData.serviceType);
    basePrice += selectedService?.price || 0;
    return basePrice.toFixed(2);
  };

  const handleSubmit = () => {
    setError(null);
    if (!packageData.customerID || !packageData.customerFirstName || !packageData.customerLastName || !packageData.customerStreet) {
      setError("⚠ Please fill in all required customer fields.");
      return;
    }
    if (!packageData.receiverFirstName || !packageData.receiverLastName || !packageData.receiverStreet) {
      setError("⚠ Please fill in all required receiver fields.");
      return;
    }
    const totalPrice = calculateTotalPrice();
    navigate("/checkout", { state: { totalPrice, packageData } });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#D32F2F" }}>
          📦 Register a New Package
        </Typography>
        {error && <Alert severity="error" style={{ marginBottom: "10px" }}>{error}</Alert>}

        {/* Customer Info */}
        <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>👤 Customer Info</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField fullWidth label="Customer ID" name="customerID" variant="outlined" value={packageData.customerID} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="First Name" name="customerFirstName" variant="outlined" value={packageData.customerFirstName} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Last Name" name="customerLastName" variant="outlined" value={packageData.customerLastName} onChange={handleChange} /></Grid>
        </Grid>

        {/* Sender Info */}
        <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>📦 Sender Info</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField fullWidth label="First Name" name="senderFirstName" variant="outlined" value={packageData.senderFirstName} onChange={handleChange} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Last Name" name="senderLastName" variant="outlined" value={packageData.senderLastName} onChange={handleChange} /></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}><TextField fullWidth label="Street Address" name="senderStreet" variant="outlined" value={packageData.senderStreet} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Apt #" name="senderApartment" variant="outlined" value={packageData.senderApartment} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="City" name="senderCity" variant="outlined" value={packageData.senderCity} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="State" name="senderState" variant="outlined" value={packageData.senderState} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Zip Code" name="senderZip" variant="outlined" value={packageData.senderZip} onChange={handleChange} /></Grid>
        </Grid>

        {/* Receiver Info */}
        <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>📍 Receiver Info</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField fullWidth label="First Name" name="receiverFirstName" variant="outlined" value={packageData.receiverFirstName} onChange={handleChange} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Last Name" name="receiverLastName" variant="outlined" value={packageData.receiverLastName} onChange={handleChange} /></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}><TextField fullWidth label="Street Address" name="receiverStreet" variant="outlined" value={packageData.receiverStreet} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Apt #" name="receiverApartment" variant="outlined" value={packageData.receiverApartment} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="City" name="receiverCity" variant="outlined" value={packageData.receiverCity} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="State" name="receiverState" variant="outlined" value={packageData.receiverState} onChange={handleChange} /></Grid>
          <Grid item xs={4}><TextField fullWidth label="Zip Code" name="receiverZip" variant="outlined" value={packageData.receiverZip} onChange={handleChange} /></Grid>
        </Grid>
      



        {/* Package Type */}
        <TextField select fullWidth label="Package Type" name="packageType" variant="outlined" margin="normal" value={packageData.packageType} onChange={(e) => setPackageData({ ...packageData, packageType: e.target.value })}>
          <MenuItem value="Envelope">Envelope ($20)</MenuItem>
          <MenuItem value="Box">Box (Price based on weight & size)</MenuItem>
        </TextField>

        {/* Weight & Size (Only if Box) */}
        {packageData.packageType === "Box" && (
          <>
            <TextField select fullWidth label="Select Weight" name="weight" variant="outlined" margin="normal" value={packageData.weight} onChange={(e) => setPackageData({ ...packageData, weight: e.target.value })}>
              {weightOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>{option.label} (+${option.price})</MenuItem>
              ))}
            </TextField>

            <TextField select fullWidth label="Select Size" name="size" variant="outlined" margin="normal" value={packageData.size} onChange={(e) => setPackageData({ ...packageData, size: e.target.value })}>
              {sizeOptions.map((option, index) => (
                <MenuItem key={index} value={option.label}>{option.label} (+${option.price})</MenuItem>
              ))}
            </TextField>
          </>
        )}

        {/* Extra Services */}
        <FormControlLabel control={<Checkbox checked={packageData.fragile} onChange={(e) => setPackageData({ ...packageData, fragile: e.target.checked })} />} label="Fragile Item (+$25)" />
        <FormControlLabel control={<Checkbox checked={packageData.insurance} onChange={(e) => setPackageData({ ...packageData, insurance: e.target.checked })} />} label="Add Insurance (+$50)" />

        {/* Total Price */}
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "20px" }}>
          💲 Total: ${calculateTotalPrice()}
        </Typography>

        {/* Checkout Button */}
        <Button fullWidth variant="contained" color="primary" style={{ marginTop: "15px" }} onClick={handleSubmit}>
          🛒 Proceed to Checkout
        </Button>
      </Paper>
    </Container>
  );
}
