'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        unique: true, type: Sequelize.INTEGER,
        allowNull: false, autoIncrement: true, primaryKey: true
      },
      username: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      createdAt: { allowNull: true, type: Sequelize.DATE },
      updatedAt: { allowNull: true, type: Sequelize.DATE }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};