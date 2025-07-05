const mongoose = require('mongoose');

const moneySchema = new mongoose.Schema({
  amount: Number,
  category: String,
  tag: String,
  note: String,
  userId: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Money', moneySchema);
