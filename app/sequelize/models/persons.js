'use strict';
module.exports = (sequelize, DataTypes) => {
  const Persons = sequelize.define('Persons', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    // individualHooks: true,
    // onDelete: 'CASCADE', // hooks: true
    hooks: {
      beforeBulkDestroy: function (options) {
        // console.log(options.model.getPersonInfo)
      // //   // options.force = true
      // //   // options.cascade = true
      // //   // options.individualHooks = true;
      //   return options;
      }
    }
  });
  Persons.associate = function(models) {
    // models.Persons.hasMany(models.PersonInfo)
    models.Persons.hasOne(models.PersonInfo, {
      foreignKey: 'id', onDelete: 'cascade' // , individualHooks: true // onDelete: 'CASCADE', constraints: false // individualHooks: true // , onDelete: 'CASCADE', hooks: true
    }) // , as: 'info'
  };
  return Persons;
};