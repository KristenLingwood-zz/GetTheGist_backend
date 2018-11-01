const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const gistRoutes = require('./routes/gists');
const APIError = require('./APIError');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cors());


app.use('/gists', gistRoutes);


app.use((error, req, res, next) => {
  // format built-in errors
  if (!(error instanceof APIError)) {
    error = new APIError(500, error.type, error.message);
  }
  console.log(error);

  return res.status(error.status).json(error);
});

module.exports = app;
