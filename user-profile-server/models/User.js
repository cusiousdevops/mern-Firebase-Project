const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  coverPhoto: { type: String, required: true },
  personalDetails: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  status: { type: String, enum: ['ACTIVE', 'DISABLED'], default: 'ACTIVE' },
});

module.exports = mongoose.model('User', UserSchema);
