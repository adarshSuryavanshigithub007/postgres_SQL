'use strict';

const { Sequelize } = require('sequelize');
const db = require('../../config/database');

module.exports = db.define('projects', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isFeature: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  productImage: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shortDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  createdBy: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
  paranoid: true, // Enables deletedAt for soft deletes
  freezeTableName: true, // Prevent Sequelize from pluralizing table name
  tableName: 'projects', // Explicit table name
});
