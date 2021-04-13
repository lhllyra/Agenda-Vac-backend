require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const UserRouter = require('./routes/user.route');
const AppointmentRouter = require('./routes/appointment.route');

const { MONGO_URL, HTTP_PORT } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());

app.use('/api', UserRouter, AppointmentRouter);

app.get('/', (request, response) => {
  response.send({ message: 'Hello World' });
});

app.listen(HTTP_PORT, () => {
  console.log(`Estou aqui na porta ${HTTP_PORT}!`);
});
