const express = require('express');
const cors = require('cors'); // ✅ Import cors
const connectDB = require('./config/db');
const gradeReportRoutes = require('./routes/gradeReport');

const app = express();

// ✅ Enable CORS (adjust origin if needed)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // use if you're dealing with cookies or sessions
}));

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes
app.use('/api/grade-report', gradeReportRoutes); // gradeReport routes

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
