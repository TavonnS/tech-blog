const path = require('path');
const express = require('express');
const session = require('express-session'); 
const dotenv = require('dotenv');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const withAuth = require('./utils/auth');
const routes = require('./controllers');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Handlebars setup
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  extname: '.hbs',
});

// Add this middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));


// Handlebars engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    // Session will automatically expire in 10 minutes
    expires: 10 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});

