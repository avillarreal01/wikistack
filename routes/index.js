const express = require('express');
const bodyParser = require('body-parser');
const wikiRouter = require('./wiki.js');
const userRouter= require('./user.js');
const models = require('../models');

const router = express.Router();

let urlencodedParser = bodyParser.urlencoded({extended: false});

let Page = models.Page;
let User = models.User;

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', (req, res, next) => {
  Page.findAll()
  .then((pages) => {
    res.render('index', {pages});
  })
  .catch(next);
});

module.exports = router;
