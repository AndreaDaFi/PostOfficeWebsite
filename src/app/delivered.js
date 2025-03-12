import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function DeliveredMessagesPage() {
  const [messages, setMessages] = useState([
    {
      tracking_number: "123456789",
      location: "Houston, TX",
      time: "3:45 PM",
      date: "March 10, 2025",
    },
    {
      tracking_number: "987654321",
      location: "New York, NY",
      time: "11:30 AM",
      date: "March 11, 2025",
    },
    {
      tracking_number: "567890123",
      location: "Los Angeles, CA",
      time: "5:15 PM",
      date: "March 12, 2025",
    }
  ]);

  return (
    <Container maxWidth="md" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <Paper elevation={10} style={{ padding: "40px", borderRadius: "20px", textAlign: "center", backgroundColor: "#ffffff", width: "100%" }}>
        <Typography variant="h3" style={{ fontWeight: "bold", color: "#d32f2f", marginBottom: "30px" }}>
          📦 Delivered Packages
        </Typography>
        <Divider style={{ marginBottom: "20px" }} />

        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} style={{ borderBottom: "1px solid #ddd", padding: "20px 0" }}>
              <ListItemText 
                primary={<Typography variant="h5" style={{ fontWeight: "bold", color: "#333" }}>✅ Package with tracking #{msg.tracking_number} has been delivered.</Typography>} 
                secondary={
                  <Typography variant="h6" style={{ color: "#555", marginTop: "5px" }}>
                    📍 <strong>Location:</strong> {msg.location} <br />
                    ⏰ <strong>Delivered at:</strong> {msg.time} on {msg.date}
                  </Typography>
                } 
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
