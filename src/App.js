import React, { useState, useContext } from "react";
import Cougar from "./components/Cougar.png";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Drawer,
  List,
  Box,
  Divider,
  IconButton,
  MenuItem, ListItem, Menu
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import CustLogin from "./app/CustLogin";
import EmpLogin from "./app/EmpLogin";
import Store from "./app/Store";
import Home from "./app/Home";
import MyPackages from "./app/MyPackages";
import TrackPackage from "./app/TrackPackage";
import AddPO from "./app/AddPO";
import AddMngr from "./app/AddMngr";
import ViewPO from "./app/ViewPO";
import ViewStaff from "./app/ViewStaff";
import AddStore from "./app/ManagerPages/AddStore";
import ReStock from "./app/ReStock";
import AddStaff from "./app/ManagerPages/AddStaff";
import MngrViewStaff from "./app/ManagerPages/MngrViewStaff";
import ViewStaffActivity from "./app/ManagerPages/ViewStaffActivity";
import PackageStatus from "./app/PackageStatus";
import PackageDetails from "./app/PackageDetails";
import CustSignup from "./app/CustSignup";
import ClerkAddPackage from "./app/ClerkAddPackage";
import CustAddPackage from "./app/CustAddPackage";
import Checkout from "./app/Checkout";
import PackageCheckOut from "./app/PackageCheckOut";
import AddMyHours from "./app/AddMyHours";
import LowStockPage from "./app/low_stock";
import DeliveredMessagesPage from "./app/delivered";
import AskPostOfficeForStore from "./app/ask_postof_for_store";
import WorkHours from "./app/h_w";
import Dashboard from "./app/Dashboard";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import EmpDashboard from "./app/EmpDashboard";
import DropMenuButton from "./components/DropMenuButton";
import ViewStore from "./app/ManagerPages/ViewStore";
import StoreSales from "./app/ManagerPages/StoreSales";
import ViewPOPackages from "./app/ViewPOPackages";
import EmpRecordHours from "./app/EmpRecordHours";
import RemoveStore from "./app/ManagerPages/RemoveStore";
import CustomerInfo from "./app/CustomerInfo";

