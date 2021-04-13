const express = require('express');
const mongoose = require('mongoose');

const UserController = require('./controllers/user.controller');
const AppointmentController = require('./controllers/appointment.controller');

mongoose.connect('mongodb://localhost:27017/agenda-vac', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send({ message: 'Hello World' });
});

app.get('/user', (request, response) => {
  UserController.index(request, response);
});

app.post('/user', (request, response) => {
  UserController.store(request, response);
});

app.get('/appointment', (request, response) => {
  AppointmentController.index(request, response);
});

app.post('/appointment', (request, response) => {
  AppointmentController.store(request, response);
});

app.listen(3333, () => {
  console.log('Estou aqui na porta 3333!');
});
