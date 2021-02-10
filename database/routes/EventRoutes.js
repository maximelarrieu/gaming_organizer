const auth = require('../auth/auth_middleware')
const cors = require('cors')

const Game = require('../models/game')

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = app => {
    const events = require("../controllers/EventController");

    let router = require('express').Router();

    router.get("/events", cors(corsOptions), events.findAll);

    router.post("/events/:game_id/create", cors(corsOptions), events.create)

    app.use('/api', router)
}