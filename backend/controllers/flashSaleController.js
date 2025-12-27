const FlashSale = require('../models/FlashSale');

// Get all flash sales
exports.getAllFlashSales = async (req, res) => {
  try {
    const flashSales = await FlashSale.findAll({
      order: [['startTime', 'DESC']]
    });
    res.json(flashSales);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create flash sale
exports.createFlashSale = async (req, res) => {
  try {
    const { name, discount, startTime, endTime, gameIds } = req.body;
    
    const flashSale = await FlashSale.create({
      name,
      discount,
      startTime,
      endTime,
      gameIds
    });
    
    res.status(201).json(flashSale);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update flash sale
exports.updateFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, discount, startTime, endTime, gameIds } = req.body;
    
    const flashSale = await FlashSale.findByPk(id);
    if (!flashSale) {
      return res.status(404).json({ message: 'Flash sale not found' });
    }
    
    await flashSale.update({
      name,
      discount,
      startTime,
      endTime,
      gameIds
    });
    
    res.json(flashSale);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete flash sale
exports.deleteFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    
    const flashSale = await FlashSale.findByPk(id);
    if (!flashSale) {
      return res.status(404).json({ message: 'Flash sale not found' });
    }
    
    await flashSale.destroy();
    res.json({ message: 'Flash sale deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
