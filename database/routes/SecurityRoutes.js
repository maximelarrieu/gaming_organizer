const { verifySignUp } = require("../auth");
const controller = require("../controllers/AuthController.js");
const usercontroller = require("../controllers/UserController");
const { authJwt } = require('../auth')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/register",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            // verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/login", jsonParser, urlencodedParser, controller.signin);

    // app.get("/api/test/all", usercontroller.allAccess);

    // app.get(
    //     "/api/test/user",
    //     [authJwt.verifyToken],
    //     usercontroller.userBoard
    // );

    // app.get(
    //     "/api/test/mod",
    //     [authJwt.verifyToken, authJwt.isModerator],
    //     usercontroller.moderatorBoard
    // );

    // app.get(
    //     "/api/test/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     usercontroller.adminBoard
    // );
};
