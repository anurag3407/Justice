const GlossaryTerm = require('../models/GlossaryTerms');

// @desc    Get all glossary terms
// @route   GET /api/glossary
// @access  Public
const getGlossaryTerms = async (req, res) => {
  try {
    const terms = await GlossaryTerm.find({});
    res.status(200).json(terms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get glossary terms by category
// @route   GET /api/glossary/category/:category
// @access  Public
const getGlossaryTermsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const terms = await GlossaryTerm.find({ category });
    
    res.status(200).json(terms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get glossary term by ID
// @route   GET /api/glossary/:id
// @access  Public
const getGlossaryTermById = async (req, res) => {
  try {
    const term = await GlossaryTerm.findById(req.params.id);
    
    if (!term) {
      return res.status(404).json({ message: 'Glossary term not found' });
    }
    
    res.status(200).json(term);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new glossary term
// @route   POST /api/glossary
// @access  Private
const createGlossaryTerm = async (req, res) => {
  try {
    const { term, definition, category } = req.body;
    
    const newTerm = new GlossaryTerm({
      term,
      definition,
      category
    });
    
    const createdTerm = await newTerm.save();
    res.status(201).json(createdTerm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a glossary term
// @route   PUT /api/glossary/:id
// @access  Private
const updateGlossaryTerm = async (req, res) => {
  try {
    const { term, definition, category } = req.body;
    
    const glossaryTerm = await GlossaryTerm.findById(req.params.id);
    
    if (!glossaryTerm) {
      return res.status(404).json({ message: 'Glossary term not found' });
    }
    
    glossaryTerm.term = term || glossaryTerm.term;
    glossaryTerm.definition = definition || glossaryTerm.definition;
    glossaryTerm.category = category || glossaryTerm.category;
    
    const updatedTerm = await glossaryTerm.save();
    res.status(200).json(updatedTerm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a glossary term
// @route   DELETE /api/glossary/:id
// @access  Private
const deleteGlossaryTerm = async (req, res) => {
  try {
    const glossaryTerm = await GlossaryTerm.findById(req.params.id);
    
    if (!glossaryTerm) {
      return res.status(404).json({ message: 'Glossary term not found' });
    }
    
    await glossaryTerm.remove();
    res.status(200).json({ message: 'Glossary term removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGlossaryTerms,
  getGlossaryTermsByCategory,
  getGlossaryTermById,
  createGlossaryTerm,
  updateGlossaryTerm,
  deleteGlossaryTerm
}; 