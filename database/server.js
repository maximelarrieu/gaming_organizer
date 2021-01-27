const express = require('express');
const Sequelize = require('sequelize');
const cors = require('cors');
const app = express();
const port = 3001;

const sequelize = new Sequelize('mysql://root:root@127.0.0.1:3306/gaming_organizer');

sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
   })
    .catch(err => {
       console.error('Unable to connect to the database: ', err)
    })

app.get('/', (req, res) => {
   res.send("SERVER");
   console.log('app reçue?');
});

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

require("./routes/GameRoutes")(app);

app.use(cors());
app.options('*', cors());
app.listen(port, () => console.log(`Port sur écoute : ${port}`));
const db = require('./models');
db.sequelize.sync();

