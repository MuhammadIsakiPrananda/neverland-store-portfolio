const express = require('express');
const router = express.Router();
const Applicant = require('../models/Applicant');

// Get all applicants
router.get('/', async (req, res) => {
  try {
    const { status, position } = req.query;
    const where = {};
    
    if (status) where.status = status;
    if (position) where.position = position;
    
    const applicants = await Applicant.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    
    res.json(applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
});

// Get single applicant
router.get('/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findByPk(req.params.id);
    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }
    res.json(applicant);
  } catch (error) {
    console.error('Error fetching applicant:', error);
    res.status(500).json({ error: 'Failed to fetch applicant' });
  }
});

// Create new applicant
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, position, experience, coverLetter, resume } = req.body;
    
    if (!fullName || !email || !phone || !position) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const applicant = await Applicant.create({
      fullName,
      email,
      phone,
      position,
      experience,
      coverLetter,
      resume,
    });
    
    res.status(201).json(applicant);
  } catch (error) {
    console.error('Error creating applicant:', error);
    res.status(500).json({ error: 'Failed to create applicant' });
  }
});

// Update applicant status
router.patch('/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findByPk(req.params.id);
    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }
    
    const { status, notes } = req.body;
    
    if (status) applicant.status = status;
    if (notes !== undefined) applicant.notes = notes;
    
    await applicant.save();
    res.json(applicant);
  } catch (error) {
    console.error('Error updating applicant:', error);
    res.status(500).json({ error: 'Failed to update applicant' });
  }
});

// Delete applicant
router.delete('/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findByPk(req.params.id);
    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }
    
    await applicant.destroy();
    res.json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    console.error('Error deleting applicant:', error);
    res.status(500).json({ error: 'Failed to delete applicant' });
  }
});

module.exports = router;
