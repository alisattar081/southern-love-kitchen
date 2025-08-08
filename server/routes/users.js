const express = require('express');
const router = express.Router();

let currentUser = {
  name: 'Anonymous',
  contact: '',
  notificationChannel: 'email'
};

router.get('/me', (req, res) => {
  res.json(currentUser);
});

router.patch('/me', (req, res) => {
  const { name, contact, notificationChannel } = req.body;
  if (typeof name !== 'undefined') currentUser.name = name;
  if (typeof contact !== 'undefined') currentUser.contact = contact;
  if (typeof notificationChannel !== 'undefined') {
    currentUser.notificationChannel = notificationChannel;
  }
  res.json(currentUser);
});

module.exports = router;
