/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const UserModel = require('../models/user.model');

class User {
  async index(request, response) {
    const users = await UserModel.find();
    response.send({ data: users });
  }

  async store(request, response) {
    const { body } = request;

    const exists = await UserModel.findById(body._id);
    if (!exists) {
      try {
        const user = await UserModel.create(body);
        response.send({ data: user, message: 'Cadastro efetuado com sucesso' });
      } catch (error) {
        response.send({ message: error.message });
      }
    } else {
      response.send({ message: 'user exists!' });
    }
  }

  async getById(request, response) {
    const { id } = request.params;

    try {
      const user = await UserModel.findById(id);

      if (!user) {
        response.send({ message: 'User doesnt exist' });
      } else {
        response.send({ data: user });
      }
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }

  async putById(request, response) {
    const { body } = request;

    try {
      const user = await UserModel.findById(body._id);

      if (!user) {
        response.send({ message: 'User doesnt exist' });
      } else {
        user.isDone = body.isDone;
        user.report = body.report;
        await user.save();
      }
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    try {
      const user = await UserModel.findById(id);

      if (!user) {
        response.send({ message: 'User doesnt exist' });
      } else {
        await user.remove();
        response.send({ message: 'User removed' });
      }
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }
}

module.exports = new User();
