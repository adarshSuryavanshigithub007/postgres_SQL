'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('apiLog', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('apiLog');
  }
};