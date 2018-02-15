require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const nunjucks = require('nunjucks');
const chalk = require('chalk');

app.use(morgan('dev')); // TODO: conditionally configure based on env
app.use(express.static('browser/public'));

const server = app.listen(process.env.PORT || 3000, function() {
    console.log(chalk.green(`App is listening on port ${this.address().port}`));
});