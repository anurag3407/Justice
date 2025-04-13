const mongoose = require('mongoose');

const glossaryTermSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    unique: true
  },
  definition: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GlossaryTerm', glossaryTermSchema); 