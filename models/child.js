'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Child extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Child.init({
    rut: DataTypes.STRING,
    name: DataTypes.STRING,
    birth_date: DataTypes.DATEONLY,
    birth_weight: DataTypes.INTEGER,
    mother_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Child',
  });
  return Child;
};