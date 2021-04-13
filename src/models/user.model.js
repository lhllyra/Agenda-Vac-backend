const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  CPF: String,
  birthDate: Date,
  _id: String,
}, {
  timestamps: true,
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
