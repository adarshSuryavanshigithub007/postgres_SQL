const { Sequelize } = require('sequelize'); // Changed to 'Sequelize' to avoid conflict

const env = process.env.NODE_ENV || 'development';

const config = require('./config'); // Make sure the path to your config is correct

const sequelize = new Sequelize(config[env]); // Use 'Sequelize' here to create a new instance

module.exports = sequelize; // Fixed typo: changed 'Exports' to 'exports'
