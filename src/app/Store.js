import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Box,
  Button,
  IconButton,
  Divider,
  Badge,
  Collapse,
  Alert,
} from "@mui/material";
import { ShoppingCart, Add, Remove, DeleteOutline, CheckCircle } from "@mui/icons-material";

export default function StorePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedLocation = queryParams.get("location"); // Get the 'location' query parameter

  // Mock data for items and their quantities based on the store
  const storeData = {
    Texas: [
      { id: 1, name: "Item A", description: "High-quality item A.", price: "$5.00", quantity: 10 },
      { id: 2, name: "Item B", description: "Durable item B.", price: "$3.00", quantity: 5 },
    ],
    California: [
      { id: 1, name: "Item A", description: "High-quality item A.", price: "$5.00", quantity: 7 },
      { id: 2, name: "Item B", description: "Durable item B.", price: "$3.00", quantity: 3 },
    ],
    Florida: [
      { id: 1, name: "Item A", description: "High-quality item A.", price: "$5.00", quantity: 12 },
      { id: 2, name: "Item B", description: "Durable item B.", price: "$3.00", quantity: 8 },
    ],
  };

  // Get the items for the selected store, or default to an empty array
  const items = storeData[selectedLocation] || [];

  // Cart state
  const [cart, setCart] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Add item to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    // Show success alert
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 2000);
  };

  // Remove item from cart
  const handleRemoveFromCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
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

  // Delete item from cart
  const handleDeleteFromCart = (item) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id));
  };

  //Checkout
  const handleCheckout = () => {
    navigate("/checkout", { state: { cart, selectedLocation } });
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace("$", ""));
    return total + price * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Alert */}
      <Collapse in={showSuccessAlert}>
        <Alert
          icon={<CheckCircle fontSize="inherit" />}
          severity="success"
          sx={{
            mb: 2,
            borderRadius: 2,
            "& .MuiAlert-icon": {
              color: "#D32F2F",
            },
          }}
        >
          Item added to cart successfully!
        </Alert>
      </Collapse>

      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#D32F2F",
            mb: 1,
          }}
        >
          📦 {selectedLocation ? `Store: ${selectedLocation}` : "Unknown Store"}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          Browse items available at this location.
        </Typography>
      </Box>

      {/* Cart Summary */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          border: `1px solid #FFCDD2`,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              badgeContent={cartItemCount}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#D32F2F",
                  fontWeight: "bold",
                },
              }}
            >
              <ShoppingCart sx={{ color: "#D32F2F", mr: 2, fontSize: 28 }} />
            </Badge>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Your Cart
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cartItemCount} {cartItemCount === 1 ? "item" : "items"} - Total: ${cartTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            disabled={cart.length === 0}
            onClick={handleCheckout}
            sx={{
              bgcolor: "#D32F2F",
              "&:hover": { bgcolor: "#B71C1C" },
              fontWeight: "bold",
              px: 3,
            }}
            startIcon={<ShoppingCart />}
          >
            Checkout
          </Button>
        </Box>
      </Paper>

      {/* Store Items */}
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 4,
                },
                border: `1px solid #FFCDD2`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    mb: 1,
                  }}
                >
                  {item.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#D32F2F",
                    }}
                  >
                    {item.price}
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(item)}
                    sx={{
                      bgcolor: "#D32F2F",
                      "&:hover": { bgcolor: "#B71C1C" },
                    }}
                    startIcon={<Add />}
                  >
                    Add
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}




