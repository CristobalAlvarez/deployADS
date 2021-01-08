'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Nutricions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      child_diseases: {
        type: Sequelize.STRING
      },
      child_drugs: {
        type: Sequelize.STRING
      },
      lactance_type: {
        type: Sequelize.STRING
      },
      milk_formule: {
        type: Sequelize.STRING
      },
      last_weight: {
        type: Sequelize.INTEGER
      },
      last_size_child: {
        type: Sequelize.INTEGER
      },
      last_control_date: {
        type: Sequelize.DATEONLY
      },
      reason: {
        type: Sequelize.STRING
      },
      child_id: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Nutricions');
  }
};