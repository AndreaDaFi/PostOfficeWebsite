import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import CustLogin from './app/CustLogin';
import EmpLogin from './app/EmpLogin';
import Store from './app/Store';
import Home from './app/Home';
import MyPackages from './app/MyPackages';
import TrackPackage from './app/TrackPackage';
import AddPO from './app/AddPO';
import AddMngr from './app/AddMngr';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Best Post Office Ever
          </Typography>
          {/*pages anyone could see when openning the app*/}
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/cust-login">Customer Login</Button>
          <Button color="inherit" component={Link} to="/emp-login">Employee Login</Button>

          {/*pages only customers should be able to see*/}
          <Button color="inherit" component={Link} to="/store">store</Button>
          <Button color="inherit" component={Link} to="/MyPackages">My Packages</Button>
          <Button color="inherit" component={Link} to="/TrackPackage">Track My Package</Button>

          {/*EMPLOYEE PAGES*/}
          {/*pages only Admin should be able to see*/}
          <Button color="inherit" component={Link} to="/AddPO">Add a Post Office</Button>
          <Button color="inherit" component={Link} to="/AddMngr">Add Manager</Button>

          {/*pages only Managers should be able to see*/}
          {/*pages only Drivers should be able to see*/}
          {/*pages only Clerks should be able to see*/}
        </Toolbar>
      </AppBar>
      {/*this section adds the links to these pages*/}
      <Container style={{ marginTop: 20 }}>
        <Routes>
          {/*pages anyone could see when openning the app*/}
          <Route path="/" element={<Home />} />
          <Route path="/cust-login" element={<CustLogin />} />
          <Route path="/emp-login" element={<EmpLogin />} />

          {/*pages only customers should be able to see*/}
          <Route path="/Store" element={<Store />} />
          <Route path="/MyPackages" element={<MyPackages />} />
          <Route path="/TrackPackage" element={<TrackPackage />} />

          {/*EMPLOYEE PAGES*/}
          {/*pages only Admin should be able to see*/}
          <Route path="/AddPO" element={<AddPO />} />
          <Route path="/AddMngr" element={<AddMngr />} />

          {/*pages only Managers should be able to see*/}
          {/*pages only Drivers should be able to see*/}
          {/*pages only Clerks should be able to see*/}
        </Routes>
      </Container>

    </Router>
  );
};

export default App;