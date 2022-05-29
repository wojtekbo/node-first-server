const express = require('express');
const hbs = require('express-handlebars');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.raw());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', hbs());
// app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name});
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {layout: 'dark'});
});

app.post('/api', (req, res) => {
  conosle.log(req.body);
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
    cb(null, uniqueSuffix + '_' + file.originalname);
  },
});

const upload = multer({storage: storage});

app.post('/contact/send-message', upload.single('fileName'), (req, res) => {
  const {author, sender, title, message} = req.body;

  if (author && sender && title && message && req.file) {
    const protocol = req.protocol;
    const host = req.get('host');
    const filename = req.file.filename;
    const fullUrl = `${protocol}://${host}/${filename}`;
    res.render('contact', {isSent: true, fileName: req.file.originalname, filePath: fullUrl});
  } else {
    res.render('contact', {isError: true});
  }
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
