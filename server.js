const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use((req, res, next) => {
  res.show = name => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {layout: false, name: req.params.name});
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/contact', (req, res) => {
  res.show('contact.html');
});

app.get('/info', (req, res) => {
  res.show('info.html');
});

app.get('/history', (req, res) => {
  res.show('history.html');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
