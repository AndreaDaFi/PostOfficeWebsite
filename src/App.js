import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Menu, MenuItem } from '@mui/material';
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
import Checkout from './app/Checkout'; // checkout if they order items from the store
import PackageCheckOut from './app/PackageCheckOut'; // checkout if they want to ship a package
import AddMyHours from './app/AddMyHours';
import LowStockPage from './app/low_stock';
import DeliveredMessagesPage from './app/delivered';
import AskPostOfficeForStore from './app/ask_postof_for_store';

//import viewStaffAC from './app/view_staffAC';

const App = () => {
  // State for dropdown menus
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
    <Router>
      <AppBar position="static" sx={{ color: '#ffffff', backgroundColor: '#D32F2F' }}>
        <Toolbar>
          {/*pages anyone could see when opening the app*/}
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/cust-login">Customer Login</Button>
          <Button color="inherit" component={Link} to="/emp-login">Employee Login</Button>

          {/* Customer Pages Dropdown */}
          <Button color="inherit" onClick={(e) => handleMenuClick(e, setAnchorElCustomer)}>
            Customer Pages
          </Button>
          <Menu
            anchorEl={anchorElCustomer}
            open={Boolean(anchorElCustomer)}
            onClose={() => handleMenuClose(setAnchorElCustomer)}
          >
          
            <MenuItem component={Link} to="/store">Store</MenuItem>
            <MenuItem component={Link} to="/ask-store-location">Select Store Location</MenuItem>
            <MenuItem component={Link} to="/MyPackages">My Packages</MenuItem>
            <MenuItem component={Link} to="/delivered-messages">Delivered Packages</MenuItem>

            <MenuItem component={Link} to="/CustAddPackage">Ship a New Package</MenuItem>
          </Menu>

          {/* Admin Pages Dropdown */}
          <Button color="inherit" onClick={(e) => handleMenuClick(e, setAnchorElAdmin)}>
            Admin Pages
          </Button>
          <Menu
            anchorEl={anchorElAdmin}
            open={Boolean(anchorElAdmin)}
            onClose={() => handleMenuClose(setAnchorElAdmin)}
          >
            <MenuItem component={Link} to="/AddPO">Add a Post Office</MenuItem>
            <MenuItem component={Link} to="/ViewPO">View Post Offices</MenuItem>
            <MenuItem component={Link} to="/AddMngr">Add Manager</MenuItem>
            <MenuItem component={Link} to="/ViewStaff">View Staff</MenuItem>
          </Menu>

          {/* Manager Pages Dropdown */}
          <Button color="inherit" onClick={(e) => handleMenuClick(e, setAnchorElManager)}>
            Manager Pages
          </Button>
          <Menu
            anchorEl={anchorElManager}
            open={Boolean(anchorElManager)}
            onClose={() => handleMenuClose(setAnchorElManager)}
          >
            <MenuItem component={Link} to="/AddStore">Add Items to the Store</MenuItem>
            <MenuItem component={Link} to="/AddStaff">Add a New Staff Member</MenuItem>
            <MenuItem component={Link} to="/MngrViewStaff">View My Staff</MenuItem>
            <MenuItem component={Link} to="/ViewStaffActivity">View My Staff Activity</MenuItem>
          </Menu>

          {/* Clerk Pages Dropdown */}
          <Button color="inherit" onClick={(e) => handleMenuClick(e, setAnchorElClerk)}>
            Clerk Pages
          </Button>
          <Menu
            anchorEl={anchorElClerk}
            open={Boolean(anchorElClerk)}
            onClose={() => handleMenuClose(setAnchorElClerk)}
          >
            <MenuItem component={Link} to="/ReStock">Update Stock</MenuItem>
            <MenuItem component={Link} to="/low_stock">low stock</MenuItem>
            <MenuItem component={Link} to="/ClerkAddPackage">Manual Entry for New Customer Package</MenuItem>
          </Menu>

          {/* Driver Pages Dropdown */}
          <Button color="inherit" onClick={(e) => handleMenuClick(e, setAnchorElDriver)}>
            Driver Pages
          </Button>
          <Menu
            anchorEl={anchorElDriver}
            open={Boolean(anchorElDriver)}
            onClose={() => handleMenuClose(setAnchorElDriver)}
          >
            <MenuItem component={Link} to="/PackageStatus">Update Package Status</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* This section adds the links to these pages */}
      <Container style={{ marginTop: 20 }}>
        <Routes>
          {/* Pages anyone could see when opening the app */}
          <Route path="/" element={<Home />} />
          <Route path="/cust-login" element={<CustLogin />} />
          <Route path="/emp-login" element={<EmpLogin />} />
          <Route path="/CustSignup" element={<CustSignup />} />

          {/* Pages customers should be able to see */}
          <Route path="/ask-store-location" element={<AskPostOfficeForStore />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/MyPackages" element={<MyPackages />} />
          <Route path="/TrackPackage" element={<TrackPackage />} />
          <Route path="/PackageDetails" element={<PackageDetails />} />
          <Route path="/delivered-messages" element={<DeliveredMessagesPage />} />
          <Route path="/CustAddPackage" element={<CustAddPackage />} />
          <Route path="/PackageCheckOut" element={<PackageCheckOut />} />

          {/* EMPLOYEE PAGES */}
          <Route path="/AddMyHours" element={<AddMyHours />} />

          {/* Pages Admin should be able to see */}
          <Route path="/AddPO" element={<AddPO />} />
          <Route path="/ViewPO" element={<ViewPO />} />
          <Route path="/AddMngr" element={<AddMngr />} />
          <Route path="/ViewStaff" element={<ViewStaff />} />

          {/* Pages Managers should be able to see */}
          <Route path="/AddStore" element={<AddStore />} />
          <Route path="/AddStaff" element={<AddStaff />} />
          <Route path="/MngrViewStaff" element={<MngrViewStaff />} />
          <Route path="/ViewStaffActivity" element={<ViewStaffActivity />} />
          <Route path="/view-staffAC" element={<viewStaffAC />} />

          {/* Pages Clerks should be able to see */}
          <Route path="/ReStock" element={<ReStock />} />
          <Route path="/low_stock" element={<LowStockPage />} />
          <Route path="/ClerkAddPackage" element={<ClerkAddPackage />} />

          {/* Pages Drivers should be able to see */}
          <Route path="/PackageStatus" element={<PackageStatus />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
