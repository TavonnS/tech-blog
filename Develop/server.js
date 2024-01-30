const express = require('express');
const session = require('express-session'); // Session setup
const dotenv = require('dotenv');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const isAuthenticated = require('./middleware/isAuth.js');

dotenv.config();

const homeRoutes = require('./routes/homeRoutes.js');
const logRoutes = require('./routes/login.js');
const signupRoutes = require('./routes/signup.js');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const path = require('path');


// Handlebars setup
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  extname: '.hbs',
});

// Add this middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));


// Handlebars setup
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





app.use('/', homeRoutes);
app.post('/login', logRoutes);
app.post('/signup', signupRoutes);
app.use('/dashboard', homeRoutes);
app.post('/comments', homeRoutes);
app.use('/viewPost', homeRoutes);
app.post('/posts/new', homeRoutes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});

