const db = require("../models");
const Game = db.Game;
const Event = db.Event;
const User = db.User;
const Op = db.Sequelize.Op;
const auth = require('../auth/authJwt');

exports.findAll = (req, res) => {
    Game.findAll({
        order: [
            ['title', 'ASC']
        ]
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

exports.findAllUserGames = (req, res) => {
    const user = req.params.user
    console.log("user")
    console.log(user)
    Game.findAll({
        include: [{
            model: User
        }],
        where: {'$userId$': user},
        order: [
            ['title', 'ASC']
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
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id

    Game.findByPk(id, {
        include: [
            {
                model: Event
            }
        ]
    })
        .then((data) => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: "Le jeu est introuvable : " + error
            })
        })
}

// Game.hasMany(Event, { as: "event_id"})