'use strict';
const {
  Model
} = require('sequelize');
const { userBoard } = require('../controllers/UserController');
const Game = require('./game')
const User = require('./user')
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Game, {
        foreignKey: 'game_id'
      }),
      Event.belongsTo(models.User, {
        foreignKey: 'organizer_id'
      })
      Event.belongsToMany(models.User, {
        through: "users_events"
      })
    }

    static isStarted() {
      const now = new Date()
      if (Date.parse(now) >= Date.parse(Event.startedAt)) {
        return true
      } else {
        return false
      }
    }
  };
  Event.init({
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
        // true
        // msg: "Un évènement portant se nom existe déjà."
      // }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    players: DataTypes.INTEGER,
    game_id : {
      type: DataTypes.INTEGER
    },
    organizer_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Event',
  });


  return Event;
};