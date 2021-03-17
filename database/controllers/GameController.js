const db = require("../models");
const Game = db.Game;
const Event = db.Event;
const Op = db.Sequelize.Op;
const auth = require('../auth/authJwt')

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}`}} : null;

    Game.findAll({ where: condition })
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