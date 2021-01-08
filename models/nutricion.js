'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nutricion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Nutricion.init({
    child_diseases: DataTypes.STRING,
    child_drugs: DataTypes.STRING,
    lactance_type: DataTypes.STRING,
    milk_formule: DataTypes.STRING,
    last_weight: DataTypes.INTEGER,
    last_size_child: DataTypes.INTEGER,
    last_control_date: DataTypes.DATEONLY,
    reason: DataTypes.STRING,
    child_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nutricion',
  });
  return Nutricion;
};