// Dependencies
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const path = require('path');
const minifyHTML = require('express-minify-html');

const app = express();

app.set('view engine', 'ejs');
app.use(compression());
app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true,
  },
}));

app.use(express.static(path.join(__dirname, 'views')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));

const lpsci = require('./routes/school');

app.use(lpsci);

// 404
app.use((req, res, next) => {
  const date = new Date().getFullYear();
  res.render('pages/schoolPath/404', {
    title: 'Oops an error occured...', description: 'err page', ogImage: 'put path here', currentYear: date,
  });
});

// 500 - Any server error
app.use((err, req, res, next) => {
  res.render('pages/schoolPath/404');
});

// Initialize Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
