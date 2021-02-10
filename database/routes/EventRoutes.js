const auth = require('../auth/auth_middleware')
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = app => {
    const events = require("../controllers/EventController");

    let router = require('express').Router();

    router.get("/events", cors(corsOptions), events.findAll);

    app.use('/api', router)
}