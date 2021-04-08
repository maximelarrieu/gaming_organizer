const db = require("../models")
const User = db.User
const Game = db.Game
const Event = db.Event
const usersEvents = db.usersEvents

exports.findOne = (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    const password = req.query.password;

    User.findOne({where: { username: username, email: email, password: password}})
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

exports.profile = (req, res) => {
    const id = req.params.id
    User.findByPk(id, {
        include: [
            {
                model: Game
            },
            {
                model: Event,
            },
            {
                model: usersEvents,
                include: {
                    model: Event,
                    include: {
                        model: User
                    },
                    include: {
                        model: Game
                    }
                }
            }
        ]
    })
    .then((data) => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: "L'utilisateur est introuvable : " + error
        })
    })
}