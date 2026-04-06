const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// GET search by category
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const category = req.query.category;

    let query = {};
    if (category) {
      query.category = category;
    }

    const results = await db.collection('items').find(query).toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
