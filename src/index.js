const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { httpLogger } = require('./lib/winstonLogger');

const app = express();

// Middleware
// app.use(cors({
//   origin: 'https://movies-app-review.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

// Custom Middleware to log request details and execution time
app.use(httpLogger);


// Routes
app.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/movies', require('./routes/movie.routes'));
app.use('/api/reviews', require('./routes/review.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });


startServer(); 