const express = require('express');
const path = require('path');
const pool = require('../config/database'); // Adjust the path as necessary
const router = express.Router();

// POOL STEPS
// starting async query
// async query finished
// starting callback query
// calling end
// callback query finished
// pool has drained


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/property', async (req, res) => {
  try {
    const result = await pool.query('SELECT property_code FROM property');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});


module.exports = router;
