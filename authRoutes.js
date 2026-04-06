const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// REGISTER
router.post('/api/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    const existingUser = await collection.findOne({ email: req.body.email }); // REQUIRED

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const result = await collection.insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// LOGIN
router.post('/api/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    const user = await collection.findOne({ email: req.body.email }); // REQUIRED

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE USER
router.put('/api/user/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    const user = await collection.findOne({ _id: req.params.id }); // REQUIRED

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await collection.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