/*  CURRENT SHIT
"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Box,
  Button,
  IconButton,
  Divider,
  Badge,
  Chip,
  Collapse,
  Alert,
} from "@mui/material"
import {
  ShoppingCart,
  Add,
  Remove,
  DeleteOutline,
  CheckCircle,
  KeyboardArrowUp,
  KeyboardArrowDown,
  LocalShipping,
} from "@mui/icons-material"

// Store items data
const storeItems = [
  {
    category: "📦 Packing Supplies",
    items: [
      { id: "ps1", name: "Bubble Wrap", description: "For cushioning fragile items.", price: "$5.00" },
      { id: "ps2", name: "Packing Peanuts", description: "Foam sheets for safe packing.", price: "$3.00" },
      { id: "ps3", name: "Shrink Wrap", description: "Stretch wrap for securing shipments.", price: "$7.00" },
      { id: "ps4", name: '"Fragile" Stickers', description: "Labels for fragile shipments.", price: "$2.50" },
    ],
  },
  {
    category: "📦 Boxes & Sizes",
    items: [
      { id: "bs1", name: "Small Box", description: "6x6x6 inches - Lightweight shipping box.", price: "$1.50" },
      { id: "bs2", name: "Medium Box", description: "12x12x8 inches - Standard mailing box.", price: "$2.50" },
      { id: "bs3", name: "Large Box", description: "18x18x12 inches - Big shipments.", price: "$4.00" },
    ],
  },
  {
    category: "✉️ Envelopes & Mailers",
    items: [
      { id: "em1", name: "Standard Envelopes", description: "Letter-size, legal-size envelopes.", price: "$1.00" },
      { id: "em2", name: "Padded Envelopes", description: "Bubble mailers for fragile items.", price: "$3.00" },
      { id: "em3", name: "Tyvek Envelopes", description: "Water-resistant, durable mailers.", price: "$5.00" },
      { id: "em4", name: "Pre-stamped Envelopes", description: "Convenient pre-stamped envelopes.", price: "$2.00" },
      { id: "em5", name: "Document Mailers", description: "Rigid envelopes to protect documents.", price: "$4.00" },
    ],
  },
]

export default function Store() {
  const [cart, setCart] = useState([])
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})
  const navigate = useNavigate()

  // Initialize all sections as expanded
  useEffect(() => {
    const initialExpandedState = {}
    storeItems.forEach((section, index) => {
      initialExpandedState[index] = true
    })
    setExpandedSections(initialExpandedState)
  }, [])

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace("$", ""))
    return total + price * item.quantity
  }, 0)

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0)

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })

    // Show success alert
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 2000)
  }

  const handleRemoveFromCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id)
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity -= 1
        if (updatedCart[existingItemIndex].quantity === 0) {
          updatedCart.splice(existingItemIndex, 1)
        }
        return updatedCart
      }
      return prevCart
    })
  }

  const handleDeleteFromCart = (item) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id))
  }

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } })
  }

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Define the primary red color to use throughout the site
  const primaryRed = "#D32F2F"
  const secondaryRed = "#B71C1C"
  const lightRed = "#FFCDD2"

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>  */
     // {/* Success Alert */ }
      /* CURRENT SHIT
      <Collapse in={showSuccessAlert}>
        <Alert
          icon={<CheckCircle fontSize="inherit" />}
          severity="success"
          sx={{
            mb: 2,
            borderRadius: 2,
            "& .MuiAlert-icon": {
              color: primaryRed,
            },
          }}
        >
          Item added to cart successfully!
        </Alert>
      </Collapse>
        */
      //{/* Header */}
      /* CURRENT SHIT
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: secondaryRed,
            mb: 1,
          }}
        >
          📦 Post Office Store
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          Find all your packaging and mailing essentials in one place!
        </Typography>
      </Box>
        */
      //{/* Cart Summary */}
      /*CURRENT SHIT
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          border: `1px solid ${lightRed}`,
          position: "sticky",
          top: 16,
          zIndex: 10,
          bgcolor: "white",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              badgeContent={cartItemCount}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: primaryRed,
                  fontWeight: "bold",
                },
              }}
            >
              <ShoppingCart sx={{ color: primaryRed, mr: 2, fontSize: 28 }} />
            </Badge>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Your Cart
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cartItemCount} {cartItemCount === 1 ? "item" : "items"} - Total: ${cartTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            disabled={cart.length === 0}
            onClick={handleCheckout}
            sx={{
              bgcolor: primaryRed,
              "&:hover": { bgcolor: secondaryRed },
              fontWeight: "bold",
              px: 3,
            }}
            startIcon={<ShoppingCart />}
          >
            Checkout
          </Button>
        </Box>

        {cart.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              {cart.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: `1px solid ${lightRed}`,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.price} × {item.quantity} = $
                        {(Number.parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveFromCart(item)}
                            sx={{ color: primaryRed }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 1, fontWeight: "bold" }}>{item.quantity}</Typography>
                          <IconButton size="small" onClick={() => handleAddToCart(item)} sx={{ color: primaryRed }}>
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                        <IconButton size="small" onClick={() => handleDeleteFromCart(item)} sx={{ color: "#888" }}>
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Paper>
        */
      //{/* Store Items */}
      /* CURRENT SHIT
      {storeItems.map((section, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            overflow: "hidden",
            border: `1px solid ${lightRed}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              mb: expandedSections[index] ? 2 : 0,
            }}
            onClick={() => toggleSection(index)}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: primaryRed,
              }}
            >
              {section.category}
            </Typography>
            <IconButton>{expandedSections[index] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
          </Box>

          <Collapse in={expandedSections[index]}>
            <Grid container spacing={3}>
              {section.items.map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 4,
                      },
                      border: `1px solid ${lightRed}`,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          mb: 1,
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: "40px" }}>
                        {item.description}
                      </Typography>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: primaryRed,
                          }}
                        >
                          {item.price}
                        </Typography>

                        <Button
                          variant="contained"
                          onClick={() => handleAddToCart({ ...item, id: item.id || `${section.category}-${idx}` })}
                          sx={{
                            bgcolor: primaryRed,
                            "&:hover": { bgcolor: secondaryRed },
                          }}
                          startIcon={<Add />}
                        >
                          Add
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Paper>
      ))}
      */
      //{/* Store Benefits */}
      /* CURRENT SHIT
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          bgcolor: "#f9f9f9",
          border: `1px solid ${lightRed}`,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: primaryRed,
            mb: 3,
            textAlign: "center",
          }}
        >
          Why Shop With Us
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Chip
                label="Fast Shipping"
                sx={{
                  bgcolor: lightRed,
                  color: primaryRed,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  py: 2,
                  px: 1,
                }}
                icon={<LocalShipping sx={{ color: primaryRed }} />}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Chip
                label="Quality Products"
                sx={{
                  bgcolor: lightRed,
                  color: primaryRed,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  py: 2,
                  px: 1,
                }}
                icon={<CheckCircle sx={{ color: primaryRed }} />}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Chip
                label="Bulk Discounts"
                sx={{
                  bgcolor: lightRed,
                  color: primaryRed,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  py: 2,
                  px: 1,
                }}
                icon={<ShoppingCart sx={{ color: primaryRed }} />}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Cougar Post Office Store. All rights reserved.
        </Typography>
      </Box>
    </Container>
  )
}
*/
