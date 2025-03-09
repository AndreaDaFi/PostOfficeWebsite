import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import CustLogin from './app/CustLogin';
import EmpLogin from './app/EmpLogin';
import Home from './app/Home';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Best Post Office Ever
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/cust-login">Customer Login</Button>
          <Button color="inherit" component={Link} to="/emp-login">Employee Login</Button>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cust-login" element={<CustLogin />} />
          <Route path="/emp-login" element={<EmpLogin />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;