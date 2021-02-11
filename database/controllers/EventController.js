const db = require("../models");
const Event = db.Event;
const Game = db.Game;
const Op = db.Sequelize.Op;
const auth = require('../auth/auth_middleware')

exports.findAll = (req, res) => {

    Event.findAll({
        include: [
            {
                model: Game
            }
        ]
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "ERROR"
        });
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id

    Event.findByPk(id, {include: [
        {
            model: Game,
            attributes: ['title', 'description', 'image']
        }
    ]})
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: "L'évènement est introuvable : " + error
            })
        })
}

Event.belongsTo(Game, {foreignKey: 'game_id'})
