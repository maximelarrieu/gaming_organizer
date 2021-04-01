const auth = require('../auth/authJwt')
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = app => {
    const games = require("../controllers/GameController");

    let router = require('express').Router();

    router.get("/games", cors(corsOptions), games.findAll)
    router.get("/games/user/:user", cors(corsOptions), games.findAllUserGames);
    router.get("/games/:id", cors(corsOptions), games.findOne)

    app.use('/api', router)
    app.get('*', function(req, res,next){
      res.locals.user = req.user || null;
      next();
  })
}