const App = () => {
  const { isCustomer, isAdmin, isManager, isDriver, isClerk, logout } =
  useContext(AuthContext);

  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const goLogout = () =>{
    logout();
    navigate("/");//navigate home when you log out
    window.location.reload();
  }

  return (
    <AuthProvider>
        <AuthContext.Consumer>
          {({ user, logout }) => (
            <>
              <AppBar
                position="static"
                sx={{ color: "#ffffff", backgroundColor: "#D32F2F" }}
              >
                <Toolbar>
                  {/* Hamburger Menu Icon for Small Screens */}
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={toggleDrawer}
                  >
                    <MenuIcon />
                  </IconButton>
                  {user && (
                    <Button
                      sx={{
                        backgroundColor: "#D32F2F",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#C62828", // Darker red on hover
                        },
                        borderRadius: 1,
                        padding: "10px 20px",
                        width: "auto",
                        textAlign: "center",
                        ml: "auto",
                        display: "block",
                        height: "auto",
                        minWidth: "100px",
                        display: "flex"
                      }}
                      onClick={goLogout}
                    >
                      Logout
                      <LogoutIcon sx={{ marginLeft: "8px" }} />
                    </Button>
                  )}
                </Toolbar>
              </AppBar>
              <Drawer
                sx={{
                  width: 240,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#D32F2F",
                    justifyContent: "space-between", // Ensures buttons are spaced out
                  },
                }}
                variant="temporary"
                anchor="left"
                open={openDrawer}
                onClose={toggleDrawer}
              >
                <div style={{ height: "30px" }} />
                <img
                  src={Cougar || "/placeholder.svg"}
                  alt="Logo"
                  className="image"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "8px",
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <List sx={{ paddingTop: 2 }}>
                    <ListItem>
                      <Button
                        sx={{
                          backgroundColor: "#D32F2F",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#C62828", // Darker red on hover
                          },
                          borderRadius: 1,
                          padding: "10px 20px",
                          width: "100%",
                          textAlign: "left",
                        }}
                        component={Link}
                        to="/"
                      >
                        Home
                      </Button>
                    </ListItem>

                    {/* Show Login & Signup Only When NOT Logged In */}
                    {!user && (
                      <>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/cust-login"
                          >
                            Customer Login
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/CustSignup"
                          >
                            Sign Up
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/EmpLogin"
                          >
                            Employee Login
                          </Button>
                        </ListItem>
                      </>
                    )}

                    {/* Show Dashboard When Logged In */}
                    {/* Customer Pages */}
                    {/* ONLY VISIBLE/ACCESSIBLE WHEN A CUSTOMER IS LOGGED IN */}
                    {user && isCustomer() && (
                      <>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/dashboard"
                          >
                            Dashboard
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/ask-store-location"
                          >
                            Store
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/MyPackages"
                          >
                            My Packages
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/delivered-messages"
                          >
                            Delivered Packages
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/CustAddPackage"
                          >
                            Ship a New Packag3
                          </Button>
                        </ListItem>
                      </>
                    )}

                    {/*if there's a user logged in, and it's not a customer, then its an employee*/}
                    {/*LINK TO EMPLOYEE DASHBOARD*/}
                    {user && !isCustomer() && (
                      <>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/EmpDashboard"
                          >
                            Employee Dashboard
                          </Button>
                        </ListItem>
                        <ListItem>
                        <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/EmpRecordHours"
                          >
                            Record my work hours
                          </Button>
                          </ListItem>
                      </>
                    )}

                    {/* Admin Pages */}
                    {user && isAdmin() && (
                      <>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/AddPO"
                          >
                            Add a Post Office
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/ViewPO"
                          >
                            View Post Offices
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/AddMngr"
                          >
                            Add Manager
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            sx={{
                              backgroundColor: "#D32F2F",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#C62828", // Darker red on hover
                              },
                              borderRadius: 1,
                              padding: "10px 20px",
                              width: "100%",
                              textAlign: "left",
                            }}
                            component={Link}
                            to="/ViewStaff"
                          >
                            View Staff
                          </Button>
                        </ListItem>
                      </>
                    )}

                    {/* Manager Pages */}
                    {user && isManager() && (
                      <>
                      <ListItem>
                          <DropMenuButton buttonText="Package statistics" menuItems={
                          [{label:"PACKAGES REPORT", to:"/StoreSales"}
                          ]}
                          />
                        </ListItem>
                        <ListItem>
                          <DropMenuButton buttonText="online store" menuItems={
                          [{label:"ADD ITEMS TO STORE", to:"/AddStore"},
                            {label:"VIEW CURRENT ITEMS FOR SALE", to:"/ViewStore"},
                            {label:"VIEW ONLINE STORE SALES"},
                            {label:"REMOVE ITEMS FROM STORE", to: "/RemoveStore"}
                          ]}
                          />
                        </ListItem>
                        <ListItem>
                          <DropMenuButton buttonText="Staff" menuItems={
                          [{label:"ADD A STAFF MEMBER", to:"/AddStaff"},
                            {label:"VIEW MY STAFF", to:"/MngrViewStaff"},
                            {label:"VIEW MY STAFF ACTIVITY", to:"/ViewStaffActivity"},
                            {label:"FIRE STAFF MEMBER"}
                          ]}
                          />
                        </ListItem>
                      </>
                    )}

                    {/* DRIVER AND CLERK Pages */}
                    {user && (isClerk() || isDriver()) && (
                      <>
                        <Button
                          sx={{
                            backgroundColor: "#D32F2F",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#C62828", // Darker red on hover
                            },
                            borderRadius: 1,
                            padding: "10px 20px",
                            width: "100%",
                            textAlign: "left",
                          }}
                          component={Link}
                          to="/ReStock"
                        >
                          update store item stock
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: "#D32F2F",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#C62828", // Darker red on hover
                            },
                            borderRadius: 1,
                            padding: "10px 20px",
                            width: "100%",
                            textAlign: "left",
                          }}
                          component={Link}
                          to="/PackageStatus"
                        >
                          update status of a package
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: "#D32F2F",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#C62828", // Darker red on hover
                            },
                            borderRadius: 1,
                            padding: "10px 20px",
                            width: "100%",
                            textAlign: "left",
                          }}
                          component={Link}
                          to="/ViewPOPackages"
                        >
                          View packages at my location
                        </Button>
                      </>
                    )}
                  </List>
                </Box>
              </Drawer>

              <Container style={{ marginTop: 20 }}>
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/PackageDetails" element={<PackageDetails />} />
                  {!user && (
                    <Route path="/cust-login" element={<CustLogin />} />
                  )}
                  {!user && (
                    <Route path="/CustSignup" element={<CustSignup />} />
                  )}
                  {!user && <Route path="/EmpLogin" element={<EmpLogin />} />}

                  {/*if there's a user logged in, and it's not a customer, then its an employee*/}
                  {/*LINK TO EMPLOYEE DASHBOARD*/}
                  {user && !isCustomer() && (
                    <>
                      <Route path="/EmpDashboard" element={<EmpDashboard />} />
                      <Route path="/EmpRecordHours" element={<EmpRecordHours />} />
                    </>
                  )}

                  {/* Protected Route - Dashboard Only if Logged In */}
                  {user && isCustomer() && (
                    <Route path="/dashboard" element={<Dashboard />} />
                  )}

                  {/* Customer Pages */}
                  {/* ONLY VISIBLE/ACCESSIBLE WHEN A CUSTOMER IS LOGGED IN */}
                  {user && isCustomer() && (
                    <>
                      <Route
                        path="/ask-store-location"
                        element={<AskPostOfficeForStore />}
                      />
                      <Route
                        path="/CustomerInfo"
                        element={<CustomerInfo />}
                      />
                      <Route path="/store" element={<Store />} />
                      <Route path="/Checkout" element={<Checkout />} />
                      <Route path="/MyPackages" element={<MyPackages />} />
                      <Route path="/TrackPackage" element={<TrackPackage />} />
                      <Route
                        path="/delivered-messages"
                        element={<DeliveredMessagesPage />}
                      />
                      <Route
                        path="/CustAddPackage"
                        element={<CustAddPackage />}
                      />
                      <Route
                        path="/PackageCheckOut"
                        element={<PackageCheckOut />}
                      />
                    </>
                  )}

                  {/* Admin Pages */}
                  {/* ONLY VISIBLE/ACCESSIBLE WHEN AN ADMIN IS LOGGED IN */}
                  {user && isAdmin() && (
                    <>
                      <Route path="/AddPO" element={<AddPO />} />
                      <Route path="/ViewPO" element={<ViewPO />} />
                      <Route path="/AddMngr" element={<AddMngr />} />
                      <Route path="/ViewStaff" element={<ViewStaff />} />
                    </>
                  )}

                  {/* Manager Pages */}
                  {/* ONLY VISIBLE/ACCESSIBLE WHEN AN MANAGER IS LOGGED IN */}
                  {user && isManager() && (
                    <>
                      <Route path="/AddStore" element={<AddStore />} />
                      <Route path="/AddStaff" element={<AddStaff />} />
                      <Route path="/MngrViewStaff" element={<MngrViewStaff />} />
                      <Route path="/ViewStaffActivity" element={<ViewStaffActivity />} />
                      <Route path="/ViewStore" element={<ViewStore />} />
                      <Route path="/StoreSales" element={<StoreSales />} />
                      <Route path="/RemoveStore" element={<RemoveStore />} />
                    </>
                  )}

                  {/* Clerk/Driver Pages */}
                  {/* ONLY VISIBLE/ACCESSIBLE WHEN A CLERK OR DRIVER IS LOGGED IN */}
                  {user && (isDriver() || isClerk()) && (
                    <>
                      <Route path="/ReStock" element={<ReStock />} />
                      <Route path="/low_stock" element={<LowStockPage />} />
                      <Route path="/work-hours" element={<WorkHours />} />
                      <Route path="/ViewPOPackages" element={<ViewPOPackages />} />
                      <Route
                        path="/ClerkAddPackage"
                        element={<ClerkAddPackage />}
                      />
                      <Route
                        path="/PackageStatus"
                        element={<PackageStatus />}
                      />
                    </>
                  )}
                </Routes>
              </Container>
            </>
          )}
        </AuthContext.Consumer>
    </AuthProvider>
  );
};

export default App;