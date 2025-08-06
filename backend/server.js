require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const facebookRoutes = require('./routes/facebookRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/facebook', facebookRoutes);
app.use('/api/ai', aiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
