'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: Date,
    updatedAt: Date
  }, { timestamps: false });
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};