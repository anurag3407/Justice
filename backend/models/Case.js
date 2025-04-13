const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true
  },
  court: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  nextHearingDate: {
    type: String
  },
  judge: {
    type: String,
    required: true
  },
  plaintiff: {
    type: String,
    required: true
  },
  defendant: {
    type: String,
    required: true
  },
  filingDate: {
    type: String,
    required: true
  },
  updates: [updateSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Case', caseSchema); 