const db = require("../models")
const User = db.User;
// const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth')

exports.findOne = (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    const password = req.query.password;

    User.findOne({where: { username: req.body.username, email: req.body.email, password: req.body.password}})
    .then(user => {
        if(!user) {
            const message = "L'utilisateur n'existe pas."
            return res.status(404).json({message})
        }
        const token = jwt.sign(
            {userId: user.id},
            privateKey,
            {expiresIn: '24h'}
        )
        bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if(isPasswordValid) {
                res.send(user)
                const message = "L'utilisateur a été connecté avec succès";
                return res.json({message, data:user, token})
            } else {
                const message = "Le mot de passe est incorrect."
                return res.status(404).json({message})
            }
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "ERROR"
        });
    });
}

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};