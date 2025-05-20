const express = require('express');
const connectDB = require('./config/db');
const gradeReportRoutes = require('./routes/gradeReport');

const app = express();

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