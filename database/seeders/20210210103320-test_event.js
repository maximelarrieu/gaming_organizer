'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const game = await queryInterface.sequelize.query(
      `SELECT id FROM Games WHERE id = 2`
    );
    const user = await queryInterface.sequelize.query(
      `SELECT id FROM Games WHERE id = 1`
    );

    const rows = game[0];
    const users = user[0]

    return queryInterface.bulkInsert('Events', [{
      title: 'diams tournament',
      description: 'searching goods mates to win tournament',
      startedAt: new Date(),
      players: 2,
      game_id: rows[0].id,
      organizer_id: users[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Events', null, {});
  }
};
