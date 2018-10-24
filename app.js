const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const gistRoutes = require('./routes/gists');
const APIError = require('./APIError');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/gists', gistRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

app.use((error, req, res, next) => {
  // format built-in errors
  if (!(error instanceof APIError)) {
    error = new APIError(500, error.type, error.message);
  }
  console.log(error);

  return res.status(error.status).json(error);
});

module.exports = app;
