const Case = require('../models/Case');

// @desc    Get all cases
// @route   GET /api/cases
// @access  Public
const getCases = async (req, res) => {
  try {
    const cases = await Case.find({});
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get case by ID
// @route   GET /api/cases/:id
// @access  Public
const getCaseById = async (req, res) => {
  try {
    const courtCase = await Case.findById(req.params.id);
    
    if (!courtCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    
    res.status(200).json(courtCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get case by case number
// @route   GET /api/cases/number/:caseNumber
// @access  Public
const getCaseByCaseNumber = async (req, res) => {
  try {
    const caseNumber = req.params.caseNumber;
    const courtCase = await Case.findOne({ caseNumber });
    
    if (!courtCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    
    res.status(200).json(courtCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new case
// @route   POST /api/cases
// @access  Private (would normally require authentication)
const createCase = async (req, res) => {
  try {
    const {
      caseNumber,
      court,
      title,
      description,
      status,
      nextHearingDate,
      judge,
      plaintiff,
      defendant,
      filingDate,
      updates
    } = req.body;
    
    const newCase = new Case({
      caseNumber,
      court,
      title,
      description,
      status,
      nextHearingDate,
      judge,
      plaintiff,
      defendant,
      filingDate,
      updates
    });
    
    const createdCase = await newCase.save();
    res.status(201).json(createdCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a case
// @route   PUT /api/cases/:id
// @access  Private
const updateCase = async (req, res) => {
  try {
    const {
      caseNumber,
      court,
      title,
      description,
      status,
      nextHearingDate,
      judge,
      plaintiff,
      defendant,
      filingDate,
      updates
    } = req.body;
    
    const courtCase = await Case.findById(req.params.id);
    
    if (!courtCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    
    courtCase.caseNumber = caseNumber || courtCase.caseNumber;
    courtCase.court = court || courtCase.court;
    courtCase.title = title || courtCase.title;
    courtCase.description = description || courtCase.description;
    courtCase.status = status || courtCase.status;
    courtCase.nextHearingDate = nextHearingDate || courtCase.nextHearingDate;
    courtCase.judge = judge || courtCase.judge;
    courtCase.plaintiff = plaintiff || courtCase.plaintiff;
    courtCase.defendant = defendant || courtCase.defendant;
    courtCase.filingDate = filingDate || courtCase.filingDate;
    
    if (updates) {
      courtCase.updates = updates;
    }
    
    const updatedCase = await courtCase.save();
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a case
// @route   DELETE /api/cases/:id
// @access  Private
const deleteCase = async (req, res) => {
  try {
    const courtCase = await Case.findById(req.params.id);
    
    if (!courtCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    
    await courtCase.remove();
    res.status(200).json({ message: 'Case removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCases,
  getCaseById,
  getCaseByCaseNumber,
  createCase,
  updateCase,
  deleteCase
}; 