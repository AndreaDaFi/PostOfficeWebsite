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
import ViewPO from './app/ViewPO';
import ViewStaff from './app/ViewStaff';
import AddStore from './app/AddStore';
import ReStock from './app/ReStock';
import AddStaff from './app/AddStaff';
import MngrViewStaff from './app/MngrViewStaff';
import ViewStaffActivity from './app/ViewStaffActivity';
import PackageStatus from './app/PackageStatus';
import PackageDetails from './app/PackageDetails';
import CustSignin from './app/CustSignin';
import ClerkAddPackage from './app/ClerkAddPackage';
import CustAddPackage from './app/CustAddPackage';
import Checkout from './app/Checkout';

const App = () => {
  return (
    <Router>
      <AppBar position="static" sx={{ color: '#ffffff', backgroundColor: '#D32F2F' }}>
        <Toolbar>
          {/*pages anyone could see when openning the app*/}
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/cust-login">Customer Login</Button>
          <Button color="inherit" component={Link} to="/emp-login">Employee Login</Button>

          {/*pages customers should be able to see*/}
          <Button color="inherit" component={Link} to="/store">store</Button>
          <Button color="inherit" component={Link} to="/MyPackages">My Packages</Button>
          <Button color="inherit" component={Link} to="/CustAddPackage">Ship a new package</Button>
          <Button color="inherit" component={Link} to="/Checkout">temporary checkout page</Button>

          {/*EMPLOYEE PAGES*/}
          {/*pages Admin should be able to see*/}
          <Button color="inherit" component={Link} to="/AddPO">Add a Post Office</Button>
          <Button color="inherit" component={Link} to="/ViewPO">View Post Offices</Button>
          <Button color="inherit" component={Link} to="/AddMngr">Add Manager</Button>
          <Button color="inherit" component={Link} to="/ViewStaff">View Staff</Button>

          {/*pages Managers should be able to see*/}
          <Button color="inherit" component={Link} to="/AddStore">Add Items to the store</Button>
          <Button color="inherit" component={Link} to="/AddStaff">Add a new Staff member</Button>
          <Button color="inherit" component={Link} to="/MngrViewStaff">View my staff</Button>
          <Button color="inherit" component={Link} to="/ViewStaffActivity">View my staff activity</Button>
          
          {/*pages Clerks should be able to see*/}
          <Button color="inherit" component={Link} to="/ReStock">Update Stock</Button>
          <Button color="inherit" component={Link} to="/ClerkAddPackage">Manual entry for new customer package</Button>
          
          {/*pages Drivers should be able to see*/}
          <Button color="inherit" component={Link} to="/PackageStatus">Update a package status</Button>
          
        </Toolbar>
      </AppBar>


      {/*this section adds the links to these pages*/}
      <Container style={{ marginTop: 20 }}>
        <Routes>
          {/*pages anyone could see when openning the app*/}
          <Route path="/" element={<Home />} />
          <Route path="/cust-login" element={<CustLogin />} />
          <Route path="/emp-login" element={<EmpLogin />} />
          <Route path="/CustSignin" element={<CustSignin />} />

          {/*pages customers should be able to see*/}
          <Route path="/Store" element={<Store />} />
          <Route path="/MyPackages" element={<MyPackages />} />
          <Route path="/TrackPackage" element={<TrackPackage />} />
          <Route path="/PackageDetails" element={<PackageDetails />} />
          <Route path="/CustAddPackage" element={<CustAddPackage />} />
          <Route path="/Checkout" element={<Checkout />} />

          {/*EMPLOYEE PAGES*/}
          {/*pages Admin should be able to see*/}
          <Route path="/AddPO" element={<AddPO />} />
          <Route path="/ViewPO" element={<ViewPO />} />
          <Route path="/AddMngr" element={<AddMngr />} />
          <Route path="/ViewStaff" element={<ViewStaff />} />

          {/*pages Managers should be able to see*/}
          <Route path="/AddStore" element={<AddStore />} />
          <Route path="/AddStaff" element={<AddStaff />} />
          <Route path="/MngrViewStaff" element={<MngrViewStaff />} />
          <Route path="/ViewStaffActivity" element={<ViewStaffActivity />} />

          {/*pages Clerks should be able to see*/}
          <Route path="/ReStock" element={<ReStock />} />
          <Route path="/ClerkAddPackage" element={<ClerkAddPackage />} />

          {/*pages Drivers should be able to see*/}
          <Route path="/PackageStatus" element={<PackageStatus />} />
          
        </Routes>
      </Container>

    </Router>
  );
};

export default App;