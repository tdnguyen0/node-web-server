const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

// register partials like header and footer
hbs.registerPartials(__dirname + '/views/partials');

// add handlebar view template engine
app.set('view engine', 'hbs');

// add public html folder
app.use(express.static(__dirname + '/public'));

// add server filder/interceptors
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// register hbs helper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// setup page endpoints
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our page',
    author: 'Thomas Nguyen'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    author: 'Thomas Nguyen'
  });
});

app.listen(port);
console.log('Server is up on port ', port);
