const express = require('express');
const router = express.Router();
const Collaboration = require('../models/Collaboration');

// Get all collaborations
router.get('/', async (req, res) => {
  try {
    const { status, collaborationType } = req.query;
    const where = {};
    
    if (status) where.status = status;
    if (collaborationType) where.collaborationType = collaborationType;
    
    const collaborations = await Collaboration.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    
    res.json(collaborations);
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    res.status(500).json({ error: 'Failed to fetch collaborations' });
  }
});

// Get single collaboration
router.get('/:id', async (req, res) => {
  try {
    const collaboration = await Collaboration.findByPk(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ error: 'Collaboration not found' });
    }
    res.json(collaboration);
  } catch (error) {
    console.error('Error fetching collaboration:', error);
    res.status(500).json({ error: 'Failed to fetch collaboration' });
  }
});

// Create new collaboration
router.post('/', async (req, res) => {
  try {
    const { 
      companyName, 
      contactPerson, 
      email, 
      phone, 
      collaborationType, 
      description,
      proposedBudget 
    } = req.body;
    
    if (!companyName || !contactPerson || !email || !phone || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const collaboration = await Collaboration.create({
      companyName,
      contactPerson,
      email,
      phone,
      collaborationType,
      description,
      proposedBudget,
    });
    
    res.status(201).json(collaboration);
  } catch (error) {
    console.error('Error creating collaboration:', error);
    res.status(500).json({ error: 'Failed to create collaboration' });
  }
});

// Update collaboration status
router.patch('/:id', async (req, res) => {
  try {
    const collaboration = await Collaboration.findByPk(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ error: 'Collaboration not found' });
    }
    
    const { status, notes } = req.body;
    
    if (status) collaboration.status = status;
    if (notes !== undefined) collaboration.notes = notes;
    
    await collaboration.save();
    res.json(collaboration);
  } catch (error) {
    console.error('Error updating collaboration:', error);
    res.status(500).json({ error: 'Failed to update collaboration' });
  }
});

// Delete collaboration
router.delete('/:id', async (req, res) => {
  try {
    const collaboration = await Collaboration.findByPk(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ error: 'Collaboration not found' });
    }
    
    await collaboration.destroy();
    res.json({ message: 'Collaboration deleted successfully' });
  } catch (error) {
    console.error('Error deleting collaboration:', error);
    res.status(500).json({ error: 'Failed to delete collaboration' });
  }
});

module.exports = router;
