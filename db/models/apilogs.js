'use strict';
const db = require('../../db/models/apilogs')
const { Sequelize} = require('sequelize')
module.exports = db.define('apiLog', {
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
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.STRING
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
