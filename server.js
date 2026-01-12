require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const solutionRoutes = require('./routes/solutionRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// Request logging middleware - VERY TOP
app.use((req, res, next) => {
    console.log(`\n🔴🔴🔴 REQUEST RECEIVED: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log('Body:', JSON.stringify(req.body, null, 2));
    next();
});

// Status Route
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NextGlide Backend Status</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f2f5; color: #333; }
            .container { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #0070f3; margin-bottom: 0.5rem; }
            p { color: #666; }
            .status { display: inline-block; padding: 0.25rem 0.5rem; background: #e6fffa; color: #047857; border-radius: 4px; font-weight: bold; margin-top: 1rem; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Backend Running</h1>
            <p>NextGlide Elevate Backend is active and listening.</p>
            <div class="status">● System Operational</div>
        </div>
    </body>
    </html>
    `);
});

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/services', serviceRoutes); // Register Service Routes
app.use('/api/solutions', solutionRoutes); // Register Solution Routes

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
