import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Container, TextField, Button, Typography, Paper, MenuItem, FormControlLabel, Checkbox, Alert, Grid } from "@mui/material";
//http://localhost:58406/CustAddPackage
export default function CustomerPackageEntry() {
  const { user } = useContext(AuthContext);
  //const navigate = useNavigate();

  const states = [
    "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"
  ];

  const stateNames = {
    al: "Alabama", ak: "Alaska", az: "Arizona", ar: "Arkansas", ca: "California", co: "Colorado", ct: "Connecticut", de: "Delaware", fl: "Florida", ga: "Georgia", hi: "Hawaii", id: "Idaho", il: "Illinois", in: "Indiana", ia: "Iowa", ks: "Kansas", ky: "Kentucky", la: "Louisiana", me: "Maine", md: "Maryland", ma: "Massachusetts", mi: "Michigan", mn: "Minnesota", ms: "Mississippi", mo: "Missouri", mt: "Montana", ne: "Nebraska", nv: "Nevada", nh: "New Hampshire", nj: "New Jersey", nm: "New Mexico", ny: "New York", nc: "North Carolina", nd: "North Dakota", oh: "Ohio", ok: "Oklahoma", or: "Oregon", pa: "Pennsylvania", ri: "Rhode Island", sc: "South Carolina", sd: "South Dakota", tn: "Tennessee", tx: "Texas", ut: "Utah", vt: "Vermont", va: "Virginia", wa: "Washington", wv: "West Virginia", wi: "Wisconsin", wy: "Wyoming"
  };
  const [selectedState, setSelectedState] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [selectedPostOffice, setSelectedPostOffice] = useState("");
  useEffect(() => {
    if (selectedState) {
      fetch(`/api/postOffices?state=${selectedState}`)
        .then((res) => res.json())
        .then((data) => setPostOffices(data))
        .catch((error) => console.error("Error fetching post offices:", error));
    }
  }, [selectedState]);

  const navigate = useNavigate();
  const customersId = user?.customers_id; // Get customer ID
  const originAddressId = user?.address_id; // Get customer address ID

  const newCustData = {
    ...FormData,
    customersId: customersId,
    originAddressId: originAddressId,
  };

  const [packageData, setPackageData] = useState({
    receiverName: "",
    receiverStreet: "",
    receiverApartment: "",
    receiverCity: "",
    receiverState: "",
    receiverZip: "",
    packageType: "Envelope",
    weight: "",
    fragile: false,
    insurance: false,
    fastdelivery: false,
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
    if (packageData.fragile) basePrice += 5;

    // Add insurance charge
    if (packageData.insurance) basePrice += 10;

    if (packageData.fastdelivery) basePrice += 12;


    // Add service charge
    const selectedService = serviceOptions.find(s => s.label === packageData.serviceType);
    basePrice += selectedService?.price || 0;

    return basePrice.toFixed(2);
  };

  const handleSubmit = async () => {
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
  
    // Prepare data for backend API
    const payload = {
      receiverName: packageData.receiverName,
      receiverStreet: packageData.receiverStreet,
      receiverApartment: packageData.receiverApartment,
      receiverCity: packageData.receiverCity,
      receiverState: packageData.receiverState,
      receiverZip: packageData.receiverZip,
      weight: parseFloat(packageData.weight),
      status: "Pending",
      customersId: 1, // Replace with actual customer ID
      originAddressId: 1, // Replace with actual origin address ID
      destinationAddressId: null, // Will be created in the backend
      purchasedInsurance: packageData.insurance ? "Y" : "N",
      fastDelivery: packageData.fastdelivery ? "Y" : "N",
      fragile: packageData.fragile ? "Y" : "N",
      poId: 1, // Replace with actual post office ID
      type: packageData.packageType,
      totalAmount: totalPrice,
      transactionDate: new Date().toISOString().split('T')[0],
      totalTax: (totalPrice * 0.1).toFixed(2), // Example tax calculation (10%)
    };
  
    try {
      const response = await fetch('/api/handler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log("✅ Package added successfully:", result);
        navigate("/PackageCheckOut", { state: { totalPrice, packageData } });
      } else {
        console.error("❌ Error adding package:", result.error);
        setError(result.error || "An error occurred while processing your request.");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setError("An error occurred while connecting to the server. Please try again later.");
    }
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
          label="Fragile Item (+$5)"
        />
        <FormControlLabel
          control={<Checkbox checked={packageData.insurance} onChange={(e) => setPackageData({ ...packageData, insurance: e.target.checked })} />}
          label="Add Insurance (+$10)"
        />
        <FormControlLabel
          control={<Checkbox checked={packageData.fastdelivery} onChange={(e) => setPackageData({ ...packageData, fastdelivery : e.target.checked })} />}
          label="fast delivery (+$12)"
        />

        {/* Total Price */}
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "20px" }}>
          💲 Total: ${calculateTotalPrice()}
        </Typography>

      
      </Paper>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5">📍 Select Drop-Off Location</Typography>

        <Grid container spacing={2}>
          {/* State Dropdown */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Select State"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {states.map((stateCode) => (
                <MenuItem key={stateCode} value={stateCode}>
                  {stateCode.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Post Office Dropdown */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Select Post Office"
              value={selectedPostOffice}
              onChange={(e) => setSelectedPostOffice(e.target.value)}
            >
              {postOffices.map((po) => (
                <MenuItem key={po.id} value={po.id}>
                  {po.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Submit Button */}
        {/* Checkout Button */}
        <Button fullWidth variant="contained" sx={{ color: '#ffffff', backgroundColor: '#D32F2F' }} style={{ marginTop: "15px" }} onClick={handleSubmit}>
          🛒 Proceed to Checkout
        </Button>
        
      </Paper>

    </Container>
    
  );
}
