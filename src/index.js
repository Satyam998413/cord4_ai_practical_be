const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { httpLogger } = require("./lib/winstonLogger");

const app = express();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "*"],
  })
);

app.use(express.json());

// Custom Middleware to log request details and execution time
app.use(httpLogger);


// Root route → return index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Routes
app.use("/api/image", require("./routes/image.routes"));
app.use("/api/video", require("./routes/video.routes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
