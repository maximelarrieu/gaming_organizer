const db = require("../models");
const Event = db.Event;
const Op = db.Sequelize.Op;
const auth = require('../auth/auth_middleware')

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}`}} : null;

    Event.findAll()
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