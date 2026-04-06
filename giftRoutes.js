const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectToDatabase = require('./db');

// GET all gifts
router.get('/api/gifts', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection('items').find().toArray();
    res.status(200).json(gifts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET gift by ID
router.get('/api/gifts/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gift = await db.collection('items').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!gift) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(gift);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
