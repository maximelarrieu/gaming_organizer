const db = require('../models')
// const ROLES = db.Role
const User = db.User;


checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        console.log(user)
        if (user) {
            console.log("AH")
            res.status(400).send({
                message: "Désolé ! Ce nom d'utilisateur est déjà utilisé"
            });
            return;
        }
        console.log("BH")

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
            console.log("CH")

                res.status(400).send({
                    message: "Désolé ! Cette adresse email est déjà utilisée"
                });
                return;
            }
            console.log("DH")


            next();
        });
    });
};

// checkRolesExisted = (req, res, next) => {
//     if (req.body.roles) {
//         console.log(ROLES)
//         for (let i = 0; i < req.body.roles.length; i++) {
//             if (!ROLES.includes(req.body.roles[i])) {
//                 res.status(400).send({
//                     message: "Failed! Role does not exist = " + req.body.roles[i]
//                 });
//                 return;
//             }
//         }
//     }

//     next();
// };

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    // checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
