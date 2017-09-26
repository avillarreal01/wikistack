const express = require('express');
const morgan = require('morgan');
const models = require('./models');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
var env = nunjucks.configure('views', {noCache: true});

require('./filters')(env);
var AutoEscapeExtension = require('nunjucks-autoescape')(nunjucks);
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

//{force: true} to update table schemas
models.User.sync()
.then(function () {
  return models.Page.sync();
})
.then(function () {
  app.listen(4000, function () {
    console.log('Server is listening on port 4000!');
  });
})
.catch(console.error);

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/user'));

app.get('/', function (req, res) {
   res.render('home');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Error');
});

module.exports = app;
