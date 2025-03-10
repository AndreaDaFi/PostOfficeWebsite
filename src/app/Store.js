import React from "react";
import { Container, Typography, Grid, Paper, Card, CardContent, CardActionArea } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LabelIcon from '@mui/icons-material/Label';
import AllInboxIcon from '@mui/icons-material/AllInbox';

const storeItems = [
  { category: "📦 Packing Supplies", 
    items: [
      { name: "Packing Tape", description: "Clear, reinforced, and branded shipping tape.", icon: <LocalShippingIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Bubble Wrap", description: "For cushioning fragile items.", icon: <InventoryIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Packing Peanuts", description: "Foam sheets for safe packing.", icon: <InventoryIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Shrink Wrap", description: "Stretch wrap for securing shipments.", icon: <InventoryIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: '"Fragile" Stickers', description: "Labels for fragile shipments.", icon: <LabelIcon style={{ fontSize: 50, color: "#B71C1C" }} /> }
    ]
  },
  { category: "📦 Boxes & Sizes",
    items: [
      { name: "Small Box", description: "6x6x6 inches - Lightweight shipping box.", icon: <AllInboxIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Medium Box", description: "12x12x8 inches - Standard mailing box.", icon: <AllInboxIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Large Box", description: "18x18x12 inches - Big shipments.", icon: <AllInboxIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      
    ]
  },
  { category: "✉️ Envelopes & Mailers",
    items: [
      { name: "Standard Envelopes", description: "Letter-size, legal-size envelopes.", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Padded Envelopes", description: "Bubble mailers for fragile items.", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Tyvek Envelopes", description: "Water-resistant, durable mailers.", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Pre-stamped Envelopes", description: "Convenient pre-stamped envelopes.", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> },
      { name: "Document Mailers", description: "Rigid envelopes to protect documents.", icon: <MailOutlineIcon style={{ fontSize: 50, color: "#B71C1C" }} /> }
    ]
  }
];

export default function Store() {
  const handleItemClick = (item) => {
    alert(`Viewing details for: ${item.name}`);
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h3" style={{ fontWeight: "bold", color: "#B71C1C", marginBottom: "20px" }}>
        📦 Welcome to the Post Office Store
      </Typography>
      <Typography variant="h6" style={{ color: "#555", marginBottom: "30px" }}>
        Find all your packaging and mailing essentials in one place!
      </Typography>

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
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Container>
  );
}
