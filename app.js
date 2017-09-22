const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const app = express();

//Setup nunjucks
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

const server = app.listen(4000);

//middleware
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
