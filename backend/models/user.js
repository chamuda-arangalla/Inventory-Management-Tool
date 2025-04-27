const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  nic: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: true },
  designation: { type: String, required: true },
  marriedStatus: { type: String, enum: ['single', 'married'], default: 'single' },
  age: { type: Number, required: true },
  imageUrl: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);