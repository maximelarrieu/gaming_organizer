'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE id = 1`
    );
    const event_one = await queryInterface.sequelize.query(
      `SELECT id FROM Events WHERE id = 1`
    );
    const event_two = await queryInterface.sequelize.query(
      `SELECT id FROM Events WHERE id = 2`
    );

    const users = user[0]
    const events_one = event_one[0]
    const events_two = event_two[0]

    return queryInterface.bulkInsert('usersEvents',
    [
      {
        UserId: users[0].id,
        EventId: events_one[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: users[0].id,
        EventId: events_two[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('usersEvents', null, {});
  }
};
