const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { httpLogger } = require("./src/lib/winstonLogger");

const app = express();


// Middleware
// app.use(cors({
//   origin: 'https://ai-app-review.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

app.use(cors());
app.use(express.json());

// Custom Middleware to log request details and execution time
app.use(httpLogger);


// Root route → return index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Routes
app.use("/api/image", require("./src/routes/image.routes"));
app.use("/api/video", require("./src/routes/video.routes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
