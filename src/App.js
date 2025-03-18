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
import EmpDashboard from "./app/EmpDashboard";

const App = () => {
  const { isCustomer, isAdmin, isManager, isDriver, isClerk } = useContext(AuthContext);

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
                        <Button color="inherit" component={Link} to="/EmpLogin">Employee Login</Button>
                      </>
                    )}

                    {/* Show Dashboard When Logged In */}
                    {/* Customer Pages */}
                    {/* ONLY VISIBLE/ACCESSIBLE WHEN A CUSTOMER IS LOGGED IN */}
                    {isCustomer() && (
                      <>
                        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/store">Store</Button>
                        <Button color="inherit" component={Link} to="/ask-store-location">Select Store Location</Button>
                        <Button color="inherit" component={Link} to="/MyPackages">My Packages</Button>
                        <Button color="inherit" component={Link} to="/delivered-messages">Delivered Packages</Button>
                        <Button color="inherit" component={Link} to="/CustAddPackage">Ship a New Packag3</Button>
                      </>
                    )}

                    {/*if there's a user logged in, and it's not a customer, then its an employee*/}
                    {/*LINK TO EMPLOYEE DASHBOARD*/}
                    {user && !isCustomer() && (
                      <>
                        <Button color="inherit" component={Link} to="/EmpDashboard">EmpDashboard</Button>
                      </>
                    )}

                    {/* Admin Pages */}
                    {isAdmin() && (
                      <>
                        <Button color="inherit" component={Link} to="/AddPO">Add a Post Office</Button>
                        <Button color="inherit" component={Link} to="/ViewPO">View Post Offices</Button>
                        <Button color="inherit" component={Link} to="/AddMngr">Add Manager</Button>
                        <Button color="inherit" component={Link} to="/ViewStaff">View Staff</Button>
                      </>
                    )}

                    {/* Manager Pages */}
                    {isManager() && (
                      <>
                        <Button color="inherit" component={Link} to="/AddStore">Add Items to Store</Button>
                        <Button color="inherit" component={Link} to="/AddStaff">Add Staff Member</Button>
                        <Button color="inherit" component={Link} to="/MngrViewStaff">View My Staff</Button>
                        <Button color="inherit" component={Link} to="/ViewStaffActivity">View Staff Activity</Button>
                      </>
                    )}
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
                  {!user && <Route path="/EmpLogin" element={<EmpLogin />} />}

                  {/*if there's a user logged in, and it's not a customer, then its an employee*/}
                  {/*LINK TO EMPLOYEE DASHBOARD*/}
                  {user && !isCustomer() && (
                    <>
                      <Route path="/EmpDashboard" element={<EmpDashboard />} />
                    </>
                  )}

                  {/* Protected Route - Dashboard Only if Logged In */}
                  {isCustomer() && <Route path="/dashboard" element={<Dashboard />} />}
                  

                  {/* Customer Pages */}
                  {/* ONLY VISIBLE/ACCESSIBLE WHEN A CUSTOMER IS LOGGED IN */}
                  {isCustomer() && (
                    <>
                      <Route path="/ask-store-location" element={<AskPostOfficeForStore />} />
                      <Route path="/store" element={<Store />} />
                      <Route path="/Checkout" element={<Checkout />} />
                      <Route path="/MyPackages" element={<MyPackages />} />
                      <Route path="/TrackPackage" element={<TrackPackage />} />
                      <Route path="/PackageDetails" element={<PackageDetails />} />
                      <Route path="/delivered-messages" element={<DeliveredMessagesPage />} />
                      <Route path="/CustAddPackage" element={<CustAddPackage />} />
                      <Route path="/PackageCheckOut" element={<PackageCheckOut />} />
                    </>
                  )}

                  {/* Admin Pages */}
                  {/* ONLY VISIBLE/ACCESSIBLE WHEN AN ADMIN IS LOGGED IN */}
                  <Route path="/AddPO" element={<AddPO />} />
                  <Route path="/ViewPO" element={<ViewPO />} />
                  <Route path="/AddMngr" element={<AddMngr />} />
                  <Route path="/ViewStaff" element={<ViewStaff />} />

                  {/* Manager Pages */}
                  {/* ONLY VISIBLE/ACCESSIBLE WHEN AN MANAGER IS LOGGED IN */}
                  <Route path="/AddStore" element={<AddStore />} />
                  <Route path="/AddStaff" element={<AddStaff />} />
                  <Route path="/MngrViewStaff" element={<MngrViewStaff />} />
                  <Route path="/ViewStaffActivity" element={<ViewStaffActivity />} />

                  {/* Clerk/Driver Pages */}
                  {/* ONLY VISIBLE/ACCESSIBLE WHEN A CLERK OR DRIVER IS LOGGED IN */}
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
