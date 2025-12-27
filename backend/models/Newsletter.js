const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const Newsletter = sequelize.define('Newsletter', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  subscribedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});

module.exports = Newsletter;
