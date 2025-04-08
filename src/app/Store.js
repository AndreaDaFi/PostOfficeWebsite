"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
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
  Collapse,
} from "@mui/material"
import { ShoppingCart, Add, Remove, DeleteOutline, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material"
import { AuthContext } from "../context/AuthContext"

export default function Store() {
  const { user } = useContext(AuthContext)
  const [cart, setCart] = useState([])
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  //gets the po_id from the webapp url
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const selectedPostOffice = queryParams.get("selectedPostOffice")
  const [itemCosts, setItemCosts] = useState([]);

  // Store items data
  const [storeItems, setStoreItems] = useState([
    { category: "Packing Supplies", items: [] },
    { category: "Boxes & Sizes", items: [] },
    { category: "Envelopes & Mailers", items: [] },
  ])

  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedPostOffice) return
      try {
        const response = await fetch(`https://apipost.vercel.app/api/ViewStore?po_id=${selectedPostOffice}`, {
          method: "GET",
        })

        const data = await response.json()
        console.log("Fetched Data:", data)

        if (Array.isArray(data.data) && data.data.length > 0) {
          const groupedItems = data.data.reduce((acc, item) => {
            const category = item.item_category
            const itemData = {
              id: item.item_id,
              name: item.item_name,
              price: item.item_price,
              stock: item.item_stock,
            }

            if (acc[category]) {
              acc[category].push(itemData)
            } else {
              acc[category] = [itemData]
            }

            return acc
          }, {})

          // Convert grouped items into the storeItems format
          const updatedStoreItems = Object.keys(groupedItems).map((category) => {
            return {
              category:
                category === "Boxes & Sizes"
                  ? "Boxes & Sizes"
                  : category === "Packing Supplies"
                    ? "Packing Supplies"
                    : "Envelopes & Mailers",
              items: groupedItems[category],
            }
          })

          setStoreItems(updatedStoreItems)
          setItemCosts(parseItemCosts());
          const costs = parseItemCosts();
          console.log("Parsed Item Costs:", costs);
        } else {
          console.error("⚠ API returned an empty array:", data)
        }
      } catch (err) {
        console.error("Error fetching items for sale:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [selectedPostOffice]) //needs to refetch if a different po is selected

  // Initialize all sections as expanded
  useEffect(() => {
    const initialExpandedState = {}
    storeItems.forEach((section, index) => {
      initialExpandedState[index] = true
    })
    setExpandedSections(initialExpandedState)
  }, [])

  const cartTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity
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

  const parseItemCosts = () => {
    const itemCosts = [];
    storeItems.forEach((category) => {
      category.items.forEach((item) => {
        itemCosts.push({ name: item.name, price: item.price });
      });
    });
    return itemCosts;
  };

  


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
    navigate("/checkout", { state: { cart, selectedPostOffice } })
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
          borderRadius: 2,
          mb: 4,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fillOpacity="1" fillRule="evenodd"/%3E%3C/svg%3E\')',
          }}
        />
        <Box sx={{ p: 4, position: "relative", zIndex: 1, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "white",
              mb: 1,
            }}
          >
            Post Office Store
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            Please select your items and head to the checkout!
          </Typography>
        </Box>
      </Paper>

      {/* Cart Summary */}
      {loading && (
        <Paper elevation={1} sx={{ p: 3, mb: 4, textAlign: "center", borderRadius: 2 }}>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
            }}
          >
            Loading...
          </Typography>
        </Paper>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box>
          {/* Store Items */}
          {storeItems.map((section, index) => (
            <Paper
              key={index}
              elevation={1}
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
                            boxShadow: 3,
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

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: "auto",
                            }}
                          >
                            <Typography
  variant="h6"
  component="h3"
  sx={{
    fontWeight: "bold",
    color: "#333",
    mb: 1,
  }}
>
  {item.name} - ${parseFloat(item.price).toFixed(2)}
</Typography>

                            <Button
                              variant="contained"
                              onClick={() =>
                                handleAddToCart({
                                  ...item,
                                  id: item.id || `${section.category}-${idx}`,
                                })
                              }
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
        </Box>

        <Paper
          elevation={2}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ShoppingCart sx={{ color: primaryRed, mr: 2, fontSize: 28 }} />
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
                          boxShadow: 2,
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
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
      </Box>
    </Container>
  )
}

