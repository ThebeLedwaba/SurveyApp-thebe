require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const surveyRoutes = require('./routes/surveyRoutes');

// Initialize Express app
const app = express();

// Security Middleware
app.use(helmet()); // Adds security headers

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable deprecated headers
});
app.use(limiter);

// CORS Configuration

app.use(cors({
  origin: ['http://127.0.0.1:5500'], // Match the exact frontend origin
  methods: ['GET', 'POST'],
  credentials: true // Allow cookies/session if needed
}));

// Body Parsing Middleware
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form data

// Routes
app.use('/api/surveys', surveyRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database Connection with Retry Logic
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
  })
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

const PORT = process.env.PORT || 5001; // Change to 5001
// Start the connection process
connectWithRetry();