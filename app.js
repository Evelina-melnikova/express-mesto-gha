const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/root');
const { errors } = require('celebrate');
const NotFoundError = require('./utils/notFoundError');
const error = require('./utils/error');

// const HttpCodes = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(json());
// app.use((req, res, next) => {
//   req.user = {
//     _id: '65a817e5b850daa6de516899',
//   };
//   next();
// });

app.use(router);
app.use(errors());
app.use('*', (e) => {
  throw new NotFoundError('Такой страницы не существует');
});
app.use(error);
app.listen(PORT, () => {
  console.log(`Запущен порт: ${PORT}`);
});
