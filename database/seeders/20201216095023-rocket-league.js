'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Games', [{
       title: 'Rocket League',
       description: "Rocket League est un jeu vidéo de sport développé par Psyonix, en juillet 2015 sur Windows et sur PlayStation 4, en février 2016 sur Xbox One, en septembre 2016 sur Linux et Mac et en novembre 2017 sur Nintendo Switch. Le jeu est gratuit depuis le 23 septembre 2020.",
       image: "https://rocketleague.media.zestyio.com/rl_home_f2p-launch_shop_10367.jpg",
       releasedAt: "2020-07-07",
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Games', null, {});
  }
};
