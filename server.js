require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Notice = require("./models/Notice");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed:", error.message);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Smart Exam Practice System Backend is Running!");
});

// Create Notice
app.post("/notices", async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();

    res.status(201).json({
      message: "Notice saved successfully",
      notice: notice
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving notice",
      error: error.message
    });
  }
});

// Get All Notices
app.get("/notices", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });

    res.json(notices);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching notices",
      error: error.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});