require('dotenv').config(); // Load environment variables FIRST

const app = require('./app'); // Your Express app
const connectDB = require('./config/db');

// Connect to MongoDB and start the server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Server not started due to DB connection error:', err);
});
