const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/root');

const HttpCodes = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(json());
app.use((req, res, next) => {
  req.user = {
    _id: '65a167c799a25e2a55401223',
  };
  next();
});

app.use(router);

app.use((req, res, next) => {
  res.status(HttpCodes.notFoundError).send({ message: 'Такого маршрута не существует' });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
