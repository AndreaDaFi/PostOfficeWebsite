import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, MenuItem, FormControlLabel, Checkbox, Alert, Grid } from "@mui/material";

export default function CustomerPackageEntry() {
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState({
    receiverName: "",
    receiverStreet: "",
    receiverApartment: "",
    receiverCity: "",
    receiverState: "",
    receiverZip: "",
    serviceType: "",
    fragile: false,
    insurance: false,
    packageType: "Envelope",
    weight: "",
    size: "",
  });

  const [error, setError] = useState(null);

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

  // Function to validate the street address length
  const validateStreetAddress = (value) => {
    return value.length <= 45;
  };

  const validateCity = (value) => {
    return value.length <= 45;
  };

  const validateState = (value) => {
    return value.length <= 45;
  };

  const validateName = (value) => {
    return value.length <= 20;
  };

  // Function to validate apt# (must be numeric)
  const validateAptNumber = (value) => {
    return /^[0-9]*$/.test(value);
  };

  // Function to validate zip code (must be 5 digits)
  const validateZipCode = (value) => {
    return /^[0-9]{5}$/.test(value);
  };

  const calculateTotalPrice = () => {
    let basePrice = 0;

    if (packageData.packageType === "Envelope") {
      basePrice = 20; // Flat fee for envelopes
    } else if (packageData.packageType === "Box") {
      const selectedWeight = weightOptions.find(w => w.value === parseFloat(packageData.weight));
      const selectedSize = sizeOptions.find(s => s.label === packageData.size);
      basePrice = (selectedWeight?.price || 0) + (selectedSize?.price || 0);
    }

    // Add fragile charge
    if (packageData.fragile) basePrice += 25;

    // Add insurance charge
    if (packageData.insurance) basePrice += 50;

    // Add service charge
    const selectedService = serviceOptions.find(s => s.label === packageData.serviceType);
    basePrice += selectedService?.price || 0;

    return basePrice.toFixed(2);
  };

  const handleSubmit = () => {
    setError(null);

    // Adjusted validation logic:
    if (
      (!validateStreetAddress(packageData.receiverStreet) &&
      !validateAptNumber(packageData.receiverApartment)) ||
      !validateZipCode(packageData.receiverZip) ||
      !validateCity(packageData.receiverCity) ||
      !validateState(packageData.receiverState) ||
      !validateName(packageData.receiverName) ||
      !packageData.receiverName ||
      !packageData.receiverCity ||
      !packageData.receiverState ||
      (!packageData.receiverStreet && !packageData.receiverApartment) ||
      !packageData.receiverZip
    ) {
      setError("⚠ Please fill in all required fields correctly.");
      return;
    }

    const totalPrice = calculateTotalPrice();

    // Use the navigate function to pass the data
    navigate("/PackageCheckOut", { state: { totalPrice, packageData } });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "12px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#D32F2F" }}>
          📦 Enter a New Package
        </Typography>

        {error && <Alert severity="error" style={{ marginBottom: "10px" }}>{error}</Alert>}

        {/* Receiver Info */}
        <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>📍 Receiver</Typography>

        {/* Address */}
        <Grid container spacing={2}>
        <Grid item xs={8}>
            <TextField
              fullWidth
              label="Receiver Name"
              name="receiverName"
              variant="outlined"
              value={packageData.receiverName}
              onChange={(e) => setPackageData({ ...packageData, receiverName: e.target.value })}
              helperText="Max 20 characters"
              error={packageData.receiverName.length > 20}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Street Address"
              name="receiverStreet"
              variant="outlined"
              value={packageData.receiverStreet}
              onChange={(e) => setPackageData({ ...packageData, receiverStreet: e.target.value })}
              helperText="Max 45 characters"
              error={packageData.receiverStreet.length > 45}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Apt #"
              name="receiverApartment"
              variant="outlined"
              value={packageData.receiverApartment}
              onChange={(e) => setPackageData({ ...packageData, receiverApartment: e.target.value })}
              error={!validateAptNumber(packageData.receiverApartment)}
              helperText="Only numbers"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="City"
              name="receiverCity"
              variant="outlined"
              value={packageData.receiverCity}
              helperText="Max 45 characters"
              onChange={(e) => setPackageData({ ...packageData, receiverCity: e.target.value })}
              error={packageData.receiverCity.length > 45}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="State"
              name="receiverState"
              variant="outlined"
              helperText="Max 45 characters"
              value={packageData.receiverState}
              onChange={(e) => setPackageData({ ...packageData, receiverState: e.target.value })}
              error={packageData.receiverState.length > 45}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Zip Code"
              name="receiverZip"
              variant="outlined"
              value={packageData.receiverZip}
              onChange={(e) => setPackageData({ ...packageData, receiverZip: e.target.value })}
              error={!validateZipCode(packageData.receiverZip)}
              helperText="Must be 5 digits"
            />
          </Grid>
        </Grid>

        {/* Package Type */}
        <TextField
          select
          fullWidth
          label="Package Type"
          name="packageType"
          variant="outlined"
          margin="normal"
          value={packageData.packageType}
          onChange={(e) => setPackageData({ ...packageData, packageType: e.target.value })}
        >
          <MenuItem value="Envelope">Envelope ($20)</MenuItem>
          <MenuItem value="Box">Box (Price based on weight & size)</MenuItem>
        </TextField>

        {/* Weight & Size (Only if Box) */}
        {packageData.packageType === "Box" && (
          <>
            <TextField
              select
              fullWidth
              label="Select Weight"
              name="weight"
              variant="outlined"
              margin="normal"
              value={packageData.weight}
              onChange={(e) => setPackageData({ ...packageData, weight: e.target.value })}
            >
              {weightOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>{option.label} (+${option.price})</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Select Size"
              name="size"
              variant="outlined"
              margin="normal"
              value={packageData.size}
              onChange={(e) => setPackageData({ ...packageData, size: e.target.value })}
            >
              {sizeOptions.map((option, index) => (
                <MenuItem key={index} value={option.label}>{option.label} (+${option.price})</MenuItem>
              ))}
            </TextField>
          </>
        )}

        {/* Extra Services */}
        <FormControlLabel
          control={<Checkbox checked={packageData.fragile} onChange={(e) => setPackageData({ ...packageData, fragile: e.target.checked })} />}
          label="Fragile Item (+$25)"
        />
        <FormControlLabel
          control={<Checkbox checked={packageData.insurance} onChange={(e) => setPackageData({ ...packageData, insurance: e.target.checked })} />}
          label="Add Insurance (+$50)"
        />

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
