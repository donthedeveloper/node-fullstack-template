require('dotenv').config();
const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express'),
  app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/fstemplate');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// middleware
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

const nunjucksConfigure = nunjucks.configure('server/templates', {
  noCache: true, 
  autoescape: true, 
  express: app
});

// and then include these two lines of code to add the extension:
const AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
nunjucksConfigure.addExtension('AutoEscapeExtension', new AutoEscapeExtension(nunjucksConfigure));

app.use(express.static('browser/public'));

const router = require('./server/routes');
app.use('/', router);

// app.use((req, res, next) => {
//   const err = new Error('File Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({
//     message: err.message
//   })
// });

app.listen(process.env.PORT || 3000, function() {
    console.log(chalk.green(`App is listening on port ${this.address().port}`));
});

module.exports = app;