const auth = require('../auth/auth_middleware')

module.exports = app => {
    const games = require("../controllers/GameController");

    let router = require('express').Router();

    router.get("/games", games.findAll);

    app.use('/api/games', auth, router)
}