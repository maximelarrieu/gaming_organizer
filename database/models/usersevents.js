'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersEvents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usersEvents.belongsTo(models.User, {
        foreignKey: 'UserId'
      }),
      usersEvents.belongsTo(models.Event, {
        foreignKey: 'EventId'
      })
    }
  };
  usersEvents.init({
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersEvents',
  });
  return usersEvents;
};