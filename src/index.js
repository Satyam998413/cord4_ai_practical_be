const express = require("express");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");
require("dotenv").config();
const { httpLogger } = require("./lib/winstonLogger");

const app = express();

// CORS configuration
const allowedOrigins = [
  "https://cord4-ai-practical-fe.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(httpLogger);

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// API routes
app.use("/api/image", require("./routes/image.routes"));
app.use("/api/video", require("./routes/video.routes"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);
