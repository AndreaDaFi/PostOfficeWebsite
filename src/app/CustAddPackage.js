"use client";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  Grid,
  Box,
} from "@mui/material";

export default function CustomerPackageEntry() {
  const { user } = useContext(AuthContext);
  const [estimatedDelivery,setEstimatedDelivery] = useState(new Date()); // Initialize estimatedDelivery with the current date
  //const navigate = useNavigate();

  const states = [
    "al",
    "ak",
    "az",
    "ar",
    "ca",
    "co",
    "ct",
    "de",
    "fl",
    "ga",
    "hi",
    "id",
    "il",
    "in",
    "ia",
    "ks",
    "ky",
    "la",
    "me",
    "md",
    "ma",
    "mi",
    "mn",
    "ms",
    "mo",
    "mt",
    "ne",
    "nv",
    "nh",
    "nj",
    "nm",
    "ny",
    "nc",
    "nd",
    "oh",
    "ok",
    "or",
    "pa",
    "ri",
    "sc",
    "sd",
    "tn",
    "tx",
    "ut",
    "vt",
    "va",
    "wa",
    "wv",
    "wi",
    "wy",
  ];

  const stateNames = {
    al: "Alabama",
    ak: "Alaska",
    az: "Arizona",
    ar: "Arkansas",
    ca: "California",
    co: "Colorado",
    ct: "Connecticut",
    de: "Delaware",
    fl: "Florida",
    ga: "Georgia",
    hi: "Hawaii",
    id: "Idaho",
    il: "Illinois",
    in: "Indiana",
    ia: "Iowa",
    ks: "Kansas",
    ky: "Kentucky",
    la: "Louisiana",
    me: "Maine",
    md: "Maryland",
    ma: "Massachusetts",
    mi: "Michigan",
    mn: "Minnesota",
    ms: "Mississippi",
    mo: "Missouri",
    mt: "Montana",
    ne: "Nebraska",
    nv: "Nevada",
    nh: "New Hampshire",
    nj: "New Jersey",
    nm: "New Mexico",
    ny: "New York",
    nc: "North Carolina",
    nd: "North Dakota",
    oh: "Ohio",
    ok: "Oklahoma",
    or: "Oregon",
    pa: "Pennsylvania",
    ri: "Rhode Island",
    sc: "South Carolina",
    sd: "South Dakota",
    tn: "Tennessee",
    tx: "Texas",
    ut: "Utah",
    vt: "Vermont",
    va: "Virginia",
    wa: "Washington",
    wv: "West Virginia",
    wi: "Wisconsin",
    wy: "Wyoming",
  };

  const [selectedState, setSelectedState] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [selectedPostOffice, setSelectedPostOffice] = useState("");

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchPostOffices = async () => {
      try {
        const response = await fetch(
          "https://final-po-api.vercel.app/api/CustAddPackage"
        ); // Your API endpoint
        const result = await response.json();

        if (result.success) {
          setPostOffices(result.data); // Set the fetched data to state
        } else {
          setError("Failed to load post office data.");
        }
      } catch (error) {
        setError(error.message); // Set error if fetch fails
      }
    };

    fetchPostOffices();
  }, []);

  const navigate = useNavigate();
  const customersId = user?.customers_id;
  const originAddressId = user?.address_id;

  const [packageData, setPackageData] = useState({
    receiverName: "",
    receiverStreet: "",
    receiverStreet2: "",
    receiverApartment: "",
    receiverCity: "",
    receiverState: "",
    receiverZip: "",
    packageType: "envelope",
    weight: "",
    size: "",
    fragile: false,
    insurance: false,
    fastdelivery: false,
    po_id: "",
  });

  useEffect(() => {
    //pass the user's data to the new package being created
    if (customersId && originAddressId) {
      setPackageData((prevState) => ({
        ...prevState,
        customerID: customersId,
        addressID: originAddressId,
      }));
    }
  }, [customersId, originAddressId]);

  const [error, setError] = useState(null);

  const weightOptions = [
    { label: "1 kg", value: 1, price: 5 },
    { label: "5 kg", value: 5, price: 15 },
    { label: "10 kg", value: 10, price: 25 },
    { label: "20 kg", value: 20, price: 40 },
    { label: "50 kg", value: 50, price: 75 },
  ];

  const sizeOptions = [
    { label: "Small (30x20x10 cm)", value: "s", price: 5 },
    { label: "Medium (50x40x30 cm)", value: "m", price: 10 },
    { label: "Large (80x60x40 cm)", value: "l", price: 15 },
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

  const validateAptNumber = (value) => {
    return /^[0-9]*$/.test(value);
  };

  const validateZipCode = (value) => {
    return /^[0-9]{5}$/.test(value);
  };

  const getDeliveryDate = () => {
    const today = new Date();
    if (packageData.fastdelivery) {
      estimatedDelivery.setDate(today.getDate() + 2); // Add 2 days for fast delivery
    } else {
      estimatedDelivery.setDate(today.getDate() + 10); // Add 10 days for regular delivery
    }
    return estimatedDelivery.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  }


  const calculateTotalPrice = () => {
    let basePrice = 0;
    if (packageData.packageType === "envelope") {
      basePrice = 20; // Flat fee for envelopes
    } else if (packageData.packageType === "box") {
      const selectedWeight = weightOptions.find(
        (w) => w.value === Number.parseFloat(packageData.weight)
      );
      const selectedSize = sizeOptions.find(
        (s) => s.value === packageData.size
      );
      basePrice = (selectedWeight?.price || 0) + (selectedSize?.price || 0);
    }
    //extra charges
    if (packageData.fragile) basePrice += 5;
    if (packageData.insurance) basePrice += 10;
    if (packageData.fastdelivery) basePrice += 12;

    return basePrice.toFixed(2);
  };

  const handleSubmit = async () => {
    setError(null);
    if (
      !validateStreetAddress(packageData.receiverStreet) ||
      !validateStreetAddress(packageData.receiverStreet2) ||
      !validateAptNumber(packageData.receiverApartment) ||
      !validateZipCode(packageData.receiverZip) ||
      !validateCity(packageData.receiverCity) ||
      !validateState(packageData.receiverState) ||
      !validateName(packageData.receiverName) ||
      !packageData.receiverName ||
      !packageData.receiverCity ||
      !packageData.receiverState ||
      !packageData.receiverStreet ||
      !packageData.receiverZip
    ) {
      setError("⚠ Please fill in all required fields correctly.");
      return;
    }

    const totalPrice = calculateTotalPrice();

    const payload = {
      receiver_name: packageData.receiverName,
      street: packageData.receiverStreet,
      street2: packageData.receiverStreet2,
      apt: packageData.receiverApartment,
      city_name: packageData.receiverCity,
      state_id: packageData.receiverState,
      zip: packageData.receiverZip,
      weight: packageData.weight,
      size: packageData.size,
      status: "printed label",
      customers_id: packageData.customerID,
      origin_address_id: packageData.addressID,
      purchased_insurance: packageData.insurance ? 1 : 0,
      fast_delivery: packageData.fastdelivery ? 1 : 0,
      fragile: packageData.fragile ? 1 : 0,
      po_id: packageData.po_id, // Replace with actual post office ID
      type: packageData.packageType,
      base_price: totalPrice,
      transaction_date: new Date().toISOString().split("T")[0],
    };
    console.log("data being passed", payload);

    navigate("/PackageCheckOut", { state: { totalPrice, payload } });
  };

  // Format the estimated delivery date (optional - if you want it in a specific format)
  const formattedEstDelivery = estimatedDelivery.toISOString().split("T")[0]; // YYYY-MM-DD format

  console.log("Estimated Delivery Date:", formattedEstDelivery);

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      {/* Header with gradient background */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 3,
          background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
          position: "relative",
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
        <Box
          sx={{ p: 4, position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Typography variant="h4" fontWeight="bold" color="white">
            Enter a New Package
          </Typography>
        </Box>
      </Paper>

      {/* Main form content */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 2,
          mb: 3,
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Receiver Info */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#B71C1C",
          }}
        >
          Receiver Information
        </Typography>

        {/* Address */}
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Receiver Name"
              name="receiverName"
              variant="outlined"
              value={packageData.receiverName}
              onChange={(e) =>
                setPackageData({ ...packageData, receiverName: e.target.value })
              }
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
              onChange={(e) =>
                setPackageData({
                  ...packageData,
                  receiverStreet: e.target.value,
                })
              }
              helperText="Max 45 characters"
              error={packageData.receiverStreet.length > 45}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Street Address line 2"
              name="receiverStreet2"
              variant="outlined"
              value={packageData.receiverStreet2}
              onChange={(e) =>
                setPackageData({
                  ...packageData,
                  receiverStreet2: e.target.value,
                })
              }
              helperText="Max 45 characters (optional)"
              error={packageData.receiverStreet2.length > 45}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Apt #"
              name="receiverApartment"
              variant="outlined"
              value={packageData.receiverApartment}
              onChange={(e) =>
                setPackageData({
                  ...packageData,
                  receiverApartment: e.target.value,
                })
              }
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
              onChange={(e) =>
                setPackageData({ ...packageData, receiverCity: e.target.value })
              }
              error={packageData.receiverCity.length > 45}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              label="State"
              name="receiverState"
              variant="outlined"
              helperText="Select a state"
              value={packageData.receiverState}
              onChange={(e) =>
                setPackageData({
                  ...packageData,
                  receiverState: e.target.value,
                })
              }
              error={packageData.receiverState.length > 45}
            >
              {states.map((stateId) => (
                <MenuItem key={stateId} value={stateId}>
                  {stateNames[stateId]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Zip Code"
              name="receiverZip"
              variant="outlined"
              value={packageData.receiverZip}
              onChange={(e) =>
                setPackageData({ ...packageData, receiverZip: e.target.value })
              }
              error={!validateZipCode(packageData.receiverZip)}
              helperText="Must be 5 digits"
            />
          </Grid>
        </Grid>

        {/* Package Type */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mt: 4,
            mb: 2,
            color: "#B71C1C",
          }}
        >
          Package Details
        </Typography>

        <TextField
          select
          fullWidth
          label="Package Type"
          name="packageType"
          variant="outlined"
          margin="normal"
          value={packageData.packageType}
          onChange={(e) => {
            const newPackageType = e.target.value;
            setPackageData({
              ...packageData,
              packageType: newPackageType,
              weight: newPackageType === "envelope" ? "" : packageData.weight,
              size: newPackageType === "envelope" ? "" : packageData.size,
            });
          }}
        >
          <MenuItem value="envelope">Envelope ($20)</MenuItem>
          <MenuItem value="box">Box (Price based on weight & size)</MenuItem>
        </TextField>

        {/* Weight & Size (Only if Box) */}
        {packageData.packageType === "box" && (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Select Weight"
                name="weight"
                variant="outlined"
                value={packageData.weight}
                onChange={(e) =>
                  setPackageData({ ...packageData, weight: e.target.value })
                }
              >
                {weightOptions.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label} (+${option.price})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Select Size"
                name="size"
                variant="outlined"
                value={packageData.size}
                onChange={(e) =>
                  setPackageData({ ...packageData, size: e.target.value })
                }
              >
                {sizeOptions.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label} (+${option.price})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        )}

        {/* Extra Services */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mt: 4,
            mb: 2,
            color: "#B71C1C",
          }}
        >
          Additional Services
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={packageData.fragile}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      fragile: e.target.checked,
                    })
                  }
                  sx={{
                    color: "#D32F2F",
                    "&.Mui-checked": {
                      color: "#D32F2F",
                    },
                  }}
                />
              }
              label="Fragile Item (+$5)"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={packageData.insurance}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      insurance: e.target.checked,
                    })
                  }
                  sx={{
                    color: "#D32F2F",
                    "&.Mui-checked": {
                      color: "#D32F2F",
                    },
                  }}
                />
              }
              label="Add Insurance (+$10)"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={packageData.fastdelivery}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      fastdelivery: e.target.checked,
                    })
                  }
                  sx={{
                    color: "#D32F2F",
                    "&.Mui-checked": {
                      color: "#D32F2F",
                    },
                  }}
                />
              }
              label="Fast Delivery (+$12)"
            />
          </Grid>
        </Grid>

        {/* Post Office Selection */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mt: 4,
            mb: 2,
            color: "#B71C1C",
          }}
        >
          Drop-Off Location
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          All customers have to drop off their packages at their nearest post
          office for us to deliver it.
        </Typography>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Select Post Office"
            value={selectedPostOffice}
            onChange={(e) => {
              const selectedPoId = e.target.value;

              // Update selected post office state
              setSelectedPostOffice(selectedPoId);

              // Find the selected post office by po_id and update packageData with po_id
              const selectedPost = postOffices.find(
                (po) => po.po_id === selectedPoId
              );
              if (selectedPost) {
                setPackageData((prevState) => ({
                  ...prevState,
                  po_id: selectedPost.po_id, // Update packageData with selected po_id
                }));
              }
            }}
          >
            {/* Show a loading message while postOffices is empty or undefined */}
            {postOffices.length === 0 ? (
              <MenuItem disabled>No Post Offices Available</MenuItem>
            ) : (
              postOffices.map((po) => (
                <MenuItem key={po.po_id} value={po.po_id}>
                  {po.address}
                </MenuItem>
              ))
            )}
          </TextField>
        </Grid>

        {/* Total Price */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            textAlign: "center",
            bgcolor: "#FFEBEE",
            borderRadius: 2,
            border: "1px solid #FFCDD2",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#B71C1C" }}
          >
            Total: ${calculateTotalPrice()}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#B71C1C" }}
          >
            Est. Delivery: {getDeliveryDate()}
          </Typography>
        </Box>
      </Paper>

      {/* Checkout Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          py: 1.5,
          bgcolor: "#B71C1C",
          "&:hover": { bgcolor: "#8B0000" },
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
        onClick={handleSubmit}
      >
        Proceed to Checkout
      </Button>
    </Container>
  );
}
