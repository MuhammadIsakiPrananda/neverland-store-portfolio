const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const { status, isPublished } = req.query;
    const where = {};
    
    if (status) where.status = status;
    if (isPublished !== undefined) where.isPublished = isPublished === 'true';
    
    const reviews = await Review.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get single review
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

// Create new review
router.post('/', async (req, res) => {
  try {
    const { name, email, rating, message, gameName } = req.body;
    
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const review = await Review.create({
      name,
      email,
      rating,
      message,
      gameName,
    });
    
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update review status
router.patch('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    const { status, isPublished } = req.body;
    
    if (status) review.status = status;
    if (isPublished !== undefined) review.isPublished = isPublished;
    
    await review.save();
    res.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    await review.destroy();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;
