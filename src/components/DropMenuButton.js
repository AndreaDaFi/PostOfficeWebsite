import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const DropMenuButton = ({ buttonText, menuItems, buttonStyle }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu visibility

  // Open the dropdown menu when the button is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
          ...buttonStyle, // Allow custom styles to be passed
        }}
        onClick={handleClick} // Open the menu when clicked
      >
        {buttonText}
        <KeyboardDoubleArrowRightIcon sx={{ marginLeft: "8px" }} />
      </Button>

      {/* Menu component */}
      <Menu
        anchorEl={anchorEl} // The anchor element where the menu will attach
        open={Boolean(anchorEl)} // Open menu when anchorEl is not null
        onClose={handleClose} // Close menu
        anchorOrigin={{
          vertical: "top", // Position the menu below the button
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
            "& .MuiMenuItem-root": {
              padding: "10px 30px", // Adjust padding to remove excess space around items
              margin: 0, // Remove any margin around the menu items
              borderBottom: "1px solid #c62828", // Optional: add a border to separate items visually
              "&:last-child": {
                borderBottom: "none", // Remove the border from the last menu item
              },
            },
          }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={handleClose}
            component={Link}
            to={item.to} // Navigate to the route specified
            sx={{
                color: "white", // Text color for the menu item
                backgroundColor: "#D32F2F",
                "&:hover": {
                  backgroundColor: "#C62828", // Background color on hover
                  color: "white", // Text color on hover
                },
              }}
          >
            {item.label} {/* Display the label for the menu item */}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropMenuButton;