const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Route files
const caseRoutes = require('./routes/caseRoutes');
const advocateRoutes = require('./routes/advocateRoutes');
const glossaryRoutes = require('./routes/glossaryRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Mount routers
app.use('/api/cases', caseRoutes);
app.use('/api/advocates', advocateRoutes);
app.use('/api/glossary', glossaryRoutes);
app.use('/api/ai', aiRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Initialize express server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  
  // Connect to database (but don't exit if it fails)
  const dbConnected = await connectDB();
  if (!dbConnected) {
    console.log('Server running in fallback mode with mock data');
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
}); 