'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    startedAt: DataTypes.DATE,
    players: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });

  Event.associate = function(models) {
    Event.belongsTo(models.Game, {foreignKey: 'game_id'})
  }

  return Event;
};