const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory ticket storage
let tickets = [];

app.get("/", (req, res) => {
  res.send("Apli Mumbai Rail API is Running");
});

// Ticket Routes
app.post("/api/tickets", (req, res) => {
  const ticketData = req.body;
  tickets.unshift(ticketData); // Add to beginning for newest first
  res
    .status(201)
    .json({ message: "Ticket saved successfully", ticket: ticketData });
});

app.get("/api/tickets", (req, res) => {
  res.json(tickets);
});

app.get("/api/tickets/:ticketId", (req, res) => {
  const ticket = tickets.find((t) => t.ticket_id === req.params.ticketId);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({ error: "Ticket not found" });
  }
});

// Import Routes
const transportRoutes = require("./routes/transportRoutes");
const scanRoutes = require("./routes/scanRoutes");

// Mount Routes
app.use("/api", transportRoutes); // Handles /api/trains, /api/crowd
app.use("/api/scan", scanRoutes); // Handles /api/scan

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
