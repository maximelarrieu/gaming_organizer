const db = require("../models");
const Event = db.Event;
const Game = db.Game;
const User = db.User;

exports.toCreate = (req, res) => {
    const id = req.params.id

    Game.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: "Le jeu est introuvable : " + error
            })
        })
}

exports.create = (req, res) => {
    console.log("user:" + req.params.user)
    console.log("id:" + req.params.id)
    const event = {
        title: req.body.title,
        description: req.body.description,
        players: req.body.players,
        startedAt: req.body.startedAt,
        game_id: req.params.id,
        organizer_id: req.params.user
    }
/*    const game = {
        game_id: req.params.id
    }*/

    Event.create(event)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message:
                    "zebi + " + error.message
            })
        })
}

exports.findAll = (req, res) => {

    Event.findAll({
        include: [
            {
                model: Game
            }
        ],
        order: [
            ['startedAt', 'DESC']
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

    Event.findByPk(id, {
        include: [
        {
            model: Game,
            // attributes: ['title', 'description', 'image']
        },
        {
            model: User
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

exports.deleteAfterStarted = (req, res) => {
    Event.destroy(
        {
            where: {
                startedAt: startedAt.getHours() + 1
            }
        }
    ).then(console.log("deleted"))
}

Event.belongsTo(Game, {foreignKey: 'game_id'})
