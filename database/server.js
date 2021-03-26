const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const app = express();
const port = 3001;

var corsOptions = {
   origin: "http://localhost:3001"
 };

const sequelize = new Sequelize('mysql://root:root@127.0.0.1:3306/gaming_organizer');

// app.use(cors(corsOptions));

sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
   })
    .catch(err => {
       console.error('Unable to connect to the database: ', err)
    })

app.use(morgan("combined"));
app.get('/', (req, res) => {
   res.json("SERVER");
   console.log('app reçue?');
});
// app.get('*', (req, res, next) => {
//     res.locals.user = req.user || null
//     next();
//  });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
require("./routes/GameRoutes")(app);
require("./routes/EventRoutes")(app);
require('./routes/SecurityRoutes')(app);

app.listen(port, () => console.log(`Port sur écoute : ${port}`));
const db = require('./models');

// // Relation One To Many between Event & Game
// db.Event.belongsTo(db.Game, {foreignKey: 'game_id'})
// db.Game.hasMany(db.Event, {foreignKey: 'game_id'})

// db.Event.belongsTo(db.User, {foreignKey: 'organizer_id'})
// db.User.hasMany(db.Event, {foreignKey: 'organizer_id'})
// // Relation Many To Many between Role & User
// db.Role.belongsToMany(db.User, {through: "user_roles", foreignKey: "roleId", otherKey: "userId"})
// db.User.belongsToMany(db.Role, {through: "user_roles", foreignKey: "userId", otherKey: "roleId"})
// // Relation Many To Many between User & Game
// db.Game.belongsToMany(db.User, {through: "user_games", foreignKey: "gameId", otherKey:"userId"})
// db.User.belongsToMany(db.Game, {through: "user_games", foreignKey: "userId", otherKey:"gameId"})

db.ROLES = ["user", "admin", "moderator"]

const Role = db.Role

function initial() {
    Role.create({
        id: 1,
        name: db.ROLES[0]
    });
    Role.create({
        id: 2,
        name: db.ROLES[1]
    });
    Role.create({
        id: 3,
        name: db.ROLES[2]
    });
}

db.sequelize.sync({force: true}).then(() => {
    initial()
});

