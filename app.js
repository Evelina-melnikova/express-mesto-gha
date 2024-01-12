const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/root');
const HttpCodes = require('./utils/constants');

const { PORT = '3000', MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());
app.use((req, res, next) => {
  req.user = {
    _id: '659d1522e9eff3d6521a56ce',
  };
  next();
});

app.use(router);

app.use((req, res, next) => {
  res.status(HttpCodes.notFoundErr).send({ message: 'Такого маршрута не существует' });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
