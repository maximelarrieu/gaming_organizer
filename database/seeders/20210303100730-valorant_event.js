'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const game = await queryInterface.sequelize.query(
        `SELECT id FROM Games WHERE id = 1`
    );

    const rows = game[0];

    return queryInterface.bulkInsert('Events', [{
      title: 'road to plat',
      description: 'searching goods mates to win lot of games',
      startedAt: new Date(),
      players: 5,
      game_id: rows[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
