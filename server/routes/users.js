const express = require('express');
const router = express.Router();

const allowedChannels = ['email', 'sms', 'phone'];

let currentUser = {
  name: 'Anonymous',
  contact: '',
  notificationChannel: 'email',
};

router.get('/me', (req, res) => {
  res.json(currentUser);
});

router.patch('/me', (req, res) => {
  const { name, contact, notificationChannel } = req.body;
  if (typeof name !== 'undefined') currentUser.name = name;
  if (typeof contact !== 'undefined') currentUser.contact = contact;
  if (typeof notificationChannel !== 'undefined') {
    if (!allowedChannels.includes(notificationChannel)) {
      return res.status(400).json({ error: 'Invalid channel' });
    }
    currentUser.notificationChannel = notificationChannel;
  }
  res.json(currentUser);
});

module.exports = router;
