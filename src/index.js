const express = require("express");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");
require("dotenv").config();
const { httpLogger } = require("./lib/winstonLogger");

const app = express();

const corsOptions = {
  origin: ["https://cord4-ai-practical-fe.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(httpLogger);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/api/image", require("./routes/image.routes"));
app.use("/api/video", require("./routes/video.routes"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
module.exports.handler = serverless(app);
