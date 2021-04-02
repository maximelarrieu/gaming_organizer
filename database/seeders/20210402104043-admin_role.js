'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE username = "sheguey"`
    );
    const roles = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name = "admin"`
    );
    const user = users[0][0].id
    const role = roles[0][0].id
    return queryInterface.bulkInsert('users_roles', [{
      RoleId: role,
      UserId: user,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_roles', null, {});
  }
};
