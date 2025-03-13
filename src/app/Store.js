import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Paper, Card, CardContent, CardActionArea, Box, Button } from "@mui/material";

const storeItems = [
  {
    category: "📦 Packing Supplies", 
    items: [
      { name: "Bubble Wrap", description: "For cushioning fragile items.", price: "$5.00" },
      { name: "Packing Peanuts", description: "Foam sheets for safe packing.", price: "$3.00" },
      { name: "Shrink Wrap", description: "Stretch wrap for securing shipments.", price: "$7.00" },
      { name: '"Fragile" Stickers', description: "Labels for fragile shipments.", price: "$2.50" }
    ]
  },
  {
    category: "📦 Boxes & Sizes",
    items: [
      { name: "Small Box", description: "6x6x6 inches - Lightweight shipping box.", price: "$1.50" },
      { name: "Medium Box", description: "12x12x8 inches - Standard mailing box.", price: "$2.50" },
      { name: "Large Box", description: "18x18x12 inches - Big shipments.", price: "$4.00" },
    ]
  },
  {
    category: "✉️ Envelopes & Mailers",
    items: [
      { name: "Standard Envelopes", description: "Letter-size, legal-size envelopes.", price: "$1.00" },
      { name: "Padded Envelopes", description: "Bubble mailers for fragile items.", price: "$3.00" },
      { name: "Tyvek Envelopes", description: "Water-resistant, durable mailers.", price: "$5.00" },
      { name: "Pre-stamped Envelopes", description: "Convenient pre-stamped envelopes.", price: "$2.00" },
      { name: "Document Mailers", description: "Rigid envelopes to protect documents.", price: "$4.00" }
    ]
  }
];

export default function Store() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.name === item.name);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity -= 1;
        if (updatedCart[existingItemIndex].quantity === 0) {
          updatedCart.splice(existingItemIndex, 1);
        }
        return updatedCart;
      }
      return prevCart;
    });
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } });
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
                <Card style={{ borderRadius: "12px", backgroundColor: "#FAFAFA", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                  <CardActionArea onClick={() => handleItemClick(item)} style={{ padding: "20px", textAlign: "center" }}>
                    <Typography variant="h5" style={{ fontWeight: "bold", color: "#B71C1C", marginTop: "10px" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555", marginTop: "5px" }}>
                      {item.description}
                    </Typography>
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
                    {item.name} x{item.quantity}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ color: 'white', textTransform: 'none' }}
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
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
