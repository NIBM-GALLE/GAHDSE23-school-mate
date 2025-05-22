const express = require('express');
const connectDB = require('./config/db');
const studyMaterialRoutes = require('./routes/studyMaterial'); // Import the studyMaterial routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// use the routes
app.use('/api/study-materials', studyMaterialRoutes); // studyMaterial routes

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;