const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  vacDate: String,
  vacTime: String,
  CPF: [String],
  _id: String,
}, {
  timestamps: true,
});

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;
