const auth = require('../auth/authJwt')
const cors = require('cors')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const Game = require('../models/game')

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = app => {
    const events = require("../controllers/EventController");

    let router = require('express').Router();

    router.post("/events/:id/create/:user", cors(corsOptions), jsonParser, urlencodedParser, events.create)
    router.post("/events/:id/organizer/:user", cors(corsOptions), jsonParser, urlencodedParser, events.addOrganizer)
    router.post("/events/:id/add/:user", cors(corsOptions), jsonParser, urlencodedParser, events.addUser)
    router.get("/events", cors(corsOptions), events.findAll);
    router.get("/events/:id", cors(corsOptions), events.findOne);
    // router.get("/events/:id", cors(corsOptions), events.findUsersInEvent);

    app.use('/api', router)
}