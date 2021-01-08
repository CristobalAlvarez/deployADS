'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mother extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Mother.init({
    rut: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    wsp_number: DataTypes.STRING,
    address: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mother',
  });
  return Mother;
};