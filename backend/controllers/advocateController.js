const Advocate = require('../models/Advocate');

// @desc    Get all advocates
// @route   GET /api/advocates
// @access  Public
const getAdvocates = async (req, res) => {
  try {
    const advocates = await Advocate.find({});
    res.status(200).json(advocates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get advocates by specialization
// @route   GET /api/advocates/specialization/:specialization
// @access  Public
const getAdvocatesBySpecialization = async (req, res) => {
  try {
    const specialization = req.params.specialization;
    const advocates = await Advocate.find({ specialization });
    
    res.status(200).json(advocates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get advocate by ID
// @route   GET /api/advocates/:id
// @access  Public
const getAdvocateById = async (req, res) => {
  try {
    const advocate = await Advocate.findById(req.params.id);
    
    if (!advocate) {
      return res.status(404).json({ message: 'Advocate not found' });
    }
    
    res.status(200).json(advocate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new advocate
// @route   POST /api/advocates
// @access  Private
const createAdvocate = async (req, res) => {
  try {
    const {
      name,
      specialization,
      fees,
      experience,
      contact,
      rating,
      description,
      image
    } = req.body;
    
    const newAdvocate = new Advocate({
      name,
      specialization,
      fees,
      experience,
      contact,
      rating,
      description,
      image
    });
    
    const createdAdvocate = await newAdvocate.save();
    res.status(201).json(createdAdvocate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an advocate
// @route   PUT /api/advocates/:id
// @access  Private
const updateAdvocate = async (req, res) => {
  try {
    const {
      name,
      specialization,
      fees,
      experience,
      contact,
      rating,
      description,
      image
    } = req.body;
    
    const advocate = await Advocate.findById(req.params.id);
    
    if (!advocate) {
      return res.status(404).json({ message: 'Advocate not found' });
    }
    
    advocate.name = name || advocate.name;
    advocate.specialization = specialization || advocate.specialization;
    advocate.fees = fees || advocate.fees;
    advocate.experience = experience || advocate.experience;
    advocate.contact = contact || advocate.contact;
    advocate.rating = rating || advocate.rating;
    advocate.description = description || advocate.description;
    advocate.image = image || advocate.image;
    
    const updatedAdvocate = await advocate.save();
    res.status(200).json(updatedAdvocate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an advocate
// @route   DELETE /api/advocates/:id
// @access  Private
const deleteAdvocate = async (req, res) => {
  try {
    const advocate = await Advocate.findById(req.params.id);
    
    if (!advocate) {
      return res.status(404).json({ message: 'Advocate not found' });
    }
    
    await advocate.remove();
    res.status(200).json({ message: 'Advocate removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdvocates,
  getAdvocatesBySpecialization,
  getAdvocateById,
  createAdvocate,
  updateAdvocate,
  deleteAdvocate
}; 