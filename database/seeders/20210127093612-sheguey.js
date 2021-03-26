'use strict';
const bcrypt = require('bcrypt')

const password = "password"
const hash = bcrypt.hashSync(password, 10)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // bcrypt.hash('password', 10).then(hash => {
      return queryInterface.bulkInsert('Users', [{
        username: 'sheguey',
        email: 'maxime.larrieu@ynov.com',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
