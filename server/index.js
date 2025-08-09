const express = require('express');
const path = require('path');
const cors = require('cors');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use(cors());

// Set up EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// serve static files from the project root
app.use(express.static(path.join(__dirname, '..')));

app.use('/users', usersRouter);

// Render EJS pages for each HTML route
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:page.html', (req, res) => {
  res.render(req.params.page);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
