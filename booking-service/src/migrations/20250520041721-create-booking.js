'use strict';
/** @type {import('sequelize-cli').Migration} */
const {BOOKING_STATUS} = require('../utils/common/enums');
const {CONFIRMED, CANCELLED, PENDING, INITIATED} = BOOKING_STATUS;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false  
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values:[CONFIRMED, CANCELLED, PENDING, INITIATED],
        defaultValue:INITIATED, 
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:1
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
    await queryInterface.dropTable('Bookings');
  }
};