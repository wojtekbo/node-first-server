const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const app = express();
app.engine('.hbs', hbs());
// app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

// app.use((req, res, next) => {
//   res.show = name => {
//     res.sendFile(path.join(__dirname, `/views/${name}`));
//   };
//   next();
// });

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name});
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {layout: 'dark'});
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
