const express = require('express');
const app = express();

const giftRoutes = require('./giftRoutes');
const searchRoutes = require('./searchRoutes');

app.use(express.json());

// Routes
app.use(giftRoutes); // /api/gifts
app.use('/api/search', searchRoutes); // /api/search

module.exports = app;
