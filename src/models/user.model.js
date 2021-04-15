const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  CPF: String,
  birthDate: Number,
  _id: String,
}, {
  timestamps: true,
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
