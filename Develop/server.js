const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
require('dotenv').config();


const sequelize = require('./config/connection');
const router = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const exphbs = require('express-handlebars');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// const path = require('path');

// const hbs = exphbs.create({});


// handelbars setup
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, './views'));


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}!`));
});

