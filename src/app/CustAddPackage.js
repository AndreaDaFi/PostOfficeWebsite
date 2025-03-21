import React, { useState, useEffect, useContext } from "react";
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
} from "@mui/material";
//http://localhost:58406/CustAddPackage
export default function CustomerPackageEntry() {
  const { user } = useContext(AuthContext);
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
          "https://vercel-api-powebapp.vercel.app/api/CustAddPackage"
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
  const calculateTotalPrice = () => {
    let basePrice = 0;
    if (packageData.packageType === "envelope") {
      basePrice = 20; // Flat fee for envelopes
    } else if (packageData.packageType === "box") {
      const selectedWeight = weightOptions.find(
        (w) => w.value === parseFloat(packageData.weight)
      );
      const selectedSize = sizeOptions.find(
        (s) => s.label === packageData.size
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

  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <Paper
        elevation={3}
        style={{ padding: "20px", borderRadius: "12px", textAlign: "center" }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{ fontWeight: "bold", color: "#D32F2F" }}
        >
          Enter a New Package
        </Typography>

        {error && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {error}
          </Alert>
        )}

        {/* Receiver Info */}
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", marginTop: "10px" }}
        >
          receiver information
        </Typography>

        {/* Address */}
        <Grid container spacing={2}>
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
          <>
            <TextField
              select
              fullWidth
              label="Select Weight"
              name="weight"
              variant="outlined"
              margin="normal"
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

            <TextField
              select
              fullWidth
              label="Select Size"
              name="size"
              variant="outlined"
              margin="normal"
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
          </>
        )}

        {/* Extra Services */}
        <FormControlLabel
          control={
            <Checkbox
              checked={packageData.fragile}
              onChange={(e) =>
                setPackageData({ ...packageData, fragile: e.target.checked })
              }
            />
          }
          label="Fragile Item (+$5)"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={packageData.insurance}
              onChange={(e) =>
                setPackageData({ ...packageData, insurance: e.target.checked })
              }
            />
          }
          label="Add Insurance (+$10)"
        />
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
            />
          }
          label="fast delivery (+$12)"
        />
        <div style={{ height: "20px" }}></div>
        <Typography variant="h5">Select a Drop-Off Location</Typography>
        <Typography variant="body1">
          All customers have to drop off their packages at their nearest post
          office for us to deliver it.
        </Typography>
        {/* Post Office Dropdown */}
        <Grid item xs={6}>
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
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "20px" }}
        >
          💲 Total: ${calculateTotalPrice()}
        </Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: 20 }}>
        {/* Checkout Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{ color: "#ffffff", backgroundColor: "#D32F2F" }}
          style={{ marginTop: "15px" }}
          onClick={handleSubmit}
        >
          🛒 Proceed to Checkout
        </Button>
      </Paper>
    </Container>
  );
}
