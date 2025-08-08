const express = require('express');
const router = express.Router();

// In-memory storage of orders by user id
const ordersByUser = {};

function getUserId(req) {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) {
    return auth.slice(7);
  }
  return null;
}

// POST /orders - create a new order for authenticated user
router.post('/', (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const order = { ...req.body, id: Date.now() };
  if (!ordersByUser[userId]) {
    ordersByUser[userId] = [];
  }
  ordersByUser[userId].push(order);
  res.status(201).json(order);
});

// GET /orders/mine - fetch orders for authenticated user
router.get('/mine', (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json(ordersByUser[userId] || []);
});

module.exports = router;
