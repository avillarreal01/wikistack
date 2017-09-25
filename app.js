const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const models = require('./models');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const app = express();

//Setup nunjucks
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//models.db.sync({force: true});
//{force: true}
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

app.use('/', routes);
