const fs = require('fs');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', hbs);

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.originalUrl}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to add to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
  // if (req.method === 'GET' && req.originalUrl === '/chalenge') {
    // res.render('chalenge.hbs', {
    //   pageTitle: 'Chalenge Page'
    // });
  // } else {
  //   next();
  // }
// });

app.use(express.static(path.join(__dirname, '/public')));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to node web app'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: {
      status: 400,
      message: 'Bad request'
    }
  });
});

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project Page'
  });
});

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
