'use strict';
const {
  Model
} = require('sequelize');
const {BOOKING_STATUS} = require('../utils/common/enums');
const {CONFIRMED, CANCELLED, PENDING, INITIATED} = BOOKING_STATUS;
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId:{
      type: DataTypes.INTEGER,
      allowNull: false  
    },
    status:{
      type: DataTypes.ENUM,
      values:[CONFIRMED, CANCELLED, PENDING, INITIATED],
      defaultValue:INITIATED,
      allowNull: false
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalCost:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    noOfSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};