require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Routes = require('./routes');

const { MONGO_URL, HTTP_PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const app = express();
app.use(cors());

app.use(express.json());

app.use(Routes);

app.get('/', (request, response) => {
  response.send({ message: 'Hello World' });
});

app.listen(HTTP_PORT, () => {
  console.log(`Backend is a-go, PORT:${HTTP_PORT}`);
});
