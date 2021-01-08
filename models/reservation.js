'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reservation.init({
    start: DataTypes.DATE,
    type: DataTypes.STRING,
    file_path: DataTypes.STRING,
    child_id: DataTypes.INTEGER,
    end: DataTypes.DATE,
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN,
    payment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};