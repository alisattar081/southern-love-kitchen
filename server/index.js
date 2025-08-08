const express = require('express');
const path = require('path');
const cors = require('cors');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use(cors());

// Set up EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// serve static files from the project root
app.use(express.static(path.join(__dirname, '..')));

app.use('/users', usersRouter);

// Page routes
app.get('/', (req, res) => res.render('index', { active: 'home' }));
app.get('/menu', (req, res) => res.render('menu', { active: 'menu' }));
app.get('/order', (req, res) => res.render('order', { active: 'order' }));
app.get('/catering', (req, res) => res.render('catering', { active: 'catering' }));
app.get('/about', (req, res) => res.render('about', { active: 'about' }));
app.get('/gallery', (req, res) => res.render('gallery', { active: 'gallery' }));
app.get('/reviews', (req, res) => res.render('reviews', { active: 'reviews' }));
app.get('/contact', (req, res) => res.render('contact', { active: 'contact' }));
app.get('/faq', (req, res) => res.render('faq', { active: 'faq' }));
app.get('/profile', (req, res) => res.render('profile', { active: 'profile' }));
app.get('/login', (req, res) => res.render('login', { active: 'login' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
