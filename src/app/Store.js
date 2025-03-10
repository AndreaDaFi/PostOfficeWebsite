import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Paper, Card, CardContent, CardActionArea, Box, Button } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LabelIcon from '@mui/icons-material/Label';
import AllInboxIcon from '@mui/icons-material/AllInbox';

// Example Store Items
const storeItems = [
  { category: "📦 Packing Supplies", 
    items: [
      { name: "Bubble Wrap", description: "For cushioning fragile items.", price: "$5.00", icon: <InventoryIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Packing Peanuts", description: "Foam sheets for safe packing.", price: "$3.00", icon: <InventoryIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Shrink Wrap", description: "Stretch wrap for securing shipments.", price: "$7.00", icon: <InventoryIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: '"Fragile" Stickers', description: "Labels for fragile shipments.", price: "$2.50", icon: <LabelIcon style={{ fontSize: 50, color: "#B71C1C" }} /> }
    ]
  },
  { category: "📦 Boxes & Sizes",
    items: [
      { name: "Small Box", description: "6x6x6 inches - Lightweight shipping box.", price: "$1.50", icon: <AllInboxIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Medium Box", description: "12x12x8 inches - Standard mailing box.", price: "$2.50", icon: <AllInboxIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Large Box", description: "18x18x12 inches - Big shipments.", price: "$4.00", icon: <AllInboxIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
    ]
  },
  { category: "✉️ Envelopes & Mailers",
    items: [
      { name: "Standard Envelopes", description: "Letter-size, legal-size envelopes.", price: "$1.00", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Padded Envelopes", description: "Bubble mailers for fragile items.", price: "$3.00", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Tyvek Envelopes", description: "Water-resistant, durable mailers.", price: "$5.00", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Pre-stamped Envelopes", description: "Convenient pre-stamped envelopes.", price: "$2.00", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Document Mailers", description: "Rigid envelopes to protect documents.", price: "$4.00", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> }
    ]
  }
];

export default function Store() {
  const [cart, setCart] = useState([]);
  
  const handleItemClick = (item) => {
    // Add item to cart
    setCart((prevCart) => [...prevCart, item]);
  };

  const handleRemoveFromCart = (item) => {
    // Remove item from cart
    setCart(cart.filter(cartItem => cartItem.name !== item.name));
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h3" style={{ fontWeight: "bold", color: "#B71C1C", marginBottom: "20px" }}>
        📦 Welcome to the Post Office Store
      </Typography>
      <Typography variant="h6" style={{ color: "#555", marginBottom: "30px" }}>
        Find all your packaging and mailing essentials in one place!
      </Typography>

      {/* Store Items Grid */}
      {storeItems.map((section, index) => (
        <Paper key={index} style={{ padding: "20px", marginBottom: "20px", borderRadius: "15px", backgroundColor: "#fff" }} elevation={4}>
          <Typography variant="h4" style={{ fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
            {section.category}
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {section.items.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card 
                  style={{ 
                    borderRadius: "12px", 
                    transition: "0.3s", 
                    backgroundColor: "#FAFAFA",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    "&:hover": { transform: "scale(1.07)", boxShadow: "0px 6px 14px rgba(0,0,0,0.2)" }
                  }}
                >
                  <CardActionArea onClick={() => handleItemClick(item)} style={{ padding: "20px", textAlign: "center" }}>
                    {item.icon}
                    <Typography variant="h5" style={{ fontWeight: "bold", color: "#B71C1C", marginTop: "10px" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555", marginTop: "5px" }}>
                      {item.description}
                    </Typography>
                    {/* Display the price here */}
                    <Typography variant="h6" style={{ fontWeight: "bold", color: "#D32F2F", marginTop: "10px" }}>
                      {item.price}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}

      {/* Shopping Cart Section */}
      <Paper style={{ padding: "20px", marginTop: "30px", borderRadius: "15px", backgroundColor: "#fff" }} elevation={4}>
        <Typography variant="h4" style={{ fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
          🛒 Your Cart
        </Typography>

        {/* Display Cart Items */}
        {cart.length === 0 ? (
          <Typography variant="h6" style={{ color: "#555" }}>
            Your cart is empty.
          </Typography>
        ) : (
        <Grid container spacing={2}>
          {cart.map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper style={{ padding: "10px", textAlign: "center" }} elevation={2}>
                <Typography variant="h6" style={{ fontWeight: "bold", color: "#D32F2F" }}>
                  {item.name}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ color: 'white', textTransform: 'none' }} // White text
                  onClick={() => handleRemoveFromCart(item)}
                >
                  REMOVE
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
        )}

        {/* Checkout Button */}
        <Box mt={2}>
        <Button
          color="inherit"
          component={Link}
          to={{
            pathname: "/checkout", // Specify the path to the checkout page
            state: { cart } // Pass the cart data to the checkout page
          }}
          sx={{ color: '#D32F2F', textTransform: 'none' }}
        >
          Proceed to Checkout
        </Button>

          
        </Box>
      </Paper>
    </Container>
  );
}