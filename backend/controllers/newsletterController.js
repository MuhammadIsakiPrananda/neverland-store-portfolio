const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    let existing = await Newsletter.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Already subscribed' });
    const sub = new Newsletter({ email });
    await sub.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
