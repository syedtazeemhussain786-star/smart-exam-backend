require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Notice = require("./models/Notice");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://smart-exam-practice-system.vercel.app"
}));

app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed:", error.message);
  });
