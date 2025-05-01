"use client"

import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import {
  Container,
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  CircularProgress,
  Box,
  Alert,
  Chip,
  Fade,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import StorefrontIcon from "@mui/icons-material/Storefront"
import InventoryIcon from "@mui/icons-material/Inventory"
import CategoryIcon from "@mui/icons-material/Category"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import ClearIcon from "@mui/icons-material/Clear"
import FilterListOffIcon from "@mui/icons-material/FilterListOff"

export default function ViewStore() {
  const { user } = useContext(AuthContext)
  const [items, setItems] = useState([]) // Holds API data
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      const po_id = user?.po_id // Get the manager's ID
      try {
        const response = await fetch(`https://final-po-api.vercel.app/api/ViewStore?po_id=${po_id}`, {
          method: "GET", // Use GET method
        })

        const data = await response.json()
        console.log("Fetched Data:", data)

        if (Array.isArray(data.data) && data.data.length > 0) {
          setItems(data.data) // Update state with API response
        } else {
          console.error("⚠ API returned an empty array:", data)
        }
      } catch (err) {
        console.error("❌ Error fetching items for sale:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [user?.po_id]) // Refetch when `po_id` changes

  // Filter items based on the search input
  const filteredItems = items.filter((item) =>
    `${item.item_name} ${item.item_price} ${item.stock} ${item.item_category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  // Get unique categories and count items per category
  const categories = [...new Set(items.map((item) => item.item_category))]
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = items.filter((item) => item.item_category === category).length
    return acc
  }, {})

  // Function to determine stock level color
  const getStockLevelColor = (stock) => {
    if (stock <= 5) return "#f44336" // Red for low stock
    if (stock <= 15) return "#ff9800" // Orange for medium stock
    return "#4caf50" // Green for good stock
  }

  // Format price with dollar sign and two decimal places
  const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`
  }

  // Clear search and show all items
  const handleSeeAll = () => {
    setSearch("")
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      {/* Header with gradient background */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(211, 47, 47, 0.15)",
          },
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
            color: "white",
            p: 3,
            position: "relative",
            overflow: "hidden",
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
          <Box sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}>
            <StorefrontIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Store Inventory
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                View all items currently available for sale at your post office location
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Inventory Summary Cards */}
      {!loading && !error && items.length > 0 && (
        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          <Card sx={{ flex: 1, minWidth: 200, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <InventoryIcon sx={{ color: "#D32F2F", mr: 1 }} />
                <Typography variant="h6" fontWeight="medium">
                  Total Items
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="#D32F2F">
                {items.length}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, minWidth: 200, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CategoryIcon sx={{ color: "#D32F2F", mr: 1 }} />
                <Typography variant="h6" fontWeight="medium">
                  Categories
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="#D32F2F">
                {categories.length}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, minWidth: 200, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AttachMoneyIcon sx={{ color: "#D32F2F", mr: 1 }} />
                <Typography variant="h6" fontWeight="medium">
                  Avg. Price
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="#D32F2F">
                {formatPrice(items.reduce((sum, item) => sum + Number(item.item_price), 0) / items.length)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Search Field with See All button */}
      <Box sx={{ position: "relative", mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, price, stock, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#D32F2F" }} />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearch("")} sx={{ color: "#666" }}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover fieldset": {
                borderColor: "#D32F2F",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D32F2F",
                borderWidth: 2,
              },
              "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(211, 47, 47, 0.1)",
              },
            },
          }}
        />
      </Box>

      {/* Category Chips with See All button */}
      {!loading && !error && categories.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3, alignItems: "center" }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={`${category} (${categoryCounts[category]})`}
              onClick={() => setSearch(category)}
              sx={{
                bgcolor: search.toLowerCase().includes(category.toLowerCase()) ? "#FFEBEE" : "transparent",
                borderColor: "#D32F2F",
                color: "#D32F2F",
                border: "1px solid",
                fontWeight: "medium",
                "&:hover": {
                  bgcolor: "#FFEBEE",
                },
              }}
            />
          ))}

          {search && (
            <Button
              variant="outlined"
              startIcon={<FilterListOffIcon />}
              onClick={handleSeeAll}
              size="small"
              sx={{
                ml: 1,
                color: "#D32F2F",
                borderColor: "#D32F2F",
                "&:hover": {
                  bgcolor: "#FFEBEE",
                  borderColor: "#B71C1C",
                },
                fontWeight: "medium",
              }}
            >
              See All
            </Button>
          )}
        </Box>
      )}

      {/* Loading State */}
      {loading ? (
        <Fade in={loading}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", my: 8 }}>
            <CircularProgress sx={{ color: "#D32F2F", mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              Loading inventory...
            </Typography>
          </Box>
        </Fade>
      ) : error ? (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            bgcolor: "#FFEBEE",
            border: "1px solid #FFCDD2",
            py: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Error loading inventory
          </Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      ) : (
        <Fade in={!loading}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              },
            }}
          >
            {filteredItems.length > 0 ? (
              <>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#f5f5f5",
                    borderBottom: "1px solid #e0e0e0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
                    {search && ` for "${search}"`}
                  </Typography>

                  {search && filteredItems.length !== items.length && (
                    <Button
                      variant="text"
                      size="small"
                      onClick={handleSeeAll}
                      sx={{
                        color: "#D32F2F",
                        fontWeight: "medium",
                        "&:hover": {
                          bgcolor: "rgba(211, 47, 47, 0.08)",
                        },
                      }}
                    >
                      See All ({items.length})
                    </Button>
                  )}
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#D32F2F" }}>
                        <TableCell sx={{ color: "#FFF", fontWeight: "bold", py: 2 }}>NAME</TableCell>
                        <TableCell sx={{ color: "#FFF", fontWeight: "bold", py: 2 }}>PRICE</TableCell>
                        <TableCell sx={{ color: "#FFF", fontWeight: "bold", py: 2 }}>STOCK</TableCell>
                        <TableCell sx={{ color: "#FFF", fontWeight: "bold", py: 2 }}>CATEGORY</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredItems.map((item, index) => (
                        <TableRow
                          key={index}
                          hover
                          sx={{
                            "&:nth-of-type(odd)": {
                              bgcolor: "#f9f9f9",
                            },
                            transition: "background-color 0.2s ease",
                            "&:hover": {
                              bgcolor: "#f0f0f0 !important",
                            },
                          }}
                        >
                          <TableCell sx={{ py: 2 }}>
                            <Typography variant="body1" fontWeight="medium">
                              {item.item_name}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Typography variant="body1" fontWeight="medium" color="#D32F2F">
                              {formatPrice(item.item_price)}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={item.stock}
                              size="small"
                              sx={{
                                bgcolor: `${getStockLevelColor(item.stock)}20`,
                                color: getStockLevelColor(item.stock),
                                fontWeight: "bold",
                                border: `1px solid ${getStockLevelColor(item.stock)}50`,
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={item.item_category}
                              size="small"
                              sx={{
                                bgcolor: "#f0f0f0",
                                fontWeight: "medium",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Box sx={{ p: 5, textAlign: "center" }}>
                <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: "#D32F2F", opacity: 0.5, mb: 2 }} />
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  No items found
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  {search ? (
                    <>
                      No results match your search "<strong>{search}</strong>". Try using different keywords or clear
                      your search.
                    </>
                  ) : (
                    "There are no items in your inventory. Add some items to get started."
                  )}
                </Typography>

                {search && (
                  <Button
                    variant="contained"
                    startIcon={<FilterListOffIcon />}
                    onClick={handleSeeAll}
                    sx={{
                      bgcolor: "#D32F2F",
                      "&:hover": {
                        bgcolor: "#B71C1C",
                      },
                    }}
                  >
                    See All Items
                  </Button>
                )}
              </Box>
            )}
          </Paper>
        </Fade>
      )}
    </Container>
  )
}

