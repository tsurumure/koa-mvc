'use strict';
module.exports = (sequelize, DataTypes) => {
  const PersonInfo = sequelize.define('PersonInfo', {
    age: DataTypes.INTEGER
  }, { timestamps: false });
  PersonInfo.associate = function(models) {
  //   // associations can be defined here
    models.PersonInfo.belongsTo(models.Persons, {
      foreignKey: 'id', onDelete: 'CASCADE'
      // constraints: false, hooks: true
    })
  };
  return PersonInfo;
};