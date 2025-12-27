const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const sequelize = require('../utils/sequelize');

// Import all models
const Order = require('../models/Order');
const Review = require('../models/Review');
const Applicant = require('../models/Applicant');
const Collaboration = require('../models/Collaboration');
const Newsletter = require('../models/Newsletter');
const Testimonial = require('../models/Testimonial');

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    // Get counts
    const [
      totalOrders,
      todayOrders,
      monthOrders,
      pendingReviews,
      totalReviews,
      pendingApplicants,
      totalApplicants,
      pendingCollaborations,
      totalCollaborations,
      newsletterSubscribers,
      totalTestimonials,
    ] = await Promise.all([
      Order.count(),
      Order.count({ where: { createdAt: { [Op.gte]: today } } }),
      Order.count({ where: { createdAt: { [Op.gte]: thisMonth } } }),
      Review.count({ where: { status: 'pending' } }),
      Review.count(),
      Applicant.count({ where: { status: 'pending' } }),
      Applicant.count(),
      Collaboration.count({ where: { status: 'pending' } }),
      Collaboration.count(),
      Newsletter.count(),
      Testimonial.count(),
    ]);
    
    // Calculate revenue
    const revenueResult = await Order.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalRevenue'],
      ],
      where: {
        status: { [Op.in]: ['completed', 'processing'] }
      },
      raw: true,
    });
    
    const monthRevenueResult = await Order.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'monthRevenue'],
      ],
      where: {
        status: { [Op.in]: ['completed', 'processing'] },
        createdAt: { [Op.gte]: thisMonth }
      },
      raw: true,
    });
    
    const totalRevenue = parseFloat(revenueResult?.totalRevenue || 0);
    const monthRevenue = parseFloat(monthRevenueResult?.monthRevenue || 0);
    
    res.json({
      orders: {
        total: totalOrders,
        today: todayOrders,
        month: monthOrders,
      },
      revenue: {
        total: totalRevenue,
        month: monthRevenue,
      },
      reviews: {
        total: totalReviews,
        pending: pendingReviews,
      },
      applicants: {
        total: totalApplicants,
        pending: pendingApplicants,
      },
      collaborations: {
        total: totalCollaborations,
        pending: pendingCollaborations,
      },
      newsletter: {
        subscribers: newsletterSubscribers,
      },
      testimonials: {
        total: totalTestimonials,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
});

// Get recent activity
router.get('/activity', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const [recentOrders, recentReviews, recentApplicants, recentCollaborations] = await Promise.all([
      Order.findAll({
        limit: limit,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'customerName', 'gameName', 'status', 'totalPrice', 'createdAt'],
      }),
      Review.findAll({
        limit: limit,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'rating', 'status', 'createdAt'],
      }),
      Applicant.findAll({
        limit: limit,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'fullName', 'position', 'status', 'createdAt'],
      }),
      Collaboration.findAll({
        limit: limit,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'companyName', 'collaborationType', 'status', 'createdAt'],
      }),
    ]);
    
    res.json({
      orders: recentOrders,
      reviews: recentReviews,
      applicants: recentApplicants,
      collaborations: recentCollaborations,
    });
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ error: 'Failed to fetch recent activity' });
  }
});

// Get chart data for orders over time
router.get('/charts/orders', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);
    
    const orders = await Order.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'revenue'],
      ],
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']],
      raw: true,
    });
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching order chart data:', error);
    res.status(500).json({ error: 'Failed to fetch order chart data' });
  }
});

module.exports = router;
