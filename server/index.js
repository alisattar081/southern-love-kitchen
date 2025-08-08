const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

// Models
require('./models/User');
require('./models/Order');

const app = express();
app.use(express.json());

mongoose.connect(config.dbUri).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.error('Database connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Southern Love Kitchen API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
