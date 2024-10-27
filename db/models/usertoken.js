'use strict';
const {
  Sequelize
} = require('sequelize');
const db = require('../../config/database');
module.exports = db.define('userToken',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  },
  expire_at: {
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
},{
  timestamp:true,
  underscored : true,
  indexes:[
    {
      fields:["user_id"]
    },
    {
      fields:["token"]
    }
  ]
})
