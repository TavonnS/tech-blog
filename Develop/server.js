const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const dotenv = require('dotenv');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');

const hbs = exphbs.create({
  // Add your Handlebars configuration options here if needed
  defaultLayout: 'main', // Specify the default layout file (adjust as per your file names)
  layoutsDir: path.join(__dirname, 'views/layouts'), // Specify the layouts directory
});

// Handlebars setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Session setup with sequelize store
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Routes
//app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on https://localhost:${PORT}!`));
});

