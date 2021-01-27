const db = require("../models");
const Game = db.Game;
const Op = db.Sequelize.Op;
const auth = require('../auth/auth_middleware')

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