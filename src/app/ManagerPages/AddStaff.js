import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function AddStaff() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    salary: "",
    hire_date: new Date().toISOString().split("T")[0], // Set current date as default
    ssn: "",
    role: "",
    email: "",
    phone: "",
    street: "",
    streetLine2: "",
    aptNumber: "",
    city: "",
    state: "",
    zipCode: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const birthdateValid = (birthdate) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!datePattern.test(birthdate)) return false;

    const [year, month, day] = birthdate.split("-").map(Number);

    // Check if the year, month, and day are valid integers
    if (
      year < 1900 ||
      year > 2006 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return false;
    }

    return true;
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || formData.firstName.length > 20)
      return "⚠ First Name must be up to 20 characters.";
    if (!formData.lastName.trim() || formData.lastName.length > 30)
      return "⚠ Last Name must be up to 30 characters.";
    if (!formData.birthdate) return "⚠ Birthdate is required.";
    if (!formData.birthdate) return "⚠ Birthdate is required.";
    if (!birthdateValid(formData.birthdate))
      return "⚠ You must be over 18 and Use YYYY-MM-DD format.";
    if (!formData.salary || isNaN(formData.salary))
      return "⚠ Salary must be a valid decimal number.";
    if (
      !formData.ssn.trim() ||
      formData.ssn.length !== 9 ||
      isNaN(formData.ssn)
    )
      return "⚠ SSN must be exactly 9 digits.";
    if (!formData.role) return "⚠ Please select a role.";
    if (!formData.street.trim() || formData.street.length > 45)
      return "⚠ Street address must be up to 45 characters.";
    if (formData.streetLine2.length > 45)
      return "⚠ Street Address Line 2 must be up to 45 characters.";
    if (!formData.city.trim() || formData.city.length > 45)
      return "⚠ City must be up to 45 characters.";
    if (!formData.state) return "⚠ Please select a state.";
    if (
      !formData.zipCode.trim() ||
      formData.zipCode.length !== 5 ||
      isNaN(formData.zipCode)
    )
      return "⚠ Zip Code must be exactly 5 digits.";
    if (!formData.password.trim() || formData.password.length > 10)
      return "⚠ Password must be up to 10 characters.";
    if (!formData.securityQuestion)
      return "⚠ Please select a security question.";
    if (!formData.securityAnswer.trim() || formData.securityAnswer.length > 10)
      return "⚠ Security answer must be up to 10 characters.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return "⚠ Please enter a valid email address.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      return "⚠ Please enter a valid phone number (10 digits).";
    return null;
  };

  const handleAddStaff = async () => {
    setError(null);
    setSuccessMessage(null);

    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);

    try {
      // gets the employees_id of the manager that's currently logged in
      const mngrID = user?.employees_id;
      const po_id = user?.po_id;
      // adds this id to the data that needs to be passed to the api
      const newStaffData = {
        ...formData, // the actual employee data collected
        mngr_id: mngrID, // pass the current manager's id to the api
        po_id: po_id,
      };

      const response = await fetch("https://vercel-api-powebapp.vercel.app/api/AddStaff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaffData),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Staff creation failed");

      setSuccessMessage("🎉 Staff member created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // List of U.S. states for the dropdown
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Paper
                elevation={5}
                style={{
                  padding: "20px",
                  backgroundColor: "#FFF",
                  maxWidth: "550px",
                  marginLeft: "0",
                }}
              >
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Add New Staff Member
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Add a new staff member to the system.
          </Typography>

          {error && (
            <Alert severity="error" style={{ marginTop: "15px" }}>
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" style={{ marginTop: "15px" }}>
              {successMessage}
            </Alert>
          )}

          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 20 }}
                helperText="Up to 20 characters"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 30 }}
                helperText="Up to 30 characters"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Birthdate"
                name="birthdate"
                onChange={handleChange}
                required
                value={formData.birthdate}
                helperText="Enter date in YYYY-MM-DD format"
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Salary"
                name="salary"
                onChange={handleChange}
                required
                helperText="Decimal number"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="SSN"
                name="ssn"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 9 }}
                helperText="Exactly 9 digits"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value="Driver">Driver</MenuItem>
                  <MenuItem value="Clerk">Clerk</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Address Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="street"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address Line 2"
                name="streetLine2"
                onChange={handleChange}
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters (optional)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Apartment Number"
                name="aptNumber"
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
                helperText="Optional"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 45 }}
                helperText="Up to 45 characters"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {stateNames[state]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 5 }}
                helperText="Exactly 5 digits"
              />
            </Grid>

            {/* Security & Password Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 10 }}
                helperText="Up to 10 characters"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Security Question</InputLabel>
                <Select
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                >
                  <MenuItem value="What is your pet’s name?">
                    What is your pet’s name?
                  </MenuItem>
                  <MenuItem value="What is your mother's maiden name?">
                    What is your mother's maiden name?
                  </MenuItem>
                  <MenuItem value="What is your favorite book?">
                    What is your favorite book?
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Security Answer"
                name="securityAnswer"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 10 }}
                helperText="Up to 10 characters"
              />
            </Grid>

            {/* Email and Phone Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 50 }}
                helperText="Valid email address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                onChange={handleChange}
                required
                inputProps={{ maxLength: 10 }}
                helperText="10 digits (e.g., 1234567890)"
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", padding: "12px" }}
            onClick={handleAddStaff}
          >
            ADD STAFF
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
