const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = app => {
    const users = require("../controllers/UserController");

    let router = require('express').Router();

    router.get("/profile/:id", cors(corsOptions), users.profile)

    app.use('/api', router)
    app.get('*', function(req, res,next){
      res.locals.user = req.user || null;
      next();
  })
}