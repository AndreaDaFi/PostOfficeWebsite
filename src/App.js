import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Button, MenuItem, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function WorkHoursPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [weeklyHours, setWeeklyHours] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleAddHours = () => {
    if (employeeId && selectedDay && hoursWorked) {
      const newEntry = { day: selectedDay, hours: parseFloat(hoursWorked) };
      setWeeklyHours([...weeklyHours, newEntry]);
      setTotalHours(totalHours + newEntry.hours);
      setSelectedDay("");
      setHoursWorked("");
    }
  };

  return (
    <Container maxWidth="md" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <Paper elevation={10} style={{ padding: "40px", borderRadius: "20px", textAlign: "center", backgroundColor: "#ffffff", width: "100%" }}>
        <Typography variant="h3" style={{ fontWeight: "bold", color: "#d32f2f", marginBottom: "30px" }}>
          ⏳ Employee Work Hours
        </Typography>
        <Divider style={{ marginBottom: "20px" }} />

        <TextField
          fullWidth
          label="Employee ID"
          variant="outlined"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        <TextField
          select
          fullWidth
          label="Select Day"
          variant="outlined"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          style={{ marginBottom: "20px" }}
        >
          {daysOfWeek.map((day) => (
            <MenuItem key={day} value={day}>{day}</MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Hours Worked"
          variant="outlined"
          type="number"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddHours}
          style={{ padding: "12px 30px", fontSize: "16px", backgroundColor: "#d32f2f", color: "white", borderRadius: "8px" }}
        >
           Add Work Hours
        </Button>

        <Divider style={{ margin: "30px 0" }} />
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
          Weekly Work Hours Summary
        </Typography>

        <List>
          {weeklyHours.map((entry, index) => (
            <ListItem key={index} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
              <ListItemText 
                primary={<Typography variant="h6">📅 {entry.day}: {entry.hours} hours</Typography>} 
              />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" style={{ marginTop: "20px", fontWeight: "bold", color: "#d32f2f" }}>
           Total Hours Worked: {totalHours} hours
        </Typography>
      </Paper>
    </Container>
  );
}
