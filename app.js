const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { ERROR_NOT_FOUND } = require('./utils/status');

const app = express();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

// Блок кода для работы с mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '648f7fcf7c73185e6127c6c2' };
  next();
});

app.use('/cards', cardRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`Адрес сервера — ${PORT}`);
});
