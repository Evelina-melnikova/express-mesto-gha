const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: 'Поле "Имя" является обязательным',
      },
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: {
        value: true,
        message: 'Поле "О себе" является обязательным',
      },
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    avatar: {
      type: String,
      required: {
        value: true,
        message: 'Поле "Аватар" является обязательным',
      },
      minlength: [5, 'Минимальная длина 5 символов'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('user', userSchema);
