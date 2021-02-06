const auth = require('../auth/auth_middleware')
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = app => {
    const games = require("../controllers/GameController");

    let router = require('express').Router();

    router.get("/games", cors(corsOptions), games.findAll);

    app.use('/api', router)
}