'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     return queryInterface.bulkInsert('Games', [{
       title: 'Valorant',
       description: "Valorant est un jeu vidéo free-to-play de tir à la première personne en multijoueur développé et édité par Riot Games et sorti le 2 juin 2020.",
       image: "https://freight.cargo.site/w/3840/q/75/i/a17dfc0b27e50cb1c75dcd8fcd13a2d11783729f60265d9a00d184bc5a8d9296/VALORANT_1.png",
       releasedAt: "2020-06-02",
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {

     return queryInterface.bulkDelete('Games', null, {});
  }
};
