// Import packages
const express = require("express");
const cors = require('cors');




// Middleware
// app.use(cors({
//   origin: 'https://movies-app-review.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));
// Middlewares
const app = express();
app.use(express.json());



// connection
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));
