require('dotenv').config(); // Load environment variables FIRST

const app = require('./app'); // Your Express app
const connectDB = require('./config/db');
<<<<<<< HEAD

// Connect to MongoDB and start the server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
=======
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

// Connect to MongoDB and start the server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
>>>>>>> 63834f1de3bb435132818742a1d6d3bcb37fc6a2
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Server not started due to DB connection error:', err);
});
