'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Game.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    releasedAt: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Game',
  });

  return Game;
};