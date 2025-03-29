import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ Make sure this matches your app structure
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link,
} from "@mui/material";

export default function CustLogin() {
  const { login } = useContext(AuthContext); // ✅ Uses AuthContext to track login
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetMessage, setResetMessage] = useState(null);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isNewPassMode, setIsNewPassMode] = useState(false);
  const [tempUserData, setTempUserData] = useState([]);
  const [secAnswer, setSecAnswer] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleLogin = async () => {
    setError(null);
    setResetMessage(null);

    if (!email) return setError("⚠ Please enter your email.");
    if (!password) return setError("⚠ Please enter your password.");

    // Log email and password to the console
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch(
        " https://apipost.vercel.app/api/custLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }

      const data = await response.json();

      const customer = {
        ...data.user,
        role: "Customer", //since a customer logged in, set role to "Customer
      };
      login(customer); // ✅ Save user in context

      alert("🎉 Login successful!");
      navigate("/dashboard"); // ✅ Redirects to Dashboard
      window.location.reload();
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  const handleForgotPassword = () => {
    setIsResetMode(true);
    setError(null);
    setResetMessage(null);
    setIsNewPassMode(null);
  };
  const handleContinue = () => {
    setIsResetMode(false);
    setError(null);
    setResetMessage(null);
    setIsNewPassMode(true);
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        ` https://apipost.vercel.app/api/CustEmailExists?email=${email}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "failure");
      }

      const userData = await response.json();
      setTempUserData(userData.user);

      if (userData.success === true) {
        alert("account exists with this email");
        handleContinue();
      } else {
        setError(userData.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNewPass = async () => {
    try {
      const response = await fetch(
        " https://apipost.vercel.app/api/CustNewPass",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, secAnswer, newPass }),
        }
      );

      const res = await response.json();

      if (res.success === true) {
        alert("Updated password successfully");
        window.location.reload();
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          style={{
            padding: "50px",
            width: "400px",
            backgroundColor: "#FFF",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {error && (
            <Alert severity="error" style={{ marginBottom: "15px" }}>
              {error}
            </Alert>
          )}
          {resetMessage && (
            <Alert severity="success" style={{ marginBottom: "15px" }}>
              {resetMessage}
            </Alert>
          )}

          {/* EMAIL FIELD */}
          {/* PASSWORD & LOGIN BUTTON - HIDDEN IN RESET MODE */}
          {!isResetMode && !isNewPassMode && (
            <>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: "bold", color: "#333" }}
              >
                Customer Login
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginBottom: "20px" }}
              >
                Please enter your credentials to continue
              </Typography>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                style={{
                  marginTop: "20px",
                  padding: "12px 0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#D32F2F",
                  color: "#FFF",
                }}
                onClick={handleLogin}
              >
                LOGIN
              </Button>

              {/* Forgot Password Link */}
              <Typography variant="body2" style={{ marginTop: "15px" }}>
                <Link
                  href="#"
                  onClick={handleForgotPassword}
                  style={{ fontSize: "14px", color: "#B71C1C" }}
                >
                  Forgot Password?
                </Link>
              </Typography>
            </>
          )}

          {/* RESET PASSWORD BUTTON - ONLY VISIBLE IN RESET MODE */}
          {isResetMode && !isNewPassMode && (
            <>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginBottom: "20px" }}
              >
                Please enter your email to reset your password
              </Typography>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                style={{
                  marginTop: "20px",
                  padding: "12px 0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#D32F2F",
                  color: "#FFF",
                }}
                onClick={handleResetPassword}
              >
                continue
              </Button>
            </>
          )}

          {isNewPassMode && (
            <>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                Security Question
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "20px" }}>
                {tempUserData.security_question}
              </Typography>

              {/* Security Answer Input */}
              <TextField
                fullWidth
                label="Answer"
                variant="outlined"
                margin="normal"
                value={secAnswer}
                onChange={(e) => setSecAnswer(e.target.value)} // Store the answer in secAnswer state
              />
              <TextField
                fullWidth
                label="New password"
                variant="outlined"
                margin="normal"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)} // Store the answer in secAnswer state
              />

              <Button
                fullWidth
                variant="contained"
                style={{
                  marginTop: "20px",
                  padding: "12px 0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#D32F2F",
                  color: "#FFF",
                }}
                onClick={handleNewPass}
              >
                Submit Answer
              </Button>
            </>
          )}

          {/* SIGN UP LINK */}
          {!isResetMode && !isNewPassMode && (
            <Typography
              variant="body2"
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              Don't have an account?{" "}
              <Button
                color="inherit"
                onClick={() => navigate("/CustSignup")}
                style={{ color: "#D32F2F", fontWeight: "bold" }}
              >
                Sign Up
              </Button>
            </Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
}
