const express = require('express');
const router = express.Router();
const {
  getCases,
  getCaseById,
  getCaseByCaseNumber,
  createCase,
  updateCase,
  deleteCase
} = require('../controllers/caseController');

// @route   GET /api/cases
// @desc    Get all cases
router.get('/', getCases);

// @route   GET /api/cases/number/:caseNumber
// @desc    Get a case by case number
router.get('/number/:caseNumber', getCaseByCaseNumber);

// @route   GET /api/cases/:id
// @desc    Get a case by ID
router.get('/:id', getCaseById);

// @route   POST /api/cases
// @desc    Create a new case
router.post('/', createCase);

// @route   PUT /api/cases/:id
// @desc    Update a case
router.put('/:id', updateCase);

// @route   DELETE /api/cases/:id
// @desc    Delete a case
router.delete('/:id', deleteCase);

module.exports = router; 