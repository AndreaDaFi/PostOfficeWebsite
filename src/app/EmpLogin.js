import React from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

export default function EmpLogin() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 30, marginTop: 50, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>👔 Employee Login</Typography>

        <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal" />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />

        <Button fullWidth variant="contained" color="primary" style={{ marginTop: 20 }}>
          Login as Employee
        </Button>
      </Paper>
    </Container>
  );
}
