require('dotenv').config();
const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express'),
  app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session'),
  MongoStore = require('connect-mongo')(session);
const router = require('./server/routes');

// TODO: put as env variable
mongoose.connect('mongodb://localhost:27017/fstemplate');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(session({
  maxAge: 1000 * 60 * 60 * 24 * 7,
  resave: true,
  saveUnitialized: false,
  // TODO: put this in the env
  secret: 'TODO: make this an env var',
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// middleware
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO: Outside of webpack-dev-server, index is looking for assets in the wrong place. Where SHOULD we put assets?
app.use(express.static('browser/assets'));

app.use('/', router);

app.listen(process.env.PORT || 3000, function() {
    console.log(chalk.green(`App is listening on port ${this.address().port}`));
});

module.exports = app;