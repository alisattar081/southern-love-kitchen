const express = require('express');
const path = require('path');
const cors = require('cors');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(express.json());
app.use(cors());

// serve static files from the project root
app.use(express.static(path.join(__dirname, '..')));

app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
