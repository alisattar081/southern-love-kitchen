const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

// serve static files from the project root
app.use(express.static(path.join(__dirname, '..')));

app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
