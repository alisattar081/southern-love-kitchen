const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, phone, email, items, date, time } = req.body || {};
  if (!name || !phone || !email || !Array.isArray(items) || items.length === 0 || !date || !time) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  res.json({ success: true });
});

module.exports = router;
