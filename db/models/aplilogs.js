'use strict';
const {
  Sequelize
} = require('sequelize');
const db = require('../../config/database');
module.exports = db.define('aplilogs',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  api_name: {
    type: Sequelize.STRING
  },
  api_request: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  ip_address: {
    type: Sequelize.STRING
  },
  message: {
    type: Sequelize.STRING
  },
  response: {
    type: Sequelize.STRING(1000),
  },
  timestamp: {
    type: Sequelize.DATE
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
})