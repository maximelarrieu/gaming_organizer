const auth = require('../auth/auth_middleware')
const cors = require('cors')
const bodyParser = require('body-parser')

const Game = require('../models/game')

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = app => {
    const events = require("../controllers/EventController");

    let router = require('express').Router();

    router.get("/events", cors(corsOptions), events.findAll);

    router.get("/events/:id", cors(corsOptions), events.findOne);

    router.post("/events/create", cors(corsOptions), jsonParser, events.create)

    app.use('/api', router)
}