const express = require('express');
const router = express.Router();
const {
  getGlossaryTerms,
  getGlossaryTermsByCategory,
  getGlossaryTermById,
  createGlossaryTerm,
  updateGlossaryTerm,
  deleteGlossaryTerm
} = require('../controllers/glossaryController');

// @route   GET /api/glossary
// @desc    Get all glossary terms
router.get('/', getGlossaryTerms);

// @route   GET /api/glossary/category/:category
// @desc    Get glossary terms by category
router.get('/category/:category', getGlossaryTermsByCategory);

// @route   GET /api/glossary/:id
// @desc    Get a glossary term by ID
router.get('/:id', getGlossaryTermById);

// @route   POST /api/glossary
// @desc    Create a new glossary term
router.post('/', createGlossaryTerm);

// @route   PUT /api/glossary/:id
// @desc    Update a glossary term
router.put('/:id', updateGlossaryTerm);

// @route   DELETE /api/glossary/:id
// @desc    Delete a glossary term
router.delete('/:id', deleteGlossaryTerm);

module.exports = router; 