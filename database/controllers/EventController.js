const db = require("../models");
const Event = db.Event;
const Game = db.Game;
const Op = db.Sequelize.Op;
const auth = require('../auth/auth_middleware')

exports.findAll = (req, res) => {

    const event = {
        title: req.body.title,
        description: req.body.description,
        players: req.body.players,
        startedAt: req.body.startedAt
    };
    Event.create = (req, res) => {
        Event.create(event)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

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

// exports.findAllByGames = (req, res) => {
//     const title = req.query.title;
//     let condition = game_id ? { game_id: { [Op.eq]: Game.id}} : null;

//     Event.findAll({where: condition })
//         .then(data => {
//             res.send(data)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

Event.belongsTo(Game, {foreignKey: 'game_id'})


// exports.findOne = (req, res) => {
//     const id = req.params.id

//     Event.findByPk(id)
//         .then(data => {
//             res.send(data)
//         })
//         .catch(error => {
//             res.status(500).send({
//                 message: "L'évènement est introuvable : " + error
//             })
//         })
// }