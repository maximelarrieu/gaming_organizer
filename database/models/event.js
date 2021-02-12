'use strict';
const {
  Model
} = require('sequelize');
const Game = require('./game')
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
    title: {
      type: DataTypes.STRING,
      unique: true
        // true
        // msg: "Un évènement portant se nom existe déjà."
      // }
    },
    description: DataTypes.TEXT,
    startedAt: DataTypes.DATE,
    players: DataTypes.INTEGER,
    game_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Game,
        key: 'game_id'
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });


  return Event;
};