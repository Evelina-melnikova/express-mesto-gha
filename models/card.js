const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Имя" является обязательным',
    },
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: {
      value: true,
      message: 'Поле "Ссылка" является обязательным',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
