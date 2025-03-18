import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Menu, MenuItem, Box } from '@mui/material';
import CustLogin from './app/CustLogin';
import EmpLogin from './app/EmpLogin';
import Store from './app/Store';
import Home from './app/Home';
import MyPackages from './app/MyPackages';
import TrackPackage from './app/TrackPackage';
import AddPO from './app/AddPO';
import AddMngr from './app/AddMngr';
import ViewPO from './app/ViewPO';
import ViewStaff from './app/ViewStaff';
import AddStore from './app/AddStore';
import ReStock from './app/ReStock';
import AddStaff from './app/AddStaff';
import MngrViewStaff from './app/MngrViewStaff';
import ViewStaffActivity from './app/ViewStaffActivity';
import PackageStatus from './app/PackageStatus';
import PackageDetails from './app/PackageDetails';
import CustSignup from './app/CustSignup';
import ClerkAddPackage from './app/ClerkAddPackage';
import CustAddPackage from './app/CustAddPackage';
import Checkout from './app/Checkout';
import PackageCheckOut from './app/PackageCheckOut';
import AddMyHours from './app/AddMyHours';
import LowStockPage from './app/low_stock';
import DeliveredMessagesPage from './app/delivered';
import AskPostOfficeForStore from './app/ask_postof_for_store';
import WorkHours from "./app/h_w";
import Dashboard from "./app/Dashboard";
import { AuthProvider, AuthContext } from "./context/AuthContext";

const App = () => {
  const [anchorElCustomer, setAnchorElCustomer] = useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const [anchorElManager, setAnchorElManager] = useState(null);
  const [anchorElClerk, setAnchorElClerk] = useState(null);
  const [anchorElDriver, setAnchorElDriver] = useState(null);

  const handleMenuClick = (event, setAnchorEl) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (setAnchorEl) => {
    setAnchorEl(null);
  };

  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ user, logout }) => (
            <>
              <AppBar position="static" sx={{ color: '#ffffff', backgroundColor: '#D32F2F' }}>
                <Toolbar>
                  {/* LEFT SIDE - Stays Consistent */}
                  <Box sx={{ flexGrow: 1, display: "flex" }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>

                    {/* Show Login & Signup Only When NOT Logged In */}
                    {!user && (
                      <>
                        <Button color="inherit" component={Link} to="/cust-login">Customer Login</Button>
                        <Button color="inherit" component={Link} to="/CustSignup">Sign Up</Button>
                      </>
                    )}

                    {/* Show Dashboard When Logged In */}
                    {user && (
                      <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                    )}

                    {/* Customer Pages */}
                    <Button color="inherit" onClick={(e) => handleMenuClick(e, setAnchorElCustomer)}>Customer Pages</Button>
                    <Menu anchorEl={anchorElCustomer} open={Boolean(anchorElCustomer)} onClose={() => handleMenuClose(setAnchorElCustomer)}>
                      <MenuItem component={Link} to="/store">Store</MenuItem>
                      <MenuItem component={Link} to="/ask-store-location">Select Store Location</MenuItem>
                      <MenuItem component={Link} to="/MyPackages">My Packages</MenuItem>
                      <MenuItem component={Link} to="/delivered-messages">Delivered Packages</MenuItem>
                      <MenuItem component={Link} to="/CustAddPackage">Ship a New Package</MenuItem>
                    </Menu>

                    {/* Admin Pages */}
                    <Button color="inherit" onClick={(e) => handleMenuClick(e, setAnchorElAdmin)}>Admin Pages</Button>
                    <Menu anchorEl={anchorElAdmin} open={Boolean(anchorElAdmin)} onClose={() => handleMenuClose(setAnchorElAdmin)}>
                      <MenuItem component={Link} to="/AddPO">Add a Post Office</MenuItem>
                      <MenuItem component={Link} to="/ViewPO">View Post Offices</MenuItem>
                      <MenuItem component={Link} to="/AddMngr">Add Manager</MenuItem>
                      <MenuItem component={Link} to="/ViewStaff">View Staff</MenuItem>
                    </Menu>

                    {/* Manager Pages */}
                    <Button color="inherit" onClick={(e) => handleMenuClick(e, setAnchorElManager)}>Manager Pages</Button>
                    <Menu anchorEl={anchorElManager} open={Boolean(anchorElManager)} onClose={() => handleMenuClose(setAnchorElManager)}>
                      <MenuItem component={Link} to="/AddStore">Add Items to Store</MenuItem>
                      <MenuItem component={Link} to="/AddStaff">Add Staff Member</MenuItem>
                      <MenuItem component={Link} to="/MngrViewStaff">View My Staff</MenuItem>
                      <MenuItem component={Link} to="/ViewStaffActivity">View Staff Activity</MenuItem>
                    </Menu>
                  </Box>

                  {/* RIGHT SIDE - Logout Button Stays Here */}
                  {user && (
                    <Button color="inherit" onClick={logout} style={{ color: "#FFD700" }}>
                      🚪 Logout
                    </Button>
                  )}
                </Toolbar>
              </AppBar>

              <Container style={{ marginTop: 20 }}>
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<Home />} />
                  {!user && <Route path="/cust-login" element={<CustLogin />} />}
                  {!user && <Route path="/CustSignup" element={<CustSignup />} />}

                  <Route path="/emp-login" element={<EmpLogin />} />

                  {/* Protected Route - Dashboard Only if Logged In */}
                  {user && <Route path="/dashboard" element={<Dashboard />} />}

                  {/* All Other Pages - Always Accessible */}
                  <Route path="/ask-store-location" element={<AskPostOfficeForStore />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/Checkout" element={<Checkout />} />
                  <Route path="/MyPackages" element={<MyPackages />} />
                  <Route path="/TrackPackage" element={<TrackPackage />} />
                  <Route path="/PackageDetails" element={<PackageDetails />} />
                  <Route path="/delivered-messages" element={<DeliveredMessagesPage />} />
                  <Route path="/CustAddPackage" element={<CustAddPackage />} />
                  <Route path="/PackageCheckOut" element={<PackageCheckOut />} />
                  <Route path="/AddPO" element={<AddPO />} />
                  <Route path="/ViewPO" element={<ViewPO />} />
                  <Route path="/AddMngr" element={<AddMngr />} />
                  <Route path="/ViewStaff" element={<ViewStaff />} />
                  <Route path="/AddStore" element={<AddStore />} />
                  <Route path="/AddStaff" element={<AddStaff />} />
                  <Route path="/MngrViewStaff" element={<MngrViewStaff />} />
                  <Route path="/ViewStaffActivity" element={<ViewStaffActivity />} />
                  <Route path="/ReStock" element={<ReStock />} />
                  <Route path="/low_stock" element={<LowStockPage />} />
                  <Route path="/work-hours" element={<WorkHours />} />
                  <Route path="/ClerkAddPackage" element={<ClerkAddPackage />} />
                  <Route path="/PackageStatus" element={<PackageStatus />} />
                </Routes>
              </Container>
            </>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
};

export default App;
