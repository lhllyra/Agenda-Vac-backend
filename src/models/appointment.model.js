const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  vacDate: String,
  vacTime: String,
  CPF: [String],
  Age: [Number],
  _id: String,
}, {
  timestamps: true,
});

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;
