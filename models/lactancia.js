'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lactancia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lactancia.init({
    child_diseases: DataTypes.STRING,
    mother_diseases: DataTypes.STRING,
    child_drugs: DataTypes.STRING,
    lactance_type: DataTypes.STRING,
    milk_formule: DataTypes.STRING,
    diaper_count: DataTypes.INTEGER,
    poop_count: DataTypes.INTEGER,
    last_weight: DataTypes.INTEGER,
    last_size_child: DataTypes.INTEGER,
    last_control_date: DataTypes.DATEONLY,
    reason: DataTypes.STRING,
    child_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lactancia',
  });
  return Lactancia;
};