const express = require('express');
const router = express.Router();
const {
  getAdvocates,
  getAdvocatesBySpecialization,
  getAdvocateById,
  createAdvocate,
  updateAdvocate,
  deleteAdvocate
} = require('../controllers/advocateController');

// @route   GET /api/advocates
// @desc    Get all advocates
router.get('/', getAdvocates);

// @route   GET /api/advocates/specialization/:specialization
// @desc    Get advocates by specialization
router.get('/specialization/:specialization', getAdvocatesBySpecialization);

// @route   GET /api/advocates/:id
// @desc    Get an advocate by ID
router.get('/:id', getAdvocateById);

// @route   POST /api/advocates
// @desc    Create a new advocate
router.post('/', createAdvocate);

// @route   PUT /api/advocates/:id
// @desc    Update an advocate
router.put('/:id', updateAdvocate);

// @route   DELETE /api/advocates/:id
// @desc    Delete an advocate
router.delete('/:id', deleteAdvocate);

module.exports = router; 