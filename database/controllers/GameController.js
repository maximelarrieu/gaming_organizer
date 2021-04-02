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
    console.log("********************")
    console.log(db)
    const id = req.params.id

    Game.findByPk(id, {
        include: [
            {
                model: Event
            },
            {
                model: User
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

exports.addUser = (game_id, user_id) => {
    console.log(game_id)
    return Game.findByPk(game_id.params.id)
        .then((game) => {
            if(!game) {
                return "NOT FOUND"
            }
            return User.findByPk(user_id.req.params.user)
                .then((user) => {
                    if(!user) {
                        return "USER NOT FOUND"
                    }
                    game.addUser(user);
                    return game
                })
        })
        .catch((err) => {
            console.error(err)
        })
}