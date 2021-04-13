/* eslint-disable class-methods-use-this */
const UserModel = require('../models/user.model');

class User {
  async index(request, response) {
    const users = await UserModel.find();
    response.send({ users });
  }

  async store(request, response) {
    const { body } = request;

    try {
      const user = await UserModel.create(body);
      response.send({ user });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  async getById(request, response) {
    const { id } = request.params;

    try {
      const user = await UserModel.findById(id);

      if (!user) {
        response.send({ message: 'User doesnt exist' });
      }

      response.send({ user });
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
      }

      await user.remove();

      response.send({ message: 'User removed' });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }
}

module.exports = new User();
