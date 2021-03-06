'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: "Le nom d'utilisateur est déjà utilisé. Veuillez en saisir un nouveau."
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Cette adresse email est déjà utilisée. Veuillez en saisir une différente."
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};