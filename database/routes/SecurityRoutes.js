module.exports = app => {
    const users = require("../controllers/UserController");

    let router = require('express').Router();

    router.get("/login", users.findOne);
    app.use('/api/user/login', router)
}